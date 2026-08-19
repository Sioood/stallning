import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

import consola from 'consola'
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml'

import { gitStdout, runGit } from './git.ts'

export const STALLNING_DIR = '.stallning'
export const CONFIG_PATH = `${STALLNING_DIR}/config.yaml`
export const SYNC_PATH = `${STALLNING_DIR}/sync.yaml`
export const LEGACY_SYNC_BASELINE_PATH = `${STALLNING_DIR}/sync-baseline`

export type StallningConfig = {
  template?: string
  remote?: string
}

export type LegacyBaseline = {
  baseline?: string
  template?: string
  remote?: string
  createdAt?: string
  updatedAt?: string
}

const CONFIG_HEADER = `# Stallning project settings (edit freely).
# template: Stallning branch this project was created from (used as default -s).
# remote: git remote that points at the Stallning repository (used as default -r).
`

function repoRoot(): string {
  return gitStdout(['rev-parse', '--show-toplevel'])
}

export function stallningPath(relative: string): string {
  return join(repoRoot(), relative)
}

export function asString(value: unknown): string | undefined {
  if (typeof value === 'string' && value.trim()) return value.trim()
  if (value instanceof Date) return value.toISOString()
  return undefined
}

export function parseYamlMapping(raw: string, path: string): Record<string, unknown> {
  const parsed: unknown = parseYaml(raw)
  if (parsed === null || parsed === undefined) return {}
  if (typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error(`Invalid ${path}: expected a YAML mapping.`)
  }
  return parsed as Record<string, unknown>
}

export function writeYamlFile(
  relativePath: string,
  header: string,
  data: Record<string, string>,
): void {
  const path = stallningPath(relativePath)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${header}${stringifyYaml(data).trimEnd()}\n`, 'utf8')
}

export function parseLegacyBaseline(raw: string): LegacyBaseline {
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
  return {
    baseline: fields.baseline ?? fields.sha ?? fields.lastCommit,
    createdAt: fields.createdAt,
    remote: fields.remote,
    template: fields.template,
    updatedAt: fields.updatedAt,
  }
}

export function readLegacyBaseline(): LegacyBaseline | undefined {
  const path = stallningPath(LEGACY_SYNC_BASELINE_PATH)
  if (!existsSync(path)) return undefined
  return parseLegacyBaseline(readFileSync(path, 'utf8'))
}

function readConfigMapping(): Record<string, unknown> {
  const path = stallningPath(CONFIG_PATH)
  if (existsSync(path)) return { ...parseYamlMapping(readFileSync(path, 'utf8'), CONFIG_PATH) }
  const legacy = readLegacyBaseline()
  if (!legacy) return {}
  const record: Record<string, unknown> = {}
  if (legacy.template) record.template = legacy.template
  if (legacy.remote) record.remote = legacy.remote
  return record
}

export function stringMapping(record: Record<string, unknown>): Record<string, string> {
  const data: Record<string, string> = {}
  for (const [key, value] of Object.entries(record)) {
    const str = asString(value)
    if (str) data[key] = str
  }
  return data
}

export function readStallningConfig(): StallningConfig {
  const record = readConfigMapping()
  return {
    remote: asString(record.remote),
    template: asString(record.template),
  }
}

export function mergeStallningConfig(patch: StallningConfig): Record<string, string> {
  const record = readConfigMapping()
  if (patch.remote) record.remote = patch.remote
  if (patch.template) record.template = patch.template
  return stringMapping(record)
}

export function writeStallningConfig(
  patch: StallningConfig,
  options: { gitCommit?: boolean } = {},
): StallningConfig {
  const data = mergeStallningConfig(patch)
  if (!data.template && !data.remote) {
    throw new Error(`Nothing to write to ${CONFIG_PATH}. Pass --template and/or --remote.`)
  }
  writeYamlFile(CONFIG_PATH, CONFIG_HEADER, data)

  if (options.gitCommit !== false) {
    runGit(['add', '--', CONFIG_PATH])
    const commit = runGit([
      'commit',
      '-m',
      'chore(sync): update Stallning project config',
      '--',
      CONFIG_PATH,
    ])
    if (commit.status === 0) consola.success(`Updated ${CONFIG_PATH}`)
    else consola.info(`Wrote ${CONFIG_PATH} (nothing to commit)`)
  } else {
    consola.success(`Wrote ${CONFIG_PATH}`)
  }

  return { remote: data.remote, template: data.template }
}

export function writeConfigYaml(data: Record<string, string>): void {
  writeYamlFile(CONFIG_PATH, CONFIG_HEADER, data)
}

export function showStallningConfig(): void {
  const record = readConfigMapping()
  if (!Object.keys(record).length && !existsSync(stallningPath(CONFIG_PATH))) {
    consola.info(
      `No ${CONFIG_PATH}. Create one with: pnpm sync config set --template nuxt --remote upstream`,
    )
    return
  }
  consola.box(CONFIG_PATH)
  for (const [key, value] of Object.entries(record)) {
    consola.log(`${key}: ${asString(value) ?? String(value)}`)
  }
}
