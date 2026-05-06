<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'

const dividerCVA = cva('divider', {
  variants: {
    intent: {
      neutral: 'bg-neutral-border-subtle',
      primary: 'bg-primary-border-subtle',
      secondary: 'bg-secondary-border-subtle',
      accent: 'bg-accent-border-subtle',
    },
    size: {
      sm: 'h-0.25 w-0.25',
      md: 'h-0.5 w-0.5',
      lg: 'h-0.75 w-0.75',
    },
    orientation: {
      horizontal: 'min-w-8 w-full',
      vertical: 'min-h-8 h-full',
    },
  },
})

type DividerCVAProps = VariantProps<typeof dividerCVA>

interface DividerProps {
  intent?: DividerCVAProps['intent']
  orientation?: DividerCVAProps['orientation']
  size?: DividerCVAProps['size']
  ui?: {
    root?: string
  }
}

withDefaults(defineProps<DividerProps>(), {
  intent: 'primary',
  size: 'md',
  orientation: 'horizontal',
  ui: undefined,
})
</script>

<template>
  <span :class="cn(dividerCVA({ intent, size, orientation }), ui?.root)" />
</template>
