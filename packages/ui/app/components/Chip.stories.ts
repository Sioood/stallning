import Chip from './Chip.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    intent: 'neutral',
    label: 'Chip',
  },
  component: Chip,
  tags: ['autodocs'],
  title: 'UI/Chip',
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {}

export const Primary: Story = {
  args: { intent: 'primary', label: 'Primary' },
}
