import { createGalleryStory } from '~/utils/storybook'

import AvatarDemo from './Avatar.demo.vue'
import Component from './index.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    name: 'Ada Lovelace',
  },
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Avatar/Avatar',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(AvatarDemo)
