import { createGalleryStory } from '~/utils/storybook'

import CarouselDemo from './Carousel.demo.vue'
import Component from './index.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    items: [
      { alt: 'Nature landscape', src: 'https://picsum.photos/seed/carousel-1/800/480' },
      { alt: 'City skyline', src: 'https://picsum.photos/seed/carousel-2/800/480' },
      { alt: 'Mountain view', src: 'https://picsum.photos/seed/carousel-3/800/480' },
    ],
  },
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Carousel/Carousel',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(CarouselDemo)
