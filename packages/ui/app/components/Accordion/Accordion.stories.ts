import { createGalleryStory } from '~/utils/storybook'

import AccordionDemo from './Accordion.demo.vue'
import Component from './index.vue'
import AccordionItem from './Item.vue'
import AccordionItemContent from './ItemContent.vue'
import AccordionItemIndicator from './ItemIndicator.vue'
import AccordionItemTrigger from './ItemTrigger.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    collapsible: true,
    defaultValue: ['what'],
    intent: 'neutral',
    size: 'md',
  },
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Accordion/Accordion',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {
  render: (args) => ({
    components: {
      UIAccordionItem: AccordionItem,
      UIAccordionItemContent: AccordionItemContent,
      UIAccordionItemIndicator: AccordionItemIndicator,
      UIAccordionItemTrigger: AccordionItemTrigger,
      UIComponent: Component,
    },
    setup: () => ({ args }),
    template: `
      <UIComponent v-bind="args" class="max-w-lg">
        <UIAccordionItem value="what">
          <UIAccordionItemTrigger>
            <span class="font-medium">What is this UI library?</span>
            <UIAccordionItemIndicator />
          </UIAccordionItemTrigger>
          <UIAccordionItemContent>
            A high-performance, accessible component library built on Ark UI and Tailwind.
          </UIAccordionItemContent>
        </UIAccordionItem>
        <UIAccordionItem value="why">
          <UIAccordionItemTrigger>
            <span class="font-medium">Why choose this?</span>
            <UIAccordionItemIndicator />
          </UIAccordionItemTrigger>
          <UIAccordionItemContent>
            Extreme type safety, Nuxt layers, and a cohesive design system.
          </UIAccordionItemContent>
        </UIAccordionItem>
      </UIComponent>
    `,
  }),
}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(AccordionDemo)
