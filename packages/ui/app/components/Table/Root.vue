<script setup lang="ts" generic="TData extends RowData">
import { tableChromeKey } from '~/utils/Components/Table/context'
import { resolveStickyVariant, tableBaseCVA, tableRootCVA } from '~/utils/Components/Table/variants'

import type { RowData, Table } from '@tanstack/vue-table'
import type { ClassValue, Ref } from 'vue'
import type { TableRootProps } from '~/utils/Components/Table/types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TableRootProps<TData>>(), {
  intent: 'neutral',
  size: 'md',
  sticky: undefined,
  loading: false,
  empty: undefined,
  ui: undefined,
})

const attrs = useAttrs()
const tableRef = useTemplateRef<HTMLTableElement>('tableRef')
const scrollRef = useTemplateRef<HTMLDivElement>('scrollRef')

const intent = toRef(props, 'intent')
const size = toRef(props, 'size')
const sticky = toRef(props, 'sticky')
const loading = toRef(props, 'loading')
const ui = toRef(props, 'ui')
const emptyText = toRef(props, 'empty')
const table = toRef(props, 'table')

provide(tableChromeKey, {
  intent,
  size,
  sticky,
  loading,
  ui,
  emptyText,
  table: table as Ref<Table<RowData>>,
})

const stickyVariant = computed(() => resolveStickyVariant(sticky.value))

defineExpose({
  tableRef,
  scrollRef,
  tableApi: table,
})

extendCompodiumMeta<TableRootProps<TData>>({
  defaultProps: {
    intent: 'neutral',
    size: 'md',
    loading: false,
  },
})
</script>

<template>
  <div
    ref="scrollRef"
    :class="
      cn(tableRootCVA({ sticky: stickyVariant }), ui?.root, attrs.class as ClassValue | undefined)
    "
    v-bind="omit(attrs, ['class'] as const)"
  >
    <slot name="toolbar" />
    <div class="relative">
      <table ref="tableRef" :class="cn(tableBaseCVA({ size }), ui?.base)">
        <slot />
      </table>
      <slot name="state" />
    </div>
    <slot name="footer" />
  </div>
</template>
