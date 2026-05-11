<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'

import type { CardIntent, CardSize, CardVariant, UICardSlots } from './context'

export type { UICardSlots } from './context'

const cardCVA = cva('', {
  variants: {
    variant: {
      default: 'border',
      subtle: 'border',
      strong: 'border',
      inverse: 'border',
    } satisfies Record<CardVariant, string>,
    intent: {
      neutral: '',
      primary: '',
      secondary: '',
      accent: '',
    } satisfies Record<CardIntent, string>,
    size: {
      sm: 'p-1',
      md: 'p-2',
      lg: 'p-4',
    } satisfies Record<CardSize, string>,
  },
  compoundVariants: [
    /** default */
    {
      variant: 'default',
      intent: 'neutral',
      class: 'border-neutral-border-default bg-neutral-surface-default text-neutral-text-default',
    },
    {
      variant: 'default',
      intent: 'primary',
      class: 'border-primary-border-default bg-primary-surface-default text-primary-text-default',
    },
    {
      variant: 'default',
      intent: 'secondary',
      class:
        'border-secondary-border-default bg-secondary-surface-default text-secondary-text-default',
    },
    /** subtle */
    {
      variant: 'subtle',
      intent: 'accent',
      class: 'border-accent-border-subtle bg-accent-surface-subtle text-accent-text-subtle',
    },
    {
      variant: 'subtle',
      intent: 'neutral',
      class: 'border-neutral-border-subtle bg-neutral-surface-subtle text-neutral-text-subtle',
    },
    {
      variant: 'subtle',
      intent: 'primary',
      class: 'border-primary-border-subtle bg-primary-surface-subtle text-primary-text-subtle',
    },
    {
      variant: 'subtle',
      intent: 'secondary',
      class:
        'border-secondary-border-subtle bg-secondary-surface-subtle text-secondary-text-subtle',
    },
    {
      variant: 'subtle',
      intent: 'accent',
      class: 'border-accent-border-subtle bg-accent-surface-subtle text-accent-text-subtle',
    },
    /** strong */
    {
      variant: 'strong',
      intent: 'neutral',
      class: 'border-neutral-border-strong bg-neutral-surface-strong text-neutral-text-strong',
    },
    {
      variant: 'strong',
      intent: 'primary',
      class: 'border-primary-border-strong bg-primary-surface-strong text-primary-text-strong',
    },
    {
      variant: 'strong',
      intent: 'secondary',
      class:
        'border-secondary-border-strong bg-secondary-surface-strong text-secondary-text-strong',
    },
    {
      variant: 'strong',
      intent: 'accent',
      class: 'border-accent-border-strong bg-accent-surface-strong text-accent-text-strong',
    },
    /** inverse */
    {
      variant: 'inverse',
      intent: 'neutral',
      class: 'border-neutral-border-inverse bg-neutral-surface-inverse text-neutral-text-inverse',
    },
    {
      variant: 'inverse',
      intent: 'primary',
      class: 'border-primary-border-inverse bg-primary-surface-inverse text-primary-text-inverse',
    },
    {
      variant: 'inverse',
      intent: 'secondary',
      class:
        'border-secondary-border-inverse bg-secondary-surface-inverse text-secondary-text-inverse',
    },
    {
      variant: 'inverse',
      intent: 'accent',
      class: 'border-accent-border-inverse bg-accent-surface-inverse text-accent-text-inverse',
    },
  ],
})

type CardCVAProps = VariantProps<typeof cardCVA>

interface CardProps {
  variant?: CardCVAProps['variant']
  intent?: CardCVAProps['intent']
  size?: CardCVAProps['size']
  ui?: Partial<UICardSlots>
}

withDefaults(defineProps<CardProps>(), {
  variant: 'default',
  intent: 'primary',
  size: 'md',
  ui: undefined,
})
</script>

<template>
  <div :class="cn(cardCVA({ variant, intent, size }), ui?.root)">
    <slot :class="cn(ui?.content)" />
  </div>
</template>
