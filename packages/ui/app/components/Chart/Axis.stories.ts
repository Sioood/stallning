import { VisLine, VisXYContainer } from '@unovis/vue'

import { createGalleryStory } from '~/utils/storybook'

import AxisDemo from './Axis.demo.vue'
import Component from './Axis.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

type Point = { x: number; y: number }

const axisData: Point[] = Array.from({ length: 12 }, (_, index) => ({
  x: index + 1,
  y: Math.round((Math.sin(index / 2) + 1.5) * 40),
}))

const meta = {
  args: {
    label: 'Month',
    numTicks: 6,
    show: true,
    type: 'x',
  },
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Chart/Axis',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — Axis must sit inside VisXYContainer with data. */
export const Playground: Story = {
  render: (args) => ({
    components: {
      UIChartAxis: Component,
      UIComponent: Component,
      VisLine,
      VisXYContainer,
    },
    setup: () => ({
      args,
      data: axisData,
      x: (d: Point) => d.x,
      y: (d: Point) => d.y,
    }),
    template: `
      <div class="max-w-lg [--vis-axis-grid-color:var(--color-neutral-border-subtle)] [--vis-axis-text-color:var(--color-neutral-text)] [--vis-axis-tick-color:var(--color-neutral-border-subtle)]">
        <VisXYContainer :data="data" :height="280">
          <VisLine :x="x" :y="y" />
          <UIComponent v-bind="args" />
          <UIChartAxis type="y" label="Value" :grid-line="true" />
        </VisXYContainer>
      </div>
    `,
  }),
}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(AxisDemo)
