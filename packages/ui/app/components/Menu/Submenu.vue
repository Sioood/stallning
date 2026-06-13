<script setup lang="ts">
import { Menu as ArkMenu } from '@ark-ui/vue/menu'
import { cva } from 'class-variance-authority'

import type { ClassValue } from 'vue'
import type { MenuIntent } from '~/utils/Components/Menu/context'
import type { MenuSubmenuEntry } from '~/utils/Components/Menu/entries'

const menuSubmenuTriggerCVA = cva(
  'flex cursor-pointer items-center justify-between gap-2 outline-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70',
  {
    variants: {
      intent: {
        accent:
          'text-accent-text-default data-[disabled]:text-accent-text-subtle data-[highlighted]:bg-accent-fill-subtle-hover',
        neutral:
          'text-neutral-text-default data-[disabled]:text-neutral-text-subtle data-[highlighted]:bg-neutral-fill-subtle-hover',
        primary:
          'text-primary-text-default data-[disabled]:text-primary-text-subtle data-[highlighted]:bg-primary-fill-subtle-hover',
        secondary:
          'text-secondary-text-default data-[disabled]:text-secondary-text-subtle data-[highlighted]:bg-secondary-fill-subtle-hover',
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
      accent: 'border-accent-border-subtle bg-accent-fill-subtle',
      neutral: 'border-neutral-border-subtle bg-neutral-fill-subtle',
      primary: 'border-primary-border-subtle bg-primary-fill-subtle',
      secondary: 'border-secondary-border-subtle bg-secondary-fill-subtle',
    },
    size: {
      md: 'txt-label border p-1',
    },
  },
})
const menuSubmenuChevronCVA = cva('size-3 shrink-0', {
  variants: {
    intent: {
      accent: 'text-accent-text-subtle',
      neutral: 'text-neutral-text-subtle',
      primary: 'text-primary-text-subtle',
      secondary: 'text-secondary-text-subtle',
    },
  },
})

export interface MenuSubmenuProps extends MenuSubmenuEntry {
  intent?: MenuIntent
  size?: 'md'
  item?: ClassValue
  itemGroup?: ClassValue
  itemGroupLabel?: ClassValue
  separator?: ClassValue
  itemIndicator?: ClassValue
  itemText?: ClassValue
}

withDefaults(defineProps<MenuSubmenuProps>(), {
  customClass: undefined,
  intent: 'neutral',
  item: undefined,
  itemGroup: undefined,
  itemGroupLabel: undefined,
  itemIndicator: undefined,
  itemText: undefined,
  separator: undefined,
  size: 'md',
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
      <UIMenuPositioner>
        <ArkMenu.Content :class="menuSubmenuContentCVA({ intent, size })">
          <UIMenuEntryRenderer
            :items
            :intent
            :size
            :item="item"
            :item-group="itemGroup"
            :item-group-label="itemGroupLabel"
            :separator="separator"
            :item-indicator="itemIndicator"
            :item-text="itemText"
          />
        </ArkMenu.Content>
      </UIMenuPositioner>
    </Teleport>
  </ArkMenu.Root>
</template>
