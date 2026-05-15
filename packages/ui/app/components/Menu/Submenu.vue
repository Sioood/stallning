<script setup lang="ts">
import { Menu as ArkMenu } from '@ark-ui/vue/menu'
import { cva } from 'class-variance-authority'

import type { MenuListEntry } from './index.vue'
import type { ClassValue } from 'vue'
import type { MenuIntent } from '~ui/app/utils/Menu/context'

const menuSubmenuTriggerCVA = cva(
  'flex cursor-pointer items-center justify-between gap-2 outline-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70',
  {
    variants: {
      intent: {
        neutral:
          'text-neutral-text-default data-[disabled]:text-neutral-text-subtle data-[highlighted]:bg-neutral-fill-subtle-hover',
        primary:
          'text-primary-text-default data-[disabled]:text-primary-text-subtle data-[highlighted]:bg-primary-fill-subtle-hover',
        secondary:
          'text-secondary-text-default data-[disabled]:text-secondary-text-subtle data-[highlighted]:bg-secondary-fill-subtle-hover',
        accent:
          'text-accent-text-default data-[disabled]:text-accent-text-subtle data-[highlighted]:bg-accent-fill-subtle-hover',
      },
      size: {
        md: 'txt-caption px-2 py-1.5',
      },
    },
  },
)
const menuSubmenuContentCVA = cva('', {
  variants: {
    intent: {
      neutral: 'border-neutral-border-subtle bg-neutral-fill-subtle',
      primary: 'border-primary-border-subtle bg-primary-fill-subtle',
      secondary: 'border-secondary-border-subtle bg-secondary-fill-subtle',
      accent: 'border-accent-border-subtle bg-accent-fill-subtle',
    },
    size: {
      md: 'txt-label border p-1',
    },
  },
})
const menuSubmenuChevronCVA = cva('size-3 shrink-0', {
  variants: {
    intent: {
      neutral: 'text-neutral-text-subtle',
      primary: 'text-primary-text-subtle',
      secondary: 'text-secondary-text-subtle',
      accent: 'text-accent-text-subtle',
    },
  },
})

export interface MenuSubmenuProps {
  type: 'submenu'
  label: string
  items: MenuListEntry[]
  intent?: MenuIntent
  size?: 'md'
  item?: ClassValue
  itemGroup?: ClassValue
  itemGroupLabel?: ClassValue
  separator?: ClassValue
  itemIndicator?: ClassValue
  itemText?: ClassValue
  customClass?: ClassValue
}

withDefaults(defineProps<MenuSubmenuProps>(), {
  intent: 'neutral',
  size: 'md',
  item: undefined,
  itemGroup: undefined,
  itemGroupLabel: undefined,
  separator: undefined,
  itemIndicator: undefined,
  itemText: undefined,
  customClass: undefined,
})
</script>

<template>
  <ArkMenu.Root>
    <ArkMenu.TriggerItem :class="cn(menuSubmenuTriggerCVA({ intent, size }), customClass)">
      <span>{{ label }}</span>
      <ClientOnly fallback-tag="span">
        <Icon name="tabler:chevron-right" :class="menuSubmenuChevronCVA({ intent })" />
      </ClientOnly>
    </ArkMenu.TriggerItem>
    <Teleport to="body">
      <ArkMenu.Positioner>
        <ArkMenu.Content :class="menuSubmenuContentCVA({ intent, size })">
          <UIMenuEntryRenderer
            :items="items"
            :intent="intent"
            :size="size"
            :item="item"
            :item-group="itemGroup"
            :item-group-label="itemGroupLabel"
            :separator="separator"
            :item-indicator="itemIndicator"
            :item-text="itemText"
          />
        </ArkMenu.Content>
      </ArkMenu.Positioner>
    </Teleport>
  </ArkMenu.Root>
</template>
