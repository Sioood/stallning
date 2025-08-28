import eslint from '@stallning/eslint'

import { withNuxt } from './.playground/.nuxt/eslint.config.mjs'

export default withNuxt(
  eslint({
    oxlint: true,
    prettier: true,
    typescript: true,
    vue: true,
  }),
)
