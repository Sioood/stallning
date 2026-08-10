import { createGalleryStory } from '~/utils/storybook'

import Component from './index.vue'
import ToggleDemo from './Toggle.demo.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    activeBackground: true,
    intent: 'primary',
    size: 'sm',
    variant: 'ghost',
  },
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Toggle/Toggle',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {
  render: (args) => ({
    components: { UIComponent: Component },
    setup: () => ({ args }),
    template: `
      <UIComponent v-bind="args">
        <template #on>
          <Icon name="tabler:bell-filled" class="size-4" />
        </template>
        <template #off>
          <Icon name="tabler:bell" class="size-4" />
        </template>
      </UIComponent>
    `,
  }),
}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(ToggleDemo)
