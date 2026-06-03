<script setup lang="ts" generic="T extends Record<string, unknown>">
import {
  Orientation,
  Position,
  type ColorAccessor,
  type NumericAccessor,
  type StackedBarConfigInterface,
} from '@unovis/ts'
import { VisStackedBar } from '@unovis/vue'
import { computed } from 'vue'

import { buildChartCrosshairVisBind } from '@/utils/Components/Chart/crosshair'
import {
  buildChartStackedBarVisBind,
  CHART_STACKED_BAR_OPTIONAL_PROP_KEYS,
} from '@/utils/Components/Chart/stacked-bar'
import {
  buildHorizontalStackedBarTooltipTriggers,
  buildStackedBarDefaultTooltip,
  type StackedBarCrosshairTemplate,
} from '@/utils/Components/Chart/stacked-bar-tooltip'
import { buildChartTooltipVisBind } from '@/utils/Components/Chart/tooltip'
import {
  chartLegendPlacementClasses,
  chartLegendCVA,
  chartThemeClasses,
} from '@/utils/Components/Chart/variants'
import { pickDefined } from '@/utils/object'

import type {
  ChartAxesConfig,
  ChartAxisProps,
  ChartCrosshairProps,
  ChartIntent,
  ChartLegendConfig,
  ChartSize,
  ChartStackedBarPassthrough,
  ChartStackedBarSeries,
  ChartTooltipProps,
  ChartXYContainerProps,
  UIChartStackedBarSlots,
} from '@/utils/Components/Chart/context'

interface ChartStackedBarProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> extends ChartStackedBarPassthrough<T> {
  data?: T[]
  /** Required in app code; omitted only in Compodium preview (built-in demo fallback). */
  x?: NumericAccessor<T>
  y?: NumericAccessor<T>[]
  series?: ChartStackedBarSeries[]
  height?: number
  width?: number | string
  ariaLabel?: string | null
  /** @deprecated Prefer `legend.show` */
  showLegend?: boolean
  /** @deprecated Prefer `crosshair.show` */
  showCrosshair?: boolean
  /** @deprecated Prefer `tooltip.show` */
  showTooltip?: boolean
  /** @deprecated Prefer `crosshair` + `template` or `tooltipTemplate` */
  tooltipTemplate?: (datum: T) => string
  valueFormatter?: (value: number, seriesItem: ChartStackedBarSeries) => string
  /** @deprecated Prefer `tooltip.verticalShift` */
  tooltipVerticalShift?: number
  intent?: ChartIntent
  size?: ChartSize
  ui?: Partial<UIChartStackedBarSlots>
  axis?: ChartAxesConfig<T>
  legend?: ChartLegendConfig
  crosshair?: ChartCrosshairProps<T>
  tooltip?: ChartTooltipProps
  /** XY container passthrough (margin, domain, scale, …). `data` / `height` / `width` stay top-level. */
  container?: Omit<ChartXYContainerProps<T>, 'data' | 'ui'>
}

const props = withDefaults(defineProps<ChartStackedBarProps<T>>(), {
  data: () => [],
  height: 450,
  showCrosshair: true,
  showTooltip: true,
  showLegend: false,
  intent: 'neutral',
  size: 'md',
  ui: () => ({}),
  x: undefined,
  y: undefined,
  series: undefined,
  width: undefined,
  ariaLabel: undefined,
  tooltipTemplate: undefined,
  valueFormatter: undefined,
  tooltipVerticalShift: undefined,
  axis: () => ({
    variant: 'dashed',
    x: { show: true, gridLine: true },
    y: { show: true, gridLine: true },
  }),
  legend: undefined,
  crosshair: undefined,
  tooltip: undefined,
  container: undefined,
})

const axisXConfig = computed(
  (): ChartAxisProps<T> => ({
    show: true,
    ...props.axis?.x,
  }),
)

const axisYConfig = computed(
  (): ChartAxisProps<T> => ({
    show: true,
    ...props.axis?.y,
  }),
)

const resolvedSeries = computed((): ChartStackedBarSeries[] => {
  if (props.series?.length) {
    return props.series
  }
  return []
})

const xAccessor = computed((): NumericAccessor<T> | undefined => {
  if (props.x !== undefined) {
    return props.x
  }
  return undefined
})

const yAccessors = computed((): NumericAccessor<T>[] => {
  if (props.y?.length) {
    return props.y
  }
  return resolvedSeries.value.map((seriesItem) => (datum: T) => {
    const raw = datum[seriesItem.key]
    return typeof raw === 'number' ? raw : Number(raw) || 0
  })
})

const isChartReady = computed(
  () =>
    props.data?.length > 0 &&
    yAccessors.value.length > 0 &&
    xAccessor.value !== undefined &&
    xAccessor.value !== null,
)

const barColor = computed((): ColorAccessor<T> | string[] | undefined => {
  if (props.color !== undefined) {
    return props.color
  }
  if (resolvedSeries.value.length === 0) {
    return undefined
  }
  return resolvedSeries.value.map(
    (seriesItem, index) => seriesItem.color ?? `var(--vis-color${index})`,
  )
})

const showLegendResolved = computed(() => props.legend?.show ?? props.showLegend ?? false)

const legendPlacement = computed(() => props.legend?.placement ?? 'top-center')

const showCrosshairResolved = computed(() => props.crosshair?.show ?? props.showCrosshair ?? true)

const showTooltipResolved = computed(() => props.tooltip?.show ?? props.showTooltip ?? true)

const themeClass = computed(() =>
  chartThemeClasses({
    intent: props.intent,
    size: props.size,
    axisVariant: props.axis?.variant,
  }),
)

const layoutClasses = computed(() => chartLegendPlacementClasses(legendPlacement.value, props.size))

const rootClass = computed(() => cn(layoutClasses.value.root, themeClass.value, props.ui?.root))

const legendUi = computed(() => props.legend?.ui)

const containerUiClass = computed(() => cn(props.ui?.chart))

const stackedBarOrientation = computed(() => props.orientation ?? Orientation.Vertical)

const isHorizontalStackedBar = computed(
  () => stackedBarOrientation.value === Orientation.Horizontal,
)

const showCrosshairOnChart = computed(
  () => showCrosshairResolved.value && !isHorizontalStackedBar.value,
)

const visStackedBarBind = computed(
  (): StackedBarConfigInterface<T> =>
    buildChartStackedBarVisBind({
      passthrough: {
        ...pickDefined(props, CHART_STACKED_BAR_OPTIONAL_PROP_KEYS),
        orientation: stackedBarOrientation.value,
      },
      x: xAccessor.value!,
      y: yAccessors.value,
      color: barColor.value,
    }),
)

function formatValue(value: number, seriesItem: ChartStackedBarSeries): string {
  if (props.valueFormatter) {
    return props.valueFormatter(value, seriesItem)
  }
  return String(value)
}

const stackedBarTooltipTemplate = computed((): StackedBarCrosshairTemplate<T> => {
  if (props.crosshair?.template) {
    return props.crosshair.template
  }
  if (props.tooltipTemplate) {
    return (datum) => props.tooltipTemplate!(datum)
  }
  return (datum) =>
    buildStackedBarDefaultTooltip({
      datum,
      xAccessor: xAccessor.value!,
      series: resolvedSeries.value,
      formatValue,
    })
})

const chartCrosshairProps = computed(() => ({
  show: showCrosshairOnChart.value,
  ui: props.crosshair?.ui,
  ...buildChartCrosshairVisBind({
    ...props.crosshair,
    // Required when yStacked is set: Unovis treats any configured accessor as explicit and
    // skips XYContainer fallback x (see Crosshair.accessors getter + hasConfig).
    x: props.crosshair?.x ?? xAccessor.value,
    template: props.crosshair?.template ?? stackedBarTooltipTemplate.value,
    yStacked: props.crosshair?.yStacked ?? yAccessors.value,
  }),
}))

const chartTooltipProps = computed(() => {
  const horizontalTriggers =
    isHorizontalStackedBar.value && showTooltipResolved.value
      ? buildHorizontalStackedBarTooltipTriggers(stackedBarTooltipTemplate.value, {
          data: props.data ?? [],
          xAccessor: xAccessor.value!,
        })
      : undefined

  return {
    show: showTooltipResolved.value,
    ui: props.tooltip?.ui,
    ...buildChartTooltipVisBind({
      ...props.tooltip,
      triggers: props.tooltip?.triggers ?? horizontalTriggers,
      followCursor: props.tooltip?.followCursor ?? isHorizontalStackedBar.value,
      verticalShift: props.tooltip?.verticalShift ?? props.tooltipVerticalShift ?? props.height,
      horizontalPlacement: props.tooltip?.horizontalPlacement ?? Position.Center,
    }),
  }
})
</script>

<template>
  <div :class="rootClass">
    <UIChartLegend
      :series="resolvedSeries"
      :placement="legendPlacement"
      :size
      :show="showLegendResolved"
      :ui="legendUi"
    />

    <slot name="legend" :series="resolvedSeries" />

    <UIChartXYContainer
      v-if="isChartReady"
      :data
      :height
      :width
      :aria-label
      :ui="{ root: containerUiClass }"
      v-bind="props.container"
    >
      <VisStackedBar :orientation="stackedBarOrientation" v-bind="visStackedBarBind" />
      <UIChartCrosshair v-bind="chartCrosshairProps" />
      <UIChartTooltip v-bind="chartTooltipProps" />
      <UIChartAxis type="x" v-bind="axisXConfig" />
      <UIChartAxis type="y" v-bind="axisYConfig" />
    </UIChartXYContainer>

    <div
      v-else
      class="flex items-center justify-center border border-neutral-border-subtle bg-neutral-surface-subtle px-4 text-center text-neutral-text-subtle"
      :class="chartLegendCVA({ size: props.size })"
      :style="{ minHeight: `${props.height}px` }"
    >
      Provide <code class="font-mono">data</code>, <code class="font-mono">x</code>, and
      <code class="font-mono">series</code> or <code class="font-mono">y</code> to render the chart.
    </div>
  </div>
</template>
