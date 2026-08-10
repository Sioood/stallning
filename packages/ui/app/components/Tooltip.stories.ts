import { createGalleryStory } from '~/utils/storybook'

import Button from './Button.vue'
import TooltipDemo from './Tooltip.demo.vue'
import Component from './Tooltip.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    closeDelay: 100,
    content: 'Tooltip content',
    disabled: false,
    intent: 'primary',
    openDelay: 0,
  },
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Tooltip',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {
  render: (args) => ({
    components: { UIButton: Button, UIComponent: Component },
    setup: () => ({ args }),
    template: `
      <div class="flex min-h-32 items-center justify-center p-8">
        <UIComponent v-bind="args">
          <template #trigger>
            <UIButton type="button" variant="subtle" intent="primary">
              Hover me
            </UIButton>
          </template>
        </UIComponent>
      </div>
    `,
  }),
}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(TooltipDemo)
