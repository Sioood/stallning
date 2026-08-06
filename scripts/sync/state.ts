import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

import { gitStdout } from './git.ts'

type SyncMode = 'pick' | 'backport' | 'paths'

export type SyncState = {
  mode: SyncMode
  sourceRef: string
  targetBranch: string
  dryRun: boolean
  remainingCommits: string[]
  pendingPaths?: string[]
  createdAt: string
}

function statePath(): string {
  const gitDir = gitStdout(['rev-parse', '--git-dir'])
  return join(gitDir, 'stallning-sync-state.json')
}

export function readSyncState(): SyncState | undefined {
  const path = statePath()
  if (!existsSync(path)) return undefined
  const raw = readFileSync(path, 'utf8')
  return JSON.parse(raw) as SyncState
}

export function writeSyncState(state: SyncState): void {
  const path = statePath()
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${JSON.stringify(state, null, 2)}\n`, 'utf8')
}

export function clearSyncState(): void {
  const path = statePath()
  if (existsSync(path)) unlinkSync(path)
}
