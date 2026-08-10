import { createGalleryStory } from '~/utils/storybook'

import Component from './index.vue'
import SegmentGroupDemo from './SegmentGroup.demo.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    defaultValue: 'react',
    intent: 'primary',
    options: [
      { label: 'React', value: 'react' },
      { label: 'Solid', value: 'solid' },
      { label: 'Svelte', value: 'svelte' },
      { label: 'Vue', value: 'vue' },
    ],
    size: 'md',
    variant: 'line',
  },
  component: Component,
  tags: ['autodocs'],
  title: 'UI/SegmentGroup/SegmentGroup',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(SegmentGroupDemo)
