<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'

import type { UseComponentIconsProps } from '@/composables/useComponentIcons'
import type { ClassValue } from 'vue'

const chipCVA = cva(['chip', 'flex items-center justify-center', 'border', 'group'], {
  variants: {
    intent: {
      neutral: 'bg-neutral-fill-default border-neutral-border-default',
      primary:
        'bg-primary-fill-default border-primary-border-default hover:bg-primary-fill-default-hover hover:border-primary-border-default-hover active:bg-primary-fill-default-active active:border-primary-border-default-active',
      secondary:
        'bg-secondary-fill-default border-secondary-border-default hover:bg-secondary-fill-default-hover hover:border-secondary-border-default-hover active:bg-secondary-fill-default-active active:border-secondary-border-default-active',
      accent:
        'bg-accent-fill-default border-accent-border-default hover:bg-accent-fill-default-hover hover:border-accent-border-default-hover active:bg-accent-fill-default-active active:border-accent-border-default-active',
      info: 'bg-info-fill-default border-info-border-default hover:bg-info-fill-default-hover hover:border-info-border-default-hover active:bg-info-fill-default-active active:border-info-border-default-active',
      success:
        'bg-success-fill-default border-success-border-default hover:bg-success-fill-default-hover hover:border-success-border-default-hover active:bg-success-fill-default-active active:border-success-border-default-active',
      warning:
        'bg-warning-fill-default border-warning-border-default hover:bg-warning-fill-default-hover hover:border-warning-border-default-hover active:bg-warning-fill-default-active active:border-warning-border-default-active',
      error:
        'bg-error-fill-default border-error-border-default hover:bg-error-fill-default-hover hover:border-error-border-default-hover active:bg-error-fill-default-active active:border-error-border-default-active',
      red: 'bg-red-fill-default border-red-border-default hover:bg-red-fill-default-hover hover:border-red-border-default-hover active:bg-red-fill-default-active active:border-red-border-default-active',
      orange:
        'bg-orange-fill-default border-orange-border-default hover:bg-orange-fill-default-hover hover:border-orange-border-default-hover active:bg-orange-fill-default-active active:border-orange-border-default-active',
      yellow:
        'bg-yellow-fill-default border-yellow-border-default hover:bg-yellow-fill-default-hover hover:border-yellow-border-default-hover active:bg-yellow-fill-default-active active:border-yellow-border-default-active',
      green:
        'bg-green-fill-default border-green-border-default hover:bg-green-fill-default-hover hover:border-green-border-default-hover active:bg-green-fill-default-active active:border-green-border-default-active',
      blue: 'bg-blue-fill-default border-blue-border-default hover:bg-blue-fill-default-hover hover:border-blue-border-default-hover active:bg-blue-fill-default-active active:border-blue-border-default-active',
      purple:
        'bg-purple-fill-default border-purple-border-default hover:bg-purple-fill-default-hover hover:border-purple-border-default-hover active:bg-purple-fill-default-active active:border-purple-border-default-active',
      pink: 'bg-pink-fill-default border-pink-border-default hover:bg-pink-fill-default-hover hover:border-pink-border-default-hover active:bg-pink-fill-default-active active:border-pink-border-default-active',
      gray: 'bg-gray-fill-default border-gray-border-default hover:bg-gray-fill-default-hover hover:border-gray-border-default-hover active:bg-gray-fill-default-active active:border-gray-border-default-active',
    },
    size: {
      sm: 'p-0.5 gap-0.5',
      md: 'p-1 gap-1',
      lg: 'p-1.5 gap-1.5',
    },
    disabled: {
      false: '',
      true: '',
    },
    onIconAction: {
      false: '',
      true: '',
    },
  },
  compoundVariants: [
    {
      onIconAction: false,
      disabled: false,
      class: 'cursor-pointer active:scale-97',
    },
    {
      onIconAction: false,
      disabled: true,
      class: 'cursor-not-allowed',
    },
  ],
})

type ChipCVAProps = VariantProps<typeof chipCVA>

const chipIconCVA = cva('chipIcon', {
  variants: {
    intent: {
      neutral:
        'text-neutral-icon-inverse group-hover:text-neutral-icon-inverse-hover group-active:text-neutral-icon-inverse-active',
      primary:
        'text-primary-icon-inverse group-hover:text-primary-icon-inverse-hover group-active:text-primary-icon-inverse-active',
      secondary:
        'text-secondary-icon-inverse group-hover:text-secondary-icon-inverse-hover group-active:text-secondary-icon-inverse-active',
      accent:
        'text-accent-icon-inverse group-hover:text-accent-icon-inverse-hover group-active:text-accent-icon-inverse-active',
      info: 'text-info-icon-inverse group-hover:text-info-icon-inverse-hover group-active:text-info-icon-inverse-active',
      success:
        'text-success-icon-inverse group-hover:text-success-icon-inverse-hover group-active:text-success-icon-inverse-active',
      warning:
        'text-warning-icon-inverse group-hover:text-warning-icon-inverse-hover group-active:text-warning-icon-inverse-active',
      error:
        'text-error-icon-inverse group-hover:text-error-icon-inverse-hover group-active:text-error-icon-inverse-active',
      red: 'text-red-icon-inverse group-hover:text-red-icon-inverse-hover group-active:text-red-icon-inverse-active',
      orange:
        'text-orange-icon-inverse group-hover:text-orange-icon-inverse-hover group-active:text-orange-icon-inverse-active',
      yellow:
        'text-yellow-icon-inverse group-hover:text-yellow-icon-inverse-hover group-active:text-yellow-icon-inverse-active',
      green:
        'text-green-icon-inverse group-hover:text-green-icon-inverse-hover group-active:text-green-icon-active',
      blue: 'text-blue-icon-inverse group-hover:text-blue-icon-inverse-hover group-active:text-blue-icon-inverse-active',
      purple:
        'text-purple-icon-inverse group-hover:text-purple-icon-inverse-hover group-active:text-purple-icon-inverse-active',
      pink: 'text-pink-icon-inverse group-hover:text-pink-icon-inverse-hover group-active:text-pink-icon-inverse-active',
      gray: 'text-gray-icon-inverse group-hover:text-gray-icon-inverse-hover group-active:text-gray-icon-inverse-active',
    },
    size: {
      sm: 'size-2.5',
      md: 'size-3',
      lg: 'size-4',
    },
  },
})

const chipActionIconCVA = cva('chipActionIcon', {
  variants: {
    disabled: {
      false: '',
      true: '',
    },
    onIconAction: {
      false: '',
      true: '',
    },
  },
  compoundVariants: [
    {
      onIconAction: true,
      disabled: false,
      class: 'cursor-pointer',
    },
    {
      onIconAction: true,
      disabled: true,
      class: 'cursor-not-allowed',
    },
  ],
})

const chipLabelCVA = cva(['chipLabel', 'select-none'], {
  variants: {
    intent: {
      neutral:
        'text-neutral-text-inverse group-hover:text-neutral-text-inverse-hover group-active:text-neutral-text-inverse-active',
      primary:
        'text-primary-text-inverse group-hover:text-primary-text-inverse-hover group-active:text-primary-text-inverse-active',
      secondary:
        'text-secondary-text-inverse group-hover:text-secondary-text-inverse-hover group-active:text-secondary-text-inverse-active',
      accent:
        'text-accent-text-inverse group-hover:text-accent-text-inverse-hover group-active:text-accent-text-inverse-active',
      info: 'text-info-text-inverse group-hover:text-info-text-inverse-hover group-active:text-info-text-inverse-active',
      success:
        'text-success-text-inverse group-hover:text-success-text-inverse-hover group-active:text-success-text-inverse-active',
      warning:
        'text-warning-text-inverse group-hover:text-warning-text-inverse-hover group-active:text-warning-text-inverse-active',
      error:
        'text-error-text-inverse group-hover:text-error-text-inverse-hover group-active:text-error-text-inverse-active',
      red: 'text-red-text-inverse group-hover:text-red-text-inverse-hover group-active:text-red-text-inverse-active',
      orange:
        'text-orange-text-inverse group-hover:text-orange-text-inverse-hover group-active:text-orange-text-inverse-active',
      yellow:
        'text-yellow-text-inverse group-hover:text-yellow-text-inverse-hover group-active:text-yellow-text-inverse-active',
      green:
        'text-green-text-inverse group-hover:text-green-text-hover group-active:text-green-text-active',
      blue: 'text-blue-text-inverse group-hover:text-blue-text-inverse-hover group-active:text-blue-text-inverse-active',
      purple:
        'text-purple-text-inverse group-hover:text-purple-text-inverse-hover group-active:text-purple-text-inverse-active',
      pink: 'text-pink-text-inverse group-hover:text-pink-text-inverse-hover group-active:text-pink-text-inverse-active',
      gray: 'text-gray-text-inverse group-hover:text-gray-text-inverse-hover group-active:text-gray-text-inverse-active',
    },
    size: {
      sm: 'txt-small',
      md: 'txt-caption',
      lg: 'txt-base',
    },
  },
})

interface UIChipSlots {
  root?: ClassValue
  label?: ClassValue
  icon?: ClassValue
  actionIcon?: ClassValue
}

interface ChipProps {
  actionIcon?: 'tabler:x' | 'tabler:plus'
  disabled?: boolean
  intent?: ChipCVAProps['intent']
  label?: string
  onClick?: () => Promise<void> | void
  onIconAction?: boolean
  size?: ChipCVAProps['size']
  ui?: UIChipSlots
}

const props = withDefaults(defineProps<ChipProps & UseComponentIconsProps>(), {
  actionIcon: 'tabler:x',
  disabled: false,
  intent: 'primary',
  label: '',
  onClick: undefined,
  onIconAction: true,
  size: 'md',
  ui: undefined,
})

const { iconName } = useComponentIcons(() => ({ mode: 'single', ...props }))

const handleClick = async () => {
  if (props.disabled || !props.onClick) return
  await props.onClick()
}

extendCompodiumMeta({
  defaultProps: {
    icon: 'tabler:badge',
    intent: 'primary',
    label: 'Chip',
    size: 'md',
    ui: undefined,
    onClick: () => console.log('clicked'),
  },
})
</script>

<template>
  <div
    :class="cn(chipCVA({ intent, size, disabled, onIconAction }), ui?.root)"
    @click="onIconAction ? undefined : handleClick()"
  >
    <Icon v-if="iconName" :name="iconName" :class="cn(chipIconCVA({ intent, size }), ui?.icon)" />
    <slot>
      <span :class="cn(chipLabelCVA({ intent, size }), ui?.label)">
        {{ label }}
      </span>
    </slot>
    <Icon
      v-if="actionIcon"
      :name="actionIcon"
      :class="
        cn(
          chipIconCVA({ intent, size }),
          chipActionIconCVA({ disabled, onIconAction }),
          ui?.actionIcon,
        )
      "
      @click="onIconAction ? handleClick() : undefined"
    />
  </div>
</template>
