import { createGalleryStory } from '~/utils/storybook'

import { formatTrafficPercent, trafficSourceData, trafficSourceSeries, value } from './donut-data'
import DonutDemo from './Donut.demo.vue'
import Component from './Donut.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    centralLabel: '100%',
    centralSubLabel: 'Traffic share',
    data: trafficSourceData,
    height: 300,
    legend: { show: true },
    series: trafficSourceSeries,
    value,
    valueFormatter: (v: number) => formatTrafficPercent(v),
  },
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Chart/Donut',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(DonutDemo)
