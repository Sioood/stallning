/**
 * Shared types for the init script
 */

export interface OperationResult {
  success: boolean
  modified: string[]
  renamed: string[]
  errors: Array<{ path: string; error: Error }>
}

export interface RenameOperation {
  oldPath: string
  newPath: string
  type: 'file' | 'directory'
}

export interface ContentChange {
  filepath: string
  changes: number
}

export interface InitConfig {
  projectName: string
  description: string
  dryRun: boolean
  resetGit: boolean
  addUpstream: boolean
  generateReadme: boolean
  verbose: boolean
}

export interface PreviewResult {
  directoriesToRename: RenameOperation[]
  filesToRename: RenameOperation[]
  filesToModify: string[]
  estimatedChanges: number
}
