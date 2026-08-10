import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { createMainConfig } from '@stallning/storybook'

const rootDir = dirname(fileURLToPath(import.meta.url))
const uiPackageRoot = resolve(rootDir, '../../../packages/ui')

export default createMainConfig({
  cacheDir: resolve(rootDir, '../node_modules/.vite-storybook-ui'),
  stories: ['../../../packages/ui/app/components/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  uiPackageRoot,
})
