import type { Meta, StoryObj } from '@storybook/vue3'

/**
 * Boilerplate placeholder — replace with real `apps/web` components as the app grows.
 * Web Storybook also loads `@stallning/ui` stories for composition context.
 */
const meta = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-3 p-4">
        <h1 class="txt-h4 text-neutral-text">{{ $t('hell') }}</h1>
        <p class="txt-base text-neutral-text-subtle">
          Web Storybook is ready. Add components under <code>apps/web/app/components</code>
          and co-locate <code>*.stories.ts</code> files.
        </p>
        <UIButton text="UI Button from layer" intent="primary" />
      </div>
    `,
  }),
  tags: ['autodocs'],
  title: 'Web/Boilerplate',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Welcome: Story = {}
