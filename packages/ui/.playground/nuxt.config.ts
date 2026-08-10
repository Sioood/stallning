import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)
export default defineNuxtConfig({
  extends: ['..'],

  components: {
    dirs: [
      {
        path: resolve('./app/components'),
        pathPrefix: false,
      },
    ],
  },
  css: [resolve('./app/assets/css/main.css')],
})
