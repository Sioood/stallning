import * as p from '@clack/prompts'
import consola from 'consola'

import { runBackport, runMerge, runPaths, runPick, runStatus, toPlanned } from './actions.ts'
import { aheadFromRef, ensureBaselineObject, resolveSyncBaselineSha } from './baseline.ts'
import {
  currentBranch,
  ensureLocalBranchExists,
  fetchRemote,
  listCommitsBetween,
  listLocalBranches,
  listRemoteBranches,
  listRemotes,
  showCommitStat,
} from './git.ts'

import type { PickOptions, SyncGlobalOptions } from './options.ts'

function isCancel(value: unknown): boolean {
  return p.isCancel(value)
}

function exitOnCancel(value: unknown): asserts value is string | string[] | boolean {
  if (isCancel(value)) {
    p.cancel('Sync cancelled.')
    process.exit(0)
  }
}

async function selectRemote(defaultRemote: string): Promise<string> {
  const remotes = listRemotes()
  if (!remotes.length) throw new Error('No git remotes found.')
  if (remotes.length === 1) return remotes[0]!

  const preferred = remotes.includes('upstream')
    ? 'upstream'
    : remotes.includes(defaultRemote)
      ? defaultRemote
      : remotes[0]!

  const remote = await p.select({
    initialValue: preferred,
    message: 'Source remote',
    options: remotes.map((name) => ({ label: name, value: name })),
  })
  exitOnCancel(remote)
  return remote as string
}

function pickInitial(branches: string[], initial?: string): string | undefined {
  return initial && branches.includes(initial) ? initial : branches[0]
}

async function selectFromBranches(
  message: string,
  branches: string[],
  initial?: string,
): Promise<string> {
  const branch = await p.select({
    initialValue: pickInitial(branches, initial),
    message,
    options: branches.map((name) => ({ label: name, value: name })),
  })
  exitOnCancel(branch)
  return branch as string
}

async function selectRemoteBranch(remote: string, initial?: string): Promise<string> {
  const branches = listRemoteBranches(remote)
  if (!branches.length) throw new Error(`No branches found on remote '${remote}'.`)
  return selectFromBranches(`Source branch (on ${remote})`, branches, initial)
}

async function selectLocalBranch(message: string, initial?: string): Promise<string> {
  const branches = listLocalBranches()
  if (!branches.length) throw new Error('No local branches found.')
  return selectFromBranches(message, branches, initial)
}

async function confirmDryRun(): Promise<boolean> {
  const mode = await p.select({
    initialValue: 'dry-run',
    message: 'Execution mode',
    options: [
      { hint: 'show plan only', label: 'Dry-run only', value: 'dry-run' },
      { hint: 'mutate git state', label: 'Apply changes', value: 'apply' },
    ],
  })
  exitOnCancel(mode)
  return mode === 'dry-run'
}

export async function runWizard(): Promise<void> {
  p.intro('Stallning branch sync')

  const action = await p.select({
    message: 'What do you want to do?',
    options: [
      { hint: 'read-only delta', label: 'Status (delta)', value: 'status' },
      { hint: 'baseline merge', label: 'Merge', value: 'merge' },
      { hint: 'select commits', label: 'Pick commits', value: 'pick' },
      { hint: 'template → minimal', label: 'Backport', value: 'backport' },
      { hint: 'checkout paths from a ref', label: 'Paths', value: 'paths' },
    ],
  })
  exitOnCancel(action)

  const remote = await selectRemote('origin')
  const sourceBranch = await selectRemoteBranch(remote, action === 'backport' ? 'nuxt' : 'minimal')
  const target = await selectLocalBranch(
    'Target local branch',
    action === 'backport' ? 'minimal' : action === 'status' ? currentBranch() || 'nuxt' : 'nuxt',
  )

  const base: SyncGlobalOptions = {
    dryRun: false,
    sourceBranch,
    sourceRemote: remote,
    target,
    verify: false,
    yes: false,
  }

  if (action === 'status') {
    runStatus(base)
    p.outro('Status complete.')
    return
  }

  base.dryRun = await confirmDryRun()

  if (action === 'merge') {
    runMerge(base)
    p.outro(base.dryRun ? 'Dry-run complete.' : 'Merge complete.')
    return
  }

  if (action === 'paths') {
    const pathsInput = await p.text({
      message: 'Paths to checkout (space-separated)',
      placeholder: 'packages/config scripts/verify.sh',
    })
    exitOnCancel(pathsInput)
    const paths = String(pathsInput)
      .split(/\s+/)
      .map((part) => part.trim())
      .filter(Boolean)
    runPaths({ ...base, paths })
    p.outro(base.dryRun ? 'Dry-run complete.' : 'Paths sync complete.')
    return
  }

  // pick / backport interactive commit selection
  fetchRemote(remote)
  ensureLocalBranchExists(target)
  const sourceRef = `${remote}/${sourceBranch}`
  const baselineSha = resolveSyncBaselineSha()
  if (baselineSha) ensureBaselineObject(baselineSha)
  const commits = listCommitsBetween(aheadFromRef(target), sourceRef).map(toPlanned)

  if (!commits.length) {
    consola.warn('No commits in delta.')
    p.outro('Nothing to do.')
    return
  }

  const filter = await p.select({
    initialValue: action === 'backport' ? 'shared-and-mixed' : 'all',
    message: 'Commit filter',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Shared only', value: 'shared' },
      { label: 'Shared + mixed', value: 'shared-and-mixed' },
    ],
  })
  exitOnCancel(filter)

  let candidates = commits
  if (filter === 'shared') {
    candidates = commits.filter((commit) => commit.classification === 'shared')
  } else if (filter === 'shared-and-mixed') {
    candidates = commits.filter(
      (commit) => commit.classification === 'shared' || commit.classification === 'mixed',
    )
  }
  if (action === 'backport') {
    candidates = candidates.filter((commit) => commit.classification !== 'template-only')
  }

  if (!candidates.length) {
    consola.warn('No commits match the filter.')
    p.outro('Nothing to do.')
    return
  }

  const selectionMode = await p.select({
    initialValue: 'multi',
    message: 'How do you want to select commits?',
    options: [
      { label: 'Multi-select commits', value: 'multi' },
      { label: 'Range (first → last)', value: 'range' },
    ],
  })
  exitOnCancel(selectionMode)

  let selectedShas: string[] = []

  if (selectionMode === 'range') {
    const first = await p.select({
      message: 'Range start (oldest)',
      options: candidates.map((commit) => ({
        label: `${commit.shortSha} [${commit.classification}] ${commit.subject}`,
        value: commit.sha,
      })),
    })
    exitOnCancel(first)
    const startIndex = candidates.findIndex((commit) => commit.sha === first)
    const last = await p.select({
      initialValue: candidates[candidates.length - 1]?.sha,
      message: 'Range end (newest)',
      options: candidates.slice(startIndex).map((commit) => ({
        label: `${commit.shortSha} [${commit.classification}] ${commit.subject}`,
        value: commit.sha,
      })),
    })
    exitOnCancel(last)
    const endIndex = candidates.findIndex((commit) => commit.sha === last)
    selectedShas = candidates.slice(startIndex, endIndex + 1).map((commit) => commit.sha)
  } else {
    const picked = await p.multiselect({
      message: 'Select commits (space to toggle)',
      options: candidates.map((commit) => ({
        label: `${commit.shortSha} [${commit.classification}] ${commit.subject}`,
        value: commit.sha,
      })),
      required: true,
    })
    exitOnCancel(picked)
    selectedShas = picked as string[]
  }

  const preview = await p.confirm({
    initialValue: true,
    message: 'Preview selected commits (stat)?',
  })
  exitOnCancel(preview)
  if (preview) {
    for (const sha of selectedShas) {
      const info = candidates.find((commit) => commit.sha === sha)
      consola.info(`${info?.shortSha ?? sha} — ${info?.subject ?? ''}`)
      consola.log(showCommitStat(sha))
    }
  }

  const pickOptions: PickOptions = {
    ...base,
    commits: selectedShas,
    continue: false,
    filter: filter as PickOptions['filter'],
  }

  if (action === 'backport') runBackport(pickOptions)
  else runPick(pickOptions)

  p.outro(base.dryRun ? 'Dry-run complete.' : 'Sync complete.')
}
