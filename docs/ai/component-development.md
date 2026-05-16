# Component Development Guide

Guide for creating UI components in `@stallning/ui`.

There are two distinct types of components in this library:

- **Plain components** — pure Vue + CVA styling (e.g. `Badge`, `Alert`, `Divider`). No Ark UI.
- **Ark UI components** — interactive components built on Ark UI primitives (e.g. `Accordion`, `Menu`, `Switch`). See [`ark-ui-components.md`](./ark-ui-components.md) for the full Ark-specific guide.

---

## Workflow

1. Create component file in `packages/ui/app/components/`
2. Create compodium example in `packages/ui/app/compodium/examples/UI/`
3. Create component test in `packages/ui/test/components/`
4. Run mutation testing if adding utils/composables logic

---

## Plain Component Template

```vue
<script setup lang="ts">
import { cva } from 'class-variance-authority'

import type { ClassValue } from 'vue'

type MyComponentIntent = 'neutral' | 'primary' | 'secondary' | 'accent'
type MyComponentSize = 'sm' | 'md' | 'lg'

const myComponentCVA = cva('base-classes', {
  variants: {
    intent: {
      neutral: 'text-neutral-text-default bg-neutral-fill-subtle',
      primary: 'text-primary-text-default bg-primary-fill-subtle',
      secondary: 'text-secondary-text-default bg-secondary-fill-subtle',
      accent: 'text-accent-text-default bg-accent-fill-subtle',
    } satisfies Record<MyComponentIntent, string>,
    size: {
      sm: 'px-2 py-1 txt-caption',
      md: 'px-3 py-1.5 txt-label',
      lg: 'px-4 py-2 txt-base',
    } satisfies Record<MyComponentSize, string>,
  },
})

export interface UIMyComponentSlots {
  root?: ClassValue
}

export interface MyComponentProps {
  intent?: MyComponentIntent
  size?: MyComponentSize
  ui?: Partial<UIMyComponentSlots>
}

const props = withDefaults(defineProps<MyComponentProps>(), {
  intent: 'neutral',
  size: 'md',
  ui: undefined,
})

extendCompodiumMeta<MyComponentProps>({
  defaultProps: {
    intent: 'neutral',
    size: 'md',
  },
})
</script>

<template>
  <div :class="cn(myComponentCVA({ intent: props.intent, size: props.size }), props.ui?.root)">
    <slot />
  </div>
</template>
```

---

## Styling Rules

- Use semantic tokens: `primary-fill-default`, `neutral-text-subtle`, `accent-border-default`
- **Never** use raw colors (`red-500`, `#ff0000`)
- **Never** interpolate Tailwind classes: `bg-${color}-500` is forbidden
- Use `cn()` for all class merging — handles Vue reactive classes + tailwind-merge
- Every component exposes a `ui` prop for slot-level class overrides

### Intent System

All interactive components support four intents: `neutral`, `primary`, `secondary`, `accent`.
Use `satisfies Record<MyIntent, string>` on every CVA variant map to enforce exhaustiveness.

---

## Component Patterns

- Use `defineModel` for two-way bindings (`open`, `pressed`, `checked`, `modelValue`)
- Use `withDefaults` for all optional props — always include `ui: undefined` and object defaults
- Use `@/` alias under `app/` directories (Nuxt auto-alias); use `~ui/app/...` from outside
- Add `extendCompodiumMeta` with representative defaults for the playground
- Export interface types from `<script setup>` so consumers can import them

### Discriminated Unions

For multi-type variant entries (e.g. Menu items), use a literal `type` field:

```ts
interface ItemEntry {
  type: 'item'
  label: string
  value: string
}
interface SeparatorEntry {
  type: 'separator'
}
type Entry = ItemEntry | SeparatorEntry
```

Add `assertNever` in switch default branches:

```ts
import { assertNever } from '~nuxt-essentials/app/utils/assert-never'

switch (entry.type) {
  case 'item':
    return handleItem(entry)
  case 'separator':
    return handleSeparator(entry)
  default:
    assertNever(entry)
}
```

---

## File Naming

| Type              | Location                                    | Convention           |
| ----------------- | ------------------------------------------- | -------------------- |
| Simple component  | `app/components/Name.vue`                   | PascalCase           |
| Feature folder    | `app/components/Name/index.vue`             | Folder + index       |
| Sub-component     | `app/components/Name/Part.vue`              | Internal only        |
| Compodium example | `app/compodium/examples/UI/NameExample.vue` | `{Name}Example.vue`  |
| Component test    | `test/components/Name.component.test.ts`    | `.component.test.ts` |
| Unit test         | `test/utils/name.test.ts`                   | `.test.ts`           |

---

## Compodium Example Template

Every example file should cover:

1. **Basic usage** — default props, minimal setup
2. **Intents** — all applicable intent variants
3. **Sizes** — all size variants
4. **Controlled state** — `v-model` usage
5. **RootProvider mode** — external API via `useXxx()` hook (Ark components only)
6. **Disabled state** — component disabled behavior
7. **Emit listeners** — bind key Ark events with `console.log`
8. **Component-specific features** — unique behaviors

```vue
<script setup lang="ts">
import { useMyComponent } from '@ark-ui/vue/my-component'

const externalApi = useMyComponent({
  /* config */
})
</script>

<template>
  <div class="flex flex-col gap-8 p-4">
    <!-- Basic -->
    <section class="flex flex-col gap-2">
      <h3 class="text-lg font-bold">Basic</h3>
      <UIMyComponent @some-event="(d) => console.log('someEvent', d)" />
    </section>

    <!-- RootProvider mode -->
    <section class="flex flex-col gap-2">
      <h3 class="text-lg font-bold">RootProvider mode</h3>
      <UIButton @click="externalApi.doSomething()">Trigger externally</UIButton>
      <UIMyComponent :value="externalApi" />
    </section>
  </div>
</template>
```
