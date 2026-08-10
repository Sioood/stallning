import Divider from './Divider.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    intent: 'primary',
    orientation: 'horizontal',
    size: 'md',
  },
  component: Divider,
  tags: ['autodocs'],
  title: 'UI/Divider',
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {
  render: (args) => ({
    components: { UIComponent: Divider },
    setup: () => ({ args }),
    template: `
      <div class="flex h-24 w-full max-w-md items-center p-4">
        <UIComponent v-bind="args" />
      </div>
    `,
  }),
}
