/**
 * Lightweight glob pattern matching utilities
 * Supports: * (any chars), ** (any path segments), ? (single char)
 */

/**
 * Convert glob pattern to regex
 */
function globToRegex(pattern: string): RegExp {
  // Handle **/ prefix first (matches at any depth)
  const hasLeadingGlobstar = pattern.startsWith('**/')
  const hasTrailingGlobstar = pattern.endsWith('/**')

  if (hasLeadingGlobstar) {
    pattern = pattern.slice(3)
  }
  if (hasTrailingGlobstar) {
    pattern = pattern.slice(0, -3)
  }

  let regex = pattern
    // Escape special regex chars first
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    // Then convert glob wildcards to regex (they are now escaped, so match literal * ?)
    .replace(/\*/g, '[^/]*')
    .replace(/\?/g, '[^/]')

  // Handle ** (any path segments) - needs to be done after escaping
  regex = regex.replace(/\[\^\/\]\*\[\^\/\]\*/g, '.*')

  // Apply leading **/ prefix
  if (hasLeadingGlobstar) {
    regex = `(?:.*/)?${regex}`
  }

  // Apply trailing /** suffix
  if (hasTrailingGlobstar) {
    regex = `${regex}(?:/.*)?`
  }

  return new RegExp(`^${regex}$`)
}

/**
 * Check if a path matches a glob pattern
 */
export function matchGlob(path: string, pattern: string): boolean {
  const regex = globToRegex(pattern)
  return regex.test(path)
}

/**
 * Check if a path matches any of the glob patterns
 */
export function matchAnyGlob(path: string, patterns: string[]): boolean {
  return patterns.some((pattern) => matchGlob(path, pattern))
}

/**
 * Check if any path segment matches a pattern
 * For directory-based filtering
 */
export function matchPathSegments(path: string, patterns: string[]): boolean {
  const parts = path.split('/')
  return parts.some((part) => patterns.some((p) => matchGlob(part, p)))
}
