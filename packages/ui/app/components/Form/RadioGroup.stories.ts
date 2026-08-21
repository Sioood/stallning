import RadioGroup from './RadioGroup.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const items = [
  { label: 'Team — 5 sièges minimum', value: 'team' },
  { label: 'Business — SSO inclus', value: 'business' },
  { label: 'Entreprise — sur devis', value: 'enterprise' },
]

const meta = {
  args: {
    items,
    label: 'Formule',
    modelValue: 'team',
  },
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'UI/Form/RadioGroup',
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {}

/**
 * Every intent × size combination renders styled.
 *
 * Before the token refactor only `primary` / `md` were populated across this component's
 * four CVAs, so any other combination rendered an unsized, uncoloured control.
 */
export const Matrix: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { RadioGroup },
    setup: () => ({
      intents: ['primary', 'neutral', 'secondary', 'accent', 'success', 'warning', 'error', 'info'],
      items,
      sizes: ['sm', 'md', 'lg'],
    }),
    template: `
      <div class="flex flex-col gap-8 p-4">
        <div v-for="size in sizes" :key="size" class="flex flex-col gap-3">
          <span class="txt-overline text-neutral-text-muted">size = {{ size }}</span>
          <div class="flex flex-wrap gap-8">
            <div v-for="intent in intents" :key="intent" class="flex flex-col gap-1.5">
              <span class="txt-mono-caption text-neutral-text-muted">{{ intent }}</span>
              <RadioGroup
                :items="items"
                :intent="intent"
                :size="size"
                :model-value="items[0].value"
                orientation="vertical"
              />
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Invalid: Story = {
  args: { error: 'Choisissez une formule', invalid: true },
}
