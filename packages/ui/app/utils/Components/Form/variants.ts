import { cva } from 'class-variance-authority'

import type { FormFieldIntent, FormFieldSize } from './context'

/**
 * Visual shell wrapping the actual input element.
 * Provides border, focus ring, background, and disabled/invalid styling.
 */
export const controlShellCVA = cva('flex w-full min-w-0 items-center gap-0.5', {
  compoundVariants: [
    {
      class:
        'border-neutral-border-default bg-neutral-fill-subtle text-neutral-text-default focus-within:border-neutral-border-strong focus-within:focus-ring',
      disabled: false,
      intent: 'neutral',
    },
    {
      class:
        'border-neutral-border-default-disabled bg-neutral-fill-subtle-disabled text-neutral-text-default-disabled',
      disabled: true,
      intent: 'neutral',
    },
    {
      class:
        'border-primary-border-default bg-primary-fill-subtle text-primary-text-default focus-within:border-primary-border-strong focus-within:focus-ring',
      disabled: false,
      intent: 'primary',
    },
    {
      class:
        'border-primary-border-default-disabled bg-primary-fill-subtle-disabled text-primary-text-default-disabled',
      disabled: true,
      intent: 'primary',
    },
    {
      class:
        'border-secondary-border-default bg-secondary-fill-subtle text-secondary-text-default focus-within:border-secondary-border-strong focus-within:focus-ring',
      disabled: false,
      intent: 'secondary',
    },
    {
      class:
        'border-secondary-border-default-disabled bg-secondary-fill-subtle-disabled text-secondary-text-default-disabled',
      disabled: true,
      intent: 'secondary',
    },
    {
      class:
        'border-accent-border-default bg-accent-fill-subtle text-accent-text-default focus-within:border-accent-border-strong focus-within:focus-ring',
      disabled: false,
      intent: 'accent',
    },
    {
      class:
        'border-accent-border-default-disabled bg-accent-fill-subtle-disabled text-accent-text-default-disabled',
      disabled: true,
      intent: 'accent',
    },
  ],
  variants: {
    disabled: {
      true: 'cursor-not-allowed',
    },
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
      true: 'border-error-border-default!',
    },
    size: {
      lg: 'border',
      md: 'border',
      sm: 'border',
    } satisfies Record<FormFieldSize, string>,
  },
})

/**
 * Pin slot geometry — fixed square, centered monospace text.
 * Borders/intent colors come from `fieldInputCVA` applied alongside.
 */
export const pinSlotCVA = cva(
  'flex flex-none items-center justify-center text-center font-mono leading-none',
  {
    variants: {
      invalid: {
        true: 'border-error-border-default! focus:border-error-border-strong! focus:focus-ring',
      },
      size: {
        lg: 'txt-h5 size-12',
        md: 'txt-base size-10',
        sm: 'txt-label size-8',
      } satisfies Record<FormFieldSize, string>,
    },
  },
)

/**
 * Shared styles for input and textarea elements.
 * Text colors, placeholder, and disabled states follow intent.
 * When `standalone: true`, the element renders its own border/focus ring
 * (used by PinInput slots). When `false` (default), borders are handled
 * by a parent `controlShellCVA` wrapper.
 */
export const fieldInputCVA = cva('txt-base min-w-0 flex-1 read-only:cursor-default', {
  compoundVariants: [
    {
      class:
        'border-neutral-border-default bg-neutral-fill-subtle focus:border-neutral-border-strong focus:focus-ring',
      disabled: false,
      intent: 'neutral',
      standalone: true,
    },
    {
      class: 'border-neutral-border-default-disabled bg-neutral-fill-subtle-disabled',
      disabled: true,
      intent: 'neutral',
      standalone: true,
    },
    {
      class:
        'border-primary-border-default bg-primary-fill-subtle focus:border-primary-border-strong focus:focus-ring',
      disabled: false,
      intent: 'primary',
      standalone: true,
    },
    {
      class: 'border-primary-border-default-disabled bg-primary-fill-subtle-disabled',
      disabled: true,
      intent: 'primary',
      standalone: true,
    },
    {
      class:
        'border-secondary-border-default bg-secondary-fill-subtle focus:border-secondary-border-strong focus:focus-ring',
      disabled: false,
      intent: 'secondary',
      standalone: true,
    },
    {
      class: 'border-secondary-border-default-disabled bg-secondary-fill-subtle-disabled',
      disabled: true,
      intent: 'secondary',
      standalone: true,
    },
    {
      class:
        'border-accent-border-default bg-accent-fill-subtle focus:border-accent-border-strong focus:focus-ring',
      disabled: false,
      intent: 'accent',
      standalone: true,
    },
    {
      class: 'border-accent-border-default-disabled bg-accent-fill-subtle-disabled',
      disabled: true,
      intent: 'accent',
      standalone: true,
    },
  ],
  defaultVariants: {
    standalone: false,
  },
  variants: {
    disabled: {
      true: 'disabled:cursor-not-allowed',
    },
    intent: {
      accent:
        'text-accent-text-default placeholder:text-accent-text-subtle disabled:text-accent-text-default-disabled',
      error: '',
      info: '',
      neutral:
        'text-neutral-text-default placeholder:text-neutral-text-subtle disabled:text-neutral-text-default-disabled',
      primary:
        'text-primary-text-default placeholder:text-primary-text-subtle disabled:text-primary-text-default-disabled',
      secondary:
        'text-secondary-text-default placeholder:text-secondary-text-subtle disabled:text-secondary-text-default-disabled',
      success: '',
      warning: '',
    } satisfies Record<FormFieldIntent, string>,
    size: {
      lg: 'px-3 py-1.5',
      md: 'px-2 py-1',
      sm: 'px-1.5 py-0.5',
    } satisfies Record<FormFieldSize, string>,
    standalone: {
      false: 'border-0',
      true: 'border',
    },
  },
})
