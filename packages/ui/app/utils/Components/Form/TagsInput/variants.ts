import { cva } from 'class-variance-authority'

import {
  comboboxClearTriggerCVA,
  comboboxIconSizeCVA,
  comboboxRootCVA,
} from '~/utils/Components/Form/Combobox/variants'

import type { TagsInputIntent, TagsInputSize } from './context'

export {
  comboboxClearTriggerCVA as tagsInputClearTriggerCVA,
  comboboxIconSizeCVA as tagsInputComboboxIconSizeCVA,
  comboboxRootCVA as tagsInputRootCVA,
}

export const tagsInputControlCVA = cva('flex min-w-0 flex-1 flex-wrap items-center gap-0.5 p-0', {
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      lg: 'min-h-9',
      md: 'min-h-8',
      sm: 'min-h-7',
    } satisfies Record<TagsInputSize, string>,
  },
})

export const tagsInputInputCVA = cva(
  'txt-base min-w-12 flex-1 border-0 bg-transparent p-0 outline-none',
  {
    variants: {
      intent: {
        accent:
          'text-accent-text-default placeholder:text-accent-text-subtle disabled:text-accent-text-default-disabled',
        neutral:
          'text-neutral-text-default placeholder:text-neutral-text-subtle disabled:text-neutral-text-default-disabled',
        primary:
          'text-primary-text-default placeholder:text-primary-text-subtle disabled:text-primary-text-default-disabled',
        secondary:
          'text-secondary-text-default placeholder:text-secondary-text-subtle disabled:text-secondary-text-default-disabled',
      } satisfies Record<TagsInputIntent, string>,
      size: {
        lg: 'txt-base',
        md: 'txt-label',
        sm: 'txt-caption',
      } satisfies Record<TagsInputSize, string>,
    },
  },
)

export const tagsInputItemsCVA = cva('contents')

export const tagsInputItemPreviewCVA = cva('inline-flex items-center outline-none')

export const tagsInputItemInputCVA = cva(
  'txt-base min-w-12 border-0 bg-transparent px-1 py-0.5 outline-none',
  {
    variants: {
      intent: {
        accent: 'text-accent-text-default',
        neutral: 'text-neutral-text-default',
        primary: 'text-primary-text-default',
        secondary: 'text-secondary-text-default',
      } satisfies Record<TagsInputIntent, string>,
    },
  },
)
