import { createGalleryStory } from '~/utils/storybook'

import Component from './index.vue'
import TreeViewDemo from './TreeView.demo.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    defaultExpandedValue: ['src'],
    intent: 'primary',
    items: [
      {
        children: [
          { id: 'src/app.vue', label: 'app.vue' },
          { id: 'src/main.ts', label: 'main.ts' },
        ],
        id: 'src',
        label: 'src',
      },
      { id: 'package.json', label: 'package.json' },
      { id: 'readme.md', label: 'README.md' },
    ],
    label: 'Project files',
    mode: 'normal',
    size: 'md',
  },
  component: Component,
  tags: ['autodocs'],
  title: 'UI/TreeView/TreeView',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(TreeViewDemo)
