import { existsSync, readFileSync, readdirSync, realpathSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

import ViteYaml from '@modyfi/vite-plugin-yaml'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
  mergeConfig,
  searchForWorkspaceRoot,
  type AliasOptions,
  type Plugin,
  type PluginOption,
  type UserConfig,
} from 'vite'

import { stallningVueDocgen } from './docgen.ts'

const stubsDir = fileURLToPath(new URL('./stubs', import.meta.url))

export type StallningViteFinalOptions = {
  uiPackageRoot: string
  /** Absolute path to `apps/web` (enables web component + composable auto-import). */
  webPackageRoot?: string
  /** Unique Vite cache per Storybook host (avoids multi-instance collisions). */
  cacheDir?: string
  /** Absolute path to the tsconfig backing `vue-component-meta` docgen. */
  docgenTsconfigPath?: string
}

/**
 * Nuxt-compatible path segment split (`FormControlShell` → `['Form','Control','Shell']`).
 * Mirrors `scule.splitByCase` enough for component naming.
 */
function splitByCase(input: string): string[] {
  return input
    .replaceAll(/([a-z0-9])([A-Z])/gu, '$1\0$2')
    .replaceAll(/([A-Z]+)([A-Z][a-z])/gu, '$1\0$2')
    .replaceAll(/[/_.-]+/gu, '\0')
    .split('\0')
    .filter(Boolean)
}

/**
 * Port of Nuxt `resolveComponentNameSegments` — drops path prefixes already present
 * in the filename (e.g. `Form/FormControlShell` → `FormControlShell`, not
 * `FormFormControlShell`).
 */
function resolveComponentNameSegments(fileName: string, prefixParts: string[]): string[] {
  const fileNameParts = splitByCase(fileName)
  const fileNamePartsContent = fileNameParts.join('/').toLowerCase()
  const componentNameParts = prefixParts.flatMap((part) => splitByCase(part))
  let index = prefixParts.length - 1
  const matchedSuffix: string[] = []

  while (index >= 0) {
    const prefixPart = prefixParts[index]
    if (!prefixPart) {
      index -= 1
      continue
    }
    matchedSuffix.unshift(...splitByCase(prefixPart).map((part) => part.toLowerCase()))
    const matchedSuffixContent = matchedSuffix.join('/')
    if (
      fileNamePartsContent === matchedSuffixContent ||
      fileNamePartsContent.startsWith(`${matchedSuffixContent}/`) ||
      (prefixPart.toLowerCase() === fileNamePartsContent &&
        prefixParts[index + 1] &&
        prefixParts[index] === prefixParts[index + 1])
    ) {
      componentNameParts.length = index
    }
    index -= 1
  }

  return [...componentNameParts, ...fileNameParts]
}

/** Match Nuxt `UI*` component names from a relative path under `app/components`. */
function nuxtUIComponentName(relativePathWithoutExt: string): string | undefined {
  const parts = relativePathWithoutExt.split('/').filter(Boolean)
  if (parts.length === 0) return undefined

  const last = parts.at(-1) ?? ''
  const dirParts = parts.slice(0, -1)
  const fileName = last.toLowerCase() === 'index' ? '' : last
  // Prefix `UI` is always applied (same as packages/ui nuxt.config `prefix: 'UI'`).
  const prefixParts = ['UI', ...dirParts]
  const segments = resolveComponentNameSegments(fileName, prefixParts).filter(Boolean)
  if (segments.length === 0) return undefined
  return segments.map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1)).join('')
}

/** Match Nuxt app component names (no prefix) from a relative path under `app/components`. */
function nuxtAppComponentName(relativePathWithoutExt: string): string | undefined {
  const parts = relativePathWithoutExt.split('/').filter(Boolean)
  if (parts.length === 0) return undefined

  const last = parts.at(-1) ?? ''
  const dirParts = parts.slice(0, -1)
  const fileName = last.toLowerCase() === 'index' ? '' : last
  const segments = resolveComponentNameSegments(fileName, dirParts).filter(Boolean)
  if (segments.length === 0) return undefined
  return segments.map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1)).join('')
}

/** Build Nuxt-style `UI*` name → absolute `.vue` path map (iterative walk). */
export function buildUIComponentMap(componentsDir: string): Map<string, string> {
  return buildComponentMap(componentsDir, nuxtUIComponentName)
}

/** Build Nuxt-style app component name → absolute `.vue` path map (iterative walk). */
export function buildAppComponentMap(componentsDir: string): Map<string, string> {
  return buildComponentMap(componentsDir, nuxtAppComponentName)
}

function buildComponentMap(
  componentsDir: string,
  resolveName: (relativePathWithoutExt: string) => string | undefined,
): Map<string, string> {
  const map = new Map<string, string>()
  const stack = [componentsDir]

  while (stack.length > 0) {
    const dir = stack.pop()
    if (!dir) continue

    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry)
      if (statSync(full).isDirectory()) {
        stack.push(full)
        continue
      }
      if (!entry.endsWith('.vue')) continue
      if (entry.endsWith('.demo.vue')) continue

      const rel = relative(componentsDir, full).replaceAll('\\', '/')
      const withoutExt = rel.replace(/\.vue$/u, '').replace(/\.client$/u, '')
      const name = resolveName(withoutExt)
      if (!name) continue

      map.set(name, full)
    }
  }

  return map
}

function flattenPlugins(plugins: PluginOption[] | undefined): PluginOption[] {
  const out: PluginOption[] = []
  for (const plugin of plugins ?? []) {
    if (Array.isArray(plugin)) {
      out.push(...flattenPlugins(plugin))
      continue
    }
    out.push(plugin)
  }
  return out
}

/**
 * Storybook may index stories with `/@fs/...` ids. `@vitejs/plugin-vue` then fails to treat
 * those ids as SFCs in dev, which surfaces as HTTP 404 on the `.vue` URL. Strip the prefix so
 * Vue sees a normal absolute filesystem path.
 */
function stripFsPrefixForVue(): Plugin {
  const FS_PREFIX = '/@fs/'
  return {
    enforce: 'pre',
    name: 'stallning-strip-fs-prefix-for-vue',
    resolveId(id) {
      const [path, query = ''] = id.split('?')
      if (!path.startsWith(FS_PREFIX)) return null
      if (!path.includes('.vue')) return null
      const absolute = path.slice(FS_PREFIX.length)
      return query ? `${absolute}?${query}` : absolute
    },
  }
}

/**
 * Nuxt replaces `import.meta.client` / `import.meta.server` at build time. Vite `define` does
 * not reliably rewrite those, so Storybook needs an explicit transform (e.g. for `useToast`).
 */
function nuxtImportMetaFlags(): Plugin {
  return {
    enforce: 'pre',
    name: 'stallning-nuxt-import-meta',
    transform(code, id) {
      if (id.includes('node_modules')) return null
      if (!code.includes('import.meta.client') && !code.includes('import.meta.server')) {
        return null
      }
      return {
        code: code
          .replaceAll('import.meta.client', 'true')
          .replaceAll('import.meta.server', 'false'),
        map: null,
      }
    },
  }
}

export async function stallningViteFinal(
  baseConfig: UserConfig,
  options: StallningViteFinalOptions,
): Promise<UserConfig> {
  const { uiPackageRoot, webPackageRoot, cacheDir, docgenTsconfigPath } = options
  const uiApp = join(uiPackageRoot, 'app')
  const componentsDir = join(uiApp, 'components')
  const webApp = webPackageRoot ? join(webPackageRoot, 'app') : undefined
  const webComponentsDir = webApp ? join(webApp, 'components') : undefined
  const nuxtEssentialsRoot = join(uiPackageRoot, '..', 'nuxt-essentials')
  const workspaceRoot = searchForWorkspaceRoot(uiPackageRoot)
  const uiComponentMap = buildUIComponentMap(componentsDir)
  const webComponentMap = webComponentsDir ? buildAppComponentMap(webComponentsDir) : undefined

  const autoImportDirs = [join(uiApp, 'composables/**'), join(uiApp, 'utils/**')]
  if (webApp) {
    autoImportDirs.push(join(webApp, 'composables/**'))
  }

  const existingAllow = baseConfig.server?.fs?.allow ?? []
  const fsAllow = [
    ...existingAllow,
    workspaceRoot,
    uiPackageRoot,
    nuxtEssentialsRoot,
    stubsDir,
  ]
  if (webPackageRoot) {
    fsAllow.push(webPackageRoot)
  }

  // Drop Storybook's default Vue plugin — it does not reliably compile SFCs outside the app root.
  const basePlugins = flattenPlugins(baseConfig.plugins).filter((plugin) => {
    if (!plugin || typeof plugin !== 'object' || plugin instanceof Promise) return true
    const name = 'name' in plugin ? String(plugin.name) : ''
    return name !== 'vite:vue' && name !== 'vite:vue-jsx'
  })

  const aliases: AliasOptions = [
    { find: /^~ui\//u, replacement: `${uiPackageRoot}/` },
    { find: /^~nuxt-essentials\//u, replacement: `${nuxtEssentialsRoot}/` },
    { find: /^~\//u, replacement: `${uiApp}/` },
    { find: /^@\//u, replacement: `${uiApp}/` },
    { find: '#app', replacement: join(stubsDir, 'nuxt-app.ts') },
  ]

  return mergeConfig({ ...baseConfig, plugins: basePlugins }, {
    ...(cacheDir ? { cacheDir } : {}),
    plugins: [
      stripFsPrefixForVue(),
      nuxtImportMetaFlags(),
      vue({
        include: [/\.vue$/u],
        script: {
          fs: {
            fileExists: (file) => existsSync(file),
            readFile: (file) => {
              try {
                return readFileSync(file, 'utf8')
              } catch {
                return undefined
              }
            },
            realpath: (file) => realpathSync(file),
          },
        },
      }),
      AutoImport({
        dirs: autoImportDirs,
        dts: false,
        imports: [
          'vue',
          '@vueuse/core',
          {
            'vue-i18n': ['useI18n'],
          },
          {
            [join(stubsDir, 'nuxt-app.ts')]: [
              'navigateTo',
              'useNuxtApp',
              'useRoute',
              'useRouter',
              'useRuntimeConfig',
              'useState',
            ],
          },
        ],
        include: [/\.[cm]?[jt]sx?$/u, /\.vue$/u, /\.vue\?vue/u],
        vueTemplate: true,
      }),
      tailwindcss(),
      ViteYaml(),
      ...(docgenTsconfigPath ? [stallningVueDocgen({ tsconfigPath: docgenTsconfigPath })] : []),
      Components({
        dts: false,
        resolvers: [
          {
            resolve: (name: string) => {
              const uiFile = uiComponentMap.get(name)
              if (uiFile) return { from: uiFile, name: 'default' }
              const webFile = webComponentMap?.get(name)
              if (webFile) return { from: webFile, name: 'default' }
            },
            type: 'component',
          },
        ],
      }),
    ],
    resolve: {
      alias: aliases,
      dedupe: ['vue', 'vue-i18n'],
    },
    server: {
      fs: {
        allow: fsAllow,
        strict: false,
      },
    },
  } satisfies UserConfig)
}
