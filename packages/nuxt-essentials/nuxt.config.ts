import { createResolver } from '@nuxt/kit'
import ViteYaml from '@modyfi/vite-plugin-yaml'
const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@pinia/nuxt' /**
     * See thoses links for more information
     * https://nuxt-security.vercel.app/getting-started/configuration#overriding-a-layers-configuration
     *
     * https://nuxt-security.vercel.app/advanced/good-practices
     * https://nuxt-security.vercel.app/advanced/improve-security
     */,
    'nuxt-security',
    '@vueuse/nuxt',
    '@nuxtjs/seo',
  ],
  vite: {
    plugins: [ViteYaml()],
  },
  alias: { '~nuxt-essentials': resolve('./') },
  components: [
    {
      path: resolve('./components'),
      prefix: 'NEss',
    },
  ],
  i18n: {
    defaultLocale: 'fr-FR',
    // ISO 639-1 + ISO 3166-1
    locales: [{ code: 'fr-FR', name: 'Français', file: 'fr-FR/index.ts' }],
  },
  site: {
    url: 'https://example.com',
    name: 'Nuxt Essentials',
    description: 'Welcome to my awesome site!',
  },
})
