<script setup lang="ts">
import {
  createActionsColumn,
  createExpandToggleColumn,
  createSelectionColumn,
} from '~/utils/Components/Table/column-helpers'

import type { MenuListEntry } from '@/components/Menu/index.vue'
import type { Row } from '@tanstack/vue-table'
import type { UITableColumn } from '~/utils/Components/Table/types'

const UIBadge = resolveComponent('UIBadge')
const UISortHeader = resolveComponent('UITableHelpersSortHeader')
const UIExpandToggle = resolveComponent('UITableHelpersExpandToggle')

type Payment = {
  id: string
  date: string
  status: 'paid' | 'failed' | 'refunded'
  email: string
  amount: number
}

type GroupedPayment = Payment & {
  account: {
    id: string
    name: string
  }
}

const statuses = ['paid', 'failed', 'refunded'] as const

const data = ref<Payment[]>(
  Array.from({ length: 20 }, (_, index) => {
    const id = String(4600 - index)
    const status = statuses[index % statuses.length] ?? 'paid'

    return {
      id,
      date: new Date(Date.UTC(2024, 2, 11, 15 - (index % 8), index * 3)).toISOString(),
      status,
      email: `user${index + 1}@example.com`,
      amount: 100 + index * 37,
    }
  }),
)

const statusBadgeIntent = {
  paid: 'success',
  failed: 'error',
  refunded: 'neutral',
} as const

function statusBadge(status: Payment['status']) {
  return h(UIBadge, {
    intent: statusBadgeIntent[status],
    label: status,
  })
}

function sortHeader(label: string) {
  return ({ column }: { column: { id: string } }) => h(UISortHeader, { column, label })
}

function paymentRowActions(row: Row<Payment>): MenuListEntry[] {
  return [
    {
      type: 'item',
      value: 'log-row',
      label: 'Log row data',
      onSelect: () => {
        console.log('[TableExample] row data', row.original)
      },
    },
    {
      type: 'item',
      value: 'log-email',
      label: 'Log email',
      onSelect: () => {
        console.log('[TableExample] email', row.getValue('email'))
      },
    },
  ]
}

const columns = ref<UITableColumn<Payment>[]>([
  createSelectionColumn({
    Header: resolveComponent('UITableHelpersRowSelectionHeader'),
    Cell: resolveComponent('UITableHelpersRowSelectionCell'),
  }),
  {
    accessorKey: 'id',
    header: sortHeader('ID'),
    cell: ({ row }) => `#${row.getValue('id')}`,
  },
  {
    accessorKey: 'status',
    header: sortHeader('Status'),
    cell: ({ row }) => statusBadge(row.getValue('status') as Payment['status']),
    enableHiding: true,
  },
  {
    accessorKey: 'email',
    header: sortHeader('Email'),
    enableHiding: true,
  },
  {
    accessorKey: 'date',
    header: sortHeader('Date'),
    cell: ({ row }) =>
      new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }).format(
        new Date(String(row.getValue('date'))),
      ),
    enableHiding: true,
  },
  {
    accessorKey: 'amount',
    header: sortHeader('Amount'),
    meta: {
      class: {
        th: 'text-right',
        td: 'text-right font-medium',
      },
    },
    cell: ({ row }) =>
      new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(
        Number(row.getValue('amount')),
      ),
    enableHiding: true,
  },
  createActionsColumn({
    components: {
      Cell: resolveComponent('UITableHelpersRowActionsMenu'),
    },
    getItems: paymentRowActions,
  }),
])

const sorting = ref([{ id: 'email', desc: false }])
const rowSelection = ref<Record<string, boolean>>({})
const globalFilter = ref('')
const columnFilters = ref<{ id: string; value: unknown }[]>([])
const columnVisibility = ref<Record<string, boolean>>({})
const pagination = ref({ pageIndex: 0, pageSize: 5 })

const selectedCount = computed(() => Object.values(rowSelection.value).filter(Boolean).length)
const filteredCount = computed(() => {
  if (!globalFilter.value) return data.value.length
  const query = globalFilter.value.toLowerCase()
  return data.value.filter((row) => row.email.toLowerCase().includes(query)).length
})

const getRowId = (row: Payment) => row.id

const expanded = ref<Record<string, boolean>>({ '4600': true })

const expandColumns = ref<UITableColumn<Payment>[]>([
  createExpandToggleColumn({
    Toggle: UIExpandToggle,
  }),
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => `#${row.getValue('id')}`,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => statusBadge(row.getValue('status') as Payment['status']),
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) =>
      new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }).format(
        new Date(String(row.getValue('date'))),
      ),
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    meta: {
      class: {
        th: 'text-right',
        td: 'text-right font-medium',
      },
    },
    cell: ({ row }) =>
      new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(
        Number(row.getValue('amount')),
      ),
  },
])

const groupedData = ref<GroupedPayment[]>([
  {
    id: '4600',
    date: '2024-03-11T15:30:00.000Z',
    status: 'paid',
    email: 'james.anderson@example.com',
    amount: 594,
    account: { id: '1', name: 'Account 1' },
  },
  {
    id: '4599',
    date: '2024-03-11T10:10:00.000Z',
    status: 'failed',
    email: 'mia.white@example.com',
    amount: 276,
    account: { id: '2', name: 'Account 2' },
  },
  {
    id: '4598',
    date: '2024-03-11T08:50:00.000Z',
    status: 'refunded',
    email: 'william.brown@example.com',
    amount: 315,
    account: { id: '1', name: 'Account 1' },
  },
  {
    id: '4597',
    date: '2024-03-10T19:45:00.000Z',
    status: 'paid',
    email: 'emma.davis@example.com',
    amount: 529,
    account: { id: '2', name: 'Account 2' },
  },
  {
    id: '4596',
    date: '2024-03-10T15:55:00.000Z',
    status: 'paid',
    email: 'ethan.harris@example.com',
    amount: 639,
    account: { id: '1', name: 'Account 1' },
  },
])

const grouping = ref(['account_id', 'status'])

const groupedColumns = ref<UITableColumn<GroupedPayment>[]>([
  {
    id: 'title',
    header: 'Item',
    cell: ({ row }) => {
      if (!row.getIsGrouped()) return null

      return h('div', { class: 'flex items-center gap-2' }, [
        h('span', {
          class: 'inline-block shrink-0',
          style: { width: `calc(${row.depth} * 1rem)` },
        }),
        h(UIExpandToggle, {
          key: row.id,
          rowId: row.id,
        }),
        row.groupingColumnId === 'account_id'
          ? h('strong', { class: 'txt-label' }, row.original.account.name)
          : row.groupingColumnId === 'status'
            ? h(UIBadge, {
                intent: statusBadgeIntent[row.original.status],
                size: 'sm',
                label: row.original.status,
              })
            : null,
      ])
    },
  },
  {
    id: 'account_id',
    accessorKey: 'account.id',
  },
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) =>
      row.getIsGrouped() ? `${row.getValue('id')} records` : `#${row.getValue('id')}`,
    aggregationFn: 'count',
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) =>
      new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }).format(
        new Date(String(row.getValue('date'))),
      ),
    aggregationFn: 'max',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'email',
    header: 'Email',
    meta: {
      class: {
        td: 'w-full',
      },
    },
    cell: ({ row }) =>
      row.getIsGrouped() ? `${row.getValue('email')} customers` : String(row.getValue('email')),
    aggregationFn: 'uniqueCount',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    meta: {
      class: {
        th: 'text-right',
        td: 'text-right font-medium',
      },
    },
    cell: ({ row }) =>
      new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(
        Number(row.getValue('amount')),
      ),
    aggregationFn: 'sum',
  },
])

const contextMenuColumns = ref<UITableColumn<Payment>[]>([
  createSelectionColumn({
    Header: resolveComponent('UITableHelpersRowSelectionHeader'),
    Cell: resolveComponent('UITableHelpersRowSelectionCell'),
  }),
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => `#${row.getValue('id')}`,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => statusBadge(row.getValue('status') as Payment['status']),
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    meta: {
      class: {
        th: 'text-right',
        td: 'text-right font-medium',
      },
    },
    cell: ({ row }) =>
      new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(
        Number(row.getValue('amount')),
      ),
  },
])

function contextMenuItems(row: Row<Payment>): MenuListEntry[] {
  return [
    {
      type: 'item',
      value: 'log-row',
      label: 'Log row data',
      onSelect: () => {
        console.log('[TableExample] context menu row', row.original)
      },
    },
    {
      type: 'item',
      value: 'copy-id',
      label: 'Copy payment ID',
      onSelect: () => {
        void navigator.clipboard.writeText(row.original.id)
        console.log('[TableExample] copied id', row.original.id)
      },
    },
    { type: 'separator' },
    {
      type: 'item',
      value: 'toggle-expand',
      label: row.getIsExpanded() ? 'Collapse row' : 'Expand row',
      onSelect: () => {
        row.toggleExpanded()
      },
    },
  ]
}
</script>

<template>
  <div class="flex flex-col gap-10 p-4">
    <section class="flex flex-col gap-2">
      <h3 class="txt-h3">Basic</h3>
      <p class="txt-caption text-neutral-text-subtle">Auto-generated columns from data keys.</p>
      <UITable :data class="max-h-80" />
    </section>

    <section class="flex flex-col gap-2">
      <h3 class="txt-h3">Sorting, selection &amp; global filter</h3>
      <p class="txt-caption text-neutral-text-subtle">
        Header checkbox selects all rows on the current page. Filter matches email addresses.
      </p>
      <UITable
        v-model:sorting="sorting"
        v-model:row-selection="rowSelection"
        v-model:global-filter="globalFilter"
        intent="primary"
        :data
        :columns
        :get-row-id="getRowId"
        sticky="header"
        class="max-h-72"
        selectable
      >
        <template #toolbar>
          <div class="flex flex-wrap items-center gap-2 border-b border-neutral-border-subtle p-2">
            <UITableHelpersGlobalFilter placeholder="Filter emails…" class="min-w-48 flex-1" />
          </div>
        </template>
      </UITable>
      <p class="txt-caption text-neutral-text-subtle">
        {{ selectedCount }} row(s) selected · {{ filteredCount }} visible row(s)
      </p>
    </section>

    <section class="flex flex-col gap-2">
      <h3 class="txt-h3">Column filter &amp; visibility</h3>
      <p class="txt-caption text-neutral-text-subtle">
        Filter the status column or hide columns from the menu.
      </p>
      <UITable
        v-model:column-filters="columnFilters"
        v-model:column-visibility="columnVisibility"
        :data
        :columns
        :get-row-id="getRowId"
        sticky="header"
        class="max-h-72"
      >
        <template #toolbar>
          <div class="flex flex-wrap items-center gap-2 border-b border-neutral-border-subtle p-2">
            <UITableHelpersColumnFilter
              column-id="status"
              placeholder="Filter status…"
              class="min-w-40"
            />
            <UITableHelpersColumnVisibilityMenu />
          </div>
        </template>
      </UITable>
    </section>

    <section class="flex flex-col gap-2">
      <h3 class="txt-h3">Pagination</h3>
      <p class="txt-caption text-neutral-text-subtle">
        20 rows with 5 rows per page — use the footer to navigate.
      </p>
      <UITable
        v-model:pagination="pagination"
        :data
        :columns
        :get-row-id="getRowId"
        sticky="header"
      >
        <template #footer>
          <UITableHelpersPaginationFooter intent="neutral" />
        </template>
      </UITable>
    </section>

    <section class="flex flex-col gap-2">
      <h3 class="txt-h3">Sticky header + formatted cells</h3>
      <p class="txt-caption text-neutral-text-subtle">
        Scroll inside the table container to see the sticky header stay visible.
      </p>
      <UITable :data :columns :get-row-id="getRowId" sticky="header" class="max-h-48" />
    </section>

    <section class="flex flex-col gap-2">
      <h3 class="txt-h3">Expandable rows</h3>
      <p class="txt-caption text-neutral-text-subtle">
        Click the +/- toggle to expand a row and render custom content via the
        <code>#expanded</code> slot. Bind <code>v-model:expanded</code> to control state.
      </p>
      <UITable
        v-model:expanded="expanded"
        :data="data.slice(0, 5)"
        :columns="expandColumns"
        :get-row-id="getRowId"
        sticky="header"
      >
        <template #expanded="{ row }">
          <pre class="txt-caption overflow-x-auto p-4 text-neutral-text-subtle">{{
            row.original
          }}</pre>
        </template>
      </UITable>
    </section>

    <section class="flex flex-col gap-2">
      <h3 class="txt-h3">Grouped rows</h3>
      <p class="txt-caption text-neutral-text-subtle">
        Rows grouped by account and status. Use +/- on group headers to show or hide sub-rows.
      </p>
      <UITable
        v-model:grouping="grouping"
        :data="groupedData"
        :columns="groupedColumns"
        :get-row-id="getRowId"
        grouped-column-mode="remove"
        sticky="header"
      />
    </section>

    <section class="flex flex-col gap-2">
      <h3 class="txt-h3">Row context menu</h3>
      <p class="txt-caption text-neutral-text-subtle">
        Right-click a row to open a <code>UIMenu</code> context menu with row-specific actions.
      </p>
      <UITableHelpersRowContextMenu :get-items="contextMenuItems">
        <template #default="{ onContextmenu }">
          <UITable
            :data="data.slice(0, 5)"
            :columns="contextMenuColumns"
            :get-row-id="getRowId"
            sticky="header"
            :on-contextmenu="onContextmenu"
          />
        </template>
      </UITableHelpersRowContextMenu>
    </section>

    <section class="flex flex-col gap-2">
      <h3 class="txt-h3">Row actions</h3>
      <p class="txt-caption text-neutral-text-subtle">
        Use the ⋮ menu on each row — actions receive the full TanStack row (e.g. log
        <code>row.original</code>).
      </p>
      <UITable :data="data.slice(0, 5)" :columns :get-row-id="getRowId" sticky="header" />
    </section>

    <section class="flex flex-col gap-2">
      <h3 class="txt-h3">Loading &amp; empty</h3>
      <UITable :data="[]" loading empty="No payments found" />
    </section>
  </div>
</template>
