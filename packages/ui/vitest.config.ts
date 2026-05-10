import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineVitestProject } from '@nuxt/test-utils/config'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import autoImport from 'unplugin-auto-import/vite'
import { coverageConfigDefaults, defineConfig, defineProject } from 'vitest/config'

const packageRoot = dirname(fileURLToPath(import.meta.url))
const stubPath = fileURLToPath(new URL('./test/extend-compodium-meta-stub.ts', import.meta.url))
const componentSetupPath = fileURLToPath(new URL('./test/component-setup.ts', import.meta.url))
const visualSetupPath = fileURLToPath(new URL('./test/visual-setup.ts', import.meta.url))

const uiCoverage = {
  provider: 'v8' as const,
  /** Do not add every file matching `include` at 0% — only what tests touch (plus `all` merges). */
  all: false,
  /**
   * Without this, `exclude` / `include` are not re-applied after V8 results are remapped to source
   * paths, so Nuxt-loaded files (e.g. `app/compodium/**`) still appear in the table at 0%.
   */
  excludeAfterRemap: true,
  processingConcurrency: 1,
  reporter: ['text', 'html', 'lcov'] as const,
  reportsDirectory: './coverage',
  include: [
    'app/utils/**/*.ts',
    'app/plugins/**/*.ts',
    'app/composables/**/*.ts',
    'app/app.vue',
    'app/components/**/*.vue',
    'app/components/Form/schema.ts',
  ],
  exclude: [
    ...coverageConfigDefaults.exclude,
    '**/nuxt.config.ts',
    '**/vitest-nuxt-environment.ts',
    '**/app/compodium/**',
    'app/compodium/**',
    '**/i18n/locales/**',
    'test/**',
  ],
  /** Gate CI on shipped UI under `app/components` and shared `app` TS (see root `test.coverage`). */
  thresholds: {
    'app/**/*.ts': {
      lines: 75,
      statements: 75,
      branches: 65,
      functions: 70,
    },
    'app/components/**/*.vue': {
      lines: 75,
      statements: 75,
      branches: 65,
      /** SFC `<script setup>` often reports many “functions” (inline callbacks) as uncovered. */
      functions: 50,
    },
    'app/app.vue': {
      lines: 75,
      statements: 75,
      branches: 65,
      functions: 70,
    },
  },
}

export default defineConfig(async () => {
  const uiComponent = await defineVitestProject({
    test: {
      name: 'ui-component',
      root: packageRoot,
      setupFiles: [componentSetupPath],
      include: ['test/**/*.component.test.ts'],
      environmentOptions: {
        nuxt: {
          overrides: {
            imports: {
              imports: [{ name: 'extendCompodiumMeta', from: stubPath }],
            },
          },
        },
      },
    },
  })

  uiComponent.test.environment = './vitest-nuxt-environment.ts'

  return {
    root: packageRoot,
    test: {
      /** Used by `initCoverageProvider()`; per-project `coverage` is not applied to the v8 provider. */
      coverage: uiCoverage,
      projects: [
        defineProject({
          root: packageRoot,
          test: {
            name: 'ui-unit',
            environment: 'node',
            include: ['test/**/*.test.ts'],
            exclude: ['test/**/*.component.test.ts', 'test/**/*.visual.test.ts'],
          },
        }),
        uiComponent,
        defineProject({
          root: packageRoot,
          plugins: [tailwindcss(), vue(), autoImport({ imports: ['vue'], dts: false })],
          resolve: {
            alias: {
              '~ui': packageRoot,
              '#app': resolve(packageRoot, 'test/visual/stubs/nuxt-app.ts'),
            },
          },
          test: {
            name: 'ui-visual',
            setupFiles: [visualSetupPath],
            include: ['test/**/*.visual.test.ts'],
            browser: {
              enabled: true,
              provider: 'playwright',
              headless: true,
              instances: [{ browser: 'chromium' }],
              viewport: { width: 1280, height: 720 },
              screenshotFailures: false,
            },
          },
        }),
      ],
    },
  }
})
