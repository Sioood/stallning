import { dirname, resolve as resolvePath } from 'node:path'
import { fileURLToPath } from 'node:url'

import vue from '@vitejs/plugin-vue'
import autoImport from 'unplugin-auto-import/vite'
import { defineConfig, defineProject } from 'vitest/config'

/** Static Vitest config for Knip only — real runs use `vitest.config.ts` (Nuxt projects). */
const packageRoot = dirname(fileURLToPath(import.meta.url))
const componentSetupPath = resolvePath(packageRoot, 'test/component-setup.ts')
const visualSetupPath = resolvePath(packageRoot, 'test/visual-setup.ts')

export default defineConfig({
  root: packageRoot,
  plugins: [vue(), autoImport({ imports: ['vue'], dts: false })],
  test: {
    coverage: {
      provider: 'v8',
    },
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
      defineProject({
        root: packageRoot,
        plugins: [vue(), autoImport({ imports: ['vue'], dts: false })],
        test: {
          name: 'ui-component',
          environment: 'node',
          setupFiles: [componentSetupPath],
          include: ['test/**/*.component.test.ts'],
        },
      }),
      defineProject({
        root: packageRoot,
        test: {
          name: 'ui-visual',
          setupFiles: [visualSetupPath],
          include: ['test/**/*.visual.test.ts'],
          browser: {
            enabled: true,
            provider: 'playwright',
          },
        },
      }),
    ],
  },
})
