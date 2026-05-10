# @stallning/ui

The design system and UI component library for Stallning. Provides accessible, themed components built on Ark UI + Tailwind CSS v4.

## Usage

Extend this package in your Nuxt app:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: ['@stallning/ui'],
})
```

All components are auto-imported with the `UI` prefix.

## Scripts

| Script                | Description                            |
| --------------------- | -------------------------------------- |
| `pnpm dev`            | Start component playground (Compodium) |
| `pnpm test`           | Run unit + component tests             |
| `pnpm test:unit`      | Unit tests only (Node)                 |
| `pnpm test:component` | Component tests (Nuxt env)             |
| `pnpm test:visual`    | Visual regression tests (Playwright)   |
| `pnpm test:coverage`  | Tests with coverage report             |
| `pnpm mutation`       | Mutation testing (Stryker incremental) |
| `pnpm mutation:open`  | Mutation testing + open HTML report    |

## Components

All components use Ark UI for accessibility and CVA for styling variants.

### Basic Usage

```vue
<template>
  <UIButton intent="primary" size="md">Click me</UIButton>
  <UIAlert type="success" title="Done!" description="Operation completed." />
  <UIToggle v-model:pressed="isActive">Toggle</UIToggle>
</template>
```

### Menu (Declarative API)

```vue
<template>
  <UIMenu
    trigger-text="Actions"
    intent="neutral"
    :items="[
      { type: 'item', value: 'edit', label: 'Edit' },
      { type: 'item', value: 'delete', label: 'Delete', disabled: true },
      { type: 'separator' },
      { type: 'checkbox', value: 'notify', label: 'Notify me', checked: true },
    ]"
  />
</template>
```

### Forms (Schema-first)

```vue
<script setup lang="ts">
import { z } from 'zod'

const schema = z.object({
  email: z.email(),
  password: z.string().min(8),
})
</script>

<template>
  <UIForm
    :schema="schema"
    :default-values="{ email: '', password: '' }"
    :fields="{
      email: { component: 'input', type: 'email' },
      password: { component: 'input', type: 'password' },
    }"
    :layout="['email', 'password']"
    @submit="handleSubmit"
  />
</template>
```

## Visual Regression Testing

```bash
# Run visual tests
pnpm test:visual

# Update baselines after intentional UI changes
pnpm test:visual -- --update
```

Write visual tests in `test/visual/*.visual.test.ts`:

```ts
import { page } from '@vitest/browser/context'
import { expect, test } from 'vitest'

test('my component looks correct', async () => {
  document.body.innerHTML = `<div data-testid="target">...</div>`
  await expect(page.getByTestId('target')).toMatchScreenshot('my-component', {
    threshold: 0.1,
    maxDiffPixelRatio: 0.01,
  })
})
```

## Mutation Testing

Validates that your tests actually catch bugs:

```bash
pnpm mutation        # Incremental (fast, uses cache)
pnpm mutation:open   # Same + opens HTML report
```

Only mutates `app/utils/` and `app/composables/` — not components or test files.

## Type Safety: `assertNever`

Use for exhaustive switch statements over discriminated unions:

```ts
import { assertNever } from '~ui/app/utils/assert-never'

type Action = { type: 'create'; name: string } | { type: 'delete'; id: string }

function handle(action: Action) {
  switch (action.type) {
    case 'create':
      return create(action.name)
    case 'delete':
      return remove(action.id)
    default:
      assertNever(action) // TS error if union grows
  }
}
```

## Image Optimization

Use `<NuxtImg>` for automatic format conversion and responsive images:

```vue
<template>
  <NuxtImg
    src="/images/hero.jpg"
    width="1280"
    height="720"
    sizes="sm:640px md:768px lg:1024px xl:1280px"
    placeholder
  />
</template>
```

Configuration (auto-applied via layer):

- Formats: AVIF → WebP → original
- Quality: 80%
- Densities: 1x, 2x
- Breakpoints: 320, 640, 768, 1024, 1280, 1536

## Customizing Component Styles

Every component accepts a `ui` prop for slot-level class overrides:

```vue
<template>
  <UIMenu
    :ui="{
      trigger: 'bg-red-500',
      content: 'rounded-xl shadow-2xl',
      item: 'px-4 py-2',
    }"
  />
</template>
```
