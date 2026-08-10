import { createGalleryStory } from '~/utils/storybook'

import CheckboxGroupDemo from './CheckboxGroup.demo.vue'
import Component from './CheckboxGroup.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    helperText: 'Choose your preferred frameworks',
    intent: 'primary',
    items: [
      { label: 'React', value: 'react' },
      { label: 'Solid', value: 'solid' },
      { label: 'Vue', value: 'vue' },
      { label: 'Svelte', value: 'svelte' },
    ],
    label: 'Frameworks',
    modelValue: ['vue'],
    name: 'frameworks',
    orientation: 'vertical',
    size: 'md',
  },
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Form/CheckboxGroup',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(CheckboxGroupDemo)
