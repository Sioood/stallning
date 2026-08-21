<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'

import type { UseComponentIconsProps } from '@/composables/useComponentIcons'
import type { ClassValue } from 'vue'

type BadgeIntent =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'gray'
type BadgeSize = 'sm' | 'md' | 'lg'
type BadgeVariant = 'default' | 'subtle'

const badgeSubtleRootCVA = [
  {
    class: 'border-accent-border-subtle bg-accent-fill-subtle',
    intent: 'accent',
    variant: 'subtle',
  },
  {
    class: 'border-blue-border-subtle bg-blue-fill-subtle',
    intent: 'blue',
    variant: 'subtle',
  },
  {
    class: 'border-error-border-subtle bg-error-fill-subtle',
    intent: 'error',
    variant: 'subtle',
  },
  {
    class: 'border-neutral-border-subtle bg-neutral-fill-subtle',
    intent: 'gray',
    variant: 'subtle',
  },
  {
    class: 'border-green-border-subtle bg-green-fill-subtle',
    intent: 'green',
    variant: 'subtle',
  },
  {
    class: 'border-info-border-subtle bg-info-fill-subtle',
    intent: 'info',
    variant: 'subtle',
  },
  {
    class: 'border-neutral-border-subtle bg-neutral-fill-subtle',
    intent: 'neutral',
    variant: 'subtle',
  },
  {
    class: 'border-orange-border-subtle bg-orange-fill-subtle',
    intent: 'orange',
    variant: 'subtle',
  },
  {
    class: 'border-pink-border-subtle bg-pink-fill-subtle',
    intent: 'pink',
    variant: 'subtle',
  },
  {
    class: 'border-primary-border-subtle bg-primary-fill-subtle',
    intent: 'primary',
    variant: 'subtle',
  },
  {
    class: 'border-purple-border-subtle bg-purple-fill-subtle',
    intent: 'purple',
    variant: 'subtle',
  },
  {
    class: 'border-red-border-subtle bg-red-fill-subtle',
    intent: 'red',
    variant: 'subtle',
  },
  {
    class: 'border-secondary-border-subtle bg-secondary-fill-subtle',
    intent: 'secondary',
    variant: 'subtle',
  },
  {
    class: 'border-success-border-subtle bg-success-fill-subtle',
    intent: 'success',
    variant: 'subtle',
  },
  {
    class: 'border-warning-border-subtle bg-warning-fill-subtle',
    intent: 'warning',
    variant: 'subtle',
  },
  {
    class: 'border-yellow-border-subtle bg-yellow-fill-subtle',
    intent: 'yellow',
    variant: 'subtle',
  },
] as const

const badgeSubtleForegroundCVA = [
  { class: 'text-accent-on-fill-subtle', intent: 'accent', variant: 'subtle' },
  { class: 'text-blue-on-fill-subtle', intent: 'blue', variant: 'subtle' },
  { class: 'text-error-on-fill-subtle', intent: 'error', variant: 'subtle' },
  { class: 'text-neutral-on-fill-subtle', intent: 'gray', variant: 'subtle' },
  { class: 'text-green-on-fill-subtle', intent: 'green', variant: 'subtle' },
  { class: 'text-info-on-fill-subtle', intent: 'info', variant: 'subtle' },
  { class: 'text-neutral-on-fill-subtle', intent: 'neutral', variant: 'subtle' },
  { class: 'text-orange-on-fill-subtle', intent: 'orange', variant: 'subtle' },
  { class: 'text-pink-on-fill-subtle', intent: 'pink', variant: 'subtle' },
  { class: 'text-primary-on-fill-subtle', intent: 'primary', variant: 'subtle' },
  { class: 'text-purple-on-fill-subtle', intent: 'purple', variant: 'subtle' },
  { class: 'text-red-on-fill-subtle', intent: 'red', variant: 'subtle' },
  { class: 'text-secondary-on-fill-subtle', intent: 'secondary', variant: 'subtle' },
  { class: 'text-success-on-fill-subtle', intent: 'success', variant: 'subtle' },
  { class: 'text-warning-on-fill-subtle', intent: 'warning', variant: 'subtle' },
  { class: 'text-yellow-on-fill-subtle', intent: 'yellow', variant: 'subtle' },
] as const

const badgeCVA = cva('flex w-fit items-center justify-center', {
  compoundVariants: [...badgeSubtleRootCVA],
  variants: {
    intent: {
      accent: 'border-accent-border bg-accent-surface',
      blue: 'border-blue-border bg-blue-surface',
      error: 'border-error-border bg-error-surface',
      gray: 'border-neutral-border bg-neutral-surface',
      green: 'border-green-border bg-green-surface',
      info: 'border-info-border bg-info-surface',
      neutral: 'border-neutral-border bg-neutral-surface',
      orange: 'border-orange-border bg-orange-surface',
      pink: 'border-pink-border bg-pink-surface',
      primary: 'border-primary-border bg-primary-surface',
      purple: 'border-purple-border bg-purple-surface',
      red: 'border-red-border bg-red-surface',
      secondary: 'border-secondary-border bg-secondary-surface',
      success: 'border-success-border bg-success-surface',
      warning: 'border-warning-border bg-warning-surface',
      yellow: 'border-yellow-border bg-yellow-surface',
    } satisfies Record<BadgeIntent, string>,
    size: {
      lg: 'gap-1.5 rounded-xs border p-1.5',
      md: 'gap-1 rounded-xs border p-1',
      sm: 'gap-0.5 rounded-xs border p-0.5',
    } satisfies Record<BadgeSize, string>,
    variant: {
      default: '',
      subtle: '',
    } satisfies Record<BadgeVariant, string>,
  },
})

type BadgeCVAProps = VariantProps<typeof badgeCVA>

const badgeIconCVA = cva('', {
  compoundVariants: [...badgeSubtleForegroundCVA],
  variants: {
    intent: {
      accent: 'text-accent-icon',
      blue: 'text-blue-icon',
      error: 'text-error-icon',
      gray: 'text-neutral-icon',
      green: 'text-green-icon',
      info: 'text-info-icon',
      neutral: 'text-neutral-icon',
      orange: 'text-orange-icon',
      pink: 'text-pink-icon',
      primary: 'text-primary-icon',
      purple: 'text-purple-icon',
      red: 'text-red-icon',
      secondary: 'text-secondary-icon',
      success: 'text-success-icon',
      warning: 'text-warning-icon',
      yellow: 'text-yellow-icon',
    } satisfies Record<BadgeIntent, string>,
    size: {
      lg: 'size-4',
      md: 'size-3',
      sm: 'size-2.5',
    } satisfies Record<BadgeSize, string>,
    variant: {
      default: '',
      subtle: '',
    } satisfies Record<BadgeVariant, string>,
  },
})

const badgeLabelCVA = cva('font-mono', {
  compoundVariants: [...badgeSubtleForegroundCVA],
  variants: {
    intent: {
      accent: 'text-accent-text',
      blue: 'text-blue-text',
      error: 'text-error-text',
      gray: 'text-neutral-text',
      green: 'text-green-text',
      info: 'text-info-text',
      neutral: 'text-neutral-text',
      orange: 'text-orange-text',
      pink: 'text-pink-text',
      primary: 'text-primary-text',
      purple: 'text-purple-text',
      red: 'text-red-text',
      secondary: 'text-secondary-text',
      success: 'text-success-text',
      warning: 'text-warning-text',
      yellow: 'text-yellow-text',
    } satisfies Record<BadgeIntent, string>,
    size: {
      lg: 'txt-base',
      md: 'txt-caption',
      sm: 'txt-small',
    } satisfies Record<BadgeSize, string>,
    variant: {
      default: '',
      subtle: '',
    } satisfies Record<BadgeVariant, string>,
  },
})

interface UIBadgeSlots {
  root?: ClassValue
  label?: ClassValue
  icon?: ClassValue
}

interface BadgeProps extends UseComponentIconsProps {
  intent?: BadgeCVAProps['intent']
  label?: string
  size?: BadgeCVAProps['size']
  variant?: BadgeCVAProps['variant']
  ui?: Partial<UIBadgeSlots>
}

const props = withDefaults(defineProps<BadgeProps>(), {
  intent: 'primary',
  label: '',
  size: 'md',
  ui: undefined,
  variant: 'default',
})

const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(() => props)
</script>

<template>
  <div :class="cn(badgeCVA({ intent, size, variant }), ui?.root)">
    <Icon
      v-if="isLeading && leadingIconName"
      :name="leadingIconName"
      :class="cn(badgeIconCVA({ intent, size, variant }), ui?.icon)"
    />
    <slot>
      <span :class="cn(badgeLabelCVA({ intent, size, variant }), ui?.label)">
        {{ $te(label) ? $t(label) : label }}
      </span>
    </slot>
    <Icon
      v-if="isTrailing && trailingIconName"
      :name="trailingIconName"
      :class="cn(badgeIconCVA({ intent, size, variant }), ui?.icon)"
    />
  </div>
</template>
