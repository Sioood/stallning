import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import eslint from '@stallning/eslint'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default eslint({
  oxlint: resolve(__dirname, '.oxlintrc.json'),
  tsconfigRootDir: __dirname,
  typescript: true,
  /** Required so staged `*.vue` under apps/packages are parsed as SFCs (not plain TS). */
  vue: true,
}).append(
  {
    settings: {
      'import-x/resolver': {
        typescript: {
          alwaysTryTypes: true,
          noWarnOnMultipleProjects: true,
          project: [
            resolve(__dirname, 'packages/ui/.nuxt/tsconfig.app.json'),
            resolve(__dirname, 'apps/web/.nuxt/tsconfig.app.json'),
            resolve(__dirname, 'packages/nuxt-essentials/.nuxt/tsconfig.app.json'),
          ],
        },
      },
    },
    rules: {
      'import-x/no-unresolved': [
        'error',
        {
          ignore: ['^~ui/', '^~nuxt-essentials/'],
        },
      ],
    },
  },
  {
    /**
     * Test helpers and component tests define inline `defineComponent` / stubs (e.g. NuxtLink, Icon).
     * Not production Vue SFCs — relax Vue core rules that assume one component per `.vue` file.
     */
    files: ['**/test/**/*.ts', '**/*.component.test.ts'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off',
      'vue/one-component-per-file': 'off',
      'vue/require-default-prop': 'off',
    },
  },
)
