import { createGalleryStory } from '~/utils/storybook'

import LegendDemo from './Legend.demo.vue'
import Component from './Legend.vue'
import { musicFormatSeries } from './stacked-bar-data'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    placement: 'top-center',
    series: musicFormatSeries,
    show: true,
    size: 'md',
  },
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Chart/Legend',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(LegendDemo)
