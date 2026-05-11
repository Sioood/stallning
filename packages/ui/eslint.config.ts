import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import eslint from '@stallning/eslint'

import { withNuxt } from './.nuxt/eslint.config.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default withNuxt(
  eslint({
    oxlint: resolve(__dirname, '../../.oxlintrc.json'),
    tsconfigRootDir: __dirname,
    typescript: true,
    vue: true,
  }),
  {
    settings: {
      'import-x/resolver': {
        typescript: {
          project: resolve(__dirname, '.nuxt/tsconfig.app.json'),
        },
      },
    },
    rules: {
      'import-x/no-unresolved': 'error',
    },
  },
  {
    files: ['test/**/*.ts'],
    rules: {
      'vue/require-default-prop': 'off',
      'vue/one-component-per-file': 'off',
    },
  },
)
