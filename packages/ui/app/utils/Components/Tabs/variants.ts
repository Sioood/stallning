import { cva } from 'class-variance-authority'

import type { TabsSize } from './context'

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
