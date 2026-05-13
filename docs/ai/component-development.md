# Component Development Guide

Guide for creating UI components in `@stallning/ui`. Follows Ark UI + CVA + design system patterns.

## Workflow

1. Create component file in `packages/ui/app/components/`
2. Create compodium example in `packages/ui/app/compodium/examples/UI/`
3. Create component test in `packages/ui/test/components/`
4. Run mutation testing if adding utils/composables logic

## Component Template

```vue
<script setup lang="ts">
import { cva } from 'class-variance-authority'

import type { ClassValue } from 'vue'

// If using Ark UI primitives:
// import { Dialog as ArkDialog } from '@ark-ui/vue/dialog'

type MyComponentIntent = 'neutral' | 'success' | 'warning' | 'error' | 'info'
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

withDefaults(defineProps<MyComponentProps>(), {
  intent: 'neutral',
  size: 'md',
  ui: undefined,
})

// Optional: extend compodium meta for default props if no compodium example file is provided
extendCompodiumMeta<MyComponentProps>({
  defaultProps: {
    intent: 'neutral',
    size: 'md',
  },
})
</script>

<template>
  <div :class="cn(myComponentCVA({ intent, size }), ui?.root)">
    <slot />
  </div>
</template>
```

## Critical Rules

### Styling

- Use semantic tokens: `primary-fill-default`, `neutral-text-subtle`, `accent-border-default`
- NEVER use raw colors (`red-500`, `#ff0000`)
- NEVER interpolate Tailwind classes: `bg-${color}-500` is FORBIDDEN
- Use `cn()` for all class merging (handles Vue reactive classes + tailwind-merge)
- Every component has an `ui` prop for slot-level class overrides

### Component Patterns

- Use Ark UI for interactive components (Dialog, Menu, Tooltip, Select, etc.)
- Use `defineModel` for two-way bindings (open, pressed, checked, value)
- Use `withDefaults` for ALL optional props (set `undefined` for object props)
- Prefer `@/` under `app/` (Nuxt alias) or `~ui/app/...` from the package root; avoid fragile relative paths in examples
- Add `extendCompodiumMeta` with representative defaults

### Intent System (All 4 intents)

Every interactive component supports: `neutral`, `primary`, `secondary`, `accent`

### Discriminated Unions

For components with variant entries (like Menu items), use a literal `type` field:

```ts
interface ItemEntry {
  type: 'item'
  label: string
}
interface SeparatorEntry {
  type: 'separator'
}
type Entry = ItemEntry | SeparatorEntry
```

Add `assertNever` in switch default:

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

## File Naming

| Type              | Location                                    | Convention           |
| ----------------- | ------------------------------------------- | -------------------- |
| Simple component  | `app/components/Name.vue`                   | PascalCase           |
| Feature folder    | `app/components/Name/index.vue`             | Folder + index       |
| Sub-component     | `app/components/Name/Part.vue`              | Internal only        |
| Compodium example | `app/compodium/examples/UI/NameExample.vue` | `{Name}Example.vue`  |
| Component test    | `test/components/Name.component.test.ts`    | `.component.test.ts` |
| Unit test         | `test/utils/name.test.ts`                   | `.test.ts`           |

## Compodium Example Template

```vue
<script setup lang="ts">
// Demonstrate the component with realistic props
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <UIMyComponent intent="primary" size="md"> Example content </UIMyComponent>
    <UIMyComponent intent="neutral" size="sm"> Small variant </UIMyComponent>
  </div>
</template>
```
