import { createGalleryStory } from '~/utils/storybook'

import QRCodeDemo from './QRCode.demo.vue'
import Component from './QRCode.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    class: 'size-32',
    modelValue: 'https://stallning.dev',
  },
  component: Component,
  tags: ['autodocs'],
  title: 'UI/QRCode',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(QRCodeDemo)
