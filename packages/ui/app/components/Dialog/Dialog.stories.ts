import { createGalleryStory } from '~/utils/storybook'

import Button from '../Button.vue'

import DialogDemo from './Dialog.demo.vue'
import Component from './index.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    description: 'Confirm this action or dismiss the dialog.',
    intent: 'primary',
    title: 'Dialog Title',
  },
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Dialog/Dialog',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {
  render: (args) => ({
    components: { UIButton: Button, UIComponent: Component },
    setup: () => ({ args }),
    template: `
      <UIComponent v-bind="args">
        <template #trigger>
          <UIButton type="button" variant="subtle" :intent="args.intent ?? 'primary'">
            Open dialog
          </UIButton>
        </template>
        <p class="txt-base text-neutral-text">
          Dialog body content. Use Controls to change title, intent, and size.
        </p>
      </UIComponent>
    `,
  }),
}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(DialogDemo)
