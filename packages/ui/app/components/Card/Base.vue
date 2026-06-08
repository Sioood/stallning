<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'

import type {
  CardIntent,
  CardSize,
  CardVariant,
  UICardBaseSlots,
} from '~/utils/Components/Card/context'

const cardCVA = cva('', {
  compoundVariants: [
    /** default */
    {
      class: 'border-neutral-border-default bg-neutral-surface-default text-neutral-text-default',
      intent: 'neutral',
      variant: 'default',
    },
    {
      class: 'border-primary-border-default bg-primary-surface-default text-primary-text-default',
      intent: 'primary',
      variant: 'default',
    },
    {
      class:
        'border-secondary-border-default bg-secondary-surface-default text-secondary-text-default',
      intent: 'secondary',
      variant: 'default',
    },
    {
      class: 'border-accent-border-default bg-accent-surface-default text-accent-text-default',
      intent: 'accent',
      variant: 'default',
    },
    /** subtle */
    {
      class: 'border-accent-border-subtle bg-accent-surface-subtle text-accent-text-subtle',
      intent: 'accent',
      variant: 'subtle',
    },
    {
      class: 'border-neutral-border-subtle bg-neutral-surface-subtle text-neutral-text-subtle',
      intent: 'neutral',
      variant: 'subtle',
    },
    {
      class: 'border-primary-border-subtle bg-primary-surface-subtle text-primary-text-subtle',
      intent: 'primary',
      variant: 'subtle',
    },
    {
      class:
        'border-secondary-border-subtle bg-secondary-surface-subtle text-secondary-text-subtle',
      intent: 'secondary',
      variant: 'subtle',
    },
    {
      class: 'border-accent-border-subtle bg-accent-surface-subtle text-accent-text-subtle',
      intent: 'accent',
      variant: 'subtle',
    },
    /** strong */
    {
      class: 'border-neutral-border-strong bg-neutral-surface-strong text-neutral-text-strong',
      intent: 'neutral',
      variant: 'strong',
    },
    {
      class: 'border-primary-border-strong bg-primary-surface-strong text-primary-text-strong',
      intent: 'primary',
      variant: 'strong',
    },
    {
      class:
        'border-secondary-border-strong bg-secondary-surface-strong text-secondary-text-strong',
      intent: 'secondary',
      variant: 'strong',
    },
    {
      class: 'border-accent-border-strong bg-accent-surface-strong text-accent-text-strong',
      intent: 'accent',
      variant: 'strong',
    },
    /** inverse */
    {
      class: 'border-neutral-border-inverse bg-neutral-surface-inverse text-neutral-text-inverse',
      intent: 'neutral',
      variant: 'inverse',
    },
    {
      class: 'border-primary-border-inverse bg-primary-surface-inverse text-primary-text-inverse',
      intent: 'primary',
      variant: 'inverse',
    },
    {
      class:
        'border-secondary-border-inverse bg-secondary-surface-inverse text-secondary-text-inverse',
      intent: 'secondary',
      variant: 'inverse',
    },
    {
      class: 'border-accent-border-inverse bg-accent-surface-inverse text-accent-text-inverse',
      intent: 'accent',
      variant: 'inverse',
    },
  ],
  variants: {
    intent: {
      accent: '',
      neutral: '',
      primary: '',
      secondary: '',
    } satisfies Record<CardIntent, string>,
    size: {
      lg: 'p-4',
      md: 'p-2',
      sm: 'p-1',
    } satisfies Record<CardSize, string>,
    variant: {
      default: 'border',
      inverse: 'border',
      strong: 'border',
      subtle: 'border',
    } satisfies Record<CardVariant, string>,
  },
})

const cardHeaderFooterCVA = cva('', {
  compoundVariants: [
    /** default */
    {
      class: 'border-neutral-border-default bg-neutral-surface-strong text-neutral-text-strong',
      intent: 'neutral',
      variant: 'default',
    },
    {
      class: 'border-primary-border-default bg-primary-surface-strong text-primary-text-strong',
      intent: 'primary',
      variant: 'default',
    },
    {
      class:
        'border-secondary-border-default bg-secondary-surface-strong text-secondary-text-strong',
      intent: 'secondary',
      variant: 'default',
    },
    {
      class: 'border-accent-border-default bg-accent-surface-strong text-accent-text-strong',
      intent: 'accent',
      variant: 'default',
    },
    /** subtle */
    {
      class: 'border-accent-border-subtle bg-accent-surface-default text-accent-text-default',
      intent: 'accent',
      variant: 'subtle',
    },
    {
      class: 'border-neutral-border-subtle bg-neutral-surface-default text-neutral-text-default',
      intent: 'neutral',
      variant: 'subtle',
    },
    {
      class: 'border-primary-border-subtle bg-primary-surface-default text-primary-text-default',
      intent: 'primary',
      variant: 'subtle',
    },
    {
      class:
        'border-secondary-border-subtle bg-secondary-surface-default text-secondary-text-default',
      intent: 'secondary',
      variant: 'subtle',
    },
    {
      class: 'border-accent-border-subtle bg-accent-surface-default text-accent-text-default',
      intent: 'accent',
      variant: 'subtle',
    },
    /** strong */
    {
      class: 'border-neutral-border-strong bg-neutral-surface-strong text-neutral-text-strong',
      intent: 'neutral',
      variant: 'strong',
    },
    {
      class: 'border-primary-border-strong bg-primary-surface-strong text-primary-text-strong',
      intent: 'primary',
      variant: 'strong',
    },
    {
      class:
        'border-secondary-border-strong bg-secondary-surface-strong text-secondary-text-strong',
      intent: 'secondary',
      variant: 'strong',
    },
    {
      class: 'border-accent-border-strong bg-accent-surface-strong text-accent-text-strong',
      intent: 'accent',
      variant: 'strong',
    },
    /** inverse */
    {
      class: 'border-neutral-border-inverse bg-neutral-surface-inverse text-neutral-text-inverse',
      intent: 'neutral',
      variant: 'inverse',
    },
    {
      class: 'border-primary-border-inverse bg-primary-surface-inverse text-primary-text-inverse',
      intent: 'primary',
      variant: 'inverse',
    },
    {
      class:
        'border-secondary-border-inverse bg-secondary-surface-inverse text-secondary-text-inverse',
      intent: 'secondary',
      variant: 'inverse',
    },
    {
      class: 'border-accent-border-inverse bg-accent-surface-inverse text-accent-text-inverse',
      intent: 'accent',
      variant: 'inverse',
    },
  ],
  variants: {
    intent: {
      accent: '',
      neutral: '',
      primary: '',
      secondary: '',
    } satisfies Record<CardIntent, string>,
    size: {
      lg: 'p-4',
      md: 'p-2',
      sm: 'p-1',
    } satisfies Record<CardSize, string>,
    variant: {
      default: 'border',
      inverse: 'border',
      strong: 'border',
      subtle: 'border',
    } satisfies Record<CardVariant, string>,
  },
})

type CardCVAProps = VariantProps<typeof cardCVA>

export interface CardBaseProps {
  variant?: CardCVAProps['variant']
  intent?: CardCVAProps['intent']
  size?: CardCVAProps['size']
  ui?: Partial<UICardBaseSlots>
}

withDefaults(defineProps<CardBaseProps>(), {
  intent: 'primary',
  size: 'md',
  ui: undefined,
  variant: 'default',
})
</script>

<template>
  <div class="join join-vertical" :class="ui?.root">
    <div
      v-if="$slots.header"
      :class="cn('join-item', cardHeaderFooterCVA({ variant, intent, size }), ui?.header)"
    >
      <slot name="header" />
    </div>
    <div :class="cn('join-item', cardCVA({ variant, intent, size }), ui?.body)">
      <slot :class="cn(ui?.content)" />
    </div>
    <div
      v-if="$slots.footer"
      :class="cn('join-item', cardHeaderFooterCVA({ variant, intent, size }), ui?.footer)"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
