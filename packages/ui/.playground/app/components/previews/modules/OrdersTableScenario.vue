<script setup lang="ts">
import type { UITableColumn } from '~/utils/Components/Table/types'

type Order = {
  id: string
  customer: string
  status: 'paid' | 'pending' | 'failed'
  amount: string
}

const UIBadge = resolveComponent('UIBadge')

const statusIntent = {
  failed: 'error',
  paid: 'success',
  pending: 'warning',
} as const

const statusLabel = {
  failed: 'Échoué',
  paid: 'Payé',
  pending: 'En attente',
} as const

const data = ref<Order[]>([
  { amount: '148,00 €', customer: 'Marie Dupont', id: 'CMD-1042', status: 'paid' },
  { amount: '62,50 €', customer: 'Jean Martin', id: 'CMD-1041', status: 'pending' },
  { amount: '210,00 €', customer: 'Léa Bernard', id: 'CMD-1040', status: 'paid' },
  { amount: '39,90 €', customer: 'Omar Said', id: 'CMD-1039', status: 'failed' },
])

const columns = ref<UITableColumn<Order>[]>([
  { accessorKey: 'id', header: 'Réf.' },
  { accessorKey: 'customer', header: 'Client' },
  {
    accessorKey: 'status',
    cell: ({ row }) =>
      h(UIBadge, {
        intent: statusIntent[row.original.status],
        label: statusLabel[row.original.status],
        size: 'sm',
        variant: 'subtle',
      }),
    header: 'Statut',
  },
  { accessorKey: 'amount', header: 'Montant' },
])
</script>

<template>
  <div class="flex flex-col gap-4">
    <p class="txt-caption text-neutral-text-subtle">Dernières commandes — filtre rapide</p>
    <UITable :data="data" :columns="columns" sticky="header" class="max-h-52" />
  </div>
</template>
