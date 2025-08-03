// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from '@nuxt/kit'
import ViteYaml from '@modyfi/vite-plugin-yaml'
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon', '@nuxt/image', '@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  vite: {
    plugins: [ViteYaml()],
  },
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
})
