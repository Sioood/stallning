# @stallning/web

Thin Nuxt 4 app shell. Layer chain: `web` → `ui` → `nuxt-essentials`.

- Owns: `nuxt.config` overrides, locales (`fr-FR`, `en-US`), pages, E2E (`e2e/`), Storybook (port 6007)
- Use `UI*` from layers; `<NuxtImg>`; `runtimeConfig.public.siteUrl`; `useFetchServerData` for API
- Keep thin — shared UI/logic belongs in packages; don't reinstall modules already provided by layers
- Storybook: `pnpm storybook` (includes UI stories for composition context + web `*.stories.ts`)
- E2E: Playwright against built preview (`pnpm test:e2e`)
