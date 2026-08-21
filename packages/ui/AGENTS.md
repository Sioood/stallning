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

## Colour tokens are generated — never hand-edit them

`app/assets/css/main.css` contains ~1800 generated declarations between
`/* @generated <region>:start|:end */` markers (raw palettes, semantic aliases, and the
role tokens for light + both dark blocks). Editing them by hand is how the palette drifted
before.

```bash
pnpm --filter @stallning/ui tokens         # regenerate
pnpm --filter @stallning/ui tokens:check   # verify (also runs in CI via verify.sh tokens)
```

- Source of truth: `scripts/tokens.config.ts` — one contrast **ladder**, a hue/saturation
  profile per family, and a role→stop map per theme. Because every family shares the ladder,
  a given stop carries the same contrast in every family.
- `dark` is **not** a mirror of `light`: text and border roles are pitched differently so both
  themes clear their WCAG floors from the same eleven stops.
- Floors are asserted in `test/tokens/contrast.test.ts` — a value change that drops any
  text/surface pair below AA fails the unit suite.
- The generator also emits `.playground/app/utils/token-index.generated.ts` (which roles read
  each stop), consumed by the playground's `ColorSwatch`.
- Scalars (radius, type scale, elevation, motion, z-index, scrim) are hand-written in the same
  `@theme` block, outside the markers.

**Type scale:** `txt-label` (0.875rem) is the **control** size and `txt-base` (1rem) is **prose**.
Size ramps must be strictly monotonic — `test/utils/button-variants.test.ts` guards this for
Button, and every `sm`/`md`/`lg` map in the library currently satisfies it.
