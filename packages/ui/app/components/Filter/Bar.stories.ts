import { createGalleryStory } from '~/utils/storybook'

import BarDemo from './Bar.demo.vue'
import Component from './Bar.vue'

import type { Meta, StoryObj } from '@storybook/vue3'
import type { FilterSchema } from '~/utils/Components/Filter/schema'

interface Project {
  category: string
  description: string
  id: number
  name: string
  premium: boolean
  status: 'active' | 'archived'
}

const schema = {
  category: {
    defaultValue: [] as string[],
    getValue: (item: Project) => item.category,
    props: {
      options: [
        { title: 'Web', value: 'web' },
        { title: 'Mobile', value: 'mobile' },
        { title: 'Design', value: 'design' },
      ],
    },
    type: 'toggle-group',
  },
  premium: {
    defaultValue: false,
    getValue: (item: Project) => item.premium,
    label: 'Premium uniquement',
    type: 'toggle',
    variant: 'switch',
  },
  search: {
    defaultValue: '',
    fuse: {
      fuseOptions: {
        keys: ['name', 'description'],
        threshold: 0.35,
        useTokenSearch: true,
      },
      matchAllWhenSearchEmpty: true,
    },
    label: 'Rechercher',
    placeholder: 'Nom ou description…',
    type: 'search',
  },
  status: {
    defaultValue: [] as string[],
    getValue: (item: Project) => item.status,
    label: 'Statut',
    props: {
      items: [
        { label: 'Actif', value: 'active' },
        { label: 'Archivé', value: 'archived' },
      ],
      placeholder: 'Tous les statuts',
    },
    type: 'select',
  },
} satisfies FilterSchema<Project>

const meta = {
  args: {
    intent: 'primary',
    layout: ['search', ['status', 'premium', 'category']],
    schema,
    size: 'md',
  },
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Filter/Bar',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(BarDemo)
