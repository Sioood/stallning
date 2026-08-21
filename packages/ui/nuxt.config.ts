// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from '@nuxt/kit'
import tailwindcss from '@tailwindcss/vite'
const { resolve } = createResolver(import.meta.url)

const isVitest = process.env.VITEST === 'true'

// // https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  extends: [resolve('../nuxt-essentials')],
  modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxt/image', 'v-gsap-nuxt'],

  alias: { '~ui': resolve('./') },
  components: [
    {
      ignore: ['**/*.demo.vue', '**/*.stories.ts', '**/*-data.ts'],
      path: resolve('./app/components'),
      prefix: 'UI',
    },
  ],
  css: [resolve('./app/assets/css/main.css')],
  fonts: {
    families: [
      // Pretendard is not on Google Fonts; `fontsource` serves the latin subset.
      // It ships as static weights (no variable axis), so the list is explicit.
      { name: 'Pretendard', provider: 'fontsource', weights: [400, 500, 600, 700] },
      { name: 'Spline Sans Mono', provider: 'google', weights: [400, 500, 600] },
    ],
  },
  i18n: {
    defaultLocale: 'fr-FR',
    // ISO 639-1 + ISO 3166-1
    locales: [{ code: 'fr-FR', file: 'fr-FR/index.ts', language: 'fr-FR', name: 'Français' }],
  },
  icon: {
    mode: 'svg',
    size: '1rem',
  },
  image: {
    densities: [1, 2],
    domains: ['api.dicebear.com'],
    format: ['avif', 'webp'],
    quality: 80,
    screens: {
      '2xl': 1536,
      lg: 1024,
      md: 768,
      sm: 640,
      xl: 1280,
      xs: 320,
    },
  },
  ...(isVitest
    ? {
        plugins: [resolve('./test/nuxt/plugins/i18n-vitest-stub.ts')],
      }
    : {}),
  runtimeConfig: {
    public: {
      siteUrl: 'https://ui.com',
    },
  },
  site: {
    description: 'UI component library',
    name: 'UI',
    url: 'https://ui.com',
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
