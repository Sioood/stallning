import { cva } from 'class-variance-authority'

import type { FormFieldIntent, FormFieldSize } from './context'

/**
 * Visual shell wrapping the actual input element.
 * Provides border, focus ring, background, and disabled/invalid styling.
 */
/**
 * Focus is carried entirely by the `focus-ring` utility.
 *
 * These CVAs used to also swap the border to `border-strong` on focus, which was
 * backwards: for the ink-first `primary` intent `border` sits at the extreme stop, so
 * `border-strong` is *weaker* than it — focusing an input dropped its border contrast
 * against the shell by 26% in light and 66% in dark. The ring is the affordance; the
 * border stays put.
 */
export const controlShellCVA = cva('flex w-full min-w-0 items-center gap-0.5', {
  compoundVariants: [
    {
      class:
        'border-neutral-border bg-neutral-fill-subtle text-neutral-text focus-within:focus-ring disabled:pointer-events-none disabled:opacity-40',
      disabled: false,
      intent: 'neutral',
    },
    {
      class: 'border-neutral-border bg-neutral-fill-subtle text-neutral-text-disabled',
      disabled: true,
      intent: 'neutral',
    },
    {
      class:
        'border-primary-border bg-primary-fill-subtle text-primary-text focus-within:focus-ring disabled:pointer-events-none disabled:opacity-40',
      disabled: false,
      intent: 'primary',
    },
    {
      class: 'border-primary-border bg-primary-fill-subtle text-primary-text-disabled',
      disabled: true,
      intent: 'primary',
    },
    {
      class:
        'border-secondary-border bg-secondary-fill-subtle text-secondary-text focus-within:focus-ring disabled:pointer-events-none disabled:opacity-40',
      disabled: false,
      intent: 'secondary',
    },
    {
      class: 'border-secondary-border bg-secondary-fill-subtle text-secondary-text-disabled',
      disabled: true,
      intent: 'secondary',
    },
    {
      class:
        'border-accent-border bg-accent-fill-subtle text-accent-text focus-within:focus-ring disabled:pointer-events-none disabled:opacity-40',
      disabled: false,
      intent: 'accent',
    },
    {
      class: 'border-accent-border bg-accent-fill-subtle text-accent-text-disabled',
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
      true: 'border-error-border!',
    },
    size: {
      lg: 'rounded-xs border',
      md: 'rounded-xs border',
      sm: 'rounded-xs border',
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
        true: 'border-error-border! focus:focus-ring',
      },
      size: {
        lg: 'txt-h5 size-12 rounded-xs',
        md: 'txt-base size-10 rounded-xs',
        sm: 'txt-label size-8 rounded-xs',
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
        'border-neutral-border bg-neutral-fill-subtle focus:focus-ring disabled:pointer-events-none disabled:opacity-40',
      disabled: false,
      intent: 'neutral',
      standalone: true,
    },
    {
      class: 'border-neutral-border bg-neutral-fill-subtle',
      disabled: true,
      intent: 'neutral',
      standalone: true,
    },
    {
      class:
        'border-primary-border bg-primary-fill-subtle focus:focus-ring disabled:pointer-events-none disabled:opacity-40',
      disabled: false,
      intent: 'primary',
      standalone: true,
    },
    {
      class: 'border-primary-border bg-primary-fill-subtle',
      disabled: true,
      intent: 'primary',
      standalone: true,
    },
    {
      class:
        'border-secondary-border bg-secondary-fill-subtle focus:focus-ring disabled:pointer-events-none disabled:opacity-40',
      disabled: false,
      intent: 'secondary',
      standalone: true,
    },
    {
      class: 'border-secondary-border bg-secondary-fill-subtle',
      disabled: true,
      intent: 'secondary',
      standalone: true,
    },
    {
      class:
        'border-accent-border bg-accent-fill-subtle focus:focus-ring disabled:pointer-events-none disabled:opacity-40',
      disabled: false,
      intent: 'accent',
      standalone: true,
    },
    {
      class: 'border-accent-border bg-accent-fill-subtle',
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
        'text-accent-text placeholder:text-accent-text-muted disabled:text-accent-text-disabled',
      error: 'text-error-text placeholder:text-error-text-muted disabled:text-error-text-disabled',
      info: 'text-info-text placeholder:text-info-text-muted disabled:text-info-text-disabled',
      neutral:
        'text-neutral-text placeholder:text-neutral-text-muted disabled:text-neutral-text-disabled',
      primary:
        'text-primary-text placeholder:text-primary-text-muted disabled:text-primary-text-disabled',
      secondary:
        'text-secondary-text placeholder:text-secondary-text-muted disabled:text-secondary-text-disabled',
      success:
        'text-success-text placeholder:text-success-text-muted disabled:text-success-text-disabled',
      warning:
        'text-warning-text placeholder:text-warning-text-muted disabled:text-warning-text-disabled',
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
