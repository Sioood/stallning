import { expect, userEvent, within } from 'storybook/test'

import { createGalleryStory } from '~/utils/storybook'

import Component from './index.vue'
import TabsDemo from './Tabs.demo.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    defaultValue: 'react',
    intent: 'primary',
    options: [
      { icon: 'tabler:brand-react', label: 'React', value: 'react' },
      { label: 'Solid', value: 'solid' },
      { icon: 'tabler:brand-vue', label: 'Vue', value: 'vue' },
    ],
    size: 'md',
    variant: 'line',
  },
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Tabs/Tabs',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(TabsDemo)

/** Interaction test: clicking a tab selects it and deselects the previous one. */
export const SelectsOnClick: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const react = canvas.getByRole('tab', { name: /react/i })
    const vue = canvas.getByRole('tab', { name: /vue/i })

    await expect(react).toHaveAttribute('aria-selected', 'true')

    await userEvent.click(vue)
    await expect(vue).toHaveAttribute('aria-selected', 'true')
    await expect(react).toHaveAttribute('aria-selected', 'false')
  },
}
