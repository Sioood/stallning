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
        'border-accent-border bg-accent-fill hover:border-accent-border-hover hover:bg-accent-fill-hover active:border-accent-border-active active:bg-accent-fill-active disabled:pointer-events-none disabled:opacity-40',
      blue: 'border-blue-border bg-blue-fill hover:border-blue-border-hover hover:bg-blue-fill-hover active:border-blue-border-active active:bg-blue-fill-active disabled:pointer-events-none disabled:opacity-40',
      error:
        'border-error-border bg-error-fill hover:border-error-border-hover hover:bg-error-fill-hover active:border-error-border-active active:bg-error-fill-active disabled:pointer-events-none disabled:opacity-40',
      gray: 'border-neutral-border bg-neutral-fill hover:border-neutral-border-hover hover:bg-neutral-fill-hover active:border-neutral-border-active active:bg-neutral-fill-active disabled:pointer-events-none disabled:opacity-40',
      green:
        'border-green-border bg-green-fill hover:border-green-border-hover hover:bg-green-fill-hover active:border-green-border-active active:bg-green-fill-active disabled:pointer-events-none disabled:opacity-40',
      info: 'border-info-border bg-info-fill hover:border-info-border-hover hover:bg-info-fill-hover active:border-info-border-active active:bg-info-fill-active disabled:pointer-events-none disabled:opacity-40',
      neutral:
        'border-neutral-border bg-neutral-fill disabled:pointer-events-none disabled:opacity-40',
      orange:
        'border-orange-border bg-orange-fill hover:border-orange-border-hover hover:bg-orange-fill-hover active:border-orange-border-active active:bg-orange-fill-active disabled:pointer-events-none disabled:opacity-40',
      pink: 'border-pink-border bg-pink-fill hover:border-pink-border-hover hover:bg-pink-fill-hover active:border-pink-border-active active:bg-pink-fill-active disabled:pointer-events-none disabled:opacity-40',
      primary:
        'border-primary-border bg-primary-fill hover:border-primary-border-hover hover:bg-primary-fill-hover active:border-primary-border-active active:bg-primary-fill-active disabled:pointer-events-none disabled:opacity-40',
      purple:
        'border-purple-border bg-purple-fill hover:border-purple-border-hover hover:bg-purple-fill-hover active:border-purple-border-active active:bg-purple-fill-active disabled:pointer-events-none disabled:opacity-40',
      red: 'border-red-border bg-red-fill hover:border-red-border-hover hover:bg-red-fill-hover active:border-red-border-active active:bg-red-fill-active disabled:pointer-events-none disabled:opacity-40',
      secondary:
        'border-secondary-border bg-secondary-fill hover:border-secondary-border-hover hover:bg-secondary-fill-hover active:border-secondary-border-active active:bg-secondary-fill-active disabled:pointer-events-none disabled:opacity-40',
      success:
        'border-success-border bg-success-fill hover:border-success-border-hover hover:bg-success-fill-hover active:border-success-border-active active:bg-success-fill-active disabled:pointer-events-none disabled:opacity-40',
      warning:
        'border-warning-border bg-warning-fill hover:border-warning-border-hover hover:bg-warning-fill-hover active:border-warning-border-active active:bg-warning-fill-active disabled:pointer-events-none disabled:opacity-40',
      yellow:
        'border-yellow-border bg-yellow-fill hover:border-yellow-border-hover hover:bg-yellow-fill-hover active:border-yellow-border-active active:bg-yellow-fill-active disabled:pointer-events-none disabled:opacity-40',
    } satisfies Record<ChipIntent, string>,
    onIconAction: {
      false: '',
      true: '',
    },
    size: {
      lg: 'gap-1.5 rounded-xs border p-1.5',
      md: 'gap-1 rounded-xs border p-1',
      sm: 'gap-0.5 rounded-xs border p-0.5',
    } satisfies Record<ChipSize, string>,
  },
})

type ChipCVAProps = VariantProps<typeof chipCVA>

const chipIconCVA = cva('', {
  variants: {
    intent: {
      accent: 'text-accent-on-fill',
      blue: 'text-blue-on-fill',
      error: 'text-error-on-fill',
      gray: 'text-neutral-on-fill',
      green: 'text-green-on-fill',
      info: 'text-info-on-fill',
      neutral: 'text-neutral-on-fill',
      orange: 'text-orange-on-fill',
      pink: 'text-pink-on-fill',
      primary: 'text-primary-on-fill',
      purple: 'text-purple-on-fill',
      red: 'text-red-on-fill',
      secondary: 'text-secondary-on-fill',
      success: 'text-success-on-fill',
      warning: 'text-warning-on-fill',
      yellow: 'text-yellow-on-fill',
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
      accent: 'text-accent-on-fill',
      blue: 'text-blue-on-fill',
      error: 'text-error-on-fill',
      gray: 'text-neutral-on-fill',
      green: 'text-green-on-fill',
      info: 'text-info-on-fill',
      neutral: 'text-neutral-on-fill',
      orange: 'text-orange-on-fill',
      pink: 'text-pink-on-fill',
      primary: 'text-primary-on-fill',
      purple: 'text-purple-on-fill',
      red: 'text-red-on-fill',
      secondary: 'text-secondary-on-fill',
      success: 'text-success-on-fill',
      warning: 'text-warning-on-fill',
      yellow: 'text-yellow-on-fill',
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
