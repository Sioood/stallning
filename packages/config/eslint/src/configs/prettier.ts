import prettierConfig from '@stallning/prettier'
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

import { defineConfig } from '../types.ts'

export const prettier = defineConfig([
  pluginPrettierRecommended,
  {
    rules: {
      'prettier/prettier': ['error', prettierConfig],
    },
  },
])
