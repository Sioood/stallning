<script setup lang="ts">
import type { ChartLegendSeries } from '~ui/app/utils/Components/Chart/context'

import type { UITableColumn } from '~/utils/Components/Table/types'

definePageMeta({ layout: 'scenario' })

const activeTab = ref('overview')
const period = ref('7d')
const nav = ref('dashboard')

const navOptions = [
  { icon: 'tabler:layout-dashboard', label: 'Dashboard', value: 'dashboard' },
  { icon: 'tabler:users', label: 'Clients', value: 'clients' },
  { icon: 'tabler:receipt', label: 'Facturation', value: 'billing' },
  { icon: 'tabler:users-group', label: 'Équipe', value: 'team' },
]

const tabOptions = [
  { icon: 'tabler:layout-dashboard', label: 'Vue d’ensemble', value: 'overview' },
  { icon: 'tabler:activity', label: 'Activité', value: 'activity' },
  { icon: 'tabler:report-analytics', label: 'Rapports', value: 'reports' },
]

const periodOptions = [
  { label: '7 jours', value: '7d' },
  { label: '30 jours', value: '30d' },
  { label: '90 jours', value: '90d' },
]

const kpis = [
  {
    cardIntent: 'accent' as const,
    change: '+12 %',
    icon: 'tabler:currency-euro',
    label: 'Revenus',
    progress: 78,
    progressIntent: 'primary' as const,
    value: '24 850 €',
  },
  {
    cardIntent: 'primary' as const,
    change: '+4 %',
    icon: 'tabler:user-plus',
    label: 'Nouveaux clients',
    progress: 62,
    progressIntent: 'primary' as const,
    value: '186',
  },
  {
    cardIntent: 'secondary' as const,
    change: '−2 %',
    icon: 'tabler:user-minus',
    label: 'Taux de churn',
    progress: 32,
    progressIntent: 'accent' as const,
    value: '3,2 %',
  },
  {
    cardIntent: 'neutral' as const,
    change: 'Stable',
    icon: 'tabler:mood-smile',
    label: 'NPS',
    progress: 62,
    progressIntent: 'neutral' as const,
    value: '62',
  },
]

type RevenuePoint = {
  index: number
  label: string
  abonnements: number
  services: number
  oneShot: number
}

type ChannelShare = {
  label: string
  value: number
}

const revenueSeries: ChartLegendSeries[] = [
  { color: 'var(--vis-color0)', key: 'abonnements', label: 'Abonnements' },
  { color: 'var(--vis-color1)', key: 'services', label: 'Services' },
  { color: 'var(--vis-color2)', key: 'oneShot', label: 'One-shot' },
]

const channelSeries: ChartLegendSeries[] = [
  { color: 'var(--vis-color0)', key: 'organic', label: 'Organique' },
  { color: 'var(--vis-color1)', key: 'direct', label: 'Direct' },
  { color: 'var(--vis-color2)', key: 'referral', label: 'Parrainage' },
  { color: 'var(--vis-color3)', key: 'ads', label: 'Publicité' },
]

const revenueSeed: Record<string, Omit<RevenuePoint, 'index' | 'label'>[]> = {
  '7d': [
    { abonnements: 2.1, oneShot: 0.6, services: 1.2 },
    { abonnements: 2.4, oneShot: 0.8, services: 1.1 },
    { abonnements: 2.2, oneShot: 0.5, services: 1.4 },
    { abonnements: 2.8, oneShot: 0.9, services: 1.3 },
    { abonnements: 2.6, oneShot: 0.7, services: 1.5 },
    { abonnements: 3.1, oneShot: 1.0, services: 1.6 },
    { abonnements: 2.9, oneShot: 0.8, services: 1.4 },
  ],
  '30d': [
    { abonnements: 8.2, oneShot: 2.1, services: 4.4 },
    { abonnements: 8.8, oneShot: 2.4, services: 4.8 },
    { abonnements: 9.1, oneShot: 2.0, services: 5.1 },
    { abonnements: 9.6, oneShot: 2.7, services: 5.3 },
  ],
  '90d': [
    { abonnements: 22.4, oneShot: 6.1, services: 12.2 },
    { abonnements: 24.1, oneShot: 6.8, services: 13.0 },
    { abonnements: 25.6, oneShot: 7.2, services: 13.8 },
  ],
}

const channelByPeriod: Record<string, ChannelShare[]> = {
  '7d': [
    { label: 'Organique', value: 38 },
    { label: 'Direct', value: 27 },
    { label: 'Parrainage', value: 20 },
    { label: 'Publicité', value: 15 },
  ],
  '30d': [
    { label: 'Organique', value: 42 },
    { label: 'Direct', value: 24 },
    { label: 'Parrainage', value: 18 },
    { label: 'Publicité', value: 16 },
  ],
  '90d': [
    { label: 'Organique', value: 45 },
    { label: 'Direct', value: 22 },
    { label: 'Parrainage', value: 17 },
    { label: 'Publicité', value: 16 },
  ],
}

const revenueLabels: Record<string, string[]> = {
  '7d': ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
  '30d': ['S1', 'S2', 'S3', 'S4'],
  '90d': ['M-2', 'M-1', 'M'],
}

const revenueData = computed((): RevenuePoint[] => {
  const seed = revenueSeed[period.value] ?? revenueSeed['7d']!
  const labels = revenueLabels[period.value] ?? revenueLabels['7d']!
  return seed.map((point, index) => ({
    ...point,
    index,
    label: labels[index] ?? `${index + 1}`,
  }))
})

const channelData = computed(
  (): ChannelShare[] => channelByPeriod[period.value] ?? channelByPeriod['7d']!,
)

const revenueX = (d: RevenuePoint) => d.index
const channelValue = (d: ChannelShare) => d.value

function formatRevenue(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    currency: 'EUR',
    maximumFractionDigits: 1,
    notation: 'compact',
    style: 'currency',
  }).format(value * 1000)
}

function formatChannelShare(value: number): string {
  return `${value} %`
}

type Order = {
  id: string
  customer: string
  status: 'paid' | 'pending' | 'failed'
  amount: string
}

const UIBadgeComp = resolveComponent('UIBadge')

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

const orders = ref<Order[]>([
  { amount: '148,00 €', customer: 'Marie Dupont', id: 'CMD-1042', status: 'paid' },
  { amount: '62,50 €', customer: 'Jean Martin', id: 'CMD-1041', status: 'pending' },
  { amount: '210,00 €', customer: 'Léa Bernard', id: 'CMD-1040', status: 'paid' },
  { amount: '39,90 €', customer: 'Omar Said', id: 'CMD-1039', status: 'failed' },
  { amount: '95,00 €', customer: 'Nina Costa', id: 'CMD-1038', status: 'paid' },
])

const columns = ref<UITableColumn<Order>[]>([
  { accessorKey: 'id', header: 'Référence' },
  { accessorKey: 'customer', header: 'Client' },
  {
    accessorKey: 'status',
    cell: ({ row }) =>
      h(UIBadgeComp, {
        intent: statusIntent[row.original.status],
        label: statusLabel[row.original.status],
        size: 'sm',
        variant: 'subtle',
      }),
    header: 'Statut',
  },
  { accessorKey: 'amount', header: 'Montant' },
])

const activities = [
  { detail: 'Marie Dupont a finalisé CMD-1042', time: 'Il y a 12 min', title: 'Paiement reçu' },
  { detail: 'Export CSV des ventes Q2', time: 'Il y a 1 h', title: 'Rapport généré' },
  { detail: 'Omar Said — panier abandonné', time: 'Il y a 3 h', title: 'Alerte churn' },
]

const funnelSteps = [
  { label: 'Visites', progress: 100, value: '12 480' },
  { label: 'Inscriptions', progress: 48, value: '5 990' },
  { label: 'Essais', progress: 28, value: '3 494' },
  { label: 'Payants', progress: 14, value: '1 748' },
]
</script>

<template>
  <div class="min-h-[calc(100svh-3.25rem)]">
    <div class="mx-auto flex w-full max-w-7xl gap-8 px-4 py-8 md:px-8">
      <aside class="hidden w-56 shrink-0 lg:block">
        <p class="txt-caption mb-4 font-medium text-neutral-text">Stallning Admin</p>
        <UITabs
          v-model="nav"
          orientation="vertical"
          variant="pill"
          intent="neutral"
          size="sm"
          :options="navOptions"
          :render-content="false"
          :ui="{
            root: 'w-full',
            list: 'w-full flex-col',
            trigger: 'w-full justify-start',
          }"
        />
      </aside>

      <div class="flex min-w-0 flex-1 flex-col gap-8">
        <header class="flex flex-wrap items-end justify-between gap-4">
          <div class="min-w-0">
            <h1 class="txt-h4 text-neutral-text">Tableau de bord</h1>
            <p class="txt-caption mt-1 text-neutral-text-subtle">
              Vue consolidée de l’activité sur la période sélectionnée.
            </p>
          </div>
          <UISegmentGroup
            v-model="period"
            :options="periodOptions"
            intent="neutral"
            variant="pill"
            size="sm"
          />
        </header>

        <div class="grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <UICard
            v-for="kpi in kpis"
            :key="kpi.label"
            variant="subtle"
            intent="neutral"
            size="md"
            :leading-icon="kpi.icon"
            :title="kpi.value"
            :description="kpi.label"
            :tag="kpi.change"
            :element-intent="kpi.cardIntent"
            class="w-full"
          >
            <UIProgress
              :model-value="kpi.progress"
              :label="kpi.label"
              :intent="kpi.progressIntent"
              size="sm"
            />
          </UICard>
        </div>

        <div class="flex w-full min-w-0 flex-col gap-6 lg:flex-row">
          <UICardBase
            variant="subtle"
            intent="neutral"
            size="lg"
            class="flex min-h-80 w-full min-w-0 flex-1 flex-col gap-4 lg:basis-0"
          >
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p class="txt-label text-neutral-text">Revenus par offre</p>
                <p class="txt-caption text-neutral-text-subtle">
                  Stacked bar — période «
                  {{ periodOptions.find((p) => p.value === period)?.label }} ».
                </p>
              </div>
            </div>
            <UIChartStackedBar
              :data="revenueData"
              :series="revenueSeries"
              :x="revenueX"
              :height="280"
              size="sm"
              :ui="{ root: 'min-w-0 w-full' }"
              :value-formatter="(value) => formatRevenue(value)"
              :legend="{ show: true, placement: 'top-start' }"
              :axis="{
                variant: 'dashed',
                x: {
                  show: true,
                  tickFormat: (tick) => revenueData[Number(tick)]?.label ?? String(tick),
                },
                y: { show: true, gridLine: true },
              }"
            />
          </UICardBase>

          <UICardBase
            variant="subtle"
            intent="neutral"
            size="lg"
            class="flex min-h-80 w-full min-w-0 flex-1 flex-col gap-4 lg:max-w-md lg:basis-0"
          >
            <div>
              <p class="txt-label text-neutral-text">Acquisition</p>
              <p class="txt-caption text-neutral-text-subtle">Donut — part de chaque canal.</p>
            </div>
            <UIChartDonut
              :data="channelData"
              :series="channelSeries"
              :value="channelValue"
              :label="(d) => d.label"
              :height="260"
              size="sm"
              :ui="{ root: 'min-w-0 w-full' }"
              central-label="100 %"
              central-sub-label="Trafic"
              :value-formatter="(value) => formatChannelShare(value)"
              :legend="{ show: true, placement: 'bottom-center' }"
            />
          </UICardBase>
        </div>

        <UITabs
          v-model="activeTab"
          :options="tabOptions"
          intent="primary"
          size="md"
          :ui="{
            root: 'w-full',
            list: 'w-full',
            trigger: 'flex-1 justify-center',
            content: 'w-full',
          }"
        >
          <template #content-overview>
            <div class="mt-6 grid w-full gap-6 lg:grid-cols-5">
              <UICardBase
                variant="subtle"
                intent="neutral"
                size="lg"
                class="flex w-full flex-col items-center gap-5 lg:col-span-2"
              >
                <p class="txt-label w-full text-neutral-text">Objectif mensuel</p>
                <UIProgressCircular :model-value="72" size="lg" intent="primary" />
                <p class="txt-caption text-center text-neutral-text-subtle">17 900 € / 25 000 €</p>
              </UICardBase>

              <UICardBase
                variant="subtle"
                intent="neutral"
                size="lg"
                class="flex w-full flex-col gap-4 lg:col-span-3"
              >
                <div class="flex items-center justify-between gap-3">
                  <p class="txt-label text-neutral-text">Commandes récentes</p>
                  <UIBadge label="5" size="sm" intent="neutral" variant="subtle" />
                </div>
                <UITable :data="orders" :columns="columns" sticky="header" class="max-h-64" />
              </UICardBase>
            </div>
          </template>

          <template #content-activity>
            <div class="mt-6 grid w-full gap-6 lg:grid-cols-5">
              <UICardBase
                variant="subtle"
                intent="neutral"
                size="lg"
                class="flex w-full flex-col gap-5 lg:col-span-2"
              >
                <p class="txt-label text-neutral-text">Entonnoir conversion</p>
                <div
                  v-for="step in funnelSteps"
                  :key="step.label"
                  class="flex w-full flex-col gap-2"
                >
                  <div class="flex items-center justify-between gap-2">
                    <span class="txt-caption text-neutral-text-subtle">{{ step.label }}</span>
                    <span class="txt-caption text-neutral-text tabular-nums">{{ step.value }}</span>
                  </div>
                  <UIProgress
                    :model-value="step.progress"
                    :label="step.label"
                    intent="primary"
                    size="sm"
                  />
                </div>
              </UICardBase>

              <div class="flex w-full flex-col gap-3 lg:col-span-3">
                <UICardBase
                  v-for="item in activities"
                  :key="item.title"
                  variant="subtle"
                  intent="neutral"
                  size="lg"
                  class="flex w-full items-start justify-between gap-4"
                >
                  <div class="min-w-0">
                    <p class="txt-label text-neutral-text">{{ item.title }}</p>
                    <p class="txt-caption mt-1 text-neutral-text-subtle">{{ item.detail }}</p>
                  </div>
                  <span class="txt-caption shrink-0 text-neutral-text-subtle">{{ item.time }}</span>
                </UICardBase>
              </div>
            </div>
          </template>

          <template #content-reports>
            <div class="mt-6 grid w-full gap-6 lg:grid-cols-2">
              <UICardBase
                variant="subtle"
                intent="neutral"
                size="lg"
                class="flex w-full flex-col gap-5"
              >
                <div class="flex flex-col gap-2">
                  <p class="txt-label text-neutral-text">Exports disponibles</p>
                  <p class="txt-caption text-neutral-text-subtle">
                    Générez un rapport pour la période «
                    {{ periodOptions.find((p) => p.value === period)?.label }} ».
                  </p>
                </div>
                <div class="flex flex-wrap gap-3">
                  <UIButton
                    intent="primary"
                    text="Exporter CSV"
                    leading-icon="tabler:file-spreadsheet"
                  />
                  <UIButton
                    variant="subtle"
                    intent="neutral"
                    text="Exporter PDF"
                    leading-icon="tabler:file-type-pdf"
                  />
                </div>
              </UICardBase>

              <UICardBase
                variant="subtle"
                intent="neutral"
                size="lg"
                class="flex w-full flex-col gap-4"
              >
                <p class="txt-label text-neutral-text">Mix canaux (aperçu)</p>
                <UIChartDonut
                  :data="channelData"
                  :series="channelSeries"
                  :value="channelValue"
                  :label="(d) => d.label"
                  :height="220"
                  size="sm"
                  :arc-width="0"
                  :value-formatter="(value) => formatChannelShare(value)"
                  :legend="{ show: true, placement: 'right-center' }"
                />
              </UICardBase>
            </div>
          </template>
        </UITabs>
      </div>
    </div>
  </div>
</template>
