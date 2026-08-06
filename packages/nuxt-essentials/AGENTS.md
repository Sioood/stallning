# @stallning/nuxt-essentials

Base Nuxt 4 layer (modules, i18n, PWA, SEO, security, Pinia, VueUse). Extended by `@stallning/ui` — not consumed directly by apps. Alias: `~nuxt-essentials`.

| Area     | Notes                                                                                                           |
| -------- | --------------------------------------------------------------------------------------------------------------- |
| Modules  | `@nuxt/eslint`, `@nuxtjs/i18n`, `@nuxtjs/seo`, `@pinia/nuxt`, `@vite-pwa/nuxt`, `@vueuse/nuxt`, `nuxt-security` |
| Security | Off in dev; prod CSP/CORS/HSTS/SRI/rate-limit — override in consuming `nuxt.config`                             |
| i18n     | Default `fr-FR`; `translations.yaml` unprefixed; other files → `{namespace}:{key}`                              |
| Utils    | `extractStore`, `getMessagesWithNamespace`; error boundary in `app/error.vue`                                   |

- Shared modules/utilities only — no UI components or app-specific logic
- Use `catalog:` versions; keep the i18n coverage CLI working for all packages
- Do not enable security in dev (breaks DevTools/HMR)
