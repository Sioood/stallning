#!/usr/bin/env node
/// <reference types="node" />

import { spawnSync, type SpawnSyncReturns } from 'node:child_process'

import consola from 'consola'

export type GitResult = SpawnSyncReturns<string>
export type GitOptions = { capture?: boolean }

export function runGit(args: string[], options: GitOptions = {}): GitResult {
  return spawnSync('git', args, {
    encoding: 'utf8',
    stdio: options.capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
  })
}

export function runGitOrThrow(
  args: string[],
  errorMessage: string,
  options: GitOptions = {},
): GitResult {
  const result = runGit(args, options)
  if (result.status !== 0) {
    if (options.capture && result.stderr) consola.error(result.stderr.trim())
    throw new Error(errorMessage)
  }
  return result
}

export function gitStdout(args: string[]): string {
  return runGitOrThrow(args, `git ${args.join(' ')} failed.`, { capture: true }).stdout.trim()
}

export function ensureCleanWorktree(): void {
  const status = gitStdout(['status', '--porcelain'])
  if (status) {
    throw new Error('Working tree is not clean. Commit or stash your changes before syncing.')
  }
}

export function ensureRemoteBranchExists(remote: string, branch: string): void {
  const result = runGit(['ls-remote', '--heads', remote, branch], { capture: true })
  if (result.status !== 0 || !result.stdout.trim()) {
    throw new Error(`Remote branch '${remote}/${branch}' does not exist or is not reachable.`)
  }
}

export function ensureLocalBranchExists(branch: string): void {
  const result = runGit(['show-ref', '--verify', '--quiet', `refs/heads/${branch}`])
  if (result.status !== 0) {
    throw new Error(`Local branch '${branch}' does not exist.`)
  }
}

export function listRemotes(): string[] {
  const result = runGit(['remote'], { capture: true })
  if (result.status !== 0) return []
  return result.stdout
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

export function listLocalBranches(): string[] {
  const result = runGit(['for-each-ref', '--format=%(refname:short)', 'refs/heads'], {
    capture: true,
  })
  if (result.status !== 0) return []
  return result.stdout
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

export function listRemoteBranches(remote: string): string[] {
  const result = runGit(['ls-remote', '--heads', remote], { capture: true })
  if (result.status !== 0) {
    if (result.stderr) consola.error(result.stderr.trim())
    throw new Error(`Failed to list branches on remote '${remote}'.`)
  }
  return result.stdout
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const ref = line.split('\t')[1] ?? ''
      return ref.startsWith('refs/heads/') ? ref.slice('refs/heads/'.length) : ''
    })
    .filter(Boolean)
}

export function currentBranch(): string {
  return gitStdout(['branch', '--show-current'])
}

export function fetchRemote(remote: string): void {
  consola.start(`Fetching '${remote}'...`)
  runGitOrThrow(['fetch', remote], `Failed to fetch remote '${remote}'.`)
}

export function commitExistsInRef(commit: string, ref: string): boolean {
  const result = runGit(['merge-base', '--is-ancestor', commit, ref])
  return result.status === 0
}

export type CommitInfo = {
  sha: string
  shortSha: string
  subject: string
  files: string[]
}

export function listCommitsBetween(fromRef: string, toRef: string): CommitInfo[] {
  const shas = gitStdout(['rev-list', '--reverse', `${fromRef}..${toRef}`])
  if (!shas) return []

  const commits: CommitInfo[] = []
  for (const sha of shas.split('\n').filter(Boolean)) {
    const subject = gitStdout(['log', '-1', '--format=%s', sha])
    const shortSha = gitStdout(['rev-parse', '--short', sha])
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
    commits.push({ files, sha, shortSha, subject })
  }
  return commits
}

export function showCommitStat(sha: string): string {
  return gitStdout(['show', '--stat', '--format=fuller', '--no-patch', sha])
}
