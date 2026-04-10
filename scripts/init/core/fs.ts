/**
 * Async filesystem utilities for directory traversal and filtering
 */

import { readdir, stat, rename, readFile, writeFile } from 'node:fs/promises'
import { join, relative, dirname, basename } from 'node:path'

import { IGNORED_PATTERNS } from '../constants.ts'

import { matchAnyGlob, matchPathSegments } from './glob.ts'

/**
 * Check if a path should be processed (not matching ignored patterns)
 * Supports glob patterns like node_modules, lock files, log files
 */
export function shouldProcessPath(path: string): boolean {
  // Check full path against patterns (for dir patterns)
  if (matchAnyGlob(path, IGNORED_PATTERNS)) return false
  // Check individual path segments (for exact dir/file names)
  return !matchPathSegments(path, IGNORED_PATTERNS)
}

/**
 * Check if a file should be processed (not matching ignored patterns)
 * Supports glob patterns like lock files, log files, yaml files
 */
export function shouldProcessFile(filepath: string): boolean {
  return !matchAnyGlob(filepath, IGNORED_PATTERNS)
}

/**
 * Async generator to walk directory recursively
 */
export async function* walkDir(dir: string, baseDir: string = dir): AsyncGenerator<string> {
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    const relativePath = relative(baseDir, fullPath)

    if (!shouldProcessPath(relativePath)) continue
    if (!shouldProcessFile(relativePath)) continue

    if (entry.isDirectory()) {
      yield* walkDir(fullPath, baseDir)
    } else if (entry.isFile()) {
      yield fullPath
    }
  }
}

/**
 * Find all directories containing the search name (case-insensitive)
 */
export async function findDirectoriesContaining(
  dir: string,
  baseDir: string,
  searchName: string,
): Promise<string[]> {
  const dirsToRename: string[] = []
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    const relativePath = relative(baseDir, fullPath)

    if (!shouldProcessPath(relativePath)) continue

    if (entry.isDirectory()) {
      if (entry.name.toLowerCase().includes(searchName.toLowerCase())) {
        dirsToRename.push(fullPath)
      }
      // Recursively check subdirectories
      const subDirs = await findDirectoriesContaining(fullPath, baseDir, searchName)
      dirsToRename.push(...subDirs)
    }
  }

  return dirsToRename
}

/**
 * Find all files containing the search name in their filename (case-insensitive)
 */
export async function findFilesContaining(
  dir: string,
  baseDir: string,
  searchName: string,
): Promise<string[]> {
  const filesToRename: string[] = []
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    const relativePath = relative(baseDir, fullPath)

    if (!shouldProcessPath(relativePath)) continue
    if (!shouldProcessFile(relativePath)) continue

    if (entry.isDirectory()) {
      const subFiles = await findFilesContaining(fullPath, baseDir, searchName)
      filesToRename.push(...subFiles)
    } else if (entry.isFile()) {
      if (entry.name.toLowerCase().includes(searchName.toLowerCase())) {
        filesToRename.push(fullPath)
      }
    }
  }

  return filesToRename
}

/**
 * Async rename operation
 */
export async function renameAsync(oldPath: string, newPath: string): Promise<void> {
  await rename(oldPath, newPath)
}

/**
 * Async file read
 */
export async function readFileAsync(filepath: string): Promise<string> {
  return readFile(filepath, 'utf8')
}

/**
 * Async file write
 */
export async function writeFileAsync(filepath: string, content: string): Promise<void> {
  await writeFile(filepath, content, 'utf8')
}

/**
 * Check if path is a directory
 */
export async function isDirectory(path: string): Promise<boolean> {
  try {
    const stats = await stat(path)
    return stats.isDirectory()
  } catch {
    return false
  }
}

export { basename, dirname, join, relative }
