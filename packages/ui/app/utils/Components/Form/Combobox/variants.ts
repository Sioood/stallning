import { cva } from 'class-variance-authority'

import {
  selectContentCVA,
  selectIconSizeCVA,
  selectItemCVA,
  selectItemGroupLabelCVA,
  selectPositionerCVA,
} from '~/utils/Components/Form/Select/variants'

import type { ComboboxIntent, ComboboxSize } from './context'

export {
  selectContentCVA as comboboxContentCVA,
  selectIconSizeCVA as comboboxIconSizeCVA,
  selectItemCVA as comboboxItemCVA,
  selectItemGroupLabelCVA as comboboxItemGroupLabelCVA,
}

export const comboboxPositionerCVA = cva([
  selectPositionerCVA(),
  'w-(--reference-width) min-w-(--reference-width)',
])

export const comboboxRootCVA = cva('flex w-full flex-col gap-1')

export const comboboxControlCVA = cva('flex min-w-0 flex-1 flex-col items-stretch gap-0.5 p-0')

export const comboboxControlRowCVA = cva('flex w-full min-w-0 items-center')

export const comboboxInputCVA = cva(
  'txt-base w-full min-w-0 flex-none border-0 bg-transparent p-0 outline-none',
  {
    variants: {
      size: {
        sm: 'txt-caption',
        md: 'txt-label',
        lg: 'txt-base',
      } satisfies Record<ComboboxSize, string>,
      intent: {
        neutral:
          'text-neutral-text-default placeholder:text-neutral-text-subtle disabled:text-neutral-text-default-disabled',
        primary:
          'text-primary-text-default placeholder:text-primary-text-subtle disabled:text-primary-text-default-disabled',
        secondary:
          'text-secondary-text-default placeholder:text-secondary-text-subtle disabled:text-secondary-text-default-disabled',
        accent:
          'text-accent-text-default placeholder:text-accent-text-subtle disabled:text-accent-text-default-disabled',
      } satisfies Record<ComboboxIntent, string>,
    },
  },
)

export const comboboxTriggerCVA = cva(
  'inline-flex shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent outline-none disabled:cursor-not-allowed',
  {
    variants: {
      intent: {
        neutral:
          'text-neutral-text-subtle hover:text-neutral-text-default disabled:text-neutral-text-default-disabled',
        primary:
          'text-primary-text-subtle hover:text-primary-text-default disabled:text-primary-text-default-disabled',
        secondary:
          'text-secondary-text-subtle hover:text-secondary-text-default disabled:text-secondary-text-default-disabled',
        accent:
          'text-accent-text-subtle hover:text-accent-text-default disabled:text-accent-text-default-disabled',
      } satisfies Record<ComboboxIntent, string>,
      size: {
        sm: 'size-7',
        md: 'size-8',
        lg: 'size-9',
      } satisfies Record<ComboboxSize, string>,
    },
  },
)

export const comboboxClearTriggerCVA = cva(
  'inline-flex shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent outline-none hover:text-error-text-default-hover data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
  {
    variants: {
      size: {
        sm: 'size-7',
        md: 'size-8',
        lg: 'size-9',
      } satisfies Record<ComboboxSize, string>,
    },
  },
)

export const comboboxSelectedItemsCVA = cva('flex flex-wrap items-center gap-1')

export const comboboxEmptyCVA = cva('cursor-default text-neutral-text-subtle', {
  variants: {
    size: {
      sm: 'txt-caption px-2 py-1',
      md: 'txt-label px-2 py-1.5',
      lg: 'txt-base px-3 py-2',
    } satisfies Record<ComboboxSize, string>,
  },
})
