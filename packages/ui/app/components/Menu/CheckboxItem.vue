<script setup lang="ts">
import { Menu as ArkMenu } from '@ark-ui/vue/menu'
import { cva } from 'class-variance-authority'

import type { MenuIntent } from './index.vue'
import type { ClassValue } from 'vue'

const menuItemCVA = cva(
  'menuItem flex cursor-pointer items-center gap-2 outline-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70',
  {
    variants: {
      intent: {
        neutral:
          'text-neutral-text-default data-[highlighted]:bg-neutral-fill-subtle-hover data-[disabled]:text-neutral-text-subtle',
        primary:
          'text-primary-text-default data-[highlighted]:bg-primary-fill-subtle-hover data-[disabled]:text-primary-text-subtle',
        secondary:
          'text-secondary-text-default data-[highlighted]:bg-secondary-fill-subtle-hover data-[disabled]:text-secondary-text-subtle',
        accent:
          'text-accent-text-default data-[highlighted]:bg-accent-fill-subtle-hover data-[disabled]:text-accent-text-subtle',
      },
      size: {
        md: 'px-2 py-1.5 txt-caption',
      },
    },
  },
)
const menuItemIndicatorCVA = cva('menuItemIndicator inline-flex items-center justify-center', {
  variants: {
    intent: {
      neutral: 'text-neutral-text-default',
      primary: 'text-primary-text-default',
      secondary: 'text-secondary-text-default',
      accent: 'text-accent-text-default',
    },
    size: {
      md: 'size-4',
    },
  },
})
const menuItemIndicatorSlotCVA = cva(
  'menuItemIndicatorSlot inline-flex shrink-0 items-center justify-center',
  {
    variants: {
      size: {
        md: 'size-4',
      },
    },
  },
)
const menuItemTextCVA = cva('menuItemText', {
  variants: {
    intent: {
      neutral: 'text-neutral-text-default',
      primary: 'text-primary-text-default',
      secondary: 'text-secondary-text-default',
      accent: 'text-accent-text-default',
    },
    size: {
      md: 'txt-caption',
    },
  },
})

export interface MenuCheckboxItemProps {
  type: 'checkbox'
  label: string
  value: string
  checked: boolean
  disabled?: boolean
  closeOnSelect?: boolean
  onCheckedChange?: (checked: boolean) => void
  intent?: MenuIntent
  size?: 'md'
  item?: ClassValue
  itemIndicator?: ClassValue
  itemText?: ClassValue
  customClass?: ClassValue
}

const props = withDefaults(defineProps<MenuCheckboxItemProps>(), {
  intent: 'neutral',
  size: 'md',
  onCheckedChange: undefined,
  item: undefined,
  itemIndicator: undefined,
  itemText: undefined,
  customClass: undefined,
})

const checkboxProps = computed(() =>
  pick(props, ['checked', 'value', 'disabled', 'closeOnSelect'] as const),
)

function handleCheckedChange(checked: boolean) {
  props.onCheckedChange?.(checked)
}
</script>

<template>
  <ArkMenu.CheckboxItem
    v-bind="checkboxProps"
    :class="cn(menuItemCVA({ intent, size }), item, customClass)"
    @update:checked="handleCheckedChange(($event as boolean) ?? false)"
  >
    <span :class="menuItemIndicatorSlotCVA({ size })">
      <span
        aria-hidden="true"
        :class="
          cn(
            menuItemIndicatorCVA({ intent, size }),
            itemIndicator,
            checked ? 'opacity-100' : 'opacity-0',
          )
        "
      >
        <ClientOnly fallback-tag="span">
          <Icon name="tabler:check" class="size-full" />
        </ClientOnly>
      </span>
    </span>
    <ArkMenu.ItemText :class="cn(menuItemTextCVA({ intent, size }), itemText)">
      {{ label }}
    </ArkMenu.ItemText>
  </ArkMenu.CheckboxItem>
</template>
