import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

import consola from 'consola'

import { gitStdout, runGit } from './git.ts'

export const SYNC_BASELINE_PATH = '.stallning/sync-baseline'

export type SyncBaseline = {
  sha: string
  template?: string
  remote?: string
  createdAt?: string
  updatedAt?: string
}

function baselineAbsolutePath(): string {
  const root = gitStdout(['rev-parse', '--show-toplevel'])
  return join(root, SYNC_BASELINE_PATH)
}

function parseSyncBaseline(raw: string): SyncBaseline {
  const fields: Record<string, string> = {}
  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const separator = trimmed.indexOf('=')
    if (separator <= 0) continue
    const key = trimmed.slice(0, separator).trim()
    const value = trimmed.slice(separator + 1).trim()
    if (key && value) fields[key] = value
  }
  if (!fields.sha || !/^[0-9a-f]{7,40}$/i.test(fields.sha)) {
    throw new Error(`Invalid ${SYNC_BASELINE_PATH}: missing or invalid sha.`)
  }
  return {
    createdAt: fields.createdAt,
    remote: fields.remote,
    sha: fields.sha.toLowerCase(),
    template: fields.template,
    updatedAt: fields.updatedAt,
  }
}

function formatSyncBaseline(baseline: SyncBaseline): string {
  const lines = [`sha=${baseline.sha}`]
  if (baseline.template) lines.push(`template=${baseline.template}`)
  if (baseline.remote) lines.push(`remote=${baseline.remote}`)
  if (baseline.createdAt) lines.push(`createdAt=${baseline.createdAt}`)
  if (baseline.updatedAt) lines.push(`updatedAt=${baseline.updatedAt}`)
  return `${lines.join('\n')}\n`
}

export function readSyncBaseline(): SyncBaseline | undefined {
  const path = baselineAbsolutePath()
  if (!existsSync(path)) return undefined
  return parseSyncBaseline(readFileSync(path, 'utf8'))
}

function writeSyncBaseline(baseline: SyncBaseline): void {
  const path = baselineAbsolutePath()
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, formatSyncBaseline(baseline), 'utf8')
}

export function resolveSyncBaselineSha(): string | undefined {
  return readSyncBaseline()?.sha
}

/** Lower bound for "on source, not in target" when a fork baseline exists. */
export function aheadFromRef(target: string): string {
  return resolveSyncBaselineSha() ?? target
}

export function ensureBaselineObject(sha: string): string {
  const resolved = runGit(['rev-parse', '--verify', `${sha}^{commit}`], { capture: true })
  if (resolved.status === 0) return resolved.stdout.trim()
  throw new Error(
    `Baseline SHA '${sha}' is not available locally. Fetch the source remote first (git fetch <remote>).`,
  )
}

export function bumpSyncBaseline(input: {
  sha: string
  template?: string
  remote?: string
  commit?: boolean
}): SyncBaseline {
  const fullSha = ensureBaselineObject(input.sha)
  const existing = readSyncBaseline()
  const next: SyncBaseline = {
    createdAt: existing?.createdAt ?? new Date().toISOString(),
    remote: input.remote ?? existing?.remote,
    sha: fullSha,
    template: input.template ?? existing?.template,
    updatedAt: new Date().toISOString(),
  }
  writeSyncBaseline(next)

  if (input.commit !== false) {
    runGit(['add', '--', SYNC_BASELINE_PATH])
    const commit = runGit([
      'commit',
      '-m',
      'chore(sync): bump sync baseline',
      '--',
      SYNC_BASELINE_PATH,
    ])
    if (commit.status === 0) {
      consola.success(`Updated ${SYNC_BASELINE_PATH} → ${fullSha.slice(0, 7)}`)
    } else {
      consola.info(`Wrote ${SYNC_BASELINE_PATH} → ${fullSha.slice(0, 7)} (nothing to commit)`)
    }
  } else {
    consola.success(`Wrote ${SYNC_BASELINE_PATH} → ${fullSha.slice(0, 7)}`)
  }

  return next
}

export function showSyncBaseline(): void {
  const baseline = readSyncBaseline()
  if (!baseline) {
    consola.info(`No ${SYNC_BASELINE_PATH} (monorepo sync uses target..source).`)
    return
  }
  consola.box(`${SYNC_BASELINE_PATH}`)
  consola.log(`sha:       ${baseline.sha}`)
  if (baseline.template) consola.log(`template:  ${baseline.template}`)
  if (baseline.remote) consola.log(`remote:    ${baseline.remote}`)
  if (baseline.createdAt) consola.log(`createdAt: ${baseline.createdAt}`)
  if (baseline.updatedAt) consola.log(`updatedAt: ${baseline.updatedAt}`)
}
