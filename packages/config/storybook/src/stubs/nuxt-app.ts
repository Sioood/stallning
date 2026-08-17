import { isRef, ref, type Ref } from 'vue'

/** Minimal `#app` shim so UI SFCs that import Nuxt types compile in Storybook. */

export type NuxtLinkProps = {
  to?: string | Record<string, unknown>
  href?: string
  target?: string
  rel?: string
  external?: boolean
}

/** Stable app identity for WeakMap-backed composables (e.g. `useToast`). */
const storybookNuxtApp: Record<string, unknown> = {
  $pwa: undefined,
  vueApp: null,
}

/**
 * Storybook stand-in for Nuxt’s `useNuxtApp()` auto-import.
 * Returns one shared object so composables keyed by the app stay consistent.
 */
export function useNuxtApp(): Record<string, unknown> {
  return storybookNuxtApp
}

const stateByKey = new Map<string, Ref<unknown>>()

/**
 * Storybook stand-in for Nuxt’s `useState()` — client-only shared refs by key.
 */
export function useState<T>(key?: string, init?: () => T | Ref<T>): Ref<T> {
  const stateKey = key ?? 'storybook:anonymous'
  const existing = stateByKey.get(stateKey)
  if (existing) return existing as Ref<T>

  const initial = init?.()
  const state = (isRef(initial) ? initial : ref(initial as T)) as Ref<T>
  stateByKey.set(stateKey, state as Ref<unknown>)
  return state
}

type StorybookRuntimeConfig = {
  app: {
    baseURL: string
    buildAssetsDir: string
    cdnURL: string
  }
  public: {
    siteUrl: string
  }
}

/**
 * Storybook stand-in for Nuxt’s `useRuntimeConfig()` (e.g. Menu/Link external URL checks).
 */
export function useRuntimeConfig(): StorybookRuntimeConfig {
  const siteUrl =
    typeof window !== 'undefined' && window.location?.origin
      ? window.location.origin
      : 'http://localhost:6006'

  return {
    app: {
      baseURL: '/',
      buildAssetsDir: '/_nuxt/',
      cdnURL: '',
    },
    public: {
      siteUrl,
    },
  }
}

const storybookRoute = ref({
  fullPath: '/',
  hash: '',
  matched: [],
  meta: {},
  name: undefined,
  params: {},
  path: '/',
  query: {},
})

/** Minimal router stub for components that call `useRouter()` / `navigateTo`. */
export function useRouter() {
  return {
    currentRoute: storybookRoute,
    push: async (_to: unknown) => undefined,
    replace: async (_to: unknown) => undefined,
  }
}

/** Storybook stand-in for Nuxt’s `useRoute()` (e.g. web navbar active link). */
export function useRoute() {
  return storybookRoute
}

export async function navigateTo(_to: unknown): Promise<void> {
  // no-op in Storybook
}

export default {}
