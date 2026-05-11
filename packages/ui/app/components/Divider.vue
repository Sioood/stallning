<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'

import type { ClassValue } from 'vue'

type DividerIntent = 'neutral' | 'primary' | 'secondary' | 'accent'
type DividerSize = 'sm' | 'md' | 'lg'
type DividerOrientation = 'horizontal' | 'vertical'

const dividerCVA = cva('divider', {
  variants: {
    intent: {
      neutral: 'bg-neutral-border-subtle',
      primary: 'bg-primary-border-subtle',
      secondary: 'bg-secondary-border-subtle',
      accent: 'bg-accent-border-subtle',
    } satisfies Record<DividerIntent, string>,
    size: {
      sm: 'h-0.25 w-0.25',
      md: 'h-0.5 w-0.5',
      lg: 'h-0.75 w-0.75',
    } satisfies Record<DividerSize, string>,
    orientation: {
      horizontal: 'w-full min-w-8',
      vertical: 'h-full min-h-8',
    } satisfies Record<DividerOrientation, string>,
  },
})

type DividerCVAProps = VariantProps<typeof dividerCVA>

interface UIDividerSlots {
  root?: ClassValue
}

interface DividerProps {
  intent?: DividerCVAProps['intent']
  orientation?: DividerCVAProps['orientation']
  size?: DividerCVAProps['size']
  ui?: Partial<UIDividerSlots>
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
