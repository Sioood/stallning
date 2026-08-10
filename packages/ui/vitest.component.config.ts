import './test/vitest-nuxt-guard.ts'

import { fileURLToPath } from 'node:url'

import { defineVitestConfig } from '@nuxt/test-utils/config'

import { packageRoot } from './vitest.shared.ts'

const componentSetupPath = fileURLToPath(new URL('./test/component-setup.ts', import.meta.url))

export default defineVitestConfig({
  test: {
    environment: './vitest-nuxt-environment.ts',
    environmentOptions: {
      nuxt: {
        overrides: {
          ogImage: { enabled: false },
        },
      },
    },
    include: ['test/**/*.component.test.ts'],
    name: 'ui-component',
    root: packageRoot,
    setupFiles: [componentSetupPath],
  },
})
