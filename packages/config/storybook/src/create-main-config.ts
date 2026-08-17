import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { stallningViteFinal } from './vite-final.ts'

import type { StorybookConfig } from '@storybook/vue3-vite'

const require = createRequire(import.meta.url)

const packageRoot = dirname(fileURLToPath(new URL('.', import.meta.url)))

/** TS program used by the docgen checker — see `tsconfig.docgen.json` for why it exists. */
const docgenTsconfigPath = join(packageRoot, 'tsconfig.docgen.json')

/** Resolve package roots for pnpm / Yarn PnP monorepos. */
export function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')))
}

export type CreateMainConfigOptions = {
  stories: StorybookConfig['stories']
  /** Absolute path to `packages/ui` (for aliases + component auto-import). */
  uiPackageRoot: string
  /** Absolute path to `apps/web` (optional — enables `Web/*` stories). */
  webPackageRoot?: string
  /** Unique Vite cache directory for this Storybook host. */
  cacheDir?: string
  /**
   * Extra static dirs merged after `packages/ui/public`.
   * Array form only — Storybook's preset-function variant is not supported here.
   */
  staticDirs?: Extract<NonNullable<StorybookConfig['staticDirs']>, readonly unknown[]>
} & Partial<Omit<StorybookConfig, 'stories' | 'framework' | 'addons' | 'staticDirs'>>

export function createMainConfig(options: CreateMainConfigOptions): StorybookConfig {
  const {
    stories,
    uiPackageRoot,
    webPackageRoot,
    cacheDir,
    staticDirs = [],
    viteFinal: userViteFinal,
    ...rest
  } = options

  const config: StorybookConfig = {
    addons: [
      getAbsolutePath('@storybook/addon-a11y'),
      getAbsolutePath('@storybook/addon-docs'),
      getAbsolutePath('@storybook/addon-links'),
      getAbsolutePath('@storybook/addon-themes'),
      getAbsolutePath('@storybook/addon-vitest'),
    ],
    framework: {
      name: getAbsolutePath('@storybook/vue3-vite'),
      options: {
        // Controls/Docs argTypes come from `stallningVueDocgen` instead (wired in viteFinal):
        // neither built-in plugin produces usable types for these SFCs. See `docgen.ts`.
        docgen: false,
      },
    },
    // Serve `packages/ui/public` so `@font-face` URLs like `/stallning/Miame4VF.ttf` resolve
    // (same as Nuxt's public/ root). Hosts can append extra dirs via `staticDirs`.
    staticDirs: [join(uiPackageRoot, 'public'), ...staticDirs],
    stories,
    async viteFinal(baseConfig, env) {
      const withStallning = await stallningViteFinal(baseConfig, {
        cacheDir,
        docgenTsconfigPath,
        uiPackageRoot,
        webPackageRoot,
      })
      if (userViteFinal) {
        return userViteFinal(withStallning, env)
      }
      return withStallning
    },
    ...rest,
  }

  return config
}
