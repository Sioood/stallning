#!/usr/bin/env node
/// <reference types="node" />

/**
 * IMPORTS
 */
import { spawnSync } from 'node:child_process'
import {
  readFileSync,
  writeFileSync,
  readdirSync,
  statSync,
  renameSync,
  rmSync,
  existsSync,
} from 'node:fs'
import { join, relative, dirname, basename } from 'node:path'

import consola from 'consola'

/**
 * CONSTANTS - Path filtering and file handling
 */
const IGNORED_DIRS = new Set([
  'node_modules',
  '.git',
  '.turbo',
  '.changeset',
  '.husky',
  '.github',
  'dist',
  'build',
  'coverage',
])
const IGNORED_FILES = new Set([
  'pnpm-lock.yaml',
  'scripts/init.ts',
  'README.md',
  'docs/branch-sync.md',
])

/**
 * PATH UTILITIES - Filter what should be processed
 */
function shouldProcessPath(path: string): boolean {
  const parts = path.split('/')
  return !parts.some((part) => IGNORED_DIRS.has(part))
}

function shouldProcessFile(filepath: string): boolean {
  return !IGNORED_FILES.has(filepath)
}

/**
 * TEXT UTILITIES - String manipulation with case preservation
 */
function isBinaryFile(filepath: string): boolean {
  const binaryExtensions = new Set([
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.ico',
    '.pdf',
    '.zip',
    '.tar',
    '.gz',
    '.woff',
    '.woff2',
    '.ttf',
    '.eot',
    '.mp4',
    '.mp3',
    '.webm',
    '.DS_Store',
  ])
  return binaryExtensions.has((filepath.match(/\.[^.]+$/) || [''])[0])
}

function preserveCaseReplace(text: string, oldName: string, newName: string): string {
  const patterns = [
    { regex: new RegExp(oldName.toLowerCase(), 'g'), replacement: newName.toLowerCase() },
    { regex: new RegExp(oldName.toUpperCase(), 'g'), replacement: newName.toUpperCase() },
    { regex: new RegExp(capitalize(oldName), 'g'), replacement: capitalize(newName) },
  ]

  let result = text
  for (const { regex, replacement } of patterns) {
    result = result.replace(regex, replacement)
  }
  return result
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * RENAME UTILITIES - Directory operations
 */
function findDirectoriesToRename(dir: string, baseDir: string, oldName: string): string[] {
  const dirsToRename: string[] = []
  const entries = readdirSync(dir)

  for (const entry of entries) {
    const fullPath = join(dir, entry)
    const relativePath = relative(baseDir, fullPath)

    if (!shouldProcessPath(relativePath)) continue

    const stats = statSync(fullPath)
    if (stats.isDirectory()) {
      // Check if directory name contains the old name (case-insensitive)
      if (entry.toLowerCase().includes(oldName.toLowerCase())) {
        dirsToRename.push(fullPath)
      }
      // Recursively check subdirectories
      dirsToRename.push(...findDirectoriesToRename(fullPath, baseDir, oldName))
    }
  }

  return dirsToRename
}

function renameDirectory(dirPath: string, oldName: string, newName: string): string | null {
  const dirName = basename(dirPath)
  const newDirName = preserveCaseReplace(dirName, oldName, newName)

  if (dirName !== newDirName) {
    const parentDir = dirname(dirPath)
    const newPath = join(parentDir, newDirName)
    renameSync(dirPath, newPath)
    return newPath
  }
  return null
}

/**
 * RENAME UTILITIES - File operations
 */
function findFilesToRename(dir: string, baseDir: string, oldName: string): string[] {
  const filesToRename: string[] = []
  const entries = readdirSync(dir)

  for (const entry of entries) {
    const fullPath = join(dir, entry)
    const relativePath = relative(baseDir, fullPath)

    if (!shouldProcessPath(relativePath)) continue
    if (!shouldProcessFile(relativePath)) continue

    const stats = statSync(fullPath)
    if (stats.isDirectory()) {
      filesToRename.push(...findFilesToRename(fullPath, baseDir, oldName))
    } else {
      // Check if filename contains the old name (case-insensitive)
      if (entry.toLowerCase().includes(oldName.toLowerCase())) {
        filesToRename.push(fullPath)
      }
    }
  }

  return filesToRename
}

function renameFile(filePath: string, oldName: string, newName: string): string | null {
  const fileName = basename(filePath)
  const newFileName = preserveCaseReplace(fileName, oldName, newName)

  if (fileName !== newFileName) {
    const parentDir = dirname(filePath)
    const newPath = join(parentDir, newFileName)
    renameSync(filePath, newPath)
    return newPath
  }
  return null
}

/**
 * CONTENT UTILITIES - Replace text inside files
 */
function replaceInFile(filepath: string, oldName: string, newName: string): boolean {
  if (isBinaryFile(filepath)) return false

  try {
    const content = readFileSync(filepath, 'utf8')
    const newContent = preserveCaseReplace(content, oldName, newName)

    if (content !== newContent) {
      writeFileSync(filepath, newContent, 'utf8')
      return true
    }
  } catch {
    // Skip files that can't be read as text
  }
  return false
}

/**
 * GIT UTILITIES - Repository history management
 */
function hasGitRepo(dir: string): boolean {
  return existsSync(join(dir, '.git'))
}

function resetGitHistory(dir: string, projectName: string): void {
  const gitDir = join(dir, '.git')

  consola.start('Resetting git history...')

  // Remove existing .git directory
  rmSync(gitDir, { recursive: true, force: true })

  // Initialize new repo
  const initResult = spawnSync('git', ['init'], { cwd: dir, stdio: 'pipe' })
  if (initResult.status !== 0) {
    throw new Error('Failed to initialize git repository')
  }

  // Configure git user if not already set (required for commit)
  const userNameResult = spawnSync('git', ['config', 'user.name'], {
    cwd: dir,
    stdio: 'pipe',
    encoding: 'utf8',
  })
  if (!userNameResult.stdout?.trim()) {
    spawnSync('git', ['config', 'user.name', 'Project Init'], { cwd: dir, stdio: 'pipe' })
  }

  const userEmailResult = spawnSync('git', ['config', 'user.email'], {
    cwd: dir,
    stdio: 'pipe',
    encoding: 'utf8',
  })
  if (!userEmailResult.stdout?.trim()) {
    spawnSync('git', ['config', 'user.email', 'init@localhost'], { cwd: dir, stdio: 'pipe' })
  }

  // Stage all files
  const addResult = spawnSync('git', ['add', '.'], { cwd: dir, stdio: 'pipe' })
  if (addResult.status !== 0) {
    throw new Error('Failed to stage files')
  }

  // Create initial commit
  const commitResult = spawnSync(
    'git',
    ['commit', '-m', `chore(init): initialize ${projectName}`],
    {
      cwd: dir,
      stdio: 'pipe',
    },
  )
  if (commitResult.status !== 0) {
    throw new Error('Failed to create initial commit')
  }

  consola.success('Git history reset with fresh initial commit')
}

/**
 * README GENERATION - Create personalized README.md
 */
function generateReadme(rootDir: string, projectName: string, description: string): void {
  const readmePath = join(rootDir, 'README.md')
  const capitalizedName = capitalize(projectName)

  const readmeContent = `<div align="center">
  <h1><b>${capitalizedName}</b></h1>
  <p><i>${description}</i></p>
</div>

## Monorepo Structure

\`\`\`sh
.
├── apps
└── packages/
    └── config/
        ├── eslint
        ├── oxlint
        └── typescript
\`\`\`

\`\`\`mermaid
flowchart LR

. --> apps
. --> packages
packages --> config
config --> typescript
config --> oxfmt
config --> oxlint
config --> eslint
oxfmt --> eslint
typescript --> eslint
oxlint --> eslint
eslint --> .
oxlint --> .
\`\`\`

## 🚀 Get started

### Minimal prerequisites (Check package.json)

1. [**node**](https://nodejs.org/en/download) >=25.0.0
2. [**pnpm**](https://pnpm.io/installation) pnpm@10.33.0

\`\`\`sh
npm install -g pnpm
\`\`\`

3. [**git**](https://git-scm.com/download)

### Initialize the project

If you cloned this boilerplate to start a new project, run the init script once to customize it:

\`\`\`sh
pnpm init
\`\`\`

This will:
- Replace "stallning" with your project name across all files and directories
- Optionally reset git history for a fresh start
- Optionally add the upstream remote for future syncs

After initialization, install dependencies and you're ready to go.

\`\`\`sh
pnpm install
\`\`\`

### 📦 Recommended extensions

You can install the recommended extensions defined in the \`.vscode/${projectName}.code-workspace\` file.

Go to [VSCode](https://code.visualstudio.com/) and open the extension tab, search for the recommended extensions by typing \`@recommended\` and install them.

## Available Scripts

The following scripts are available at the root of the monorepo:

| Script                   | Description                                                  |
| ------------------------ | ------------------------------------------------------------ |
| \`pnpm lint\`              | Run all linting checks.                                      |
| \`pnpm lint:oxlint\`       | Run oxlint checks.                                           |
| \`pnpm lint:eslint\`       | Run ESLint checks.                                           |
| \`pnpm check-types\`       | Run all TypeScript checks.                                   |
| \`pnpm format\`            | Format the codebase with oxfmt.                              |
| \`pnpm format:check\`      | Verify formatting with oxfmt.                                |
| \`pnpm sync:merge\`        | Merge one remote branch into a target branch.                |
| \`pnpm sync:pick\`         | Cherry-pick commit(s) from remote branch into target branch. |
| \`pnpm knip\`              | Detect unused files, exports, and dependencies.              |
| \`pnpm knip:fix\`          | Run Knip with autofix for fixable issues.                    |
| \`pnpm todoctor\`          | Run todoctor to check technical debt                         |
| \`pnpm changeset\`         | Create a new changeset for versioning.                       |
| \`pnpm changeset:release\` | Create a release tag from changesets.                        |
| \`pnpm build\`             | Build all packages and applications.                         |

## Documentation

- [Branch Sync Workflow](docs/branch-sync.md) - Fork setup, sync commands, and recovery flows
`

  writeFileSync(readmePath, readmeContent, 'utf8')
}

/**
 * FILESYSTEM UTILITIES - Directory traversal
 */
function* walkDir(dir: string, baseDir: string = dir): Generator<string> {
  const entries = readdirSync(dir)
  for (const entry of entries) {
    const fullPath = join(dir, entry)
    const relativePath = relative(baseDir, fullPath)

    if (!shouldProcessPath(relativePath)) continue
    if (!shouldProcessFile(relativePath)) continue

    const stats = statSync(fullPath)
    if (stats.isDirectory()) {
      yield* walkDir(fullPath, baseDir)
    } else {
      yield fullPath
    }
  }
}

/**
 * MAIN - CLI flow
 */
async function main(): Promise<void> {
  consola.box('🚀 Initialize your new project')

  const projectName = await consola.prompt('Enter your project/monorepo name:', {
    type: 'text',
    placeholder: 'my-project',
  })

  if (!projectName || typeof projectName !== 'string') {
    consola.error('Project name is required')
    process.exit(1)
  }

  const normalizedName = projectName.trim().toLowerCase().replace(/\s+/g, '-')

  if (!normalizedName) {
    consola.error('Project name cannot be empty')
    process.exit(1)
  }

  if (normalizedName === 'stallning') {
    consola.warn('Project name is the same as the boilerplate name. No changes needed.')
    process.exit(0)
  }

  const confirmed = await consola.prompt(
    `Replace "stallning" with "${normalizedName}" across the entire project?`,
    {
      type: 'confirm',
      initial: true,
    },
  )

  if (!confirmed) {
    consola.info('Aborted. No changes were made.')
    process.exit(0)
  }

  consola.start('Replacing "stallning" with your project name...')

  const rootDir = join(import.meta.dirname, '..')
  let modifiedCount = 0
  let renamedDirCount = 0
  let renamedFileCount = 0

  // First, find and rename directories (deepest first to avoid path issues)
  const dirsToRename = findDirectoriesToRename(rootDir, rootDir, 'stallning')
  dirsToRename.sort((a, b) => b.length - a.length) // Sort by path length (depth)

  for (const dirPath of dirsToRename) {
    const newPath = renameDirectory(dirPath, 'stallning', normalizedName)
    if (newPath) {
      consola.verbose(
        `Renamed directory: ${relative(rootDir, dirPath)} → ${relative(rootDir, newPath)}`,
      )
      renamedDirCount++
    }
  }

  // Then, find and rename files (deepest first to avoid path issues)
  const filesToRename = findFilesToRename(rootDir, rootDir, 'stallning')
  filesToRename.sort((a, b) => b.length - a.length) // Sort by path length (depth)

  for (const filePath of filesToRename) {
    const newPath = renameFile(filePath, 'stallning', normalizedName)
    if (newPath) {
      consola.verbose(
        `Renamed file: ${relative(rootDir, filePath)} → ${relative(rootDir, newPath)}`,
      )
      renamedFileCount++
    }
  }

  // Finally, replace content in files
  for (const filepath of walkDir(rootDir)) {
    if (replaceInFile(filepath, 'stallning', normalizedName)) {
      consola.verbose(`Updated: ${relative(rootDir, filepath)}`)
      modifiedCount++
    }
  }

  consola.success(`✓ Project initialized with name: ${normalizedName}`)
  consola.info(`Renamed ${renamedDirCount} director${renamedDirCount === 1 ? 'y' : 'ies'}`)
  consola.info(`Renamed ${renamedFileCount} file${renamedFileCount === 1 ? '' : 's'}`)
  consola.info(`Modified ${modifiedCount} file(s)`)

  // Git history reset
  if (hasGitRepo(rootDir)) {
    const resetGit = await consola.prompt(
      'Reset git history? This will delete the boilerplate commit history and create a fresh initial commit.',
      {
        type: 'confirm',
        initial: true,
      },
    )

    if (resetGit) {
      resetGitHistory(rootDir, normalizedName)
    } else {
      consola.info(
        'Keeping existing git history. You may want to manually remove the upstream remote.',
      )
    }
  }

  // Add upstream remote for sync and cherry-picking
  if (hasGitRepo(rootDir)) {
    const addUpstream = await consola.prompt('Add upstream remote for sync and cherry-picking?', {
      type: 'confirm',
      initial: true,
    })

    if (addUpstream) {
      consola.start('Adding upstream remote...')

      const remoteResult = spawnSync(
        'git',
        ['remote', 'add', 'upstream', 'https://github.com/Sioood/stallning.git'],
        { cwd: rootDir, stdio: 'pipe' },
      )

      if (remoteResult.status !== 0) {
        consola.warn('Failed to add upstream remote (it may already exist)')
      } else {
        const fetchResult = spawnSync('git', ['fetch', 'upstream'], {
          cwd: rootDir,
          stdio: 'pipe',
        })

        if (fetchResult.status !== 0) {
          consola.warn('Added remote but failed to fetch from upstream')
        } else {
          consola.success('Upstream remote added and fetched')
        }
      }
    } else {
      consola.info('Skipped upstream remote configuration')
    }
  }

  // Generate personalized README
  const generateReadmePrompt = await consola.prompt(
    'Generate a personalized README.md with your project name?',
    {
      type: 'confirm',
      initial: true,
    },
  )

  if (generateReadmePrompt) {
    const description = await consola.prompt('Enter a short description for your project:', {
      type: 'text',
      placeholder: 'A modern monorepo for building...',
      default: 'TODO: Add your project description here',
    })

    consola.start('Generating personalized README.md...')
    generateReadme(rootDir, normalizedName, typeof description === 'string' ? description : '')
    consola.success('README.md generated')
  }

  consola.info('\nNext steps:')
  consola.info('  1. Review the changes')
  consola.info('  2. Run pnpm install to install dependencies')
  consola.info('  3. Start building your project!')
}

main().catch((error) => {
  consola.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
