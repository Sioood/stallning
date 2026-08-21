<script setup lang="ts">
import { Menu as ArkMenu } from '@ark-ui/vue/menu'

import { menuCloseOnSelectKey, type MenuIntent } from '~/utils/Components/Menu/context'
import {
  menuItemCVA,
  menuItemIndicatorCVA,
  menuItemIndicatorSlotCVA,
  menuItemTextCVA,
} from '~/utils/Components/Menu/variants'

import type { ClassValue } from 'vue'
import type { MenuCheckboxEntry } from '~/utils/Components/Menu/entries'

export interface MenuCheckboxItemProps extends Omit<MenuCheckboxEntry, 'closeOnSelect'> {
  entryCloseOnSelect?: boolean
  intent?: MenuIntent
  size?: 'md'
  item?: ClassValue
  itemIndicator?: ClassValue
  itemText?: ClassValue
}

const props = withDefaults(defineProps<MenuCheckboxItemProps>(), {
  customClass: undefined,
  entryCloseOnSelect: undefined,
  intent: 'neutral',
  item: undefined,
  itemIndicator: undefined,
  itemText: undefined,
  onCheckedChange: undefined,
  size: 'md',
})

const menuCloseOnSelect = inject(
  menuCloseOnSelectKey,
  computed(() => true),
)

const resolvedCloseOnSelect = computed(() => props.entryCloseOnSelect ?? menuCloseOnSelect.value)

const checkboxProps = computed(() => pick(props, ['checked', 'value', 'disabled'] as const))

function handleCheckedChange(checked: boolean) {
  props.onCheckedChange?.(checked)
}
</script>

<template>
  <ArkMenu.CheckboxItem
    v-bind="checkboxProps"
    :close-on-select="resolvedCloseOnSelect"
    :class="cn(menuItemCVA({ intent, layout: 'split', size }), item, customClass)"
    @update:checked="handleCheckedChange(($event as boolean) ?? false)"
  >
    <ArkMenu.ItemText :class="cn(menuItemTextCVA({ intent, size }), itemText)">
      {{ label }}
    </ArkMenu.ItemText>
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
  </ArkMenu.CheckboxItem>
</template>
