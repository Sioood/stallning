/**
 * Directory and file rename operations
 */

import { basename, dirname, join, relative } from 'node:path'

import { renameAsync } from '../core/fs.ts'
import { preserveCaseReplace } from '../core/text.ts'

import type { RenameOperation, OperationResult } from '../core/types.ts'

/**
 * Generate new name using preserveCaseReplace
 */
export function generateNewName(currentName: string, oldName: string, newName: string): string {
  return preserveCaseReplace(currentName, oldName, newName)
}

/**
 * Sort rename operations by path depth (deepest first)
 * This ensures parent directories are renamed after their children
 */
export function sortByDepth(operations: RenameOperation[]): RenameOperation[] {
  return [...operations].sort((a, b) => b.oldPath.length - a.oldPath.length)
}

/**
 * Create rename operations for paths
 */
export function createRenameOperations(
  paths: string[],
  oldName: string,
  newName: string,
  type: 'file' | 'directory',
): RenameOperation[] {
  const operations: RenameOperation[] = []

  for (const path of paths) {
    const currentName = basename(path)
    const newFileName = generateNewName(currentName, oldName, newName)

    if (currentName !== newFileName) {
      const parentDir = dirname(path)
      const newPath = join(parentDir, newFileName)
      operations.push({ oldPath: path, newPath, type })
    }
  }

  return operations
}

/**
 * Preview rename operations without executing
 */
export function previewRenames(operations: RenameOperation[]): void {
  for (const op of operations) {
    console.log(`  ${op.type}: ${op.oldPath} → ${basename(op.newPath)}`)
  }
}

/**
 * Execute rename operations with progress tracking
 */
export async function executeRenames(
  operations: RenameOperation[],
  baseDir: string,
  dryRun: boolean,
  onProgress?: (completed: number, total: number) => void,
): Promise<OperationResult> {
  const result: OperationResult = {
    success: true,
    modified: [],
    renamed: [],
    errors: [],
  }

  const sorted = sortByDepth(operations)

  for (let i = 0; i < sorted.length; i++) {
    const op = sorted[i]

    if (dryRun) {
      result.renamed.push(relative(baseDir, op.oldPath))
    } else {
      try {
        await renameAsync(op.oldPath, op.newPath)
        result.renamed.push(relative(baseDir, op.oldPath))
      } catch (error) {
        result.success = false
        result.errors.push({
          path: op.oldPath,
          error: error instanceof Error ? error : new Error(String(error)),
        })
      }
    }

    onProgress?.(i + 1, sorted.length)
  }

  return result
}
