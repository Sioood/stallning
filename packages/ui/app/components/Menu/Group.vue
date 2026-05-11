<script setup lang="ts">
import { Menu as ArkMenu } from '@ark-ui/vue/menu'
import { cva } from 'class-variance-authority'

import type { MenuCheckboxItemProps } from './CheckboxItem.vue'
import type { MenuIntent } from './context'
import type { MenuListEntry } from './index.vue'
import type { MenuItemProps } from './Item.vue'
import type { MenuRadioGroupProps } from './RadioGroup.vue'
import type { MenuSubmenuProps } from './Submenu.vue'
import type { ClassValue } from 'vue'

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
      md: 'txt-caption px-2 py-1',
    },
  },
})
const menuSeparatorCVA = cva('menuSeparator block w-full border-t', {
  variants: {
    intent: {
      neutral: 'border-neutral-border-subtle',
      primary: 'border-primary-border-subtle',
      secondary: 'border-secondary-border-subtle',
      accent: 'border-accent-border-subtle',
    },
    size: {
      md: 'my-1',
    },
  },
})

type MenuGroupItemProps = MenuItemProps
type MenuGroupCheckboxProps = MenuCheckboxItemProps
type MenuGroupRadioGroupProps = MenuRadioGroupProps
type MenuGroupSubmenuProps = MenuSubmenuProps

interface MenuGroupSeparatorEntry {
  type: 'separator'
}

export interface MenuGroupEntry {
  type: 'group'
  label?: string
  items: Array<
    | MenuGroupItemProps
    | MenuGroupCheckboxProps
    | MenuGroupRadioGroupProps
    | MenuGroupSubmenuProps
    | MenuGroupSeparatorEntry
  >
}

export interface MenuGroupProps {
  label?: string
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

const props = withDefaults(defineProps<MenuGroupProps>(), {
  label: undefined,
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

const groupProps = computed(() => pick(props, ['label', 'items', 'intent', 'size'] as const))
</script>

<template>
  <ArkMenu.ItemGroup :class="cn(menuItemGroupCVA(), itemGroup, customClass)">
    <ArkMenu.ItemGroupLabel
      v-if="label"
      :class="cn(menuItemGroupLabelCVA({ intent, size }), itemGroupLabel)"
    >
      {{ label }}
    </ArkMenu.ItemGroupLabel>

    <template v-for="(groupEntry, groupIndex) in items" :key="groupIndex">
      <ArkMenu.Separator
        v-if="groupEntry.type === 'separator'"
        :class="cn(menuSeparatorCVA({ intent, size }), separator, groupEntry.customClass)"
      />
      <UIMenuCheckboxItem
        v-else-if="groupEntry.type === 'checkbox'"
        v-bind="groupEntry"
        :intent="groupProps.intent"
        :size="groupProps.size"
        :item="item"
        :item-indicator="itemIndicator"
        :item-text="itemText"
      />
      <UIMenuRadioGroup
        v-else-if="groupEntry.type === 'radio-group'"
        v-bind="groupEntry"
        :intent="groupProps.intent"
        :size="groupProps.size"
        :item="item"
        :item-group="itemGroup"
        :item-group-label="itemGroupLabel"
        :item-indicator="itemIndicator"
        :item-text="itemText"
      />
      <UIMenuSubmenu
        v-else-if="groupEntry.type === 'submenu'"
        v-bind="groupEntry"
        :intent="groupProps.intent"
        :size="groupProps.size"
        :item="item"
        :item-group="itemGroup"
        :item-group-label="itemGroupLabel"
        :separator="separator"
        :item-indicator="itemIndicator"
        :item-text="itemText"
      />
      <UIMenuGroup
        v-else-if="groupEntry.type === 'group'"
        v-bind="groupEntry"
        :intent="groupProps.intent"
        :size="groupProps.size"
        :item="item"
        :item-group="itemGroup"
        :item-group-label="itemGroupLabel"
        :separator="separator"
        :item-indicator="itemIndicator"
        :item-text="itemText"
      />
      <UIMenuItem
        v-else
        v-bind="groupEntry"
        :intent="groupProps.intent"
        :size="groupProps.size"
        :item="item"
      />
    </template>
  </ArkMenu.ItemGroup>
</template>
