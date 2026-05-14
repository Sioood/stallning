<script setup lang="ts">
import {
  Select as ArkSelect,
  type SelectContentProps as ArkSelectContentProps,
  type ListCollection,
} from '@ark-ui/vue/select'

import { selectItemCVA, selectItemGroupLabelCVA, selectIconSizeCVA } from './variants'

import type { SelectIntent, SelectSize, SelectItem, UISelectSlots } from './componentContext'

interface ContentProps extends ArkSelectContentProps {
  collection: ListCollection<SelectItem>
  intent: SelectIntent
  size: SelectSize
  loading: boolean
  loadingText: string
  emptyText: string
  allowSelectAll: boolean
  isGrouped: boolean
  ui?: Partial<UISelectSlots>
}

const props = withDefaults(defineProps<ContentProps>(), {
  ui: undefined,
})

const itemClass = computed(() =>
  cn(selectItemCVA({ intent: props.intent, size: props.size }), props.ui?.item),
)

const itemGroupLabelClass = computed(() =>
  cn(selectItemGroupLabelCVA({ intent: props.intent, size: props.size }), props.ui?.itemGroupLabel),
)

const iconClass = computed(() => cn(selectIconSizeCVA({ size: props.size })))

const groups = computed(() => {
  if (!props.isGrouped) return null
  return props.collection.group()
})
</script>

<template>
  <div v-if="loading" :class="cn(itemClass, 'cursor-default gap-2 text-neutral-text-subtle')">
    <Icon name="tabler:loader" :class="cn(iconClass, 'animate-spin')" />
    {{ loadingText }}
  </div>

  <div
    v-else-if="collection.size === 0"
    :class="cn(itemClass, 'cursor-default text-neutral-text-subtle')"
  >
    {{ emptyText }}
  </div>

  <template v-else>
    <ArkSelect.Context v-if="allowSelectAll" v-slot="api">
      <button
        type="button"
        :class="cn(itemClass, 'w-full font-medium')"
        @click="
          () => {
            api.selectAll()
            api.setOpen(false)
          }
        "
      >
        <Icon name="tabler:checks" :class="iconClass" />
        {{ $t('select.selectAll') }}
      </button>
    </ArkSelect.Context>

    <template v-if="isGrouped && groups">
      <ArkSelect.ItemGroup
        v-for="[groupKey, groupItems] in groups"
        :key="groupKey"
        :class="cn(ui?.itemGroup)"
      >
        <ArkSelect.ItemGroupLabel :class="itemGroupLabelClass">
          {{ groupKey }}
        </ArkSelect.ItemGroupLabel>
        <ArkSelect.Item
          v-for="item in groupItems"
          :key="item.value"
          :item="item"
          :class="itemClass"
        >
          <ArkSelect.ItemText :class="cn('flex-1 truncate', ui?.itemText)">
            {{ item.label }}
          </ArkSelect.ItemText>
          <ArkSelect.ItemIndicator
            :class="cn('data-[state=unchecked]:invisible', ui?.itemIndicator)"
          >
            <Icon name="tabler:check" :class="iconClass" />
          </ArkSelect.ItemIndicator>
        </ArkSelect.Item>
      </ArkSelect.ItemGroup>
    </template>

    <template v-else>
      <ArkSelect.Item
        v-for="item in collection.items"
        :key="item.value"
        :item="item"
        :class="itemClass"
      >
        <ArkSelect.ItemText :class="cn('flex-1 truncate', ui?.itemText)">
          {{ item.label }}
        </ArkSelect.ItemText>
        <ArkSelect.ItemIndicator :class="cn('data-[state=unchecked]:invisible', ui?.itemIndicator)">
          <Icon name="tabler:check" :class="iconClass" />
        </ArkSelect.ItemIndicator>
      </ArkSelect.Item>
    </template>
  </template>
</template>
