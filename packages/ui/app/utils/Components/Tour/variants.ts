import type { StepAction as TourStepAction } from '@zag-js/tour'

export function resolveActionVariant(
  action: TourStepAction,
  _actions: TourStepAction[],
  index: number,
): 'default' | 'primary' {
  const isLast = index === _actions.length - 1
  const isDismiss = action.action === 'dismiss'
  const isNext = action.action === 'next'
  if (isLast && (isDismiss || isNext)) return 'primary'
  return 'default'
}
