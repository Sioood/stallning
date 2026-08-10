import { createGalleryStory } from '~/utils/storybook'

import InputDemo from './Input.demo.vue'
import Component from './Input.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Form/Input',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(InputDemo)
