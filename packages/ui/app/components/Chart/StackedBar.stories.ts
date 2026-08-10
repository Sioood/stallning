import { createGalleryStory } from '~/utils/storybook'

import {
  formatMusicRevenue,
  musicFormatData,
  musicFormatSeries,
  type MusicFormatRecord,
} from './stacked-bar-data'
import StackedBarDemo from './StackedBar.demo.vue'
import Component from './StackedBar.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    data: musicFormatData.slice(-20),
    height: 450,
    legend: { show: true },
    series: musicFormatSeries,
    valueFormatter: (v: number) => formatMusicRevenue(v),
    x: (d: MusicFormatRecord) => d.year,
  },
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Chart/StackedBar',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(StackedBarDemo)
