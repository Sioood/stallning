<script setup lang="ts">
import { Menu as ArkMenu } from '@ark-ui/vue/menu'

import {
  menuItemCVA,
  menuItemGroupLabelCVA,
  menuItemIndicatorCVA,
  menuItemIndicatorSlotCVA,
  menuItemTextCVA,
} from '~/utils/Components/Menu/variants'

import type { ClassValue } from 'vue'
import type { MenuIntent } from '~/utils/Components/Menu/context'
import type { MenuRadioGroupEntry } from '~/utils/Components/Menu/entries'

export interface MenuRadioGroupProps extends MenuRadioGroupEntry {
  intent?: MenuIntent
  size?: 'md'
  item?: ClassValue
  itemGroup?: ClassValue
  itemGroupLabel?: ClassValue
  itemIndicator?: ClassValue
  itemText?: ClassValue
}

const props = withDefaults(defineProps<MenuRadioGroupProps>(), {
  customClass: undefined,
  intent: 'neutral',
  item: undefined,
  itemGroup: undefined,
  itemGroupLabel: undefined,
  itemIndicator: undefined,
  itemText: undefined,
  label: undefined,
  onValueChange: undefined,
  size: 'md',
  value: undefined,
})

const groupProps = computed(() => pick(props, ['value'] as const))

function handleValueChange(value: string) {
  props.onValueChange?.(value)
}
</script>

<template>
  <ArkMenu.RadioItemGroup
    v-bind="groupProps"
    :class="cn(itemGroup)"
    @update:model-value="handleValueChange(($event as string) ?? '')"
  >
    <ArkMenu.ItemGroupLabel
      v-if="label"
      :class="cn(menuItemGroupLabelCVA({ intent, size }), itemGroupLabel)"
    >
      {{ label }}
    </ArkMenu.ItemGroupLabel>

    <ArkMenu.RadioItem
      v-for="radioItem in items"
      :key="radioItem.value"
      :class="cn(menuItemCVA({ intent, layout: 'split', size }), item, customClass)"
      :value="radioItem.value"
      :disabled="radioItem.disabled"
    >
      <ArkMenu.ItemText :class="cn(menuItemTextCVA({ intent, size }), itemText)">
        {{ radioItem.label }}
      </ArkMenu.ItemText>
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
    </ArkMenu.RadioItem>
  </ArkMenu.RadioItemGroup>
</template>
