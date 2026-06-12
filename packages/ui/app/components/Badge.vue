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

const badgeCVA = cva('flex w-fit items-center justify-center', {
  variants: {
    intent: {
      accent: 'border-accent-border-default bg-accent-surface-default',
      blue: 'border-blue-border-default bg-blue-surface-default',
      error: 'border-error-border-default bg-error-surface-default',
      gray: 'border-gray-border-default bg-gray-surface-default',
      green: 'border-green-border-default bg-green-surface-default',
      info: 'border-info-border-default bg-info-surface-default',
      neutral: 'border-neutral-border-default bg-neutral-surface-default',
      orange: 'border-orange-border-default bg-orange-surface-default',
      pink: 'border-pink-border-default bg-pink-surface-default',
      primary: 'border-primary-border-default bg-primary-surface-default',
      purple: 'border-purple-border-default bg-purple-surface-default',
      red: 'border-red-border-default bg-red-surface-default',
      secondary: 'border-secondary-border-default bg-secondary-surface-default',
      success: 'border-success-border-default bg-success-surface-default',
      warning: 'border-warning-border-default bg-warning-surface-default',
      yellow: 'border-yellow-border-default bg-yellow-surface-default',
    } satisfies Record<BadgeIntent, string>,
    size: {
      lg: 'gap-1.5 border p-1.5',
      md: 'gap-1 border p-1',
      sm: 'gap-0.5 border p-0.5',
    } satisfies Record<BadgeSize, string>,
    variant: {
      default: '',
      subtle: 'border-none',
    } satisfies Record<BadgeVariant, string>,
  },
})

type BadgeCVAProps = VariantProps<typeof badgeCVA>

const badgeIconCVA = cva('', {
  variants: {
    intent: {
      accent: 'text-accent-icon-default',
      blue: 'text-blue-icon-default',
      error: 'text-error-icon-default',
      gray: 'text-gray-icon-default',
      green: 'text-green-icon-default',
      info: 'text-info-icon-default',
      neutral: 'text-neutral-icon-default',
      orange: 'text-orange-icon-default',
      pink: 'text-pink-icon-default',
      primary: 'text-primary-icon-default',
      purple: 'text-purple-icon-default',
      red: 'text-red-icon-default',
      secondary: 'text-secondary-icon-default',
      success: 'text-success-icon-default',
      warning: 'text-warning-icon-default',
      yellow: 'text-yellow-icon-default',
    } satisfies Record<BadgeIntent, string>,
    size: {
      lg: 'size-4',
      md: 'size-3',
      sm: 'size-2.5',
    } satisfies Record<BadgeSize, string>,
  },
})

const badgeLabelCVA = cva('', {
  variants: {
    intent: {
      accent: 'text-accent-text-default',
      blue: 'text-blue-text-default',
      error: 'text-error-text-default',
      gray: 'text-gray-text-default',
      green: 'text-green-text-default',
      info: 'text-info-text-default',
      neutral: 'text-neutral-text-default',
      orange: 'text-orange-text-default',
      pink: 'text-pink-text-default',
      primary: 'text-primary-text-default',
      purple: 'text-purple-text-default',
      red: 'text-red-text-default',
      secondary: 'text-secondary-text-default',
      success: 'text-success-text-default',
      warning: 'text-warning-text-default',
      yellow: 'text-yellow-text-default',
    } satisfies Record<BadgeIntent, string>,
    size: {
      lg: 'txt-base',
      md: 'txt-caption',
      sm: 'txt-small',
    } satisfies Record<BadgeSize, string>,
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

extendCompodiumMeta({
  defaultProps: {
    intent: 'primary',
    label: 'Badge',
    leadingIcon: 'tabler:badge',
    size: 'md',
    ui: undefined,
  },
})
</script>

<template>
  <div :class="cn(badgeCVA({ intent, size, variant }), ui?.root)">
    <Icon
      v-if="isLeading && leadingIconName"
      :name="leadingIconName"
      :class="cn(badgeIconCVA({ intent, size }), ui?.icon)"
    />
    <slot>
      <span :class="cn(badgeLabelCVA({ intent, size }), ui?.label)">
        {{ $te(label) ? $t(label) : label }}
      </span>
    </slot>
    <Icon
      v-if="isTrailing && trailingIconName"
      :name="trailingIconName"
      :class="cn(badgeIconCVA({ intent, size }), ui?.icon)"
    />
  </div>
</template>
