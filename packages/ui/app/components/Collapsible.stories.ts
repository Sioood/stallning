import { createGalleryStory } from '~/utils/storybook'

import CollapsibleDemo from './Collapsible.demo.vue'
import Component from './Collapsible.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    heading: 'What is a Collapsible?',
  },
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Collapsible',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {
  render: (args) => ({
    components: { UIComponent: Component },
    setup: () => ({ args }),
    template: `
      <UIComponent v-bind="args" class="max-w-lg">
        A Collapsible shows or hides content with an animated transition. Perfect for FAQs and
        progressive disclosure.
      </UIComponent>
    `,
  }),
}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(CollapsibleDemo)
