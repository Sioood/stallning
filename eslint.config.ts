import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import eslint from '@stallning/eslint'

const __dirname = dirname(fileURLToPath(import.meta.url))

// lint-staged runs this root config on all staged .vue files (e.g. under packages/ui).
export default eslint({
  oxlint: resolve(__dirname, '.oxlintrc.json'),
  tsconfigRootDir: __dirname,
  typescript: true,
  vue: true,
}).append({
  rules: {
    'import-x/no-unresolved': ['error', { ignore: ['^~ui/', '^~nuxt-essentials/'] }],
  },
})
