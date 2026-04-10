/**
 * Main orchestrator for project initialization
 */

import { join } from 'node:path'

import consola from 'consola'

import {
  getConfig,
  logDryRunPreview,
  logNextSteps,
  logSummary,
  parseCliArgs,
  showHelp,
} from './cli/index.ts'
import { UPSTREAM_URL } from './constants.ts'
import { findDirectoriesContaining, findFilesContaining, walkDir } from './core/fs.ts'
import { normalizeProjectName } from './core/text.ts'
import { addUpstreamRemote, hasGitRepo, resetGitHistory } from './features/git.ts'
import { generateReadme } from './features/readme.ts'
import { createRenameOperations, executeRenames } from './features/rename.ts'
import { replaceInFiles } from './features/replace.ts'

import type { InitConfig, OperationResult, RenameOperation } from './core/types.ts'

const BOILERPLATE_NAME = 'stallning'

/**
 * Preview what changes will be made
 */
async function previewChanges(
  rootDir: string,
  projectName: string,
): Promise<{
  dirOps: RenameOperation[]
  fileOps: RenameOperation[]
  allFiles: string[]
}> {
  // Find directories to rename
  const dirsToRename = await findDirectoriesContaining(rootDir, rootDir, BOILERPLATE_NAME)
  const dirOps = createRenameOperations(dirsToRename, BOILERPLATE_NAME, projectName, 'directory')

  // Find files to rename
  const filesToRename = await findFilesContaining(rootDir, rootDir, BOILERPLATE_NAME)
  const fileOps = createRenameOperations(filesToRename, BOILERPLATE_NAME, projectName, 'file')

  // Collect all files for content scanning
  const allFiles: string[] = []
  for await (const filepath of walkDir(rootDir)) {
    allFiles.push(filepath)
  }

  return { dirOps, fileOps, allFiles }
}

/**
 * Execute all initialization operations
 */
async function executeInit(config: InitConfig, rootDir: string): Promise<void> {
  const normalizedName = normalizeProjectName(config.projectName)

  // Preview/dry-run phase
  consola.start('Scanning project...')
  const { dirOps, fileOps, allFiles } = await previewChanges(rootDir, normalizedName)

  if (config.dryRun) {
    logDryRunPreview({
      dirsToRename: dirOps.length,
      filesToRename: fileOps.length,
      filesToModify: allFiles.length,
    })
    return
  }

  consola.start(`Replacing "${BOILERPLATE_NAME}" with "${normalizedName}"...`)

  // Track results
  const results: OperationResult[] = []

  // Execute directory renames
  if (dirOps.length > 0) {
    consola.start(`Renaming ${dirOps.length} director${dirOps.length === 1 ? 'y' : 'ies'}...`)
    const dirResult = await executeRenames(dirOps, rootDir, false, (completed, total) => {
      if (config.verbose) {
        consola.info(`  ${completed}/${total} directories`)
      }
    })
    results.push(dirResult)
  }

  // Re-scan files after directory renames (paths may have changed)
  consola.start('Re-scanning after directory renames...')
  const updatedFilesToRename = await findFilesContaining(rootDir, rootDir, BOILERPLATE_NAME)
  const updatedFileOps = createRenameOperations(
    updatedFilesToRename,
    BOILERPLATE_NAME,
    normalizedName,
    'file',
  )

  // Execute file renames
  if (updatedFileOps.length > 0) {
    consola.start(
      `Renaming ${updatedFileOps.length} file${updatedFileOps.length === 1 ? '' : 's'}...`,
    )
    const fileResult = await executeRenames(updatedFileOps, rootDir, false, (completed, total) => {
      if (config.verbose) {
        consola.info(`  ${completed}/${total} files`)
      }
    })
    results.push(fileResult)
  }

  // Collect all files for content replacement
  const allCurrentFiles: string[] = []
  for await (const filepath of walkDir(rootDir)) {
    allCurrentFiles.push(filepath)
  }

  // Execute content replacements
  consola.start('Updating file contents...')
  const replaceResult = await replaceInFiles(
    allCurrentFiles,
    BOILERPLATE_NAME,
    normalizedName,
    rootDir,
    false,
    (completed, total, currentFile) => {
      if (config.verbose && currentFile) {
        consola.info(`  ${completed}/${total}: ${currentFile}`)
      }
    },
  )
  results.push(replaceResult)

  // Calculate final stats
  const dirsRenamed = results.reduce(
    (sum, r) => sum + r.renamed.filter((p) => !p.includes('.')).length,
    0,
  )
  const filesRenamed = results.reduce(
    (sum, r) => sum + r.renamed.filter((p) => p.includes('.')).length,
    0,
  )
  const filesModified = replaceResult.modified.length

  logSummary({ dirsRenamed, filesRenamed, filesModified })

  // Git operations
  if (await hasGitRepo(rootDir)) {
    if (config.resetGit) {
      consola.start('Resetting git history...')
      const gitResult = await resetGitHistory(rootDir, normalizedName)
      if (gitResult.success) {
        if (gitResult.originPreserved) {
          consola.success('Git history reset with fresh initial commit (origin remote preserved)')
        } else {
          consola.success('Git history reset with fresh initial commit')
        }
      } else {
        consola.warn(`Git reset failed: ${gitResult.error}`)
      }
    } else {
      consola.info(
        'Keeping existing git history. You may want to manually remove the upstream remote.',
      )
    }

    // Add upstream remote
    if (config.addUpstream) {
      consola.start('Adding upstream remote...')
      const upstreamResult = await addUpstreamRemote(rootDir, UPSTREAM_URL)
      if (upstreamResult.success) {
        if (upstreamResult.alreadyExists) {
          consola.info('Upstream remote already exists')
        } else {
          consola.success('Upstream remote added and fetched')
        }
      } else {
        consola.warn(`Upstream setup failed: ${upstreamResult.error}`)
      }
    } else {
      consola.info('Skipped upstream remote configuration')
    }
  }

  // Generate README
  if (config.generateReadme) {
    consola.start('Generating personalized README.md...')
    const readmeResult = await generateReadme(rootDir, normalizedName, config.description, false)
    if (readmeResult.success) {
      consola.success('README.md generated')
    } else {
      consola.warn(`README generation failed: ${readmeResult.error}`)
    }
  }

  logNextSteps()
}

/**
 * Main entry point
 */
async function main(): Promise<void> {
  const args = process.argv.slice(2)

  if (args.includes('--help') || args.includes('-h')) {
    showHelp()
    process.exit(0)
  }

  const options = parseCliArgs()
  const config = await getConfig(options)

  if (!config) {
    process.exit(0)
  }

  const rootDir = join(import.meta.dirname, '../..')

  try {
    await executeInit(config, rootDir)
  } catch (error) {
    consola.error(error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}

main().catch((error) => {
  consola.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
