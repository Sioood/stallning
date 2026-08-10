import Badge from './Badge.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    intent: 'primary',
    label: 'Badge',
  },
  component: Badge,
  tags: ['autodocs'],
  title: 'UI/Badge',
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {}

export const Neutral: Story = {
  args: { intent: 'neutral', label: 'Neutral' },
}

export const Accent: Story = {
  args: { intent: 'accent', label: 'Accent' },
}
