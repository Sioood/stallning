import { existsSync, readFileSync, rmSync } from 'node:fs'

import consola from 'consola'

import { gitStdout, runGit } from './git.ts'
import {
  asString,
  CONFIG_PATH,
  LEGACY_SYNC_BASELINE_PATH,
  mergeStallningConfig,
  parseYamlMapping,
  readLegacyBaseline,
  readStallningConfig,
  stallningPath,
  SYNC_PATH,
  writeConfigYaml,
  writeYamlFile,
} from './project.ts'

export { SYNC_PATH }

const COMMIT_HASH = /^[0-9a-f]{7,40}$/i

export type SyncBaseline = {
  baseline: string
  createdAt?: string
  updatedAt?: string
}

const SYNC_HEADER = `# Sync baseline: Stallning commit this project has applied up to.
# \`pnpm sync status\` / pick start after this commit. Override with:
#   pnpm sync baseline set <commit>
`

export function readSyncBaseline(): SyncBaseline | undefined {
  const path = stallningPath(SYNC_PATH)
  if (existsSync(path)) {
    const record = parseYamlMapping(readFileSync(path, 'utf8'), SYNC_PATH)
    const baseline =
      asString(record.baseline) ?? asString(record.lastCommit) ?? asString(record.sha)
    if (!baseline || !COMMIT_HASH.test(baseline)) {
      throw new Error(`Invalid ${SYNC_PATH}: missing or invalid baseline.`)
    }
    return {
      baseline: baseline.toLowerCase(),
      createdAt: asString(record.createdAt),
      updatedAt: asString(record.updatedAt),
    }
  }

  const legacy = readLegacyBaseline()
  if (!legacy?.baseline) return undefined
  if (!COMMIT_HASH.test(legacy.baseline)) {
    throw new Error(`Invalid ${LEGACY_SYNC_BASELINE_PATH}: missing or invalid sha.`)
  }
  return {
    baseline: legacy.baseline.toLowerCase(),
    createdAt: legacy.createdAt,
    updatedAt: legacy.updatedAt,
  }
}

export function resolveBaselineCommit(): string | undefined {
  return readSyncBaseline()?.baseline
}

/** Lower bound for "on source, not in target" when a fork baseline exists. */
export function aheadFromRef(target: string): string {
  return resolveBaselineCommit() ?? target
}

export function ensureCommitObject(commit: string): string {
  const resolved = runGit(['rev-parse', '--verify', `${commit}^{commit}`], { capture: true })
  if (resolved.status === 0) return resolved.stdout.trim()
  throw new Error(
    `Commit '${commit}' is not available locally. Fetch the source remote first (git fetch <remote>).`,
  )
}

function removeLegacyBaseline(): boolean {
  const relative = LEGACY_SYNC_BASELINE_PATH
  if (!existsSync(stallningPath(relative))) return false
  const rm = runGit(['rm', '-f', '--', relative], { capture: true })
  if (rm.status === 0) return true
  rmSync(stallningPath(relative), { force: true })
  return false
}

export function writeSyncBaseline(input: {
  commit: string
  template?: string
  remote?: string
  gitCommit?: boolean
}): SyncBaseline {
  const fullCommit = ensureCommitObject(input.commit)
  const existing = readSyncBaseline()
  const next: SyncBaseline = {
    baseline: fullCommit,
    createdAt: existing?.createdAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  writeYamlFile(SYNC_PATH, SYNC_HEADER, {
    baseline: next.baseline,
    ...(next.createdAt ? { createdAt: next.createdAt } : {}),
    ...(next.updatedAt ? { updatedAt: next.updatedAt } : {}),
  })

  const currentConfig = readStallningConfig()
  const configFileMissing = !existsSync(stallningPath(CONFIG_PATH))
  const nextTemplate = input.template ?? currentConfig.template
  const nextRemote = input.remote ?? currentConfig.remote
  const wroteConfig =
    Boolean(nextTemplate || nextRemote) &&
    (configFileMissing ||
      (Boolean(input.template) && input.template !== currentConfig.template) ||
      (Boolean(input.remote) && input.remote !== currentConfig.remote))
  if (wroteConfig) {
    writeConfigYaml(mergeStallningConfig({ remote: nextRemote, template: nextTemplate }))
  }

  const removedLegacy = removeLegacyBaseline()
  const staged = [SYNC_PATH]
  if (wroteConfig) staged.push(CONFIG_PATH)
  if (removedLegacy) staged.push(LEGACY_SYNC_BASELINE_PATH)

  if (input.gitCommit !== false) {
    runGit(['add', '--', ...staged])
    const short = fullCommit.slice(0, 7)
    const commit = runGit([
      'commit',
      '-m',
      `chore(sync): set baseline to ${short}`,
      '--',
      ...staged,
    ])
    if (commit.status === 0) consola.success(`Baseline → ${short}`)
    else consola.info(`Wrote ${SYNC_PATH} → ${short} (nothing to commit)`)
  } else {
    consola.success(`Wrote ${SYNC_PATH} → ${fullCommit.slice(0, 7)}`)
  }

  return next
}

export function showSyncBaseline(): void {
  const synced = readSyncBaseline()
  if (!synced) {
    consola.info(`No ${SYNC_PATH} (monorepo sync uses target..source).`)
    return
  }
  consola.box(SYNC_PATH)
  consola.log(`baseline:   ${synced.baseline}`)
  try {
    const subject = gitStdout(['log', '-1', '--format=%s', synced.baseline])
    const short = gitStdout(['rev-parse', '--short', synced.baseline])
    consola.log(`commit:     ${short}  ${subject}`)
  } catch {
    consola.log('commit:     (not available locally — fetch the source remote)')
  }
  if (synced.createdAt) consola.log(`createdAt:  ${synced.createdAt}`)
  if (synced.updatedAt) consola.log(`updatedAt:  ${synced.updatedAt}`)
}
