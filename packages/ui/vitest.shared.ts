import { readFileSync } from 'node:fs'
import { dirname, resolve as resolvePath } from 'node:path'
import { fileURLToPath } from 'node:url'

import { coverageConfigDefaults } from 'vitest/config'

export const packageRoot = dirname(fileURLToPath(import.meta.url))

/** Vite aliases for `~ui` / `~nuxt-essentials`, aligned with `.nuxt/tsconfig.app.json` (after `nuxt prepare`). */
export function workspaceLayerAliasesFromNuxtAppTsconfig(): Record<string, string> {
  const tsconfigPath = resolvePath(packageRoot, '.nuxt/tsconfig.app.json')
  const { compilerOptions } = JSON.parse(readFileSync(tsconfigPath, 'utf8')) as {
    compilerOptions?: { paths?: Record<string, string[]> }
  }
  const paths = compilerOptions?.paths
  if (!paths) {
    return {}
  }
  const baseDir = dirname(tsconfigPath)
  const out: Record<string, string> = {}
  for (const key of ['~ui', '~nuxt-essentials'] as const) {
    const target = paths[key]?.[0]
    if (target) {
      out[key] = resolvePath(baseDir, target)
    }
  }
  return out
}

export const uiCoverage = {
  /** Do not add every file matching `include` at 0% — only what tests touch (plus `all` merges). */
  all: false,
  exclude: [
    ...coverageConfigDefaults.exclude,
    '**/nuxt.config.ts',
    '**/vitest-nuxt-environment.ts',
    '**/app/compodium/**',
    'app/compodium/**',
    '**/i18n/locales/**',
    'test/**',
  ],
  /**
   * Without this, `exclude` / `include` are not re-applied after V8 results are remapped to source
   * paths, so Nuxt-loaded files (e.g. `app/compodium/**`) still appear in the table at 0%.
   */
  excludeAfterRemap: true,
  include: [
    'app/utils/**/*.ts',
    'app/plugins/**/*.ts',
    'app/composables/**/*.ts',
    'app/app.vue',
    'app/components/**/*.vue',
    'app/components/Form/schema.ts',
  ],
  processingConcurrency: 1,
  provider: 'v8' as const,
  reporter: ['text', 'html', 'lcov'],
  reportsDirectory: './coverage',
  /** Gate CI on shipped UI under `app/components` and shared `app` TS (see root `test.coverage`). */
  thresholds: {
    'app/**/*.ts': {
      branches: 65,
      functions: 70,
      lines: 75,
      statements: 75,
    },
    'app/app.vue': {
      branches: 65,
      functions: 70,
      lines: 75,
      statements: 75,
    },
    'app/components/**/*.vue': {
      branches: 65,
      /** SFC `<script setup>` often reports many “functions” (inline callbacks) as uncovered. */
      functions: 50,
      lines: 75,
      statements: 75,
    },
  },
}
