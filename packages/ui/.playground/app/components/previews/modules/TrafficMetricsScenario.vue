<script setup lang="ts">
import type { ChartLegendSeries } from '~ui/app/utils/Components/Chart/context'

/**
 * Stacked bar with configured axes, plus a standalone legend shared across the chart
 * and the numeric summary below it.
 */

interface Row {
  index: number
  cached: number
  live: number
  errors: number
}

const data: Row[] = [
  { cached: 820, errors: 12, index: 0, live: 340 },
  { cached: 910, errors: 8, index: 1, live: 420 },
  { cached: 780, errors: 24, index: 2, live: 510 },
  { cached: 1040, errors: 6, index: 3, live: 380 },
  { cached: 1180, errors: 14, index: 4, live: 460 },
  { cached: 990, errors: 9, index: 5, live: 620 },
  { cached: 1260, errors: 4, index: 6, live: 540 },
]

const series: ChartLegendSeries[] = [
  { key: 'cached', label: 'Cache' },
  { key: 'live', label: 'Direct' },
  { key: 'errors', label: 'Erreurs' },
]

const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

const totals = computed(() =>
  series.map((s) => ({
    key: s.key,
    label: s.label,
    total: data.reduce((sum, row) => sum + (row[s.key as keyof Row] as number), 0),
  })),
)
</script>

<template>
  <div class="flex flex-col gap-4">
    <UIChartStackedBar
      :data="data"
      :series="series"
      :x="(d: Row) => d.index"
      :y="[(d: Row) => d.cached, (d: Row) => d.live, (d: Row) => d.errors]"
      :height="180"
      :legend="{ show: false }"
      :axis="{
        x: { tickFormat: (v: number) => days[v] ?? '', variant: 'default' },
        y: { variant: 'dashed' },
      }"
      aria-label="Requêtes par jour et par origine"
    />

    <UIChartLegend :series="series" placement="bottom-start" size="sm" />

    <div class="grid grid-cols-3 gap-2">
      <div
        v-for="total in totals"
        :key="total.key"
        class="flex flex-col gap-0.5 border border-neutral-border-subtle px-3 py-2"
      >
        <span class="txt-overline text-neutral-text-muted">{{ total.label }}</span>
        <span class="txt-numeric txt-label text-neutral-text">
          {{ total.total.toLocaleString('fr-FR') }}
        </span>
      </div>
    </div>
  </div>
</template>
