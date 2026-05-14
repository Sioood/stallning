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

## Root vs RootProvider Pattern

All Ark UI components support two operating modes. Choosing the right one keeps code clean.

### Root mode (default)

The component manages its own state internally. Use `v-model` to read/write a single value.

**Use Root when:**

- The component is self-contained and you only need `v-model`
- You don't need to call imperative methods (`open()`, `close()`, `setValue()`, etc.)
- There is no cross-component coordination needed

```vue
<!-- Simple: component owns its state -->
<UIAccordion v-model="expanded" collapsible>
  ...
</UIAccordion>

<!-- Even simpler: uncontrolled with a default -->
<UIPopover title="Info" content="Hello" :default-open="false" />
```

### RootProvider mode

You call `useXxx()` outside the component and pass the returned API object via `:value`. The Ark machine is created externally and the component is purely presentational.

**Use RootProvider when:**

- You need to call **imperative methods** (`accordion.setValue(...)`, `popover.open()`, etc.)
- You need to **coordinate** multiple components from one controller
- You need access to the **full API object** (`getItemState()`, `isHighlighted()`, etc.)
- You are **syncing** two components that should share state

```vue
<script setup lang="ts">
import { useAccordion } from '@ark-ui/vue/accordion'

const accordion = useAccordion({ multiple: true, collapsible: true })
</script>

<template>
  <!-- "Expand All" button — only possible with RootProvider -->
  <UIButton @click="accordion.setValue(['panel-1', 'panel-2', 'panel-3'])"> Expand All </UIButton>

  <!-- Pass the API object via :value -->
  <UIAccordion :value="accordion">
    <UIAccordionItem value="panel-1">...</UIAccordionItem>
    <UIAccordionItem value="panel-2">...</UIAccordionItem>
    <UIAccordionItem value="panel-3">...</UIAccordionItem>
  </UIAccordion>
</template>
```

**Anti-pattern:** don't use RootProvider when `v-model` suffices — it adds unnecessary boilerplate.

```vue
<!-- BAD: over-engineering with RootProvider just to bind a value -->
<script setup lang="ts">
const accordion = useAccordion({ value: expanded.value })
</script>
<UIAccordion :value="accordion" />
<!-- Don't do this -->

<!-- GOOD: use v-model -->
<UIAccordion v-model="expanded" collapsible />
```

### Which components support RootProvider?

All Ark-based components accept an optional `:value` prop (the `UseXxxReturn` object):

| Component                           | Hook                                               |
| ----------------------------------- | -------------------------------------------------- |
| `UIAccordion`                       | `useAccordion()` from `@ark-ui/vue/accordion`      |
| `UICollapsible`                     | `useCollapsible()` from `@ark-ui/vue/collapsible`  |
| `UIPopover`                         | `usePopover()` from `@ark-ui/vue/popover`          |
| `UISwitch`                          | `useSwitch()` from `@ark-ui/vue/switch`            |
| `UITooltip`                         | `useTooltip()` from `@ark-ui/vue/tooltip`          |
| `UIMenu`                            | `useMenu()` from `@ark-ui/vue/menu`                |
| `UIToggleGroup`                     | `useToggleGroup()` from `@ark-ui/vue/toggle-group` |
| `UIProgress` / `UIProgressCircular` | `useProgress()` from `@ark-ui/vue/progress`        |
| `UIQRCode`                          | `useQrCode()` from `@ark-ui/vue/qr-code`           |
| `UIFormSelect`                      | `useSelect()` from `@ark-ui/vue/select`            |

`UIToggle` and `UIToast` do not have a RootProvider mode (Ark does not provide `useToggle` or `useToaster`).

### Implementation pattern

```vue
<script setup lang="ts">
import { MyComponent as ArkMyComponent, type UseMyComponentReturn } from '@ark-ui/vue/my-component'

interface MyProps
  extends ArkMyComponentRootBaseProps, Omit<ArkMyComponentRootProviderBaseProps, 'value'> {
  /**
   * Pass the return value of `useMyComponent()` to enable RootProvider mode.
   * Omit to use Root mode with v-model.
   */
  value?: UseMyComponentReturn
}

const props = withDefaults(defineProps<MyProps>(), { value: undefined })

const isProvider = computed(() => props.value !== undefined)
const rootComponent = computed(() =>
  isProvider.value ? ArkMyComponent.RootProvider : ArkMyComponent.Root,
)
</script>

<template>
  <component :is="rootComponent" v-bind="resolvedProps">
    <slot />
  </component>
</template>
```

---

## Accessing Component State (Context Hooks)

Ark UI provides three mechanisms to read component state from within its tree. Choose based on where you need the data.

### 1. Slot props (single-file components)

Single-file components like `UIPopover`, `UITooltip`, and `UIMenu` expose the full Ark API through slot props. This is the simplest approach for inline access.

```vue
<UIPopover>
  <template #triggers="{ trigger: Trigger, popover }">
    <!-- `popover` is the full Ark API: popover.open, popover.close(), etc. -->
    <component :is="Trigger">
      {{ popover.open ? 'Close' : 'Open' }}
    </component>
  </template>

  <template #content="{ popover, triggerValue }">
    <span>Trigger: {{ triggerValue }}</span>
    <UIButton @click="popover.close()">Close</UIButton>
  </template>
</UIPopover>
```

**When to use:** You need state directly inside a named slot of the component.

### 2. UIXxxContext passthrough (compound components)

For compound components like `UIAccordion`, use the provided Context wrapper to access root state inline inside the default slot. These are Nuxt auto-imported.

```vue
<UIAccordion v-model="expanded" multiple>
  <!-- Read accordion state inline anywhere in the default slot -->
  <UIAccordionContext v-slot="ctx">
    <p>Open panels: {{ ctx.value }}</p>
    <p>Focused: {{ ctx.focusedValue }}</p>
  </UIAccordionContext>

  <UIAccordionItem value="a">
    <!-- Access item-level state with UIAccordionItemContext -->
    <UIAccordionItemContext v-slot="item">
      <span>{{ item.expanded ? '▲' : '▼' }}</span>
    </UIAccordionItemContext>
  </UIAccordionItem>
</UIAccordion>
```

**When to use:** You need inline access to accordion root or item state inside the slot tree.

### 3. useXxxContext() hooks (descendant components)

For descendant Vue components (not inline templates), import the context hook directly from `@ark-ui/vue`. These work automatically because our wrapper renders the Ark `Root` internally, which provides the context.

```vue
<!-- app/components/MyCustomAccordionItem.vue -->
<script setup lang="ts">
import { useAccordionContext } from '@ark-ui/vue/accordion'

// Reads state from the nearest UIAccordion (or ArkAccordion.Root) ancestor
const ctx = useAccordionContext()

const isAnyOpen = computed(() => ctx.value.value.length > 0)
</script>

<template>
  <div :class="isAnyOpen ? 'border-primary-border-default' : ''">
    <slot />
  </div>
</template>
```

**When to use:** A descendant _component_ needs to read parent accordion/select/etc. state without prop drilling. Import hooks directly from `@ark-ui/vue/{component}` — no re-export needed.

### Decision guide

| Scenario                                                                | Mechanism                                  |
| ----------------------------------------------------------------------- | ------------------------------------------ |
| Inline access inside a named slot of `UIPopover`, `UIMenu`, `UITooltip` | Slot props (`#content="{ popover }"`)      |
| Inline access inside `UIAccordion`'s default slot                       | `<UIAccordionContext v-slot="ctx">`        |
| Child component inside an accordion tree                                | `useAccordionContext()` from `@ark-ui/vue` |
| Programmatic control from outside                                       | RootProvider mode + `useXxx()` hook        |

---

## Transparent Emit Forwarding

Ark UI wrapper components use **transparent `$attrs` forwarding** — they do NOT redeclare Ark's emits. Event listeners bound on the wrapper are passed through to the inner Ark root automatically.

```vue
<!-- Consumer: bind Ark events directly on the wrapper -->
<UIAccordion
  @value-change="(d) => console.log('valueChange', d)"
  @focus-change="(d) => console.log('focusChange', d)"
/>

<UIPopover
  @open-change="(d) => console.log('openChange', d)"
  @escape-key-down="(d) => console.log('escapeKeyDown', d)"
/>

<UITooltip @open-change="(d) => console.log('openChange', d)" />

<UIMenu
  @select="(d) => console.log('select', d)"
  @open-change="(d) => console.log('openChange', d)"
/>
```

This works because:

1. `defineOptions({ inheritAttrs: false })` is set on the wrapper
2. `v-bind="$attrs"` (or equivalent computed attrs) is forwarded to the Ark root
3. Vue automatically merges event listeners that come from `$attrs`

**Key requirement:** Every Ark-based wrapper must have `inheritAttrs: false` and forward attrs to the root element. Check the component's `defineOptions` and `v-bind` usage if a listener stops working.

---

## Shared Utilities

### `splitArkAttrs`

Strips UI-specific keys (`ui`, etc.) from `useAttrs()` before forwarding to an Ark element. Replaces the repeated `const { ui: _ui, ...rest } = attrs` pattern.

```ts
import { splitArkAttrs } from '@/utils/ark'

// Before:
const rootAttrs = computed(() => {
  const { ui: _ui, ...rest } = attrs as Record<string, unknown> & {
    ui?: Partial<UIMyComponentSlots>
  }
  return rest
})

// After:
const arkAttrs = computed(() => splitArkAttrs(useAttrs()))
```

You can also exclude additional keys: `splitArkAttrs(useAttrs(), ['ui', 'customProp'])`.

---

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

Every example file should cover:

1. **Basic usage** — default props, minimal setup
2. **Intents** — all applicable intent variants
3. **Sizes** — all size variants
4. **Controlled state** — `v-model` usage
5. **RootProvider mode** — external API via `useXxx()` hook
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
