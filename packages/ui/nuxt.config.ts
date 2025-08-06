// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: [['@stallning/nuxt-essentials', { install: true }]],
  modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxt/image', '@nuxtjs/tailwindcss'],
  alias: { '~ui': resolve('./') },
  components: [
    {
      path: resolve('./components'),
      prefix: 'UI',
    },
  ],
  i18n: {
    defaultLocale: 'fr-FR',
    // ISO 639-1 + ISO 3166-1
    locales: [{ code: 'fr-FR', name: 'Français', file: 'fr-FR/index.ts' }],
  },

  site: {
    url: 'https://ui.com',
    name: 'UI',
    description: 'UI component library',
  },
})
