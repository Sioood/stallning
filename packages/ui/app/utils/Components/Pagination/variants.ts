import { cva } from 'class-variance-authority'

import type { PaginationIntent, PaginationSize } from './context'

export const paginationRootCVA = cva('flex items-stretch', {
  variants: {
    intent: {
      neutral: 'text-neutral-text-default',
      primary: 'text-primary-text-default',
      secondary: 'text-secondary-text-default',
      accent: 'text-accent-text-default',
    } satisfies Record<PaginationIntent, string>,
    size: {
      sm: 'gap-1',
      md: 'gap-1.5',
      lg: 'gap-2',
    } satisfies Record<PaginationSize, string>,
  },
  defaultVariants: {
    intent: 'neutral',
    size: 'md',
  },
})

export const paginationEllipsisCVA = cva(
  ['inline-flex items-center justify-center', 'pointer-events-none select-none'],
  {
    variants: {
      size: {
        sm: 'txt-caption min-w-8 px-1 py-1',
        md: 'txt-base min-w-10 px-2 py-2',
        lg: 'txt-h6 min-w-12 px-2 py-3',
      } satisfies Record<PaginationSize, string>,
    },
    defaultVariants: {
      size: 'md',
    },
  },
)
