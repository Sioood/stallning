/**
 * Progress indicators for long-running operations
 */

import consola from 'consola'

/**
 * Create a progress bar for operations
 */
export function createProgressBar(
  total: number,
  message: string,
): {
  update: (current: number) => void
  finish: () => void
} {
  let lastPercentage = -1

  return {
    update: (current: number) => {
      const percentage = Math.round((current / total) * 100)
      if (percentage !== lastPercentage && percentage % 10 === 0) {
        consola.info(`${message}: ${percentage}%`)
        lastPercentage = percentage
      }
    },
    finish: () => {
      consola.success(`${message}: 100%`)
    },
  }
}

/**
 * Spinner for indeterminate operations
 */
export function showSpinner(message: string): () => void {
  consola.start(message)
  return () => consola.success(message)
}

/**
 * Log operation summary
 */
export function logSummary(stats: {
  dirsRenamed: number
  filesRenamed: number
  filesModified: number
}): void {
  consola.success(`✓ Initialization complete`)
  consola.info(`Renamed ${stats.dirsRenamed} director${stats.dirsRenamed === 1 ? 'y' : 'ies'}`)
  consola.info(`Renamed ${stats.filesRenamed} file${stats.filesRenamed === 1 ? '' : 's'}`)
  consola.info(`Modified ${stats.filesModified} file(s)`)
}

/**
 * Log next steps
 */
export function logNextSteps(): void {
  consola.info('\nNext steps:')
  consola.info('  1. Review the changes')
  consola.info('  2. Run pnpm install to install dependencies')
  consola.info('  3. Start building your project!')
}

/**
 * Log dry run preview
 */
export function logDryRunPreview(stats: {
  dirsToRename: number
  filesToRename: number
  filesToModify: number
}): void {
  consola.info('\nDry run preview:')
  consola.info(`  Directories to rename: ${stats.dirsToRename}`)
  consola.info(`  Files to rename: ${stats.filesToRename}`)
  consola.info(`  Files with content changes: ${stats.filesToModify}`)
  consola.info('\nNo changes were made. Run without --dry-run to apply.')
}
