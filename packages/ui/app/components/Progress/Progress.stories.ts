import { createGalleryStory } from '~/utils/storybook'

import Component from './index.vue'
import ProgressDemo from './Progress.demo.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    label: 'Loading',
    modelValue: 65,
  },
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Progress/Progress',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(ProgressDemo)
