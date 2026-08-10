import { createGalleryStory } from '~/utils/storybook'

import Component from './index.vue'
import TableDemo from './Table.demo.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const sampleData = [
  {
    amount: 594,
    email: 'james.anderson@example.com',
    id: '4600',
    status: 'paid',
  },
  {
    amount: 276,
    email: 'mia.white@example.com',
    id: '4599',
    status: 'failed',
  },
  {
    amount: 315,
    email: 'william.brown@example.com',
    id: '4598',
    status: 'refunded',
  },
  {
    amount: 529,
    email: 'emma.davis@example.com',
    id: '4597',
    status: 'paid',
  },
  {
    amount: 639,
    email: 'ethan.harris@example.com',
    id: '4596',
    status: 'paid',
  },
]

const meta = {
  args: {
    data: sampleData,
    empty: 'No data',
    loading: false,
    sticky: 'header',
  },
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Table/Table',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(TableDemo)
