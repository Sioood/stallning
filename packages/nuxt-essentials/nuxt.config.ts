import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'

import ViteYaml from '@modyfi/vite-plugin-yaml'
import { createResolver } from '@nuxt/kit'

const require = createRequire(import.meta.url)
const { resolve } = createResolver(import.meta.url)
const piniaEsmEntry = join(dirname(require.resolve('pinia/package.json')), 'dist/pinia.mjs')

const isDev = process.env.NODE_ENV !== 'production'

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
  alias: {
    '~nuxt-essentials': resolve('./'),
    pinia: piniaEsmEntry,
  },
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
  security: {
    enabled: !isDev,
    strict: true,
    nonce: true,
    sri: true,
    hidePoweredBy: true,
    headers: {
      contentSecurityPolicy: {
        'base-uri': ["'none'"],
        'font-src': ["'self'", 'https:', 'data:'],
        'form-action': ["'self'"],
        'frame-ancestors': ["'self'"],
        'img-src': ["'self'", 'data:', 'https:'],
        'object-src': ["'none'"],
        'script-src-attr': ["'none'"],
        'style-src': ["'self'", "'unsafe-inline'"],
        'script-src': ["'self'", "'strict-dynamic'", "'nonce-{{nonce}}'"],
        'upgrade-insecure-requests': true,
        'connect-src': ["'self'"],
        'worker-src': ["'self'"],
        'manifest-src': ["'self'"],
      },
      crossOriginOpenerPolicy: 'same-origin',
      crossOriginResourcePolicy: 'same-origin',
      crossOriginEmbedderPolicy: 'credentialless',
      referrerPolicy: 'strict-origin-when-cross-origin',
      strictTransportSecurity: {
        maxAge: 31536000,
        includeSubdomains: true,
        preload: true,
      },
      xContentTypeOptions: 'nosniff',
      xFrameOptions: 'DENY',
      permissionsPolicy: {
        camera: [],
        'display-capture': [],
        fullscreen: ['self'],
        geolocation: [],
        microphone: [],
      },
    },
    corsHandler: {
      origin: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      credentials: true,
      preflight: { statusCode: 204 },
    },
    rateLimiter: {
      tokensPerInterval: 100,
      interval: 300000,
      headers: true,
      throwError: true,
    },
    requestSizeLimiter: {
      maxRequestSizeInBytes: 2_000_000,
      maxUploadFileRequestInBytes: 8_000_000,
      throwError: true,
    },
  },
  site: {
    url: 'https://nuxt-essentials.com',
    name: 'Nuxt Essentials',
    description: 'Welcome to Nuxt Essentials!',
  },
  /** Public keys are overridden at runtime by `NUXT_PUBLIC_*` (see `.env.example`). */
  runtimeConfig: {
    public: {
      siteUrl: 'http://localhost:3000',
    },
  },
})
