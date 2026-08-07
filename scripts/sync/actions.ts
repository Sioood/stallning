import { spawnSync } from 'node:child_process'

import consola from 'consola'

import {
  aheadFromRef,
  bumpSyncBaseline,
  ensureBaselineObject,
  readSyncBaseline,
  resolveSyncBaselineSha,
  showSyncBaseline,
  SYNC_BASELINE_PATH,
} from './baseline.ts'
import { classifyFiles, sharedFilesOnly } from './classify.ts'
import {
  commitExistsInRef,
  currentBranch,
  ensureCleanWorktree,
  ensureLocalBranchExists,
  ensureRemoteBranchExists,
  fetchRemote,
  gitStdout,
  listCommitsBetween,
  runGit,
  runGitOrThrow,
  type CommitInfo,
} from './git.ts'
import { printPlan, type PlannedCommit, type SyncPlan } from './plan.ts'
import { clearSyncState, readSyncState, writeSyncState } from './state.ts'

import type { PickOptions, SyncGlobalOptions } from './options.ts'

function maybeBumpBaselineAfterSync(sourceRef: string, appliedSha?: string): void {
  if (!readSyncBaseline()) return
  const tip = appliedSha ?? gitStdout(['rev-parse', sourceRef])
  bumpSyncBaseline({ remote: sourceRef.split('/')[0], sha: tip })
}

function requireSourceBranch(options: SyncGlobalOptions): string {
  if (!options.sourceBranch) throw new Error('Missing --source-branch / -s.')
  return options.sourceBranch
}

function requireTarget(options: SyncGlobalOptions): string {
  if (!options.target) throw new Error('Missing --target / -t.')
  return options.target
}

function sourceRefOf(options: SyncGlobalOptions): string {
  return `${options.sourceRemote}/${requireSourceBranch(options)}`
}

function prepareSourceTarget(options: SyncGlobalOptions): { sourceRef: string; target: string } {
  const target = requireTarget(options)
  const sourceBranch = requireSourceBranch(options)
  fetchRemote(options.sourceRemote)
  if (!options.dryRun) ensureCleanWorktree()
  ensureRemoteBranchExists(options.sourceRemote, sourceBranch)
  ensureLocalBranchExists(target)
  return { sourceRef: sourceRefOf(options), target }
}

function toPlanned(commit: CommitInfo): PlannedCommit {
  return {
    classification: classifyFiles(commit.files),
    files: commit.files,
    sha: commit.sha,
    shortSha: commit.shortSha,
    subject: commit.subject,
  }
}

function isMergeCommit(sha: string): boolean {
  const result = runGit(['rev-parse', '-q', '--verify', `${sha}^2`], { capture: true })
  return result.status === 0
}

function loadCommit(sha: string): PlannedCommit {
  const filesRaw = runGit(['diff-tree', '--no-commit-id', '--name-only', '-r', sha], {
    capture: true,
  })
  const files =
    filesRaw.status === 0
      ? filesRaw.stdout
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean)
      : []
  return {
    classification: classifyFiles(files),
    files,
    sha,
    shortSha: gitStdout(['rev-parse', '--short', sha]),
    subject: gitStdout(['log', '-1', '--format=%s', sha]),
  }
}

function filterCommits(commits: PlannedCommit[], filter: PickOptions['filter']): PlannedCommit[] {
  if (filter === 'all') return commits
  if (filter === 'shared') return commits.filter((commit) => commit.classification === 'shared')
  return commits.filter(
    (commit) => commit.classification === 'shared' || commit.classification === 'mixed',
  )
}

function runVerifyIfRequested(verify: boolean, dryRun: boolean): void {
  if (dryRun) return
  if (!verify) {
    consola.info('Next: pnpm verify   (or make check for verify + audit)')
    return
  }
  consola.start('Running pnpm verify...')
  const verifyResult = spawnSync('pnpm', ['verify'], { encoding: 'utf8', stdio: 'inherit' })
  if (verifyResult.status !== 0) throw new Error('pnpm verify failed.')
}

export function runStatus(options: SyncGlobalOptions): void {
  const sourceBranch = requireSourceBranch(options)
  const target = requireTarget(options)

  fetchRemote(options.sourceRemote)
  ensureRemoteBranchExists(options.sourceRemote, sourceBranch)
  ensureLocalBranchExists(target)

  const sourceRef = `${options.sourceRemote}/${sourceBranch}`
  const baselineSha = resolveSyncBaselineSha()
  if (baselineSha) ensureBaselineObject(baselineSha)
  const aheadFrom = aheadFromRef(target)
  const ahead = listCommitsBetween(aheadFrom, sourceRef).map(toPlanned)
  const behind = listCommitsBetween(sourceRef, target).map(toPlanned)

  consola.box(
    baselineSha
      ? `Delta: ${sourceRef} ↔ ${target} (baseline ${baselineSha.slice(0, 7)})`
      : `Delta: ${sourceRef} ↔ ${target}`,
  )

  consola.info(`On source, not in target (${ahead.length}):`)
  if (!ahead.length) consola.log('  (none)')
  for (const commit of ahead) {
    consola.log(`  ${commit.shortSha}  [${commit.classification}]  ${commit.subject}`)
  }

  consola.info(`On target, not in source (${behind.length}):`)
  if (!behind.length) consola.log('  (none)')
  for (const commit of behind) {
    consola.log(`  ${commit.shortSha}  [${commit.classification}]  ${commit.subject}`)
  }
}

export function runMerge(options: SyncGlobalOptions): void {
  const { sourceRef, target } = prepareSourceTarget(options)
  const plan: SyncPlan = {
    action: 'merge',
    dryRun: options.dryRun,
    gitCommands: [`git checkout ${target}`, `git merge ${sourceRef}`],
    sourceRef,
    targetBranch: target,
  }
  printPlan(plan)
  if (options.dryRun) {
    consola.success('Dry-run complete. No changes applied.')
    return
  }

  consola.start(`Checking out '${target}'...`)
  runGitOrThrow(['checkout', target], `Failed to checkout '${target}'.`)
  consola.start(`Merging '${sourceRef}' into '${target}'...`)
  const merge = runGit(['merge', sourceRef])
  if (merge.status !== 0) {
    consola.error('Merge failed. Resolve conflicts, then run:')
    consola.info('  git add <resolved_files>')
    consola.info('  git merge --continue')
    consola.info('Or abort with:')
    consola.info('  git merge --abort')
    process.exit(1)
  }
  consola.success(`Baseline sync complete: merged '${sourceRef}' into '${target}'.`)
  maybeBumpBaselineAfterSync(sourceRef)
  runVerifyIfRequested(options.verify, options.dryRun)
}

function resolvePickCommits(
  options: PickOptions,
  sourceRef: string,
  target: string,
): PlannedCommit[] {
  if (options.continue) {
    const state = readSyncState()
    if (!state || (state.mode !== 'pick' && state.mode !== 'backport')) {
      throw new Error('No sync state found to --continue. Start a pick/backport first.')
    }
    const remaining: PlannedCommit[] = []
    for (const sha of state.remainingCommits) remaining.push(loadCommit(sha))
    return remaining
  }

  const selectors = [
    options.commit,
    options.range,
    options.commits?.length ? 'commits' : undefined,
  ].filter(Boolean)
  if (selectors.length > 1) {
    throw new Error('Use only one of --commit, --range, or an explicit commit list.')
  }

  let selected: PlannedCommit[] = []
  if (options.commits?.length) {
    for (const sha of options.commits) {
      if (!commitExistsInRef(sha, sourceRef)) {
        throw new Error(`Commit '${sha}' is not contained in '${sourceRef}'.`)
      }
      selected.push(loadCommit(sha))
    }
  } else if (options.commit) {
    if (!commitExistsInRef(options.commit, sourceRef)) {
      throw new Error(`Commit '${options.commit}' is not contained in '${sourceRef}'.`)
    }
    selected = [loadCommit(options.commit)]
  } else if (options.range) {
    const shas = gitStdout(['rev-list', '--reverse', options.range]).split('\n').filter(Boolean)
    if (!shas.length) throw new Error(`No commits found for range '${options.range}'.`)
    for (const sha of shas) {
      if (!commitExistsInRef(sha, sourceRef)) {
        throw new Error(`Commit '${sha}' is not contained in '${sourceRef}'.`)
      }
      selected.push(loadCommit(sha))
    }
  } else {
    const baselineSha = resolveSyncBaselineSha()
    if (baselineSha) ensureBaselineObject(baselineSha)
    selected = listCommitsBetween(aheadFromRef(target), sourceRef).map(toPlanned)
  }

  const withoutMerges = selected.filter((commit) => !isMergeCommit(commit.sha))
  return filterCommits(withoutMerges, options.filter)
}

function cherryPickQueue(input: {
  mode: 'pick' | 'backport'
  sourceRef: string
  target: string
  commits: PlannedCommit[]
  options: PickOptions
}): void {
  const { mode, sourceRef, target, commits, options } = input
  if (currentBranch() !== target) {
    consola.start(`Checking out '${target}'...`)
    runGitOrThrow(['checkout', target], `Failed to checkout '${target}'.`)
  }

  const queue = commits.map((commit) => commit.sha)
  writeSyncState({
    createdAt: new Date().toISOString(),
    dryRun: false,
    mode,
    remainingCommits: queue,
    sourceRef,
    targetBranch: target,
  })

  for (let index = 0; index < queue.length; index += 1) {
    const sha = queue[index]!
    const planned = commits[index]!
    if (planned.applyPaths?.length) {
      consola.start(
        `Path-checkout shared files from ${planned.shortSha} (${planned.applyPaths.length} paths)...`,
      )
      runGitOrThrow(
        ['checkout', sha, '--', ...planned.applyPaths],
        `Failed to checkout paths from '${sha}'.`,
      )
      runGitOrThrow(['add', '--', ...planned.applyPaths], 'Failed to stage backported paths.')
      const message = `chore(sync): backport shared paths from ${planned.shortSha}`
      const commitResult = runGit(['commit', '-m', message])
      if (commitResult.status !== 0) {
        consola.warn(`No commit created for ${planned.shortSha} (maybe identical tree).`)
      }
    } else {
      consola.start(`Cherry-picking '${sha}' onto '${target}'...`)
      const pick = runGit(['cherry-pick', sha])
      if (pick.status !== 0) {
        writeSyncState({
          createdAt: new Date().toISOString(),
          dryRun: false,
          mode,
          remainingCommits: queue.slice(index),
          sourceRef,
          targetBranch: target,
        })
        consola.error(`Cherry-pick failed on '${sha}'. Resolve conflicts, then run:`)
        consola.info('  git add <resolved_files>')
        consola.info('  git cherry-pick --continue')
        consola.info('Then resume remaining commits with:')
        consola.info('  pnpm sync pick --continue')
        consola.info('Or skip/abort:')
        consola.info('  git cherry-pick --skip')
        consola.info('  git cherry-pick --abort')
        process.exit(1)
      }
    }

    writeSyncState({
      createdAt: new Date().toISOString(),
      dryRun: false,
      mode,
      remainingCommits: queue.slice(index + 1),
      sourceRef,
      targetBranch: target,
    })
  }

  clearSyncState()
  consola.success(`Sync complete: applied ${commits.length} commit(s) into '${target}'.`)
  const lastApplied = commits[commits.length - 1]?.sha
  if (mode === 'pick') maybeBumpBaselineAfterSync(sourceRef, lastApplied)
  runVerifyIfRequested(options.verify, options.dryRun)
}

export function runPick(options: PickOptions): void {
  const { sourceRef, target } = prepareSourceTarget(options)
  const commits = resolvePickCommits(options, sourceRef, target)
  if (!commits.length) {
    consola.warn('No commits selected.')
    return
  }

  const plan: SyncPlan = {
    action: 'pick',
    commits,
    dryRun: options.dryRun,
    gitCommands: [
      `git checkout ${target}`,
      ...commits.map((commit) => `git cherry-pick ${commit.sha}`),
    ],
    sourceRef,
    targetBranch: target,
  }
  printPlan(plan)

  if (options.dryRun) {
    consola.success('Dry-run complete. No changes applied.')
    return
  }

  cherryPickQueue({ commits, mode: 'pick', options, sourceRef, target })
}

export function runBackport(options: PickOptions): void {
  const { sourceRef, target } = prepareSourceTarget(options)
  const baseFilter = options.filter === 'all' ? 'shared-and-mixed' : options.filter
  const selected = resolvePickCommits({ ...options, filter: baseFilter }, sourceRef, target).filter(
    (commit) => commit.classification !== 'template-only',
  )
  const filtered = selected

  const planned: PlannedCommit[] = []
  for (const commit of filtered) {
    if (commit.classification === 'shared') {
      planned.push(commit)
      continue
    }
    const paths = sharedFilesOnly(commit.files)
    if (!paths.length) {
      consola.warn(`Skipping mixed commit ${commit.shortSha} (no shared paths): ${commit.subject}`)
      continue
    }
    planned.push({ ...commit, applyPaths: paths })
  }

  if (!planned.length) {
    consola.warn('No backport candidates.')
    return
  }

  const gitCommands: string[] = [`git checkout ${target}`]
  for (const commit of planned) {
    if (commit.applyPaths?.length) {
      gitCommands.push(`git checkout ${commit.sha} -- ${commit.applyPaths.join(' ')}`)
    } else {
      gitCommands.push(`git cherry-pick ${commit.sha}`)
    }
  }

  const plan: SyncPlan = {
    action: 'backport',
    commits: planned,
    dryRun: options.dryRun,
    gitCommands,
    sourceRef,
    targetBranch: target,
  }
  printPlan(plan)

  if (options.dryRun) {
    consola.success('Dry-run complete. No changes applied.')
    return
  }

  cherryPickQueue({ commits: planned, mode: 'backport', options, sourceRef, target })
}

export function runPaths(options: SyncGlobalOptions & { paths: string[]; ref?: string }): void {
  const { sourceRef, target } = prepareSourceTarget(options)
  const ref = options.ref ?? sourceRef
  const { paths } = options
  if (!paths.length) throw new Error('paths requires one or more path arguments.')

  const plan: SyncPlan = {
    action: 'paths',
    dryRun: options.dryRun,
    gitCommands: [`git checkout ${target}`, `git checkout ${ref} -- ${paths.join(' ')}`],
    paths,
    sourceRef: ref,
    targetBranch: target,
  }
  printPlan(plan)

  if (options.dryRun) {
    consola.success('Dry-run complete. No changes applied.')
    return
  }

  if (currentBranch() !== target) {
    runGitOrThrow(['checkout', target], `Failed to checkout '${target}'.`)
  }
  runGitOrThrow(['checkout', ref, '--', ...paths], `Failed to checkout paths from '${ref}'.`)
  consola.success(`Checked out ${paths.length} path(s) from '${ref}' onto '${target}'.`)
  runVerifyIfRequested(options.verify, options.dryRun)
}

export { toPlanned }

export function runBaselineShow(): void {
  showSyncBaseline()
}

export function runBaselineSet(sha: string, options: { template?: string; remote?: string }): void {
  bumpSyncBaseline({
    remote: options.remote,
    sha,
    template: options.template,
  })
}

export function runBaselineBump(options: SyncGlobalOptions): void {
  if (!readSyncBaseline()) {
    throw new Error(
      `No ${SYNC_BASELINE_PATH} to bump. Create one with: pnpm sync baseline set <sha>`,
    )
  }
  const sourceBranch = requireSourceBranch(options)
  fetchRemote(options.sourceRemote)
  ensureRemoteBranchExists(options.sourceRemote, sourceBranch)
  const sourceRef = `${options.sourceRemote}/${sourceBranch}`
  const tip = gitStdout(['rev-parse', sourceRef])
  if (options.dryRun) {
    consola.info(`[dry-run] bump baseline → ${tip}`)
    return
  }
  bumpSyncBaseline({ remote: options.sourceRemote, sha: tip, template: sourceBranch })
}
