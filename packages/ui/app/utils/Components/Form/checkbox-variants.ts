import { cva } from 'class-variance-authority'

import type { FormFieldIntent, FormFieldSize } from './context'

export const checkboxControlCVA = cva(
  [
    'size-4 shrink-0 border',
    'border-primary-border-default data-hover:border-primary-border-default-hover data-[disabled]:border-primary-border-subtle data-[invalid]:border-error-border-default',
  ],
  {
    variants: {
      disabled: {
        false: '',
        true: '',
      } satisfies Record<'false' | 'true', string>,
      intent: {
        accent: '',
        error: '',
        info: '',
        neutral: '',
        primary: '',
        secondary: '',
        success: '',
        warning: '',
      } satisfies Record<FormFieldIntent, string>,
      invalid: {
        false: '',
        true: '',
      } satisfies Record<'false' | 'true', string>,
      size: {
        lg: '',
        md: '',
        sm: '',
      } satisfies Record<FormFieldSize, string>,
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
      disabled: {
        false: '',
        true: '',
      } satisfies Record<'false' | 'true', string>,
      intent: {
        accent: '',
        error: '',
        info: '',
        neutral: '',
        primary: '',
        secondary: '',
        success: '',
        warning: '',
      } satisfies Record<FormFieldIntent, string>,
      invalid: {
        false: '',
        true: '',
      } satisfies Record<'false' | 'true', string>,
      size: {
        lg: '',
        md: '',
        sm: '',
      } satisfies Record<FormFieldSize, string>,
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
      disabled: {
        false: 'cursor-pointer',
        true: '',
      } satisfies Record<'false' | 'true', string>,
      intent: {
        accent: '',
        error: '',
        info: '',
        neutral: '',
        primary: '',
        secondary: '',
        success: '',
        warning: '',
      } satisfies Record<FormFieldIntent, string>,
      invalid: {
        false: '',
        true: 'data-[invalid]:border-error-border-default',
      } satisfies Record<'false' | 'true', string>,
      size: {
        lg: '',
        md: '',
        sm: '',
      } satisfies Record<FormFieldSize, string>,
    },
  },
)

export const treeNodeCheckboxIndicatorCVA = cva('flex size-full items-center justify-center')

export function checkboxDisabledFlag(disabled: boolean): 'false' | 'true' {
  return disabled ? 'true' : 'false'
}

export function checkboxInvalidFlag(invalid: boolean): 'false' | 'true' {
  return invalid ? 'true' : 'false'
}
