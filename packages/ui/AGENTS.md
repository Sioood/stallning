# @stallning/ui

Nuxt 4 design-system layer (`extends` `@stallning/nuxt-essentials`). Ark UI + Tailwind v4 + CVA + TanStack Form + Zod. Components auto-import as `UI*`.

Guides: [component development](../../docs/ai/component-development.md) · [Ark UI](../../docs/ai/ark-ui-components.md) · [testing](../../docs/ai/testing.md)

- Interactive: Ark Root by default; pass `:value` (from `useXxx()`) for RootProvider; forward attrs via `splitArkAttrs`
- Style with semantic tokens + CVA + `cn()`; Tailwind full class strings only; optional `ui` slot overrides
- Forms: Zod → `useSchemaForm` / `<UIForm>`; icons `tabler:*`; images via `<NuxtImg>`
- Discriminated unions + `assertNever`; export types from `<script setup>`; `defineModel` for two-way state
- Prefer VueUse over custom DOM/reactivity helpers; Storybook stories co-located as `*.stories.ts` (+ optional `*.demo.vue`)
- Design system Storybook: `pnpm --filter @stallning/storybook-app dev`
- Tests in `test/` (unit/component/visual); mutation on utils/composables (`pnpm mutation`)
