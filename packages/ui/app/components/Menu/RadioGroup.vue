<script setup lang="ts">
import { Menu as ArkMenu } from '@ark-ui/vue/menu'
import { cva } from 'class-variance-authority'

import { pick } from '~ui/app/utils/object'

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
const menuItemGroupCVA = cva('menuItemGroup')
const menuItemGroupLabelCVA = cva('menuItemGroupLabel', {
  variants: {
    intent: {
      neutral: 'text-neutral-text-subtle',
      primary: 'text-primary-text-subtle',
      secondary: 'text-secondary-text-subtle',
      accent: 'text-accent-text-subtle',
    },
    size: {
      md: 'px-2 py-1 txt-caption',
    },
  },
})
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
const menuItemIndicatorSlotCVA = cva('menuItemIndicatorSlot inline-flex shrink-0 items-center justify-center', {
  variants: {
    size: {
      md: 'size-4',
    },
  },
})
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

export interface MenuRadioGroupProps {
  type: 'radio-group'
  label?: string
  value?: string
  onValueChange?: (value: string) => void
  items: Array<{
    label: string
    value: string
    disabled?: boolean
  }>
  intent?: MenuIntent
  size?: 'md'
  item?: ClassValue
  itemGroup?: ClassValue
  itemGroupLabel?: ClassValue
  itemIndicator?: ClassValue
  itemText?: ClassValue
  customClass?: ClassValue
}

const props = withDefaults(defineProps<MenuRadioGroupProps>(), {
  label: undefined,
  value: undefined,
  onValueChange: undefined,
  intent: 'neutral',
  size: 'md',
  item: undefined,
  itemGroup: undefined,
  itemGroupLabel: undefined,
  itemIndicator: undefined,
  itemText: undefined,
  customClass: undefined,
})

const groupProps = computed(() => pick(props, ['value'] as const))

function handleValueChange(value: string) {
  props.onValueChange?.(value)
}
</script>

<template>
  <ArkMenu.RadioItemGroup
    v-bind="groupProps"
    :class="cn(menuItemGroupCVA(), itemGroup)"
    @update:model-value="handleValueChange(($event as string) ?? '')"
  >
    <ArkMenu.ItemGroupLabel v-if="label" :class="cn(menuItemGroupLabelCVA({ intent, size }), itemGroupLabel)">
      {{ label }}
    </ArkMenu.ItemGroupLabel>

    <ArkMenu.RadioItem
      v-for="radioItem in items"
      :key="radioItem.value"
      :class="cn(menuItemCVA({ intent, size }), item, customClass)"
      :value="radioItem.value"
      :disabled="radioItem.disabled"
    >
      <span :class="menuItemIndicatorSlotCVA({ size })">
        <span
          aria-hidden="true"
          :class="
            cn(
              menuItemIndicatorCVA({ intent, size }),
              itemIndicator,
              value === radioItem.value ? 'opacity-100' : 'opacity-0',
            )
          "
        >
          <ClientOnly fallback-tag="span">
            <Icon name="tabler:check" class="size-full" />
          </ClientOnly>
        </span>
      </span>
      <ArkMenu.ItemText :class="cn(menuItemTextCVA({ intent, size }), itemText)">
        {{ radioItem.label }}
      </ArkMenu.ItemText>
    </ArkMenu.RadioItem>
  </ArkMenu.RadioItemGroup>
</template>
