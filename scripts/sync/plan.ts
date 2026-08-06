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
    for (const commit of plan.commits) {
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
