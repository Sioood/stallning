import { createGalleryStory } from '~/utils/storybook'

import CardDemo from './Card.demo.vue'
import Component from './index.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    description: 'Card description for the playground.',
    subtitle: 'vol. 01 / phase 1',
    tag: 'on track',
    title: 'Card Title',
  },
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Card/Card',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(CardDemo)
