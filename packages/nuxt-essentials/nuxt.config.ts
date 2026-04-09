import ViteYaml from "@modyfi/vite-plugin-yaml";
import { createResolver } from "@nuxt/kit";
const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/eslint",
    "@nuxtjs/i18n",
    "@nuxtjs/seo",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "nuxt-security",
  ],
  vite: {
    plugins: [ViteYaml()],
  },
  nitro: {
    rollupConfig: {
      plugins: [ViteYaml()],
    },
  },
  alias: { "~nuxt-essentials": resolve("./") },
  eslint: {
    config: {
      standalone: false,
    },
  },
  i18n: {
    defaultLocale: "fr-FR",
    // ISO 639-1 + ISO 3166-1
    locales: [{ code: "fr-FR", name: "Français", file: "fr-FR/index.ts" }],
  },
  site: {
    url: "https://nuxt-essentials.com",
    name: "Nuxt Essentials",
    description: "Welcome to Nuxt Essentials!",
  },
});
