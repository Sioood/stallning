# @stallning/storybook

Shared Storybook config for Stallning Vue hosts (`apps/storybook`, `apps/web`).

- Entry: `src/index.ts` → `createMainConfig`, preview helpers, i18n factory, `viteFinal`
- Framework: `@storybook/vue3-vite` (not Nuxt Storybook — avoids Nuxt 4 + pnpm OOM)
- Hosts keep a thin `.storybook/main.ts` + `.storybook/preview.ts` that pass stories globs and locale messages
