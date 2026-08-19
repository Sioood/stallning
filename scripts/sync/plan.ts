import consola from 'consola'

import { classBadge, type CommitClass } from './classify.ts'

export type PlannedCommit = {
  sha: string
  shortSha: string
  subject: string
  classification: CommitClass
  files: string[]
  applyPaths?: string[]
}

export type SyncPlan = {
  action: 'merge' | 'pick' | 'backport' | 'paths'
  sourceRef: string
  targetBranch: string
  dryRun: boolean
  commits?: PlannedCommit[]
  paths?: string[]
  gitCommands: string[]
}

/** Newest first, like `git log`. Apply order stays chronological at the call site. */
export function newestFirst<T>(items: readonly T[]): T[] {
  return items.slice().reverse()
}

export function selectedInChronologicalOrder<T extends { sha: string }>(
  chronological: readonly T[],
  selectedShas: readonly string[],
): string[] {
  const wanted = new Set(selectedShas)
  const ordered: string[] = []
  for (const commit of chronological) {
    if (wanted.has(commit.sha)) ordered.push(commit.sha)
  }
  return ordered
}

export function rangeInChronologicalOrder<T extends { sha: string }>(
  chronological: readonly T[],
  firstSha: string,
  secondSha: string,
): string[] {
  const start = chronological.findIndex((commit) => commit.sha === firstSha)
  const end = chronological.findIndex((commit) => commit.sha === secondSha)
  if (start < 0 || end < 0) return []
  const from = Math.min(start, end)
  const to = Math.max(start, end)
  return chronological.slice(from, to + 1).map((commit) => commit.sha)
}

export function printPlan(plan: SyncPlan): void {
  consola.box(
    [
      `Action: ${plan.action}`,
      `Source: ${plan.sourceRef}`,
      `Target: ${plan.targetBranch}`,
      `Mode: ${plan.dryRun ? 'DRY-RUN (no mutations)' : 'APPLY'}`,
    ].join('\n'),
  )

  if (plan.commits?.length) {
    consola.info(`Commits (${plan.commits.length}):`)
    for (const commit of newestFirst(plan.commits)) {
      const pathsNote =
        commit.applyPaths && commit.applyPaths.length > 0
          ? ` [paths: ${commit.applyPaths.length}]`
          : ''
      consola.log(
        `  ${commit.shortSha}  [${classBadge(commit.classification)}]  ${commit.subject}${pathsNote}`,
      )
    }
  }

  if (plan.paths?.length) {
    consola.info(`Paths (${plan.paths.length}):`)
    for (const filePath of plan.paths) consola.log(`  ${filePath}`)
  }

  consola.info('Git commands that would run:')
  for (const command of plan.gitCommands) consola.log(`  $ ${command}`)
}
