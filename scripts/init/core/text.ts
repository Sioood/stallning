/**
 * Text manipulation utilities with case preservation
 */

import { BINARY_EXTENSIONS } from '../constants.ts'

/**
 * Check if a file is binary based on its extension
 */
export function isBinaryFile(filepath: string): boolean {
  const ext = (filepath.match(/\.[^.]+$/) || [''])[0]
  return BINARY_EXTENSIONS.has(ext)
}

/**
 * Capitalize first letter, lowercase rest
 */
export function capitalize(str: string): string {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Replace text preserving case patterns (lowercase, UPPERCASE, Capitalized)
 */
export function preserveCaseReplace(text: string, oldName: string, newName: string): string {
  // Escape special regex characters
  const escapedOld = oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  const patterns = [
    {
      regex: new RegExp(escapedOld.toLowerCase(), 'g'),
      replacement: newName.toLowerCase(),
    },
    {
      regex: new RegExp(escapedOld.toUpperCase(), 'g'),
      replacement: newName.toUpperCase(),
    },
    {
      regex: new RegExp(capitalize(escapedOld).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
      replacement: capitalize(newName),
    },
  ]

  let result = text
  for (const { regex, replacement } of patterns) {
    result = result.replace(regex, replacement)
  }
  return result
}

/**
 * Validate project name against npm package naming conventions
 */
export function validateProjectName(name: string): {
  valid: boolean
  error?: string
} {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Project name cannot be empty' }
  }

  const normalized = name.trim().toLowerCase().replace(/\s+/g, '-')

  // npm package name rules
  if (normalized.length > 214) {
    return { valid: false, error: 'Project name cannot exceed 214 characters' }
  }

  if (!/^[a-z0-9]/.test(normalized)) {
    return {
      valid: false,
      error: 'Project name must start with a letter or number',
    }
  }

  if (!/^[a-z0-9._-]+$/.test(normalized)) {
    return {
      valid: false,
      error:
        'Project name can only contain lowercase letters, numbers, hyphens, underscores, and dots',
    }
  }

  // Reserved names
  const reserved = new Set(['node_modules', 'favicon.ico'])
  if (reserved.has(normalized)) {
    return { valid: false, error: `"${normalized}" is a reserved name` }
  }

  return { valid: true }
}

/**
 * Normalize project name to valid npm package name
 */
export function normalizeProjectName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9._-]/g, '')
}
