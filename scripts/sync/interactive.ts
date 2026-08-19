import * as p from '@clack/prompts'
import consola from 'consola'

import {
  runBackport,
  runLastCommitBump,
  runLastCommitShow,
  runMerge,
  runPaths,
  runPick,
  runStatus,
  toPlanned,
} from './actions.ts'
import {
  aheadFromRef,
  ensureCommitObject,
  resolveBaselineCommit,
  writeSyncBaseline,
} from './baseline.ts'
import {
  currentBranch,
  ensureLocalBranchExists,
  fetchRemote,
  listCommitsBetween,
  listLocalBranches,
  listRecentCommits,
  listRemoteBranches,
  listRemotes,
  showCommitStat,
} from './git.ts'
import { newestFirst, rangeInChronologicalOrder, selectedInChronologicalOrder } from './plan.ts'
import { readStallningConfig } from './project.ts'

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

  const { remote: configRemote } = readStallningConfig()
  const preferred = remotes.includes(configRemote ?? '')
    ? configRemote!
    : remotes.includes('upstream')
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

function commitChoice(commit: {
  shortSha: string
  classification?: string
  subject: string
  sha: string
}): {
  label: string
  value: string
} {
  const klass = commit.classification ? ` [${commit.classification}]` : ''
  return {
    label: `${commit.shortSha}${klass}  ${commit.subject}`,
    value: commit.sha,
  }
}
export async function promptLastSyncedCommit(sourceRef: string): Promise<string> {
  const commits = listRecentCommits(sourceRef)
  if (!commits.length) throw new Error(`No commits found on '${sourceRef}'.`)

  const picked = await p.select({
    message: 'Baseline commit (newest first)',
    options: [
      ...commits.map((commit) => commitChoice(commit)),
      { hint: 'paste a hash or ref', label: 'Enter a commit…', value: '__enter__' },
    ],
  })
  exitOnCancel(picked)
  if (picked !== '__enter__') return picked as string

  const typed = await p.text({
    message: 'Commit hash or ref',
    placeholder: 'c7ada39 or origin/nuxt',
  })
  exitOnCancel(typed)
  const value = String(typed).trim()
  if (!value) throw new Error('A commit is required.')
  return value
}

export async function runWizard(): Promise<void> {
  p.intro('Stallning branch sync')

  const config = readStallningConfig()
  const action = await p.select({
    message: 'What do you want to do?',
    options: [
      { hint: 'read-only delta', label: 'Status (delta)', value: 'status' },
      { hint: 'merge source into target', label: 'Merge', value: 'merge' },
      { hint: 'select commits', label: 'Pick commits', value: 'pick' },
      { hint: 'template → minimal', label: 'Backport', value: 'backport' },
      { hint: 'checkout paths from a ref', label: 'Paths', value: 'paths' },
      {
        hint: 'show / set / bump last applied commit',
        label: 'Baseline',
        value: 'baseline',
      },
    ],
  })
  exitOnCancel(action)

  if (action === 'baseline') {
    const baselineAction = await p.select({
      message: 'Baseline',
      options: [
        { hint: 'read .stallning/sync.yaml', label: 'Show', value: 'show' },
        { hint: 'point a commit without applying', label: 'Set', value: 'set' },
        { hint: 'mark source tip as fully synced', label: 'Bump', value: 'bump' },
      ],
    })
    exitOnCancel(baselineAction)

    if (baselineAction === 'show') {
      runLastCommitShow()
      p.outro('Baseline shown.')
      return
    }

    const remote = await selectRemote(config.remote ?? 'origin')
    const sourceBranch = await selectRemoteBranch(remote, config.template ?? 'nuxt')

    if (baselineAction === 'set') {
      fetchRemote(remote)
      const commit = await promptLastSyncedCommit(`${remote}/${sourceBranch}`)
      writeSyncBaseline({ commit, remote, template: sourceBranch })
      p.outro('Baseline updated.')
      return
    }

    const dryRun = await confirmDryRun()
    runLastCommitBump({
      dryRun,
      sourceBranch,
      sourceRemote: remote,
      verify: false,
      yes: false,
    })
    p.outro(dryRun ? 'Dry-run complete.' : 'Baseline bumped.')
    return
  }

  const remote = await selectRemote(config.remote ?? 'origin')
  const defaultSource = config.template ?? (action === 'backport' ? 'nuxt' : 'minimal')
  const sourceBranch = await selectRemoteBranch(remote, defaultSource)

  const target = await selectLocalBranch(
    'Target local branch',
    action === 'backport' ? 'minimal' : currentBranch() || config.template || 'nuxt',
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

  fetchRemote(remote)
  ensureLocalBranchExists(target)
  const sourceRef = `${remote}/${sourceBranch}`
  const lastCommit = resolveBaselineCommit()
  if (lastCommit) ensureCommitObject(lastCommit)
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

  const displayed = newestFirst(candidates)
  const selectionMode = await p.select({
    initialValue: 'multi',
    message: 'How do you want to select commits?',
    options: [
      { hint: 'newest at the top', label: 'Multi-select commits', value: 'multi' },
      { hint: 'two bounds, applied oldest → newest', label: 'Range', value: 'range' },
    ],
  })
  exitOnCancel(selectionMode)

  let selectedShas: string[] = []

  if (selectionMode === 'range') {
    const first = await p.select({
      message: 'Range bound (newest first)',
      options: displayed.map((commit) => commitChoice(commit)),
    })
    exitOnCancel(first)
    const second = await p.select({
      message: 'Other range bound',
      options: displayed.map((commit) => commitChoice(commit)),
    })
    exitOnCancel(second)
    selectedShas = rangeInChronologicalOrder(candidates, first as string, second as string)
  } else {
    const picked = await p.multiselect({
      message: 'Select commits (space to toggle, newest first)',
      options: displayed.map((commit) => commitChoice(commit)),
      required: true,
    })
    exitOnCancel(picked)
    selectedShas = selectedInChronologicalOrder(candidates, picked as string[])
  }

  const preview = await p.confirm({
    initialValue: true,
    message: 'Preview selected commits (stat)?',
  })
  exitOnCancel(preview)
  if (preview) {
    for (const sha of newestFirst(selectedShas)) {
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
