import { createGalleryStory } from '~/utils/storybook'

import Button from './Button.vue'
import PopoverDemo from './Popover.demo.vue'
import Component from './Popover.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    content: 'Popover content. Use Controls to tweak placement and intent.',
    description: 'Short supporting description.',
    intent: 'neutral',
    title: 'Popover',
  },
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Popover',
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
            <UIButton type="button" variant="subtle" intent="neutral">
              Open popover
            </UIButton>
          </template>
        </UIComponent>
      </div>
    `,
  }),
}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(PopoverDemo)
