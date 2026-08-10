import { useTour } from '@ark-ui/vue/tour'
import { onMounted } from 'vue'

import { createGalleryStory } from '~/utils/storybook'

import Component from './index.vue'
import TourDemo from './Tour.demo.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Tour/Tour',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — starts a dialog tour step. */
export const Playground: Story = {
  render: () => ({
    components: { UIComponent: Component },
    setup() {
      const tour = useTour({
        steps: [
          {
            actions: [{ action: 'dismiss', label: 'Fermer' }],
            description: "Découvrons ensemble les fonctionnalités principales de l'application.",
            id: 'welcome',
            title: 'Bienvenue !',
            type: 'dialog',
          },
        ],
      })
      onMounted(() => {
        tour.value.start()
      })
      return { tour }
    },
    template: '<UIComponent :tour="tour" />',
  }),
}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(TourDemo)
