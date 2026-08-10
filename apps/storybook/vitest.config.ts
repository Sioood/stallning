import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

const dirname_ = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    storybookTest({
      configDir: resolve(dirname_, '.storybook'),
    }),
  ],
  test: {
    browser: {
      enabled: true,
      headless: true,
      instances: [{ browser: 'chromium' }],
      provider: playwright(),
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
    },
    name: 'storybook',
    root: dirname_,
    setupFiles: [resolve(dirname_, '.storybook/vitest.setup.ts')],
  },
})
