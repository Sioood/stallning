/**
 * CLI entry point and argument parsing
 */

import { parseArgs } from 'node:util'

import consola from 'consola'

import { runInteractivePrompts } from './prompts.ts'

import type { InitConfig } from '../core/types.ts'

export { logDryRunPreview, logNextSteps, logSummary } from './progress.ts'

export interface CliOptions {
  dryRun: boolean
  yes: boolean
  verbose: boolean
  projectName?: string
  description?: string
}

/**
 * Parse CLI arguments
 */
export function parseCliArgs(): CliOptions {
  const { values } = parseArgs({
    args: process.argv.slice(2),
    options: {
      'dry-run': { type: 'boolean', default: false },
      yes: { type: 'boolean', short: 'y', default: false },
      verbose: { type: 'boolean', short: 'v', default: false },
      name: { type: 'string' },
      description: { type: 'string' },
    },
    strict: false,
  })

  return {
    dryRun: values['dry-run'] as boolean,
    yes: values.yes as boolean,
    verbose: values.verbose as boolean,
    projectName: values.name as string | undefined,
    description: values.description as string | undefined,
  }
}

/**
 * Get configuration from CLI args or interactive prompts
 */
export async function getConfig(options: CliOptions): Promise<InitConfig | null> {
  // If non-interactive mode with provided name
  if (options.yes && options.projectName) {
    return {
      projectName: options.projectName,
      description: options.description || 'TODO: Add your project description here',
      dryRun: options.dryRun,
      resetGit: true,
      addUpstream: true,
      generateReadme: true,
      verbose: options.verbose,
    }
  }

  // Interactive mode
  const config = await runInteractivePrompts()
  if (!config) return null

  // Override with CLI flags
  config.dryRun = options.dryRun
  config.verbose = options.verbose

  return config
}

/**
 * Display help text
 */
export function showHelp(): void {
  consola.info(`
Usage: pnpm run init [options]

Options:
  --dry-run          Preview changes without applying them
  --yes, -y          Non-interactive mode (requires --name)
  --name <name>      Project name (for non-interactive mode)
  --description <d>  Project description (for non-interactive mode)
  --verbose, -v      Show detailed progress
  --help, -h         Show this help message

Examples:
  pnpm run init                    # Interactive mode
  pnpm run init --dry-run          # Preview changes
  pnpm run init --y --name my-project  # Non-interactive
`)
}
