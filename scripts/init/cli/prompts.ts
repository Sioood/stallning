/**
 * CLI prompts and user interaction
 */

import consola from 'consola'

import { normalizeProjectName, validateProjectName } from '../core/text.ts'

import type { InitConfig } from '../core/types.ts'

const BOILERPLATE_NAME = 'stallning'

/**
 * Prompt for project name with validation
 */
export async function promptProjectName(): Promise<{
  name: string
  normalized: string
  cancelled: boolean
}> {
  const input = await consola.prompt('Enter your project/monorepo name:', {
    type: 'text',
    placeholder: 'my-project',
  })

  if (!input || typeof input !== 'string') {
    consola.error('Project name is required')
    return { name: '', normalized: '', cancelled: true }
  }

  const normalized = normalizeProjectName(input)

  const validation = validateProjectName(normalized)
  if (!validation.valid) {
    consola.error(validation.error || 'Invalid project name')
    return { name: '', normalized: '', cancelled: true }
  }

  if (normalized === BOILERPLATE_NAME) {
    consola.warn('Project name is the same as the boilerplate name. No changes needed.')
    return { name: '', normalized: '', cancelled: true }
  }

  return { name: input, normalized, cancelled: false }
}

/**
 * Confirm rename operation
 */
export async function confirmRename(normalizedName: string): Promise<boolean> {
  const confirmed = await consola.prompt(
    `Replace "${BOILERPLATE_NAME}" with "${normalizedName}" across the entire project?`,
    {
      type: 'confirm',
      initial: true,
    },
  )

  return !!confirmed
}

/**
 * Prompt for git history reset
 */
export async function promptGitReset(): Promise<boolean> {
  const result = await consola.prompt(
    'Reset git history? This will delete the boilerplate commit history and create a fresh initial commit.',
    {
      type: 'confirm',
      initial: true,
    },
  )
  return !!result
}

/**
 * Prompt for upstream remote
 */
export async function promptUpstreamRemote(): Promise<boolean> {
  const result = await consola.prompt('Add upstream remote for sync and cherry-picking?', {
    type: 'confirm',
    initial: true,
  })
  return !!result
}

/**
 * Prompt for README generation
 */
export async function promptReadmeGeneration(): Promise<{
  generate: boolean
  description?: string
}> {
  const generate = await consola.prompt(
    'Generate a personalized README.md with your project name?',
    {
      type: 'confirm',
      initial: true,
    },
  )

  if (!generate) {
    return { generate: false }
  }

  const description = await consola.prompt('Enter a short description for your project:', {
    type: 'text',
    placeholder: 'A modern monorepo for building...',
    default: 'TODO: Add your project description here',
  })

  return {
    generate: true,
    description: typeof description === 'string' ? description : '',
  }
}

/**
 * Run all prompts and return config
 */
export async function runInteractivePrompts(): Promise<InitConfig | null> {
  consola.box('🚀 Initialize your new project')

  const { normalized, cancelled } = await promptProjectName()
  if (cancelled) return null

  const confirmed = await confirmRename(normalized)
  if (!confirmed) {
    consola.info('Aborted. No changes were made.')
    return null
  }

  const resetGit = await promptGitReset()
  const addUpstream = await promptUpstreamRemote()
  const { generate: generateReadme, description } = await promptReadmeGeneration()

  return {
    projectName: normalized,
    description: description || 'TODO: Add your project description here',
    dryRun: false,
    resetGit,
    addUpstream,
    generateReadme,
    verbose: false,
  }
}
