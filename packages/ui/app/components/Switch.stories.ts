import { createGalleryStory } from '~/utils/storybook'

import SwitchDemo from './Switch.demo.vue'
import Component from './Switch.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    disabled: false,
    intent: 'primary',
    size: 'md',
  },
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Switch',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(SwitchDemo)
