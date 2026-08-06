import { resolve as resolvePath } from 'node:path'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { playwright } from '@vitest/browser-playwright'
import autoImport from 'unplugin-auto-import/vite'
import { defineConfig, defineProject } from 'vitest/config'

import { packageRoot, uiCoverage } from './vitest.shared.ts'

export default defineConfig({
  root: packageRoot,
  test: {
    coverage: uiCoverage,
    projects: [
      './vitest.unit.config.ts',
      './vitest.component.config.ts',
      defineProject({
        plugins: [tailwindcss(), vue(), autoImport({ dts: false, imports: ['vue'] })],
        resolve: {
          alias: {
            '#app': resolvePath(packageRoot, 'test/visual/stubs/nuxt-app.ts'),
            '~': resolvePath(packageRoot, 'app'),
            '~nuxt-essentials': resolvePath(packageRoot, '../nuxt-essentials'),
            '~ui': packageRoot,
          },
        },
        root: packageRoot,
        test: {
          browser: {
            enabled: true,
            headless: true,
            instances: [{ browser: 'chromium' }],
            provider: playwright(),
            screenshotFailures: false,
            viewport: { height: 720, width: 1280 },
          },
          include: ['test/**/*.visual.test.ts'],
          name: 'ui-visual',
          setupFiles: [resolvePath(packageRoot, 'test/visual-setup.ts')],
        },
      }),
    ],
  },
})
