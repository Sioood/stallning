import { cva } from 'class-variance-authority'

import { parseChartLegendPlacement } from '@/utils/Components/Chart/legend-placement'

import type {
  ChartAxisVariant,
  ChartIntent,
  ChartLegendAlign,
  ChartLegendPlacement,
  ChartLegendSide,
  ChartSize,
} from './context'

const LEGEND_SIDES = [
  'top',
  'right',
  'bottom',
  'left',
] as const satisfies readonly ChartLegendSide[]
const LEGEND_ALIGNS = ['start', 'center', 'end'] as const satisfies readonly ChartLegendAlign[]

function legendAlignItems(align: ChartLegendAlign): string {
  return (
    {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
    } as const
  )[align]
}

function chartRootPlacementClass(side: ChartLegendSide, align: ChartLegendAlign): string {
  switch (side) {
    case 'top':
      return `flex-col ${legendAlignItems(align)}`
    case 'bottom':
      return `flex-col-reverse ${legendAlignItems(align)}`
    case 'left':
      return `flex-row ${legendAlignItems(align)}`
    case 'right':
      return `flex-row-reverse ${legendAlignItems(align)}`
  }
}

function chartLegendPlacementClass(side: ChartLegendSide, align: ChartLegendAlign): string {
  const isVertical = side === 'left' || side === 'right'
  const direction = isVertical ? 'flex-col' : 'flex-row flex-wrap'
  if (isVertical) {
    // Cross-axis: nudge labels toward the chart (left → end, right → start in LTR).
    const crossAlign = side === 'right' ? 'items-start' : 'items-end'
    const mainAlign = (
      {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
      } as const
    )[align]
    return `flex ${direction} gap-x-5 gap-y-2 ${crossAlign} ${mainAlign}`
  }
  const mainAlign = (
    {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
    } as const
  )[align]
  return `flex ${direction} gap-x-5 gap-y-2 ${mainAlign}`
}

function buildLegendPlacementVariants(
  classFor: (side: ChartLegendSide, align: ChartLegendAlign) => string,
): Record<ChartLegendPlacement, string> {
  const variants = {} as Record<ChartLegendPlacement, string>
  for (const side of LEGEND_SIDES) {
    variants[side] = classFor(side, 'center')
    for (const align of LEGEND_ALIGNS) {
      if (align !== 'center') {
        variants[`${side}-${align}`] = classFor(side, align)
      }
    }
  }
  return variants
}

const chartRootPlacementVariants = buildLegendPlacementVariants(chartRootPlacementClass)
const chartLegendPlacementVariants = buildLegendPlacementVariants(chartLegendPlacementClass)

const chartTooltipCVA = cva('[--vis-tooltip-border-radius:0]', {
  variants: {
    intent: {
      neutral:
        '[--vis-tooltip-background-color:var(--color-neutral-surface-default)] [--vis-tooltip-border-color:transparent] [--vis-tooltip-text-color:var(--color-neutral-text-default)]',
      primary:
        '[--vis-tooltip-background-color:var(--color-primary-surface-default)] [--vis-tooltip-border-color:transparent] [--vis-tooltip-text-color:var(--color-primary-text-default)]',
      secondary:
        '[--vis-tooltip-background-color:var(--color-secondary-surface-default)] [--vis-tooltip-border-color:transparent] [--vis-tooltip-text-color:var(--color-secondary-text-default)]',
      accent:
        '[--vis-tooltip-background-color:var(--color-accent-surface-default)] [--vis-tooltip-border-color:transparent] [--vis-tooltip-text-color:var(--color-accent-text-default)]',
    } satisfies Record<ChartIntent, string>,
    size: {
      sm: 'txt-caption [--vis-tooltip-padding:calc(var(--spacing)*0.5)_var(--spacing)]',
      md: 'txt-caption [--vis-tooltip-padding:var(--spacing)_calc(var(--spacing)*2)]',
      lg: 'txt-base [--vis-tooltip-padding:calc(var(--spacing)*1.5)_calc(var(--spacing)*3)]',
    } satisfies Record<ChartSize, string>,
  },
})

const chartAxisCVA = cva('', {
  variants: {
    variant: {
      default: '',
      dashed: '[--vis-axis-domain-line-dasharray:none] [--vis-axis-grid-line-dasharray:5_5]',
    } satisfies Record<ChartAxisVariant, string>,
    intent: {
      neutral:
        '[--vis-axis-grid-color:var(--color-neutral-border-subtle)] [--vis-axis-text-color:var(--color-neutral-text-default)] [--vis-axis-tick-color:var(--color-neutral-border-subtle)]',
      primary:
        '[--vis-axis-grid-color:var(--color-primary-border-subtle)] [--vis-axis-text-color:var(--color-primary-text-default)] [--vis-axis-tick-color:var(--color-primary-border-subtle)]',
      secondary:
        '[--vis-axis-grid-color:var(--color-secondary-border-subtle)] [--vis-axis-text-color:var(--color-secondary-text-default)] [--vis-axis-tick-color:var(--color-secondary-border-subtle)]',
      accent:
        '[--vis-axis-grid-color:var(--color-accent-border-subtle)] [--vis-axis-text-color:var(--color-accent-text-default)] [--vis-axis-tick-color:var(--color-accent-border-subtle)]',
    } satisfies Record<ChartIntent, string>,
  },
})

/** Layout of chart + legend wrapper from legend placement. */
const chartRootCVA = cva('flex w-full font-mono', {
  variants: {
    legendPlacement: chartRootPlacementVariants,
    gap: {
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
    } satisfies Record<ChartSize, string>,
  },
  defaultVariants: {
    legendPlacement: 'top',
    gap: 'md',
  },
})

/** Legend item list layout from placement. */
export const chartLegendCVA = cva('', {
  variants: {
    legendPlacement: chartLegendPlacementVariants,
    size: {
      sm: 'txt-small',
      md: 'txt-caption',
      lg: 'txt-base',
    } satisfies Record<ChartSize, string>,
  },
  defaultVariants: {
    legendPlacement: 'top',
    size: 'md',
  },
})

export function chartThemeClasses(options: {
  intent: ChartIntent
  size: ChartSize
  axisVariant?: ChartAxisVariant
}): string {
  return cn(
    chartAxisCVA({ intent: options.intent, variant: options.axisVariant ?? 'default' }),
    chartTooltipCVA({ intent: options.intent, size: options.size }),
    '[--vis-font-family:var(--font-mono)]',
  )
}

export function chartLegendPlacementClasses(
  placement: ChartLegendPlacement,
  size: ChartSize,
): { root: string; legend: string } {
  const { side, align } = parseChartLegendPlacement(placement)
  const placementKey: ChartLegendPlacement = align === 'center' ? side : `${side}-${align}`
  return {
    root: chartRootCVA({ legendPlacement: placementKey }),
    legend: chartLegendCVA({ legendPlacement: placementKey, size }),
  }
}
