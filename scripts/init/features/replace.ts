/**
 * Content replacement in files
 */

import { relative } from 'node:path'

import { readFileAsync, writeFileAsync } from '../core/fs.ts'
import { isBinaryFile, preserveCaseReplace } from '../core/text.ts'

import type { OperationResult, ContentChange } from '../core/types.ts'

/**
 * Replace content in a single file
 */
export async function replaceInFile(
  filepath: string,
  oldName: string,
  newName: string,
): Promise<{ changed: boolean; changes: number }> {
  if (isBinaryFile(filepath)) {
    return { changed: false, changes: 0 }
  }

  try {
    const content = await readFileAsync(filepath)
    const newContent = preserveCaseReplace(content, oldName, newName)

    if (content !== newContent) {
      // Count changes (approximate by counting occurrences of old name variants)
      const lowerOld = oldName.toLowerCase()
      const upperOld = oldName.toUpperCase()
      const capOld = oldName.charAt(0).toUpperCase() + oldName.slice(1).toLowerCase()

      const _changes =
        (content.match(new RegExp(lowerOld, 'g')) || []).length +
        (content.match(new RegExp(upperOld, 'g')) || []).length +
        (content.match(new RegExp(capOld, 'g')) || []).length

      return { changed: true, changes: _changes }
    }
  } catch {
    // Skip files that can't be read as text
  }

  return { changed: false, changes: 0 }
}

/**
 * Execute content replacement across multiple files
 */
export async function replaceInFiles(
  filepaths: string[],
  oldName: string,
  newName: string,
  baseDir: string,
  dryRun: boolean,
  onProgress?: (completed: number, total: number, currentFile: string) => void,
): Promise<OperationResult> {
  const result: OperationResult = {
    success: true,
    modified: [],
    renamed: [],
    errors: [],
  }

  for (let i = 0; i < filepaths.length; i++) {
    const filepath = filepaths[i]
    const relativePath = relative(baseDir, filepath)

    onProgress?.(i, filepaths.length, relativePath)

    try {
      const { changed } = await replaceInFile(filepath, oldName, newName)

      if (changed) {
        if (!dryRun) {
          const content = await readFileAsync(filepath)
          const newContent = preserveCaseReplace(content, oldName, newName)
          await writeFileAsync(filepath, newContent)
        }
        result.modified.push(filepath)
      }
    } catch (error) {
      result.success = false
      result.errors.push({
        path: filepath,
        error: error instanceof Error ? error : new Error(String(error)),
      })
    }
  }

  onProgress?.(filepaths.length, filepaths.length, '')

  return result
}

/**
 * Preview content changes without executing
 */
export async function previewContentChanges(
  filepaths: string[],
  oldName: string,
  newName: string,
): Promise<ContentChange[]> {
  const changes: ContentChange[] = []

  for (const filepath of filepaths) {
    const { changed, changes: count } = await replaceInFile(filepath, oldName, newName)
    if (changed) {
      changes.push({ filepath, changes: count })
    }
  }

  return changes
}
