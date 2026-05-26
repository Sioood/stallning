import { cva } from 'class-variance-authority'

import type { FormFieldIntent, FormFieldSize } from './context'

type CheckboxVariantOptions = {
  intent: FormFieldIntent
  size: FormFieldSize
  disabled: boolean
  invalid: boolean
}

export const checkboxControlCVA = cva(
  [
    'size-4 shrink-0 border',
    'border-primary-border-default data-hover:border-primary-border-default-hover data-[disabled]:border-primary-border-subtle data-[invalid]:border-error-border-default',
  ],
  {
    variants: {
      intent: {
        primary: '',
      } satisfies Record<FormFieldIntent, string>,
      size: {
        md: '',
      } satisfies Record<FormFieldSize, string>,
      disabled: {
        true: '',
        false: '',
      } satisfies Record<'false' | 'true', string>,
      invalid: {
        true: '',
        false: '',
      } satisfies Record<'false' | 'true', string>,
    },
  },
)

export const checkboxIndicatorCVA = cva(
  [
    'flex size-full items-center justify-center',
    'bg-primary-fill-subtle text-primary-text-default',
    'group-data-[state=checked]:bg-primary-fill-default group-data-[state=checked]:text-primary-fill-inverse',
    'group-data-[state=indeterminate]:bg-primary-fill-default group-data-[state=indeterminate]:text-primary-fill-inverse',
  ],
  {
    variants: {
      intent: {
        primary: '',
      } satisfies Record<FormFieldIntent, string>,
      size: {
        md: '',
      } satisfies Record<FormFieldSize, string>,
      disabled: {
        true: '',
        false: '',
      } satisfies Record<'false' | 'true', string>,
      invalid: {
        true: '',
        false: '',
      } satisfies Record<'false' | 'true', string>,
    },
  },
)

/** Combined control surface for TreeView `NodeCheckbox` (single element, `data-[state=*]`). */
export const treeNodeCheckboxCVA = cva(
  [
    'inline-flex size-4 shrink-0 items-center justify-center border',
    'border-primary-border-default bg-primary-fill-subtle text-primary-text-default',
    'data-hover:border-primary-border-default-hover',
    'data-[state=checked]:border-primary-fill-default data-[state=checked]:bg-primary-fill-default data-[state=checked]:text-primary-fill-inverse',
    'data-[state=indeterminate]:border-primary-fill-default data-[state=indeterminate]:bg-primary-fill-default data-[state=indeterminate]:text-primary-fill-inverse',
    'data-[disabled]:cursor-not-allowed data-[disabled]:border-primary-border-subtle',
  ],
  {
    variants: {
      intent: {
        primary: '',
      } satisfies Record<FormFieldIntent, string>,
      size: {
        md: '',
      } satisfies Record<FormFieldSize, string>,
      disabled: {
        true: '',
        false: 'cursor-pointer',
      } satisfies Record<'false' | 'true', string>,
      invalid: {
        true: 'data-[invalid]:border-error-border-default',
        false: '',
      } satisfies Record<'false' | 'true', string>,
    },
  },
)

export const treeNodeCheckboxIndicatorCVA = cva('flex size-full items-center justify-center')

export function checkboxVariantOptions(
  intent: FormFieldIntent,
  size: FormFieldSize,
  disabled = false,
  invalid = false,
): CheckboxVariantOptions {
  return {
    intent,
    size,
    disabled,
    invalid,
  }
}

export function checkboxDisabledFlag(disabled: boolean): 'false' | 'true' {
  return disabled ? 'true' : 'false'
}

export function checkboxInvalidFlag(invalid: boolean): 'false' | 'true' {
  return invalid ? 'true' : 'false'
}
