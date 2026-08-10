import { createGalleryStory } from '~/utils/storybook'

import Component from './index.vue'
import MenuDemo from './Menu.demo.vue'

import type { Meta, StoryObj } from '@storybook/vue3'
import type { MenuListEntry } from '~/utils/Components/Menu/entries'

const playgroundItems: MenuListEntry[] = [
  { label: 'New File', type: 'item', value: 'new-file' },
  { label: 'Open…', type: 'item', value: 'open' },
  { label: 'Save', type: 'item', value: 'save' },
  { type: 'separator' },
  {
    items: [
      { label: 'PDF', type: 'item', value: 'export-pdf' },
      { label: 'PNG', type: 'item', value: 'export-png' },
    ],
    label: 'Export',
    type: 'group',
  },
]

const meta = {
  args: {
    intent: 'neutral',
    items: playgroundItems,
    showIndicator: true,
    size: 'md',
    triggerText: 'File',
  },
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Menu/Menu',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — built-in trigger via `triggerText`. */
export const Playground: Story = {}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(MenuDemo)
