// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from '@nuxt/kit'
import tailwindcss from '@tailwindcss/vite'
const { resolve } = createResolver(import.meta.url)

// // https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  extends: [resolve('../nuxt-essentials')],
  modules: ['@nuxt/fonts', '@nuxt/icon', '@compodium/nuxt', '@nuxt/image', 'v-gsap-nuxt'],
  fonts: {
    families: [
      { name: 'Inter', provider: 'google' },
      { name: 'Spline Sans Mono', provider: 'google' },
    ],
  },
  css: [resolve('./app/assets/css/main.css')],
  vite: {
    plugins: [tailwindcss()],
  },
  alias: { '~ui': resolve('./') },
  components: [
    {
      path: resolve('./app/components'),
      prefix: 'UI',
    },
  ],
  i18n: {
    defaultLocale: 'fr-FR',
    // ISO 639-1 + ISO 3166-1
    locales: [{ code: 'fr-FR', language: 'fr-FR', name: 'Français', file: 'fr-FR/index.ts' }],
  },
  site: {
    url: 'https://ui.com',
    name: 'UI',
    description: 'UI component library',
  },
})
