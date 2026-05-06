<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'

import type { UseComponentIconsProps } from '@/composables/useComponentIcons'
import type { ClassValue } from 'vue'

const badgeCVA = cva(['badge', 'flex items-center justify-center', 'border'], {
  variants: {
    intent: {
      neutral: 'bg-neutral-surface-default border-neutral-border-default',
      primary: 'bg-primary-surface-default border-primary-border-default',
      secondary: 'bg-secondary-surface-default border-secondary-border-default',
      accent: 'bg-accent-surface-default border-accent-border-default',
      info: 'bg-info-surface-default border-info-border-default',
      success: 'bg-success-surface-default border-success-border-default',
      warning: 'bg-warning-surface-default border-warning-border-default',
      error: 'bg-error-surface-default border-error-border-default',
      red: 'bg-red-surface-default border-red-border-default',
      orange: 'bg-orange-surface-default border-orange-border-default',
      yellow: 'bg-yellow-surface-default border-yellow-border-default',
      green: 'bg-green-surface-default border-green-border-default',
      blue: 'bg-blue-surface-default border-blue-border-default',
      purple: 'bg-purple-surface-default border-purple-border-default',
      pink: 'bg-pink-surface-default border-pink-border-default',
      gray: 'bg-gray-surface-default border-gray-border-default',
    },
    size: {
      sm: 'p-0.5 gap-0.5',
      md: 'p-1 gap-1',
      lg: 'p-1.5 gap-1.5',
    },
  },
})

type BadgeCVAProps = VariantProps<typeof badgeCVA>

const badgeIconCVA = cva('badgeIcon', {
  variants: {
    intent: {
      neutral: 'text-neutral-icon-default',
      primary: 'text-primary-icon-default',
      secondary: 'text-secondary-icon-default',
      accent: 'text-accent-icon-default',
      info: 'text-info-icon-default',
      success: 'text-success-icon-default',
      warning: 'text-warning-icon-default',
      error: 'text-error-icon-default',
      red: 'text-red-icon-default',
      orange: 'text-orange-icon-default',
      yellow: 'text-yellow-icon-default',
      green: 'text-green-icon-default',
      blue: 'text-blue-icon-default',
      purple: 'text-purple-icon-default',
      pink: 'text-pink-icon-default',
      gray: 'text-gray-icon-default',
    },
    size: {
      sm: 'size-2.5',
      md: 'size-3',
      lg: 'size-4',
    },
  },
})

const badgeLabelCVA = cva('badgeLabel', {
  variants: {
    intent: {
      neutral: 'text-neutral-text-default',
      primary: 'text-primary-text-default',
      secondary: 'text-secondary-text-default',
      accent: 'text-accent-text-default',
      info: 'text-info-text-default',
      success: 'text-success-text-default',
      warning: 'text-warning-text-default',
      error: 'text-error-text-default',
      red: 'text-red-text-default',
      orange: 'text-orange-text-default',
      yellow: 'text-yellow-text-default',
      green: 'text-green-text-default',
      blue: 'text-blue-text-default',
      purple: 'text-purple-text-default',
      pink: 'text-pink-text-default',
      gray: 'text-gray-text-default',
    },
    size: {
      sm: 'txt-small',
      md: 'txt-caption',
      lg: 'txt-base',
    },
  },
})

interface UIBadgeSlots {
  root?: ClassValue
  label?: ClassValue
  icon?: ClassValue
}

interface BadgeProps {
  intent?: BadgeCVAProps['intent']
  label?: string
  size?: BadgeCVAProps['size']
  ui?: UIBadgeSlots
}

const props = withDefaults(defineProps<BadgeProps & UseComponentIconsProps>(), {
  intent: 'primary',
  label: '',
  size: 'md',
  ui: undefined,
})

const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(() => props)

extendCompodiumMeta({
  defaultProps: {
    leadingIcon: 'tabler:badge',
    intent: 'primary',
    label: 'Badge',
    size: 'md',
    ui: undefined,
  },
})
</script>

<template>
  <div :class="cn(badgeCVA({ intent, size }), ui?.root)">
    <Icon
      v-if="isLeading && leadingIconName"
      :name="leadingIconName"
      :class="cn(badgeIconCVA({ intent, size }), ui?.icon)"
    />
    <slot>
      <span :class="cn(badgeLabelCVA({ intent, size }), ui?.label)">
        {{ label }}
      </span>
    </slot>
    <Icon
      v-if="isTrailing && trailingIconName"
      :name="trailingIconName"
      :class="cn(badgeIconCVA({ intent, size }), ui?.icon)"
    />
  </div>
</template>
