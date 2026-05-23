import { cva } from 'class-variance-authority'

import type { SelectIntent, SelectSize } from './context'

export const selectRootCVA = cva('flex w-full flex-col gap-1')

export const selectControlCVA = cva('flex items-center gap-1')

export const selectTriggerCVA = cva('w-full justify-between active:scale-100', {
  variants: {
    intent: {
      neutral: '',
      primary: '',
      secondary: '',
      accent: '',
    } satisfies Record<SelectIntent, string>,
    size: {
      sm: '',
      md: '',
      lg: '',
    } satisfies Record<SelectSize, string>,
  },
})

export const selectClearTriggerCVA = cva(
  'cursor-pointer hover:text-error-text-default-hover data-[disabled=true]:cursor-not-allowed',
)

export const selectPositionerCVA = cva('z-9999 origin-(--transform-origin)')

export const selectContentCVA = cva(
  [
    'overflow-y-auto border',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
    'data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95',
    'max-h-[min(var(--available-height,20rem),20rem)]',
    'w-(--reference-width) min-w-(--reference-width) max-w-(--reference-width)',
  ],
  {
    variants: {
      intent: {
        neutral: 'border-neutral-border-subtle bg-neutral-fill-subtle text-neutral-text-default',
        primary: 'border-primary-border-subtle bg-primary-fill-subtle text-primary-text-default',
        secondary:
          'border-secondary-border-subtle bg-secondary-fill-subtle text-secondary-text-default',
        accent: 'border-accent-border-subtle bg-accent-fill-subtle text-accent-text-default',
      } satisfies Record<SelectIntent, string>,
      size: {
        sm: 'txt-caption p-1',
        md: 'txt-label p-1',
        lg: 'txt-base p-1',
      } satisfies Record<SelectSize, string>,
    },
  },
)

export const selectItemCVA = cva(
  'flex cursor-pointer items-center outline-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
  {
    variants: {
      intent: {
        neutral:
          'text-neutral-text-default data-[disabled]:text-neutral-text-subtle data-[highlighted]:bg-neutral-fill-subtle-hover',
        primary:
          'text-primary-text-default data-[disabled]:text-primary-text-subtle data-[highlighted]:bg-primary-fill-subtle-hover',
        secondary:
          'text-secondary-text-default data-[disabled]:text-secondary-text-subtle data-[highlighted]:bg-secondary-fill-subtle-hover',
        accent:
          'text-accent-text-default data-[disabled]:text-accent-text-subtle data-[highlighted]:bg-accent-fill-subtle-hover',
      } satisfies Record<SelectIntent, string>,
      size: {
        sm: 'txt-caption gap-2 px-2 py-1',
        md: 'txt-label gap-2 px-2 py-1.5',
        lg: 'txt-base gap-2 px-3 py-2',
      } satisfies Record<SelectSize, string>,
    },
  },
)

export const selectItemGroupLabelCVA = cva('', {
  variants: {
    intent: {
      neutral: 'text-neutral-text-subtle',
      primary: 'text-primary-text-subtle',
      secondary: 'text-secondary-text-subtle',
      accent: 'text-accent-text-subtle',
    } satisfies Record<SelectIntent, string>,
    size: {
      sm: 'txt-caption px-2 py-1',
      md: 'txt-caption px-2 py-1',
      lg: 'txt-label px-2 py-1',
    } satisfies Record<SelectSize, string>,
  },
})

export const selectLabelCVA = cva('block', {
  variants: {
    intent: {
      neutral:
        'text-neutral-text-subtle data-[disabled]:opacity-50 data-[invalid]:text-error-text-default',
      primary:
        'text-primary-text-subtle data-[disabled]:opacity-50 data-[invalid]:text-error-text-default',
      secondary:
        'text-secondary-text-subtle data-[disabled]:opacity-50 data-[invalid]:text-error-text-default',
      accent:
        'text-accent-text-subtle data-[disabled]:opacity-50 data-[invalid]:text-error-text-default',
    } satisfies Record<SelectIntent, string>,
    size: {
      sm: 'txt-caption mb-1',
      md: 'txt-caption mb-1',
      lg: 'txt-label mb-1.5',
    } satisfies Record<SelectSize, string>,
  },
})

export const selectIconSizeCVA = cva('shrink-0', {
  variants: {
    size: {
      sm: 'size-3',
      md: 'size-3.5',
      lg: 'size-4',
    } satisfies Record<SelectSize, string>,
  },
})
