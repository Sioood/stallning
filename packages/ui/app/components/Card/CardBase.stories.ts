import { createGalleryStory } from '~/utils/storybook'

import Component from './Base.vue'
import CardBaseDemo from './CardBase.demo.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Card/CardBase',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {
  render: (args) => ({
    components: { UIComponent: Component },
    setup: () => ({ args }),
    template: `
      <UIComponent v-bind="args" class="max-w-sm p-4">
        <p class="txt-base text-neutral-text">Card body content</p>
      </UIComponent>
    `,
  }),
}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(CardBaseDemo)
