/**
 * Constants for path filtering and file handling
 */

export const IGNORED_PATTERNS = [
  // Directories (exact names)
  'node_modules',
  '.git',
  '.turbo',
  '.changeset',
  '.husky',
  '.github',
  'dist',
  'build',
  'coverage',
  'scripts/init',
  // Files (exact paths)
  'pnpm-lock.yaml',
  'README.md',
  'docs/branch-sync.md',
  // Glob patterns:
  '*.lock', // ignore all lock files
  '**/*.log', // ignore all log files at any depth
  '**/temp/**', // ignore temp directories at any depth
  '.vscode',
]

export const BINARY_EXTENSIONS = new Set([
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

export const UPSTREAM_URL = 'https://github.com/Sioood/stallning.git'
