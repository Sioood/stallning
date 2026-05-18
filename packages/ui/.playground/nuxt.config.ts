import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  extends: ['..'],
  css: [resolve('./app/assets/css/main.css')],
  // components: [resolve('../app/components')],
})
