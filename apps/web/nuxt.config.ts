// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

const isDockerDev = process.env.DOCKER === '1'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      link: [{ rel: 'manifest', href: '/manifest.webmanifest' }],
    },
  },
  extends: [resolve('../../packages/ui')],
  css: [resolve('./app/assets/css/main.css')],
  i18n: {
    defaultLocale: 'fr-FR',
    locales: [
      { code: 'fr-FR', language: 'fr-FR', name: 'Français', file: 'fr-FR/index.ts' },
      { code: 'en-US', language: 'en-US', name: 'English', file: 'en-US/index.ts' },
    ],
  },
  pwa: {
    manifest: {
      name: 'Stallning',
      short_name: 'Stallning',
      description: 'Stallning web application',
      theme_color: '#111827',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      lang: 'fr',
      icons: [
        {
          src: '/pwa-icon.svg',
          sizes: 'any',
          type: 'image/svg+xml',
          purpose: 'any',
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      siteUrl: 'https://web.com',
    },
  },
  vite: isDockerDev
    ? {
        server: {
          watch: { usePolling: true },
          hmr: { clientPort: 3000 },
        },
      }
    : undefined,
})
