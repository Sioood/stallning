import nuxtEnvironment from '@nuxt/test-utils/vitest-environment'

/** Vitest 3+ requires `transformMode`; @nuxt/test-utils 4.0.3 omits it on the bundled environment. */
export default {
  ...nuxtEnvironment,
  transformMode: 'web' as const,
}
