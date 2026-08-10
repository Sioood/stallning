import { createGalleryStory } from '~/utils/storybook'

import FileUploadDemo from './FileUpload.demo.vue'
import Component from './index.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  component: Component,
  tags: ['autodocs'],
  title: 'UI/FileUpload/FileUpload',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(FileUploadDemo)
