import Theme from './Theme.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

/**
 * Three-state theme cycle (light → dark → auto) backed by VueUse `useColorMode`, which
 * writes `light` / `dark` onto `<html>`. Wrapped in `<ClientOnly>` — it renders a disabled
 * placeholder during SSR.
 *
 * In Storybook the toolbar theme decorator also writes that class, so the two can disagree
 * until the toggle is clicked; the playground chrome is the truer place to exercise it.
 */
const meta = {
  component: Theme,
  tags: ['autodocs'],
  title: 'UI/Toggle/Theme',
} satisfies Meta<typeof Theme>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Theme },
    setup: () => ({ sizes: ['sm', 'md', 'lg'] }),
    template: `
      <div class="flex items-center gap-4 p-4">
        <div v-for="size in sizes" :key="size" class="flex flex-col items-center gap-1.5">
          <Theme :size="size" />
          <span class="txt-mono-caption text-neutral-text-muted">{{ size }}</span>
        </div>
      </div>
    `,
  }),
}
