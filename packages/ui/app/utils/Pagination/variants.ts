import { cva } from 'class-variance-authority'

import type { PaginationIntent, PaginationSize } from './context'

export const paginationRootCVA = cva('paginationRoot flex items-stretch', {
  variants: {
    intent: {
      neutral: '',
      primary: '',
      secondary: '',
      accent: '',
    } satisfies Record<PaginationIntent, string>,
    size: {
      sm: '',
      md: '',
      lg: '',
    } satisfies Record<PaginationSize, string>,
  },
})

export const paginationEllipsisCVA = cva('inline-flex items-center justify-center', {
  variants: {
    size: {
      sm: 'py-1',
      md: 'py-2',
      lg: 'py-3',
    } satisfies Record<PaginationSize, string>,
  },
})
