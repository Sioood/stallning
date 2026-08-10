import { useToast } from '~/composables/useToast'
import { createGalleryStory } from '~/utils/storybook'

import Button from './Button.vue'
import ToastDemo from './Toast.demo.vue'
import Component from './Toast.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    closable: true,
    description: 'Use Gallery for the full toast matrix.',
    title: 'Hello from Playground',
    type: 'info',
  },
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Toast',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — tweak payload in Controls, then click Show. */
export const Playground: Story = {
  render: (args) => ({
    components: { UIButton: Button, UIComponent: Component },
    setup() {
      const toaster = useToast()
      const show = () => {
        toaster.value?.create({
          closable: Boolean(args.closable),
          description: String(args.description ?? ''),
          title: String(args.title ?? ''),
          type: args.type as 'info' | 'success' | 'warning' | 'error' | 'loading',
        })
      }
      return { show, toaster }
    },
    template: `
      <div class="flex flex-col gap-4 p-4">
        <UIButton type="button" variant="subtle" intent="primary" class="w-fit" @click="show">
          Show toast
        </UIButton>
        <UIComponent v-if="toaster" />
      </div>
    `,
  }),
}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(ToastDemo)
