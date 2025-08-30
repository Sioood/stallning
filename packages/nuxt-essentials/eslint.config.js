import eslint from '@stallning/eslint'

import { withNuxt } from './.playground/.nuxt/eslint.config.mjs'

export default withNuxt(
  eslint({
    oxlint: 'node_modules/@stallning/oxlint/.oxlintrc.json',
    prettier: true,
    typescript: true,
    vue: true,
  }),
)
