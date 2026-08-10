import { createGalleryStory } from '~/utils/storybook'

import LinkDemo from './Link.demo.vue'
import Component from './Link.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Link',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {
  args: {
    intent: 'primary',
    to: '#',
    variant: 'default',
  },
  render: (args) => ({
    components: { UIComponent: Component },
    setup: () => ({ args }),
    template: `<UIComponent v-bind="args">Link</UIComponent>`,
  }),
}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(LinkDemo)
