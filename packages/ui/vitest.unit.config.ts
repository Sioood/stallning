import { defineProject } from 'vitest/config'

import {
  packageRoot,
  uiCoverage,
  workspaceLayerAliasesFromNuxtAppTsconfig,
} from './vitest.shared.ts'

export default defineProject({
  resolve: {
    alias: {
      '@': `${packageRoot}/app`,
      ...workspaceLayerAliasesFromNuxtAppTsconfig(),
    },
  },
  root: packageRoot,
  test: {
    coverage: uiCoverage,
    environment: 'node',
    exclude: ['test/**/*.component.test.ts', 'test/**/*.visual.test.ts'],
    include: ['test/**/*.test.ts'],
    name: 'ui-unit',
  },
})
