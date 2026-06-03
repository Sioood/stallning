import { omitUndefinedValues, pickDefined } from '@/utils/object'

import type { ChartStackedBarPassthrough } from '@/utils/Components/Chart/context'
import type { NumericAccessor, StackedBarConfigInterface } from '@unovis/ts'

export const CHART_STACKED_BAR_OPTIONAL_PROP_KEYS = [
  'color',
  'barWidth',
  'barMaxWidth',
  'dataStep',
  'barPadding',
  'roundedCorners',
  'cursor',
  'barMinHeight1Px',
  'barMinHeightZeroValue',
  'orientation',
  'duration',
  'id',
  'events',
  'attributes',
  'xScale',
  'yScale',
  'excludeFromDomainCalculation',
] as const satisfies readonly (keyof ChartStackedBarPassthrough<Record<string, unknown>>)[]

export function buildChartStackedBarVisBind<T extends Record<string, unknown>>(options: {
  passthrough: ChartStackedBarPassthrough<T>
  x: NumericAccessor<T>
  y: NumericAccessor<T>[]
  color?: StackedBarConfigInterface<T>['color']
}): StackedBarConfigInterface<T> {
  const { passthrough, x, y, color } = options
  return omitUndefinedValues({
    x,
    y,
    ...pickDefined(passthrough, CHART_STACKED_BAR_OPTIONAL_PROP_KEYS),
    ...(color !== undefined ? { color } : {}),
  }) as StackedBarConfigInterface<T>
}
