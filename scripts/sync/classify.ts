export type CommitClass = 'shared' | 'template-only' | 'mixed'

/** Paths considered shared boilerplate (safe to flow minimal ↔ templates / forks). */
const SHARED_PREFIXES = [
  'packages/config/',
  'scripts/',
  '.husky/',
  '.changeset/',
  '.github/workflows/',
  '.github/pull_request_template.md',
  '.stallning/',
  '.vscode/',
  'docs/branch-sync.md',
  'docs/',
] as const

const SHARED_EXACT = new Set([
  '.editorconfig',
  '.gitignore',
  '.npmrc',
  '.nvmrc',
  '.oxfmtrc.json',
  '.oxlintrc.json',
  'AGENTS.md',
  'LICENSE',
  'Makefile',
  'README.md',
  'eslint.config.ts',
  'knip.json',
  'package.json',
  'pnpm-lock.yaml',
  'pnpm-workspace.yaml',
  'tsconfig.json',
  'turbo.json',
])

/** Template-layer paths that must never land on minimal via backport. */
const TEMPLATE_PREFIXES = ['packages/ui/', 'packages/nuxt-essentials/', 'apps/'] as const

function isSharedPath(filePath: string): boolean {
  if (SHARED_EXACT.has(filePath)) return true
  for (const prefix of SHARED_PREFIXES) {
    if (filePath === prefix.replace(/\/$/, '') || filePath.startsWith(prefix)) return true
  }
  return false
}

function isTemplateOnlyPath(filePath: string): boolean {
  for (const prefix of TEMPLATE_PREFIXES) {
    if (filePath.startsWith(prefix)) return true
  }
  return false
}

export function classifyFiles(files: string[]): CommitClass {
  if (files.length === 0) return 'shared'

  let sharedCount = 0
  let templateCount = 0
  let otherCount = 0

  for (const file of files) {
    if (isTemplateOnlyPath(file)) {
      templateCount += 1
      continue
    }
    if (isSharedPath(file)) {
      sharedCount += 1
      continue
    }
    otherCount += 1
  }

  if (templateCount > 0 && sharedCount === 0 && otherCount === 0) return 'template-only'
  if (templateCount === 0 && otherCount === 0) return 'shared'
  if (templateCount === 0 && sharedCount === 0) return 'shared'
  return 'mixed'
}

export function sharedFilesOnly(files: string[]): string[] {
  const shared: string[] = []
  for (const file of files) {
    if (!isTemplateOnlyPath(file) && isSharedPath(file)) shared.push(file)
  }
  return shared
}

export function classBadge(classification: CommitClass): string {
  switch (classification) {
    case 'shared':
      return 'shared'
    case 'template-only':
      return 'template-only'
    case 'mixed':
      return 'mixed'
    default: {
      const _exhaustive: never = classification
      return _exhaustive
    }
  }
}
