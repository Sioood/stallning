import { cva } from 'class-variance-authority'

import type { FormFieldIntent, FormFieldSize } from './context'

/**
 * Visual shell wrapping the actual input element.
 * Provides border, focus ring, background, and disabled/invalid styling.
 */
export const controlShellCVA = cva('flex w-full min-w-0 items-center gap-0.5', {
  variants: {
    intent: {
      neutral: '',
      primary: '',
      secondary: '',
      accent: '',
    } satisfies Record<FormFieldIntent, string>,
    size: {
      sm: 'border',
      md: 'border',
      lg: 'border',
    } satisfies Record<FormFieldSize, string>,
    invalid: {
      true: 'border-error-border-default!',
    },
    disabled: {
      true: 'cursor-not-allowed',
    },
  },
  compoundVariants: [
    {
      intent: 'neutral',
      disabled: false,
      class:
        'focus-within:focus-ring border-neutral-border-default bg-neutral-fill-subtle text-neutral-text-default focus-within:border-neutral-border-strong focus-within:ring-neutral-border-default',
    },
    {
      intent: 'neutral',
      disabled: true,
      class:
        'border-neutral-border-default-disabled bg-neutral-fill-subtle-disabled text-neutral-text-default-disabled',
    },
    {
      intent: 'primary',
      disabled: false,
      class:
        'focus-within:focus-ring border-primary-border-default bg-primary-fill-subtle text-primary-text-default focus-within:border-primary-border-strong focus-within:ring-primary-border-default',
    },
    {
      intent: 'primary',
      disabled: true,
      class:
        'border-primary-border-default-disabled bg-primary-fill-subtle-disabled text-primary-text-default-disabled',
    },
    {
      intent: 'secondary',
      disabled: false,
      class:
        'focus-within:focus-ring border-secondary-border-default bg-secondary-fill-subtle text-secondary-text-default focus-within:border-secondary-border-strong focus-within:ring-secondary-border-default',
    },
    {
      intent: 'secondary',
      disabled: true,
      class:
        'border-secondary-border-default-disabled bg-secondary-fill-subtle-disabled text-secondary-text-default-disabled',
    },
    {
      intent: 'accent',
      disabled: false,
      class:
        'focus-within:focus-ring border-accent-border-default bg-accent-fill-subtle text-accent-text-default focus-within:border-accent-border-strong focus-within:ring-accent-border-default',
    },
    {
      intent: 'accent',
      disabled: true,
      class:
        'border-accent-border-default-disabled bg-accent-fill-subtle-disabled text-accent-text-default-disabled',
    },
  ],
})

/**
 * Pin slot geometry — fixed square, centered monospace text.
 * Borders/intent colors come from `fieldInputCVA` applied alongside.
 */
export const pinSlotCVA = cva(
  'flex flex-none items-center justify-center text-center font-mono leading-none',
  {
    variants: {
      size: {
        sm: 'txt-label size-8',
        md: 'txt-base size-10',
        lg: 'txt-h5 size-12',
      } satisfies Record<FormFieldSize, string>,
      invalid: {
        true: 'focus:focus-ring border-error-border-default! focus:border-error-border-strong! focus:ring-error-border-default!',
      },
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
  variants: {
    size: {
      sm: 'px-1.5 py-0.5',
      md: 'px-2 py-1',
      lg: 'px-3 py-1.5',
    } satisfies Record<FormFieldSize, string>,
    intent: {
      neutral:
        'text-neutral-text-default placeholder:text-neutral-text-subtle disabled:text-neutral-text-default-disabled',
      primary:
        'text-primary-text-default placeholder:text-primary-text-subtle disabled:text-primary-text-default-disabled',
      secondary:
        'text-secondary-text-default placeholder:text-secondary-text-subtle disabled:text-secondary-text-default-disabled',
      accent:
        'text-accent-text-default placeholder:text-accent-text-subtle disabled:text-accent-text-default-disabled',
    } satisfies Record<FormFieldIntent, string>,
    disabled: {
      true: 'disabled:cursor-not-allowed',
    },
    standalone: {
      true: 'border',
      false: 'border-0',
    },
  },
  compoundVariants: [
    {
      standalone: true,
      intent: 'neutral',
      disabled: false,
      class:
        'focus:focus-ring border-neutral-border-default bg-neutral-fill-subtle focus:border-neutral-border-strong focus:ring-neutral-border-default',
    },
    {
      standalone: true,
      intent: 'neutral',
      disabled: true,
      class: 'border-neutral-border-default-disabled bg-neutral-fill-subtle-disabled',
    },
    {
      standalone: true,
      intent: 'primary',
      disabled: false,
      class:
        'focus:focus-ring border-primary-border-default bg-primary-fill-subtle focus:border-primary-border-strong focus:ring-primary-border-default',
    },
    {
      standalone: true,
      intent: 'primary',
      disabled: true,
      class: 'border-primary-border-default-disabled bg-primary-fill-subtle-disabled',
    },
    {
      standalone: true,
      intent: 'secondary',
      disabled: false,
      class:
        'focus:focus-ring border-secondary-border-default bg-secondary-fill-subtle focus:border-secondary-border-strong focus:ring-secondary-border-default',
    },
    {
      standalone: true,
      intent: 'secondary',
      disabled: true,
      class: 'border-secondary-border-default-disabled bg-secondary-fill-subtle-disabled',
    },
    {
      standalone: true,
      intent: 'accent',
      disabled: false,
      class:
        'focus:focus-ring border-accent-border-default bg-accent-fill-subtle focus:border-accent-border-strong focus:ring-accent-border-default',
    },
    {
      standalone: true,
      intent: 'accent',
      disabled: true,
      class: 'border-accent-border-default-disabled bg-accent-fill-subtle-disabled',
    },
  ],
  defaultVariants: {
    standalone: false,
  },
})
