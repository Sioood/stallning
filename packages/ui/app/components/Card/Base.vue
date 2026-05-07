<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'

import type { ClassValue } from 'vue'

const cardCVA = cva('card', {
  variants: {
    variant: {
      default: 'border',
      subtle: 'border',
      strong: 'border',
      inverse: 'border',
    },
    intent: {
      neutral: '',
      primary: '',
      secondary: '',
      accent: '',
    },
    size: {
      sm: 'p-1',
      md: 'p-2',
      lg: 'p-4',
    },
  },
  compoundVariants: [
    /** default */
    {
      variant: 'default',
      intent: 'neutral',
      class: 'bg-neutral-surface-default border-neutral-border-default text-neutral-text-default',
    },
    {
      variant: 'default',
      intent: 'primary',
      class: 'bg-primary-surface-default border-primary-border-default text-primary-text-default',
    },
    {
      variant: 'default',
      intent: 'secondary',
      class:
        'bg-secondary-surface-default border-secondary-border-default text-secondary-text-default',
    },
    /** subtle */
    {
      variant: 'subtle',
      intent: 'accent',
      class: 'bg-accent-surface-subtle border-accent-border-subtle text-accent-text-subtle',
    },
    {
      variant: 'subtle',
      intent: 'neutral',
      class: 'bg-neutral-surface-subtle border-neutral-border-subtle text-neutral-text-subtle',
    },
    {
      variant: 'subtle',
      intent: 'primary',
      class: 'bg-primary-surface-subtle border-primary-border-subtle text-primary-text-subtle',
    },
    {
      variant: 'subtle',
      intent: 'secondary',
      class:
        'bg-secondary-surface-subtle border-secondary-border-subtle text-secondary-text-subtle',
    },
    {
      variant: 'subtle',
      intent: 'accent',
      class: 'bg-accent-surface-subtle border-accent-border-subtle text-accent-text-subtle',
    },
    /** strong */
    {
      variant: 'strong',
      intent: 'neutral',
      class: 'bg-neutral-surface-strong border-neutral-border-strong text-neutral-text-strong',
    },
    {
      variant: 'strong',
      intent: 'primary',
      class: 'bg-primary-surface-strong border-primary-border-strong text-primary-text-strong',
    },
    {
      variant: 'strong',
      intent: 'secondary',
      class:
        'bg-secondary-surface-strong border-secondary-border-strong text-secondary-text-strong',
    },
    {
      variant: 'strong',
      intent: 'accent',
      class: 'bg-accent-surface-strong border-accent-border-strong text-accent-text-strong',
    },
    /** inverse */
    {
      variant: 'inverse',
      intent: 'neutral',
      class: 'bg-neutral-surface-inverse border-neutral-border-inverse text-neutral-text-inverse',
    },
    {
      variant: 'inverse',
      intent: 'primary',
      class: 'bg-primary-surface-inverse border-primary-border-inverse text-primary-text-inverse',
    },
    {
      variant: 'inverse',
      intent: 'secondary',
      class:
        'bg-secondary-surface-inverse border-secondary-border-inverse text-secondary-text-inverse',
    },
    {
      variant: 'inverse',
      intent: 'accent',
      class: 'bg-accent-surface-inverse border-accent-border-inverse text-accent-text-inverse',
    },
  ],
})

type CardCVAProps = VariantProps<typeof cardCVA>

interface UICardSlots {
  root?: ClassValue
  content?: ClassValue
}

interface CardProps {
  variant?: CardCVAProps['variant']
  intent?: CardCVAProps['intent']
  size?: CardCVAProps['size']
  ui?: UICardSlots
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
