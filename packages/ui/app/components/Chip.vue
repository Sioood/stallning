<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'

import type { UseComponentIconsProps } from '@/composables/useComponentIcons'
import type { ClassValue } from 'vue'

type ChipIntent =
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
type ChipSize = 'sm' | 'md' | 'lg'

const chipCVA = cva(['flex items-center justify-center', 'group'], {
  compoundVariants: [
    {
      class: 'cursor-pointer active:scale-97',
      disabled: false,
      onIconAction: false,
    },
    {
      class: 'cursor-not-allowed',
      disabled: true,
      onIconAction: false,
    },
  ],
  variants: {
    disabled: {
      false: '',
      true: '',
    },
    intent: {
      accent:
        'border-accent-border-default bg-accent-fill-default hover:border-accent-border-default-hover hover:bg-accent-fill-default-hover active:border-accent-border-default-active active:bg-accent-fill-default-active',
      blue: 'border-blue-border-default bg-blue-fill-default hover:border-blue-border-default-hover hover:bg-blue-fill-default-hover active:border-blue-border-default-active active:bg-blue-fill-default-active',
      error:
        'border-error-border-default bg-error-fill-default hover:border-error-border-default-hover hover:bg-error-fill-default-hover active:border-error-border-default-active active:bg-error-fill-default-active',
      gray: 'border-gray-border-default bg-gray-fill-default hover:border-gray-border-default-hover hover:bg-gray-fill-default-hover active:border-gray-border-default-active active:bg-gray-fill-default-active',
      green:
        'border-green-border-default bg-green-fill-default hover:border-green-border-default-hover hover:bg-green-fill-default-hover active:border-green-border-default-active active:bg-green-fill-default-active',
      info: 'border-info-border-default bg-info-fill-default hover:border-info-border-default-hover hover:bg-info-fill-default-hover active:border-info-border-default-active active:bg-info-fill-default-active',
      neutral: 'border-neutral-border-default bg-neutral-fill-default',
      orange:
        'border-orange-border-default bg-orange-fill-default hover:border-orange-border-default-hover hover:bg-orange-fill-default-hover active:border-orange-border-default-active active:bg-orange-fill-default-active',
      pink: 'border-pink-border-default bg-pink-fill-default hover:border-pink-border-default-hover hover:bg-pink-fill-default-hover active:border-pink-border-default-active active:bg-pink-fill-default-active',
      primary:
        'border-primary-border-default bg-primary-fill-default hover:border-primary-border-default-hover hover:bg-primary-fill-default-hover active:border-primary-border-default-active active:bg-primary-fill-default-active',
      purple:
        'border-purple-border-default bg-purple-fill-default hover:border-purple-border-default-hover hover:bg-purple-fill-default-hover active:border-purple-border-default-active active:bg-purple-fill-default-active',
      red: 'border-red-border-default bg-red-fill-default hover:border-red-border-default-hover hover:bg-red-fill-default-hover active:border-red-border-default-active active:bg-red-fill-default-active',
      secondary:
        'border-secondary-border-default bg-secondary-fill-default hover:border-secondary-border-default-hover hover:bg-secondary-fill-default-hover active:border-secondary-border-default-active active:bg-secondary-fill-default-active',
      success:
        'border-success-border-default bg-success-fill-default hover:border-success-border-default-hover hover:bg-success-fill-default-hover active:border-success-border-default-active active:bg-success-fill-default-active',
      warning:
        'border-warning-border-default bg-warning-fill-default hover:border-warning-border-default-hover hover:bg-warning-fill-default-hover active:border-warning-border-default-active active:bg-warning-fill-default-active',
      yellow:
        'border-yellow-border-default bg-yellow-fill-default hover:border-yellow-border-default-hover hover:bg-yellow-fill-default-hover active:border-yellow-border-default-active active:bg-yellow-fill-default-active',
    } satisfies Record<ChipIntent, string>,
    onIconAction: {
      false: '',
      true: '',
    },
    size: {
      lg: 'gap-1.5 border p-1.5',
      md: 'gap-1 border p-1',
      sm: 'gap-0.5 border p-0.5',
    } satisfies Record<ChipSize, string>,
  },
})

type ChipCVAProps = VariantProps<typeof chipCVA>

const chipIconCVA = cva('', {
  variants: {
    intent: {
      accent:
        'text-accent-icon-inverse group-hover:text-accent-icon-inverse-hover group-active:text-accent-icon-inverse-active',
      blue: 'text-blue-icon-inverse group-hover:text-blue-icon-inverse-hover group-active:text-blue-icon-inverse-active',
      error:
        'text-error-icon-inverse group-hover:text-error-icon-inverse-hover group-active:text-error-icon-inverse-active',
      gray: 'text-gray-icon-inverse group-hover:text-gray-icon-inverse-hover group-active:text-gray-icon-inverse-active',
      green:
        'group-active:text-green-icon-active text-green-icon-inverse group-hover:text-green-icon-inverse-hover',
      info: 'text-info-icon-inverse group-hover:text-info-icon-inverse-hover group-active:text-info-icon-inverse-active',
      neutral:
        'text-neutral-icon-inverse group-hover:text-neutral-icon-inverse-hover group-active:text-neutral-icon-inverse-active',
      orange:
        'text-orange-icon-inverse group-hover:text-orange-icon-inverse-hover group-active:text-orange-icon-inverse-active',
      pink: 'text-pink-icon-inverse group-hover:text-pink-icon-inverse-hover group-active:text-pink-icon-inverse-active',
      primary:
        'text-primary-icon-inverse group-hover:text-primary-icon-inverse-hover group-active:text-primary-icon-inverse-active',
      purple:
        'text-purple-icon-inverse group-hover:text-purple-icon-inverse-hover group-active:text-purple-icon-inverse-active',
      red: 'text-red-icon-inverse group-hover:text-red-icon-inverse-hover group-active:text-red-icon-inverse-active',
      secondary:
        'text-secondary-icon-inverse group-hover:text-secondary-icon-inverse-hover group-active:text-secondary-icon-inverse-active',
      success:
        'text-success-icon-inverse group-hover:text-success-icon-inverse-hover group-active:text-success-icon-inverse-active',
      warning:
        'text-warning-icon-inverse group-hover:text-warning-icon-inverse-hover group-active:text-warning-icon-inverse-active',
      yellow:
        'text-yellow-icon-inverse group-hover:text-yellow-icon-inverse-hover group-active:text-yellow-icon-inverse-active',
    } satisfies Record<ChipIntent, string>,
    size: {
      lg: 'size-4',
      md: 'size-3',
      sm: 'size-2.5',
    } satisfies Record<ChipSize, string>,
  },
})

const chipActionIconCVA = cva('', {
  compoundVariants: [
    {
      class: 'cursor-pointer',
      disabled: false,
      onIconAction: true,
    },
    {
      class: 'cursor-not-allowed',
      disabled: true,
      onIconAction: true,
    },
  ],
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
})

const chipLabelCVA = cva('select-none', {
  variants: {
    intent: {
      accent:
        'text-accent-text-inverse group-hover:text-accent-text-inverse-hover group-active:text-accent-text-inverse-active',
      blue: 'text-blue-text-inverse group-hover:text-blue-text-inverse-hover group-active:text-blue-text-inverse-active',
      error:
        'text-error-text-inverse group-hover:text-error-text-inverse-hover group-active:text-error-text-inverse-active',
      gray: 'text-gray-text-inverse group-hover:text-gray-text-inverse-hover group-active:text-gray-text-inverse-active',
      green:
        'group-hover:text-green-text-hover group-active:text-green-text-active text-green-text-inverse',
      info: 'text-info-text-inverse group-hover:text-info-text-inverse-hover group-active:text-info-text-inverse-active',
      neutral:
        'text-neutral-text-inverse group-hover:text-neutral-text-inverse-hover group-active:text-neutral-text-inverse-active',
      orange:
        'text-orange-text-inverse group-hover:text-orange-text-inverse-hover group-active:text-orange-text-inverse-active',
      pink: 'text-pink-text-inverse group-hover:text-pink-text-inverse-hover group-active:text-pink-text-inverse-active',
      primary:
        'text-primary-text-inverse group-hover:text-primary-text-inverse-hover group-active:text-primary-text-inverse-active',
      purple:
        'text-purple-text-inverse group-hover:text-purple-text-inverse-hover group-active:text-purple-text-inverse-active',
      red: 'text-red-text-inverse group-hover:text-red-text-inverse-hover group-active:text-red-text-inverse-active',
      secondary:
        'text-secondary-text-inverse group-hover:text-secondary-text-inverse-hover group-active:text-secondary-text-inverse-active',
      success:
        'text-success-text-inverse group-hover:text-success-text-inverse-hover group-active:text-success-text-inverse-active',
      warning:
        'text-warning-text-inverse group-hover:text-warning-text-inverse-hover group-active:text-warning-text-inverse-active',
      yellow:
        'text-yellow-text-inverse group-hover:text-yellow-text-inverse-hover group-active:text-yellow-text-inverse-active',
    } satisfies Record<ChipIntent, string>,
    size: {
      lg: 'txt-base',
      md: 'txt-caption',
      sm: 'txt-small',
    } satisfies Record<ChipSize, string>,
  },
})

interface UIChipSlots {
  root?: ClassValue
  label?: ClassValue
  icon?: ClassValue
  actionIcon?: ClassValue
}

interface ChipProps extends UseComponentIconsProps {
  actionIcon?: 'tabler:x' | 'tabler:plus'
  disabled?: boolean
  intent?: ChipCVAProps['intent']
  label?: string
  onClick?: () => Promise<void> | void
  onIconAction?: boolean
  size?: ChipCVAProps['size']
  ui?: Partial<UIChipSlots>
}

const props = withDefaults(defineProps<ChipProps>(), {
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
    onClick: () => {},
    size: 'md',
    ui: undefined,
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
