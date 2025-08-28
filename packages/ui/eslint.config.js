import eslint from '@stallning/eslint'

import { withNuxt } from './.nuxt/eslint.config.mjs'

export default withNuxt(
  eslint({
    oxlint: true,
    prettier: true,
    typescript: true,
    tailwindcss: './assets/css/main.css',
    vue: true,
  }),
)
