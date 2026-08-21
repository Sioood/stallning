import SearchInput from './SearchInput.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    debounce: 200,
    placeholder: 'Rechercher…',
  },
  component: SearchInput,
  tags: ['autodocs'],
  title: 'UI/Form/SearchInput',
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {}

/** With a label above the control. */
export const Labelled: Story = {
  args: { label: 'Filtrer les traces' },
}

/** `debounce` gates `update:modelValue`; the pending state is exposed while it waits. */
export const NoDebounce: Story = {
  args: { debounce: 0 },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { SearchInput },
    setup: () => ({ sizes: ['sm', 'md', 'lg'] }),
    template: `
      <div class="flex max-w-sm flex-col gap-4 p-4">
        <div v-for="size in sizes" :key="size" class="flex flex-col gap-1.5">
          <span class="txt-mono-caption text-neutral-text-muted">{{ size }}</span>
          <SearchInput :size="size" placeholder="Rechercher…" />
        </div>
      </div>
    `,
  }),
}
