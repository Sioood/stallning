import { createGalleryStory } from '~/utils/storybook'

import Component from './Group.vue'
import ToggleGroupDemo from './ToggleGroup.demo.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    activeBackground: true,
    defaultValue: ['center'],
    intent: 'primary',
    options: [
      { icon: 'tabler:align-left', title: 'Align Left', value: 'left' },
      { icon: 'tabler:align-center', title: 'Align Center', value: 'center' },
      { icon: 'tabler:align-right', title: 'Align Right', value: 'right' },
      { icon: 'tabler:align-justified', title: 'Justify', value: 'justify' },
    ],
    size: 'sm',
  },
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Toggle/ToggleGroup',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(ToggleGroupDemo)
