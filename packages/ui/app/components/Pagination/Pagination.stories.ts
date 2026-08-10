import { createGalleryStory } from '~/utils/storybook'

import Component from './index.vue'
import PaginationDemo from './Pagination.demo.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    count: 150,
    pageSize: 10,
  },
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Pagination/Pagination',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(PaginationDemo)
