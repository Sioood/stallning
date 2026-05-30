import { h } from 'vue'

import type { MenuListEntry } from '@/components/Menu/index.vue'
import type { ColumnDef, Row } from '@tanstack/vue-table'
import type { Component, VNode } from 'vue'

type RenderableComponent = Component | string

function srOnlyHeader(label: string): () => VNode {
  return () => h('span', { class: 'sr-only' }, label)
}

export interface SelectionColumnComponents {
  Header: RenderableComponent
  Cell: RenderableComponent
}

export function createSelectionColumn<TData>(
  components: SelectionColumnComponents,
): ColumnDef<TData, unknown> {
  return {
    id: 'select',
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) =>
      h(components.Header, {
        checked: table.getIsAllPageRowsSelected()
          ? true
          : table.getIsSomePageRowsSelected()
            ? 'indeterminate'
            : false,
        toggleSelected: (value: boolean | 'indeterminate') => {
          table.toggleAllPageRowsSelected(!!value)
        },
      }),
    cell: ({ row }) =>
      h(components.Cell, {
        checked: row.getIsSelected() ? true : row.getIsSomeSelected() ? 'indeterminate' : false,
        toggleSelected: (value: boolean | 'indeterminate') => {
          row.toggleSelected(!!value)
        },
      }),
  }
}

export interface ExpandColumnComponents {
  Toggle: RenderableComponent
}

export function createExpandToggleColumn<TData>(
  components: ExpandColumnComponents,
): ColumnDef<TData, unknown> {
  return {
    id: 'expand',
    enableSorting: false,
    enableHiding: false,
    header: srOnlyHeader('Expand row'),
    meta: {
      class: {
        th: 'w-0',
        td: 'w-0',
      },
    },
    cell: ({ row }) =>
      h(components.Toggle, {
        key: row.id,
        rowId: row.id,
      }),
  }
}

interface ActionsColumnComponents {
  Cell: RenderableComponent
}

export interface ActionsColumnOptions<TData> {
  components: ActionsColumnComponents
  getItems: (row: Row<TData>) => MenuListEntry[]
}

export function createActionsColumn<TData>(
  options: ActionsColumnOptions<TData>,
  id = 'actions',
): ColumnDef<TData, unknown> {
  return {
    id,
    enableSorting: false,
    enableHiding: false,
    header: srOnlyHeader('Row actions'),
    meta: {
      class: {
        th: 'w-0 text-right',
        td: 'w-0 text-right',
      },
    },
    cell: ({ row }) =>
      h(options.components.Cell, {
        items: options.getItems(row),
      }),
  }
}
