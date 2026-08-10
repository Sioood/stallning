import { createGalleryStory } from '~/utils/storybook'

import Component from './TagsInput/index.vue'
import TagsInputDemo from './TagsInput.demo.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Form/TagsInput',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(TagsInputDemo)
