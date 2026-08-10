import Button from './Button.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    disabled: false,
    icon: 'tabler:scribble',
    intent: 'primary',
    leading: true,
    size: 'md',
    text: 'Button',
    trailing: true,
    variant: 'default',
  },
  component: Button,
  tags: ['autodocs'],
  title: 'UI/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {}

export const Primary: Story = {
  args: { intent: 'primary', text: 'Primary' },
}

export const Secondary: Story = {
  args: { intent: 'secondary', text: 'Secondary' },
}

export const Subtle: Story = {
  args: { text: 'Subtle', variant: 'subtle' },
}

export const Disabled: Story = {
  args: { disabled: true, text: 'Disabled' },
}
