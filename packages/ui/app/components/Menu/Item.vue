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

export interface MenuItemProps {
  type?: 'item'
  label: string
  value: string
  disabled?: boolean
  closeOnSelect?: boolean
  valueText?: string
  onSelect?: () => void
  href?: string
  target?: string
  intent?: MenuIntent
  size?: 'md'
  item?: ClassValue
  customClass?: ClassValue
}

const props = withDefaults(defineProps<MenuItemProps>(), {
  type: undefined,
  intent: 'neutral',
  size: 'md',
  valueText: undefined,
  onSelect: undefined,
  href: undefined,
  target: undefined,
  item: undefined,
  customClass: undefined,
})

const itemProps = computed(() =>
  pick(props, ['value', 'disabled', 'closeOnSelect', 'valueText'] as const),
)

function handleSelect() {
  props.onSelect?.()
}
</script>

<template>
  <ArkMenu.Item
    v-bind="itemProps"
    :class="cn(menuItemCVA({ intent, size }), item, customClass)"
    :as-child="Boolean(href)"
    @select="handleSelect"
  >
    <a
      v-if="href"
      :href="href"
      :target="target"
      :rel="target === '_blank' ? 'noreferrer noopener' : undefined"
    >
      {{ label }}
    </a>
    <template v-else>{{ label }}</template>
  </ArkMenu.Item>
</template>
