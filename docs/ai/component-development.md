# Component Development Guide

Guide for creating UI components in `@stallning/ui`.

There are two distinct types of components in this library:

- **Plain components** — pure Vue + CVA styling (e.g. `Badge`, `Alert`, `Divider`). No Ark UI.
- **Ark UI components** — interactive components built on Ark UI primitives (e.g. `Accordion`, `Menu`, `Switch`). See [`ark-ui-components.md`](./ark-ui-components.md) for the full Ark-specific guide.

---

## Workflow

1. Create component file in `packages/ui/app/components/`
2. Create a co-located Storybook story in `packages/ui/app/components/` (`Name.stories.ts`, optional `Name.demo.vue`)
3. Create component test in `packages/ui/test/components/`
4. Run mutation testing if adding utils/composables logic

---

## VueUse

Before writing custom logic for DOM events, refs, scroll, debounce, clipboard, storage, infinite scroll, drag-and-drop, or media queries — **search [VueUse](https://vueuse.org/functions.html) first**.

`@vueuse/nuxt` is provided by `@stallning/nuxt-essentials`; composables auto-import in `app/` directories (same as other Nuxt auto-imports).

### When to reach for VueUse

- Event listeners with cleanup → `useEventListener`
- Element/size refs → `useTemplateRef`, `useElementSize`
- Debounced inputs → `refDebounced`
- Scroll / infinite scroll → `useScroll`, `useInfiniteScroll`
- Clipboard / storage / breakpoints → `useClipboard`, `useLocalStorage`, `useBreakpoints`
- Sortable / DnD → `@vueuse/integrations` (`useSortable`) — add to the catalog when needed

### When not to

- Pure CVA styling and layout
- Ark UI state machines (`usePagination`, `useMenu`, …)
- TanStack Table/Form core logic — wrap VueUse only at the UI boundary (filters, resize handles, scroll containers)

### Reference in this repo

`UITable` helpers demonstrate the pattern: debounced filters (`refDebounced`), column resize listeners (`useEventListener`), pagination footer bridging, and Storybook demos for infinite scroll / row reorder.

For integrations, see [`@vueuse/integrations`](https://vueuse.org/integrations/README.html).

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
- Add a co-located `Name.stories.ts` (and optional `Name.demo.vue`) for Storybook
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

| Type             | Location                                 | Convention                          |
| ---------------- | ---------------------------------------- | ----------------------------------- |
| Simple component | `app/components/Name.vue`                | PascalCase                          |
| Feature folder   | `app/components/Name/index.vue`          | Folder + index                      |
| Sub-component    | `app/components/Name/Part.vue`           | Internal only                       |
| Storybook story  | `app/components/Name.stories.ts`         | CSF3: Playground + optional Gallery |
| Storybook demo   | `app/components/Name.demo.vue`           | Optional Gallery showcase           |
| Component test   | `test/components/Name.component.test.ts` | `.component.test.ts`                |
| Unit test        | `test/utils/name.test.ts`                | `.test.ts`                          |

---

## Form Input Patterns

### Static Prefix/Suffix

For fixed text prepended or appended to a field value, use the schema-level `prefix` and `suffix` options. These are applied **at submit time** — the user never sees them in the input, and `v-model` remains clean.

```ts
const fields: SchemaFieldsMap<FormValues> = {
  website: {
    as: UIFormInput,
    props: { label: 'Website', placeholder: 'example.com' },
    prefix: 'https://', // emitted as "https://example.com"
    slots: { leading: () => h('span', {}, 'https://') },
  },
  domain: {
    as: UIFormInput,
    props: { label: 'Domain', placeholder: 'mywebsite' },
    suffix: '.com', // emitted as "mywebsite.com"
    slots: { trailing: () => h('span', {}, '.com') },
  },
}
```

### Dynamic Prefix/Suffix

When the prefix or suffix depends on user selection (e.g. country code + phone number, currency symbol + amount), **create a dedicated component**. Slots alone cannot handle the two-way binding logic between interactive elements.

**Why a dedicated component is needed:**

1. It manages internal state for multiple sub-inputs (select + text input)
2. It combines values reactively before emitting to the parent form
3. Slots alone can't coordinate `v-model` sync between sibling controls

**Pattern: wrap `UIFormInput` and inject via `#inner-leading`**

```vue
<!-- PhoneInput.vue -->
<script setup lang="ts">
const internalCountryCode = ref<string[]>([])
const internalPhone = ref('')

// Sync combined value to parent v-model
watch([internalCountryCode, internalPhone], () => {
  const code = internalCountryCode.value[0]
  modelValue.value = code && internalPhone.value ? `${code} ${internalPhone.value}` : ''
})
</script>

<template>
  <UIFormInput v-model="internalPhone" type="tel">
    <template #inner-leading>
      <UIFormSelect
        v-model="internalCountryCode"
        :items="countryItems"
        :ui="{
          root: 'w-auto',
          trigger:
            'flex w-auto shrink-0 items-center rounded-l-md rounded-r-none border-0 bg-transparent',
        }"
      />
    </template>
  </UIFormInput>
</template>
```

The `#inner-leading` slot places the select **inside** the shell border, sharing a single visual container. Use `rounded-l-md rounded-r-none border-0` on the select trigger and `rounded-l-none border-l-0` on the input side to create a seamless joined appearance.

### Slot Placement Guide

| Slot              | Position              | Use case                           |
| ----------------- | --------------------- | ---------------------------------- |
| `#leading`        | Outside shell (left)  | Icon, label, standalone addon      |
| `#inner-leading`  | Inside shell (left)   | Prefix that shares border (select) |
| `#inner-trailing` | Inside shell (right)  | Password toggle, suffix icon       |
| `#trailing`       | Outside shell (right) | Button, standalone addon           |

---

## Storybook Convention

Storybook distinguishes **Docs** from individual **stories**:

| Surface        | Role                                                                                    |
| -------------- | --------------------------------------------------------------------------------------- |
| **Docs**       | Autodocs page: props/description + every named story rendered as examples               |
| **Playground** | Controllable story — tweak props in the Controls panel                                  |
| **Gallery**    | Optional rich multi-section `*.demo.vue` (former Compodium example) — Controls disabled |

Always set `meta.component` to the **real UI SFC** (not the demo). Tag with `autodocs`.

Controls are generated automatically from SFC props via `vue-docgen-api` (Storybook framework `docgen`). Still set `args` / `argTypes` when you want sensible defaults or select options that docgen cannot infer well.

```ts
import type { Meta, StoryObj } from '@storybook/vue3'

import { createGalleryStory, createUIMeta } from '~/utils/storybook'
import MyComponent from './MyComponent.vue'
import MyComponentDemo from './MyComponent.demo.vue'

const meta = createUIMeta({
  title: 'UI/MyComponent',
  component: MyComponent,
  args: {
    intent: 'primary',
    size: 'md',
  },
  argTypes: {
    intent: {
      control: 'select',
      options: ['neutral', 'primary', 'secondary', 'accent'],
    },
  },
}) satisfies Meta<typeof MyComponent>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable — primary Canvas entry. */
export const Playground: Story = {}

/** Multi-section showcase. */
export const Gallery = createGalleryStory(MyComponentDemo)
```

For components that need slots in Playground, provide a `render` function:

```ts
export const Playground: Story = {
  args: { content: 'Hello' },
  render: (args) => ({
    components: { MyComponent, UIButton: Button },
    setup: () => ({ args }),
    template: `
      <MyComponent v-bind="args">
        <template #trigger>
          <UIButton size="sm">Hover me</UIButton>
        </template>
      </MyComponent>
    `,
  }),
}
```

### Gallery content checklist

Every `*.demo.vue` should still cover:

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

const externalApi = useMyComponent({/* config */})
</script>

<template>
  <div class="flex flex-col gap-8 p-4">
    <section class="flex flex-col gap-2">
      <h3 class="text-lg font-bold">Basic</h3>
      <UIMyComponent @some-event="(d) => console.log('someEvent', d)" />
    </section>

    <section class="flex flex-col gap-2">
      <h3 class="text-lg font-bold">RootProvider mode</h3>
      <UIButton @click="externalApi.doSomething()">Trigger externally</UIButton>
      <UIMyComponent :value="externalApi" />
    </section>
  </div>
</template>
```
