import Placeholder from './Placeholder.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    description: 'Replace this component with real web UI.',
    title: 'Placeholder',
  },
  component: Placeholder,
  tags: ['autodocs'],
  title: 'Web/Placeholder',
} satisfies Meta<typeof Placeholder>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
