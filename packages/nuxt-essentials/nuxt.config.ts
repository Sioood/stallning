import ViteYaml from '@modyfi/vite-plugin-yaml'
import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    '@vueuse/nuxt',
    'nuxt-security',
  ],
  // @ts-expect-error `pwa` options are injected by `@vite-pwa/nuxt`.
  pwa: {
    registerType: 'prompt',
    client: {
      installPrompt: true,
    },
    manifest: {
      name: 'Stallning App',
      short_name: 'Stallning',
      description: 'Stallning application',
      theme_color: '#111827',
      background_color: '#ffffff',
      display: 'standalone',
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
      navigateFallback: '/',
      runtimeCaching: [
        {
          // Keep dynamic API responses fresh while still leveraging cache on flaky networks.
          urlPattern: '/api/.*',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-network-first',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60,
            },
            networkTimeoutSeconds: 10,
          },
        },
      ],
    },
    devOptions: {
      enabled: false,
      suppressWarnings: true,
    },
  },
  vite: {
    plugins: [ViteYaml()],
  },
  nitro: {
    rollupConfig: {
      plugins: [ViteYaml()],
    },
  },
  alias: { '~nuxt-essentials': resolve('./') },
  eslint: {
    config: {
      standalone: false,
    },
  },
  i18n: {
    defaultLocale: 'fr-FR',
    // ISO 639-1 + ISO 3166-1
    locales: [{ code: 'fr-FR', language: 'fr-FR', name: 'Français', file: 'fr-FR/index.ts' }],
  },
  site: {
    url: 'https://nuxt-essentials.com',
    name: 'Nuxt Essentials',
    description: 'Welcome to Nuxt Essentials!',
  },
})
