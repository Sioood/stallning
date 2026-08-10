import Alert from './Alert.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    description: 'Something happened',
    // `UIAlert` narrows intent to neutral | success | warning | error | info.
    intent: 'info',
    title: 'Alert',
  },
  component: Alert,
  tags: ['autodocs'],
  title: 'UI/Alert',
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {}

export const Success: Story = {
  args: { description: 'All good.', intent: 'success', title: 'Success' },
}

export const Error: Story = {
  args: { description: 'Something went wrong.', intent: 'error', title: 'Error' },
}
