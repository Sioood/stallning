import eslint from '@stallning/eslint'

import { withNuxt } from './.nuxt/eslint.config.mjs'

export default withNuxt(
  eslint({
    oxlint: 'node_modules/@stallning/oxlint/.oxlintrc.json',
    prettier: true,
    typescript: true,
    vue: true,
    tailwindcss: 'node_modules/@stallning/ui/assets/css/main.css',
  }),
)
