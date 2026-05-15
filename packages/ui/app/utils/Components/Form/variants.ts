import { cva } from 'class-variance-authority'

import type { FormFieldIntent, FormFieldSize } from './context'

/**
 * Visual shell wrapping the actual input element.
 * Provides border, focus ring, background, and disabled/invalid styling.
 */
export const controlShellCVA = cva(
  'flex w-full min-w-0 items-center gap-0.5 transition-[box-shadow,border-color]',
  {
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
        true: 'border-error-border-default! focus-within:border-error-border-strong!',
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
          'border-neutral-border-default bg-neutral-fill-subtle text-neutral-text-default focus-within:border-neutral-border-strong focus-within:outline-neutral-border-default',
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
          'border-primary-border-default bg-primary-fill-subtle text-primary-text-default focus-within:border-primary-border-strong focus-within:outline-primary-border-default',
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
          'border-secondary-border-default bg-secondary-fill-subtle text-secondary-text-default focus-within:border-secondary-border-strong focus-within:outline-secondary-border-default',
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
          'border-accent-border-default bg-accent-fill-subtle text-accent-text-default focus-within:border-accent-border-strong focus-within:outline-accent-border-default',
      },
      {
        intent: 'accent',
        disabled: true,
        class:
          'border-accent-border-default-disabled bg-accent-fill-subtle-disabled text-accent-text-default-disabled',
      },
    ],
  },
)

/**
 * Shared styles for input and textarea elements.
 * Removes native borders/outline since they're handled by the shell.
 */
export const fieldInputCVA = cva(
  'txt-base min-w-0 flex-1 border-0 outline-none read-only:cursor-default',
  {
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
    },
  },
)
