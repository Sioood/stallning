import { cva } from 'class-variance-authority'

import type { ButtonIntent, ButtonSize, ButtonVariant } from '~/utils/Components/Button/context'

export const buttonCVA = cva('inline-flex h-full items-center justify-center', {
  compoundVariants: [
    {
      class:
        'border-neutral-border-default bg-neutral-fill-default text-neutral-text-inverse hover:border-neutral-border-default-hover hover:bg-neutral-fill-default-hover hover:text-neutral-text-inverse-hover active:border-neutral-border-default-active active:bg-neutral-fill-default-active active:text-neutral-text-inverse-active disabled:border-neutral-border-default-disabled disabled:bg-neutral-fill-default-disabled disabled:text-neutral-text-inverse-disabled',
      intent: 'neutral',
      variant: 'default',
    },
    {
      class:
        'border-primary-border-default bg-primary-fill-default text-primary-text-inverse hover:border-primary-border-default-hover hover:bg-primary-fill-default-hover hover:text-primary-text-inverse-hover active:border-primary-border-default-active active:bg-primary-fill-default-active active:text-primary-text-inverse-active disabled:border-primary-border-default-disabled disabled:bg-primary-fill-default-disabled disabled:text-primary-text-inverse-disabled',
      intent: 'primary',
      variant: 'default',
    },
    {
      class:
        'border-secondary-border-default bg-secondary-fill-default text-secondary-text-inverse hover:border-secondary-border-default-hover hover:bg-secondary-fill-default-hover hover:text-secondary-text-inverse-hover active:border-secondary-border-default-active active:bg-secondary-fill-default-active active:text-secondary-text-inverse-active disabled:border-secondary-border-default-disabled disabled:bg-secondary-fill-default-disabled disabled:text-secondary-text-inverse-disabled',
      intent: 'secondary',
      variant: 'default',
    },
    {
      class:
        'border-accent-border-default bg-accent-fill-default text-accent-text-inverse hover:border-accent-border-default-hover hover:bg-accent-fill-default-hover hover:text-accent-text-inverse-hover active:border-accent-border-default-active active:bg-accent-fill-default-active active:text-accent-text-inverse-active disabled:border-accent-border-default-disabled disabled:bg-accent-fill-default-disabled disabled:text-accent-text-inverse-disabled',
      intent: 'accent',
      variant: 'default',
    },
    {
      class:
        'border-info-border-default bg-info-fill-default text-info-text-inverse hover:border-info-border-default-hover hover:bg-info-fill-default-hover hover:text-info-text-inverse-hover active:border-info-border-default-active active:bg-info-fill-default-active active:text-info-text-inverse-active disabled:border-info-border-default-disabled disabled:bg-info-fill-default-disabled disabled:text-info-text-inverse-disabled',
      intent: 'info',
      variant: 'default',
    },
    {
      class:
        'border-warning-border-default bg-warning-fill-default text-warning-text-inverse hover:border-warning-border-default-hover hover:bg-warning-fill-default-hover hover:text-warning-text-inverse-hover active:border-warning-border-default-active active:bg-warning-fill-default-active active:text-warning-text-inverse-active disabled:border-warning-border-default-disabled disabled:bg-warning-fill-default-disabled disabled:text-warning-text-inverse-disabled',
      intent: 'warning',
      variant: 'default',
    },
    {
      class:
        'border-error-border-default bg-error-fill-default text-error-text-inverse hover:border-error-border-default-hover hover:bg-error-fill-default-hover hover:text-error-text-inverse-hover active:border-error-border-default-active active:bg-error-fill-default-active active:text-error-text-inverse-active disabled:border-error-border-default-disabled disabled:bg-error-fill-default-disabled disabled:text-error-text-inverse-disabled',
      intent: 'error',
      variant: 'default',
    },
    {
      class:
        'border-success-border-default bg-success-fill-default text-success-text-inverse hover:border-success-border-default-hover hover:bg-success-fill-default-hover hover:text-success-text-inverse-hover active:border-success-border-default-active active:bg-success-fill-default-active active:text-success-text-inverse-active disabled:border-success-border-default-disabled disabled:bg-success-fill-default-disabled disabled:text-success-text-inverse-disabled',
      intent: 'success',
      variant: 'default',
    },
    {
      class:
        'border-primary-border-subtle bg-primary-fill-subtle text-primary-text-subtle hover:border-primary-border-subtle-hover hover:bg-primary-fill-subtle-hover hover:text-primary-text-subtle-hover active:border-primary-border-subtle-active active:bg-primary-fill-subtle-active active:text-primary-text-subtle-active disabled:border-primary-border-subtle-disabled disabled:bg-primary-fill-subtle-disabled disabled:text-primary-text-subtle-disabled',
      intent: 'primary',
      variant: 'subtle',
    },
    {
      class:
        'border-secondary-border-subtle bg-secondary-fill-subtle text-secondary-text-subtle hover:border-secondary-border-subtle-hover hover:bg-secondary-fill-subtle-hover hover:text-secondary-text-subtle-hover active:border-secondary-border-subtle-active active:bg-secondary-fill-subtle-active active:text-secondary-text-subtle-active disabled:border-secondary-border-subtle-disabled disabled:bg-secondary-fill-subtle-disabled disabled:text-secondary-text-subtle-disabled',
      intent: 'secondary',
      variant: 'subtle',
    },
    {
      class:
        'border-accent-border-subtle bg-accent-fill-subtle text-accent-text-subtle hover:border-accent-border-subtle-hover hover:bg-accent-fill-subtle-hover hover:text-accent-text-subtle-hover active:border-accent-border-subtle-active active:bg-accent-fill-subtle-active active:text-accent-text-subtle-active disabled:border-accent-border-subtle-disabled disabled:bg-accent-fill-subtle-disabled disabled:text-accent-text-subtle-disabled',
      intent: 'accent',
      variant: 'subtle',
    },
    {
      class:
        'border-neutral-border-subtle bg-neutral-fill-subtle text-neutral-text-subtle hover:border-neutral-border-subtle-hover hover:bg-neutral-fill-subtle-hover hover:text-neutral-text-subtle-hover active:border-neutral-border-subtle-active active:bg-neutral-fill-subtle-active active:text-neutral-text-subtle-active disabled:border-neutral-border-subtle-disabled disabled:bg-neutral-fill-subtle-disabled disabled:text-neutral-text-subtle-disabled',
      intent: 'neutral',
      variant: 'subtle',
    },
    {
      class:
        'border-info-border-subtle bg-info-fill-subtle text-info-text-subtle hover:border-info-border-subtle-hover hover:bg-info-fill-subtle-hover hover:text-info-text-subtle-hover active:border-info-border-subtle-active active:bg-info-fill-subtle-active active:text-info-text-subtle-active disabled:border-info-border-subtle-disabled disabled:bg-info-fill-subtle-disabled disabled:text-info-text-subtle-disabled',
      intent: 'info',
      variant: 'subtle',
    },
    {
      class:
        'border-warning-border-subtle bg-warning-fill-subtle text-warning-text-subtle hover:border-warning-border-subtle-hover hover:bg-warning-fill-subtle-hover hover:text-warning-text-subtle-hover active:border-warning-border-subtle-active active:bg-warning-fill-subtle-active active:text-warning-text-subtle-active disabled:border-warning-border-subtle-disabled disabled:bg-warning-fill-subtle-disabled disabled:text-warning-text-subtle-disabled',
      intent: 'warning',
      variant: 'subtle',
    },
    {
      class:
        'border-error-border-subtle bg-error-fill-subtle text-error-text-subtle hover:border-error-border-subtle-hover hover:bg-error-fill-subtle-hover hover:text-error-text-subtle-hover active:border-error-border-subtle-active active:bg-error-fill-subtle-active active:text-error-text-subtle-active disabled:border-error-border-subtle-disabled disabled:bg-error-fill-subtle-disabled disabled:text-error-text-subtle-disabled',
      intent: 'error',
      variant: 'subtle',
    },
    {
      class:
        'border-success-border-subtle bg-success-fill-subtle text-success-text-subtle hover:border-success-border-subtle-hover hover:bg-success-fill-subtle-hover hover:text-success-text-subtle-hover active:border-success-border-subtle-active active:bg-success-fill-subtle-active active:text-success-text-subtle-active disabled:border-success-border-subtle-disabled disabled:bg-success-fill-subtle-disabled disabled:text-success-text-subtle-disabled',
      intent: 'success',
      variant: 'subtle',
    },
    {
      class:
        'bg-transparent text-primary-text-subtle hover:border-primary-border-subtle-hover! hover:bg-primary-fill-subtle-hover hover:text-primary-text-subtle-hover active:border-primary-border-subtle-active active:bg-primary-fill-subtle-active active:text-primary-text-subtle-active disabled:border-primary-border-subtle-disabled disabled:bg-primary-fill-subtle-disabled disabled:text-primary-text-subtle-disabled',
      intent: 'primary',
      variant: 'ghost',
    },
    {
      class:
        'bg-transparent text-secondary-text-subtle hover:border-secondary-border-subtle-hover hover:bg-secondary-fill-subtle-hover hover:text-secondary-text-subtle-hover active:border-secondary-border-subtle-active active:bg-secondary-fill-subtle-active active:text-secondary-text-subtle-active disabled:border-secondary-border-subtle-disabled disabled:bg-secondary-fill-subtle-disabled disabled:text-secondary-text-subtle-disabled',
      intent: 'secondary',
      variant: 'ghost',
    },
    {
      class:
        'bg-transparent text-accent-text-subtle hover:border-accent-border-subtle-hover hover:bg-accent-fill-subtle-hover hover:text-accent-text-subtle-hover active:border-accent-border-subtle-active active:bg-accent-fill-subtle-active active:text-accent-text-subtle-active disabled:border-accent-border-subtle-disabled disabled:bg-accent-fill-subtle-disabled disabled:text-accent-text-subtle-disabled',
      intent: 'accent',
      variant: 'ghost',
    },
    {
      class:
        'bg-transparent text-neutral-text-subtle hover:border-neutral-border-subtle-hover hover:bg-neutral-fill-subtle-hover hover:text-neutral-text-subtle-hover active:border-neutral-border-subtle-active active:bg-neutral-fill-subtle-active active:text-neutral-text-subtle-active disabled:border-neutral-border-subtle-disabled disabled:bg-neutral-fill-subtle-disabled disabled:text-neutral-text-subtle-disabled',
      intent: 'neutral',
      variant: 'ghost',
    },
    {
      class:
        'bg-transparent text-info-text-subtle hover:border-info-border-subtle-hover hover:bg-info-fill-subtle-hover hover:text-info-text-subtle-hover active:border-info-border-subtle-active active:bg-info-fill-subtle-active active:text-info-text-subtle-active disabled:border-info-border-subtle-disabled disabled:bg-info-fill-subtle-disabled disabled:text-info-text-subtle-disabled',
      intent: 'info',
      variant: 'ghost',
    },
    {
      class:
        'bg-transparent text-warning-text-subtle hover:border-warning-border-subtle-hover hover:bg-warning-fill-subtle-hover hover:text-warning-text-subtle-hover active:border-warning-border-subtle-active active:bg-warning-fill-subtle-active active:text-warning-text-subtle-active disabled:border-warning-border-subtle-disabled disabled:bg-warning-fill-subtle-disabled disabled:text-warning-text-subtle-disabled',
      intent: 'warning',
      variant: 'ghost',
    },
    {
      class:
        'bg-transparent text-error-text-subtle hover:border-error-border-subtle-hover hover:bg-error-fill-subtle-hover hover:text-error-text-subtle-hover active:border-error-border-subtle-active active:bg-error-fill-subtle-active active:text-error-text-subtle-active disabled:border-error-border-subtle-disabled disabled:bg-error-fill-subtle-disabled disabled:text-error-text-subtle-disabled',
      intent: 'error',
      variant: 'ghost',
    },
    {
      class:
        'bg-transparent text-success-text-subtle hover:border-success-border-subtle-hover hover:bg-success-fill-subtle-hover hover:text-success-text-subtle-hover active:border-success-border-subtle-active active:bg-success-fill-subtle-active active:text-success-text-subtle-active disabled:border-success-border-subtle-disabled disabled:bg-success-fill-subtle-disabled disabled:text-success-text-subtle-disabled',
      intent: 'success',
      variant: 'ghost',
    },
  ],
  variants: {
    disabled: {
      false: 'cursor-pointer active:scale-97',
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
    } satisfies Record<ButtonIntent, string>,
    size: {
      lg: 'txt-h6 gap-4 px-5 py-3',
      md: 'txt-base gap-3 px-4 py-2',
      sm: 'txt-caption gap-1.5 px-2 py-1',
    } satisfies Record<ButtonSize, string>,
    variant: {
      default: 'border',
      ghost:
        'border border-transparent hover:border-inherit active:border-inherit disabled:border-inherit',
      subtle: 'border',
    } satisfies Record<ButtonVariant, string>,
  },
})

export const toggleCVA = cva('', {
  compoundVariants: [
    {
      class:
        'data-[state=on]:border-neutral-border-default-active data-[state=on]:bg-neutral-fill-default-active data-[state=on]:text-neutral-text-inverse-active',
      intent: 'neutral',
      variant: 'default',
    },
    {
      class:
        'data-[state=on]:border-primary-border-default-active data-[state=on]:bg-primary-fill-default-active data-[state=on]:text-primary-text-inverse-active',
      intent: 'primary',
      variant: 'default',
    },
    {
      class:
        'data-[state=on]:border-secondary-border-default-active data-[state=on]:bg-secondary-fill-default-active data-[state=on]:text-secondary-text-inverse-active',
      intent: 'secondary',
      variant: 'default',
    },
    {
      class:
        'data-[state=on]:border-accent-border-default-active data-[state=on]:bg-accent-fill-default-active data-[state=on]:text-accent-text-inverse-active',
      intent: 'accent',
      variant: 'default',
    },
    {
      class:
        'data-[state=on]:border-info-border-default-active data-[state=on]:bg-info-fill-default-active data-[state=on]:text-info-text-inverse-active',
      intent: 'info',
      variant: 'default',
    },
    {
      class:
        'data-[state=on]:border-warning-border-default-active data-[state=on]:bg-warning-fill-default-active data-[state=on]:text-warning-text-inverse-active',
      intent: 'warning',
      variant: 'default',
    },
    {
      class:
        'data-[state=on]:border-error-border-default-active data-[state=on]:bg-error-fill-default-active data-[state=on]:text-error-text-inverse-active',
      intent: 'error',
      variant: 'default',
    },
    {
      class:
        'data-[state=on]:border-success-border-default-active data-[state=on]:bg-success-fill-default-active data-[state=on]:text-success-text-inverse-active',
      intent: 'success',
      variant: 'default',
    },
    {
      class:
        'data-[state=on]:border-primary-border-subtle-active data-[state=on]:bg-primary-fill-subtle-active data-[state=on]:text-primary-text-subtle-active',
      intent: 'primary',
      variant: 'subtle',
    },
    {
      class:
        'data-[state=on]:border-secondary-border-subtle-active data-[state=on]:bg-secondary-fill-subtle-active data-[state=on]:text-secondary-text-subtle-active',
      intent: 'secondary',
      variant: 'subtle',
    },
    {
      class:
        'data-[state=on]:border-accent-border-subtle-active data-[state=on]:bg-accent-fill-subtle-active data-[state=on]:text-accent-text-subtle-active',
      intent: 'accent',
      variant: 'subtle',
    },
    {
      class:
        'data-[state=on]:border-neutral-border-subtle-active data-[state=on]:bg-neutral-fill-subtle-active data-[state=on]:text-neutral-text-subtle-active',
      intent: 'neutral',
      variant: 'subtle',
    },
    {
      class:
        'data-[state=on]:border-info-border-subtle-active data-[state=on]:bg-info-fill-subtle-active data-[state=on]:text-info-text-subtle-active',
      intent: 'info',
      variant: 'subtle',
    },
    {
      class:
        'data-[state=on]:border-warning-border-subtle-active data-[state=on]:bg-warning-fill-subtle-active data-[state=on]:text-warning-text-subtle-active',
      intent: 'warning',
      variant: 'subtle',
    },
    {
      class:
        'data-[state=on]:border-error-border-subtle-active data-[state=on]:bg-error-fill-subtle-active data-[state=on]:text-error-text-subtle-active',
      intent: 'error',
      variant: 'subtle',
    },
    {
      class:
        'data-[state=on]:border-success-border-subtle-active data-[state=on]:bg-success-fill-subtle-active data-[state=on]:text-success-text-subtle-active',
      intent: 'success',
      variant: 'subtle',
    },
    {
      class:
        'data-[state=on]:border-primary-border-subtle-active data-[state=on]:bg-primary-fill-subtle-active data-[state=on]:text-primary-text-subtle-active',
      intent: 'primary',
      variant: 'ghost',
    },
    {
      class:
        'data-[state=on]:border-secondary-border-subtle-active data-[state=on]:bg-secondary-fill-subtle-active data-[state=on]:text-secondary-text-subtle-active',
      intent: 'secondary',
      variant: 'ghost',
    },
    {
      class:
        'data-[state=on]:border-accent-border-subtle-active data-[state=on]:bg-accent-fill-subtle-active data-[state=on]:text-accent-text-subtle-active',
      intent: 'accent',
      variant: 'ghost',
    },
    {
      class:
        'data-[state=on]:border-neutral-border-subtle-active data-[state=on]:bg-neutral-fill-subtle-active data-[state=on]:text-neutral-text-subtle-active',
      intent: 'neutral',
      variant: 'ghost',
    },
    {
      class:
        'data-[state=on]:border-info-border-subtle-active data-[state=on]:bg-info-fill-subtle-active data-[state=on]:text-info-text-subtle-active',
      intent: 'info',
      variant: 'ghost',
    },
    {
      class:
        'data-[state=on]:border-warning-border-subtle-active data-[state=on]:bg-warning-fill-subtle-active data-[state=on]:text-warning-text-subtle-active',
      intent: 'warning',
      variant: 'ghost',
    },
    {
      class:
        'data-[state=on]:border-error-border-subtle-active data-[state=on]:bg-error-fill-subtle-active data-[state=on]:text-error-text-subtle-active',
      intent: 'error',
      variant: 'ghost',
    },
    {
      class:
        'data-[state=on]:border-success-border-subtle-active data-[state=on]:bg-success-fill-subtle-active data-[state=on]:text-success-text-subtle-active',
      intent: 'success',
      variant: 'ghost',
    },
  ],
  variants: {
    intent: {
      accent: '',
      error: '',
      info: '',
      neutral: '',
      primary: '',
      secondary: '',
      success: '',
      warning: '',
    } satisfies Record<ButtonIntent, string>,
    variant: {
      default: '',
      ghost: '',
      subtle: '',
    } satisfies Record<ButtonVariant, string>,
  },
})
