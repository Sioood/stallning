import { cva } from 'class-variance-authority'

import type { TabsSize, TabsTriggerLayout } from './context'

export const tabsRootCVA = cva('w-fit', {
  variants: {
    variant: {
      line: '',
      pill: '',
    },
    orientation: {
      horizontal: 'flex flex-col',
      vertical: 'flex',
    },
  },
  defaultVariants: {
    variant: 'line',
    orientation: 'horizontal',
  },
})

export const tabsOptionIconCVA = cva('shrink-0', {
  variants: {
    size: {
      sm: 'size-3',
      md: 'size-4',
      lg: 'size-5',
    } satisfies Record<TabsSize, string>,
  },
  defaultVariants: {
    size: 'md',
  },
})

export const tabsTriggerLayoutCVA = cva('', {
  variants: {
    triggerLayout: {
      inline: '',
      stacked: 'flex-col items-center justify-center gap-0.5 text-center whitespace-normal',
    } satisfies Record<TabsTriggerLayout, string>,
  },
  defaultVariants: {
    triggerLayout: 'inline',
  },
})

export const tabsOptionLabelCVA = cva('min-w-0 truncate', {
  variants: {
    triggerLayout: {
      inline: '',
      stacked: 'txt-caption max-w-full truncate',
    } satisfies Record<TabsTriggerLayout, string>,
  },
  defaultVariants: {
    triggerLayout: 'inline',
  },
})
