import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva('button inline-flex justify-center items-center', {
  variants: {
    variant: {
      default: 'border',
      subtle: 'border',
      ghost:
        'border border-transparent hover:border-inherit active:border-inherit disabled:border-inherit',
    },
    intent: {
      neutral: '',
      primary: '',
      secondary: '',
      accent: '',
      info: '',
      warning: '',
      error: '',
      success: '',
    },
    size: {
      sm: 'txt-caption px-2 py-1 gap-1.5',
      md: 'txt-base px-4 py-2 gap-3',
      lg: 'txt-h6 px-5 py-3 gap-4',
    },
    disabled: {
      true: 'cursor-not-allowed',
      false: 'cursor-pointer active:scale-97',
    },
  },
  compoundVariants: [
    {
      variant: 'default',
      intent: 'neutral',
      class:
        'bg-neutral-fill-default border-neutral-border-default text-neutral-text-inverse hover:bg-neutral-fill-default-hover hover:border-neutral-border-hover hover:text-neutral-text-inverse-hover active:bg-neutral-fill-default-active active:border-neutral-border-default-active active:text-neutral-text-inverse-active disabled:bg-neutral-fill-default-disabled disabled:border-neutral-border-default-disabled disabled:text-neutral-text-inverse-disabled',
    },
    {
      variant: 'default',
      intent: 'primary',
      class:
        'bg-primary-fill-default border-primary-border-default text-primary-text-inverse hover:bg-primary-fill-default-hover hover:border-primary-border-hover hover:text-primary-text-inverse-hover active:bg-primary-fill-default-active active:border-primary-border-default-active active:text-primary-text-inverse-active disabled:bg-primary-fill-default-disabled disabled:border-primary-border-default-disabled disabled:text-primary-text-inverse-disabled',
    },
    {
      variant: 'default',
      intent: 'secondary',
      class:
        'bg-secondary-fill-default border-secondary-border-default text-secondary-text-inverse hover:bg-secondary-fill-default-hover hover:border-secondary-border-hover hover:text-secondary-text-inverse-hover active:bg-secondary-fill-default-active active:border-secondary-border-default-active active:text-secondary-text-inverse-active disabled:bg-secondary-fill-default-disabled disabled:border-secondary-border-default-disabled disabled:text-secondary-text-inverse-disabled',
    },
    {
      variant: 'default',
      intent: 'accent',
      class:
        'bg-accent-fill-default border-accent-border-default text-accent-text-inverse hover:bg-accent-fill-default-hover hover:border-accent-border-hover hover:text-accent-text-inverse-hover active:bg-accent-fill-default-active active:border-accent-border-default-active active:text-accent-text-inverse-active disabled:bg-accent-fill-default-disabled disabled:border-accent-border-default-disabled disabled:text-accent-text-inverse-disabled',
    },
    {
      variant: 'default',
      intent: 'info',
      class:
        'bg-info-fill-default border-info-border-default text-info-text-inverse hover:bg-info-fill-default-hover hover:border-info-border-hover hover:text-info-text-inverse-hover active:bg-info-fill-default-active active:border-info-border-default-active active:text-info-text-inverse-active disabled:bg-info-fill-default-disabled disabled:border-info-border-default-disabled disabled:text-info-text-inverse-disabled',
    },
    {
      variant: 'default',
      intent: 'warning',
      class:
        'bg-warning-fill-default border-warning-border-default text-warning-text-inverse hover:bg-warning-fill-default-hover hover:border-warning-border-hover hover:text-warning-text-inverse-hover active:bg-warning-fill-default-active active:border-warning-border-default-active active:text-warning-text-inverse-active disabled:bg-warning-fill-default-disabled disabled:border-warning-border-default-disabled disabled:text-warning-text-inverse-disabled',
    },
    {
      variant: 'default',
      intent: 'error',
      class:
        'bg-error-fill-default border-error-border-default text-error-text-inverse hover:bg-error-fill-default-hover hover:border-error-border-hover hover:text-error-text-inverse-hover active:bg-error-fill-default-active active:border-error-border-default-active active:text-error-text-inverse-active disabled:bg-error-fill-default-disabled disabled:border-error-border-default-disabled disabled:text-error-text-inverse-disabled',
    },
    {
      variant: 'default',
      intent: 'success',
      class:
        'bg-success-fill-default border-success-border-default text-success-text-inverse hover:bg-success-fill-default-hover hover:border-success-border-hover hover:text-success-text-inverse-hover active:bg-success-fill-default-active active:border-success-border-default-active active:text-success-text-inverse-active disabled:bg-success-fill-default-disabled disabled:border-success-border-default-disabled disabled:text-success-text-inverse-disabled',
    },
    {
      variant: 'subtle',
      intent: 'primary',
      class:
        'bg-primary-fill-subtle border-primary-border-subtle text-primary-text-subtle hover:bg-primary-fill-subtle-hover hover:border-primary-border-hover hover:text-primary-text-subtle-hover active:bg-primary-fill-subtle-active active:border-primary-border-subtle-active active:text-primary-text-subtle-active disabled:bg-primary-fill-subtle-disabled disabled:border-primary-border-subtle-disabled disabled:text-primary-text-subtle-disabled',
    },
    {
      variant: 'subtle',
      intent: 'secondary',
      class:
        'bg-secondary-fill-subtle border-secondary-border-subtle text-secondary-text-subtle hover:bg-secondary-fill-subtle-hover hover:border-secondary-border-hover hover:text-secondary-text-subtle-hover active:bg-secondary-fill-subtle-active active:border-secondary-border-subtle-active active:text-secondary-text-subtle-active disabled:bg-secondary-fill-subtle-disabled disabled:border-secondary-border-subtle-disabled disabled:text-secondary-text-subtle-disabled',
    },
    {
      variant: 'subtle',
      intent: 'accent',
      class:
        'bg-accent-fill-subtle border-accent-border-subtle text-accent-text-subtle hover:bg-accent-fill-subtle-hover hover:border-accent-border-hover hover:text-accent-text-subtle-hover active:bg-accent-fill-subtle-active active:border-accent-border-subtle-active active:text-accent-text-subtle-active disabled:bg-accent-fill-subtle-disabled disabled:border-accent-border-subtle-disabled disabled:text-accent-text-subtle-disabled',
    },
    {
      variant: 'subtle',
      intent: 'neutral',
      class:
        'bg-neutral-fill-subtle border-neutral-border-subtle text-neutral-text-subtle hover:bg-neutral-fill-subtle-hover hover:border-neutral-border-hover hover:text-neutral-text-subtle-hover active:bg-neutral-fill-subtle-active active:border-neutral-border-subtle-active active:text-neutral-text-subtle-active disabled:bg-neutral-fill-subtle-disabled disabled:border-neutral-border-subtle-disabled disabled:text-neutral-text-subtle-disabled',
    },
    {
      variant: 'subtle',
      intent: 'info',
      class:
        'bg-info-fill-subtle border-info-border-subtle text-info-text-subtle hover:bg-info-fill-subtle-hover hover:border-info-border-hover hover:text-info-text-subtle-hover active:bg-info-fill-subtle-active active:border-info-border-subtle-active active:text-info-text-subtle-active disabled:bg-info-fill-subtle-disabled disabled:border-info-border-subtle-disabled disabled:text-info-text-subtle-disabled',
    },
    {
      variant: 'subtle',
      intent: 'warning',
      class:
        'bg-warning-fill-subtle border-warning-border-subtle text-warning-text-subtle hover:bg-warning-fill-subtle-hover hover:border-warning-border-hover hover:text-warning-text-subtle-hover active:bg-warning-fill-subtle-active active:border-warning-border-subtle-active active:text-warning-text-subtle-active disabled:bg-warning-fill-subtle-disabled disabled:border-warning-border-subtle-disabled disabled:text-warning-text-subtle-disabled',
    },
    {
      variant: 'subtle',
      intent: 'error',
      class:
        'bg-error-fill-subtle border-error-border-subtle text-error-text-subtle hover:bg-error-fill-subtle-hover hover:border-error-border-hover hover:text-error-text-subtle-hover active:bg-error-fill-subtle-active active:border-error-border-subtle-active active:text-error-text-subtle-active disabled:bg-error-fill-subtle-disabled disabled:border-error-border-subtle-disabled disabled:text-error-text-subtle-disabled',
    },
    {
      variant: 'subtle',
      intent: 'success',
      class:
        'bg-success-fill-subtle border-success-border-subtle text-success-text-subtle hover:bg-success-fill-subtle-hover hover:border-success-border-hover hover:text-success-text-subtle-hover active:bg-success-fill-subtle-active active:border-success-border-subtle-active active:text-success-text-subtle-active disabled:bg-success-fill-subtle-disabled disabled:border-success-border-subtle-disabled disabled:text-success-text-subtle-disabled',
    },
    {
      variant: 'ghost',
      intent: 'primary',
      class:
        'bg-transparent text-primary-text-subtle hover:bg-primary-fill-subtle-hover hover:!border-primary-border-hover hover:text-primary-text-subtle-hover active:bg-primary-fill-subtle-active active:border-primary-border-subtle-active active:text-primary-text-subtle-active disabled:bg-primary-fill-subtle-disabled disabled:border-primary-border-subtle-disabled disabled:text-primary-text-subtle-disabled',
    },
    {
      variant: 'ghost',
      intent: 'secondary',
      class:
        'bg-transparent text-secondary-text-subtle hover:bg-secondary-fill-subtle-hover hover:border-secondary-border-hover hover:text-secondary-text-subtle-hover active:bg-secondary-fill-subtle-active active:border-secondary-border-subtle-active active:text-secondary-text-subtle-active disabled:bg-secondary-fill-subtle-disabled disabled:border-secondary-border-subtle-disabled disabled:text-secondary-text-subtle-disabled',
    },
    {
      variant: 'ghost',
      intent: 'accent',
      class:
        'bg-transparent text-accent-text-subtle hover:bg-accent-fill-subtle-hover hover:border-accent-border-hover hover:text-accent-text-subtle-hover active:bg-accent-fill-subtle-active active:border-accent-border-subtle-active active:text-accent-text-subtle-active disabled:bg-accent-fill-subtle-disabled disabled:border-accent-border-subtle-disabled disabled:text-accent-text-subtle-disabled',
    },
    {
      variant: 'ghost',
      intent: 'neutral',
      class:
        'bg-transparent text-neutral-text-subtle hover:bg-neutral-fill-subtle-hover hover:border-neutral-border-hover hover:text-neutral-text-subtle-hover active:bg-neutral-fill-subtle-active active:border-neutral-border-subtle-active active:text-neutral-text-subtle-active disabled:bg-neutral-fill-subtle-disabled disabled:border-neutral-border-subtle-disabled disabled:text-neutral-text-subtle-disabled',
    },
    {
      variant: 'ghost',
      intent: 'info',
      class:
        'bg-transparent text-info-text-subtle hover:bg-info-fill-subtle-hover hover:border-info-border-hover hover:text-info-text-subtle-hover active:bg-info-fill-subtle-active active:border-info-border-subtle-active active:text-info-text-subtle-active disabled:bg-info-fill-subtle-disabled disabled:border-info-border-subtle-disabled disabled:text-info-text-subtle-disabled',
    },
    {
      variant: 'ghost',
      intent: 'warning',
      class:
        'bg-transparent text-warning-text-subtle hover:bg-warning-fill-subtle-hover hover:border-warning-border-hover hover:text-warning-text-subtle-hover active:bg-warning-fill-subtle-active active:border-warning-border-subtle-active active:text-warning-text-subtle-active disabled:bg-warning-fill-subtle-disabled disabled:border-warning-border-subtle-disabled disabled:text-warning-text-subtle-disabled',
    },
    {
      variant: 'ghost',
      intent: 'error',
      class:
        'bg-transparent text-error-text-subtle hover:bg-error-fill-subtle-hover hover:border-error-border-hover hover:text-error-text-subtle-hover active:bg-error-fill-subtle-active active:border-error-border-subtle-active active:text-error-text-subtle-active disabled:bg-error-fill-subtle-disabled disabled:border-error-border-subtle-disabled disabled:text-error-text-subtle-disabled',
    },
    {
      variant: 'ghost',
      intent: 'success',
      class:
        'bg-transparent text-success-text-subtle hover:bg-success-fill-subtle-hover hover:border-success-border-hover hover:text-success-text-subtle-hover active:bg-success-fill-subtle-active active:border-success-border-subtle-active active:text-success-text-subtle-active disabled:bg-success-fill-subtle-disabled disabled:border-success-border-subtle-disabled disabled:text-success-text-subtle-disabled',
    },
  ],
})

export const togglePressedOn = cva('', {
  variants: {
    variant: {
      default: '',
      subtle: '',
      ghost: '',
    },
    intent: {
      neutral: '',
      primary: '',
      secondary: '',
      accent: '',
      info: '',
      warning: '',
      error: '',
      success: '',
    },
  },
  compoundVariants: [
    {
      variant: 'default',
      intent: 'neutral',
      class:
        'data-[state=on]:bg-neutral-fill-default-active data-[state=on]:border-neutral-border-default-active data-[state=on]:text-neutral-text-inverse-active',
    },
    {
      variant: 'default',
      intent: 'primary',
      class:
        'data-[state=on]:bg-primary-fill-default-active data-[state=on]:border-primary-border-default-active data-[state=on]:text-primary-text-inverse-active',
    },
    {
      variant: 'default',
      intent: 'secondary',
      class:
        'data-[state=on]:bg-secondary-fill-default-active data-[state=on]:border-secondary-border-default-active data-[state=on]:text-secondary-text-inverse-active',
    },
    {
      variant: 'default',
      intent: 'accent',
      class:
        'data-[state=on]:bg-accent-fill-default-active data-[state=on]:border-accent-border-default-active data-[state=on]:text-accent-text-inverse-active',
    },
    {
      variant: 'default',
      intent: 'info',
      class:
        'data-[state=on]:bg-info-fill-default-active data-[state=on]:border-info-border-default-active data-[state=on]:text-info-text-inverse-active',
    },
    {
      variant: 'default',
      intent: 'warning',
      class:
        'data-[state=on]:bg-warning-fill-default-active data-[state=on]:border-warning-border-default-active data-[state=on]:text-warning-text-inverse-active',
    },
    {
      variant: 'default',
      intent: 'error',
      class:
        'data-[state=on]:bg-error-fill-default-active data-[state=on]:border-error-border-default-active data-[state=on]:text-error-text-inverse-active',
    },
    {
      variant: 'default',
      intent: 'success',
      class:
        'data-[state=on]:bg-success-fill-default-active data-[state=on]:border-success-border-default-active data-[state=on]:text-success-text-inverse-active',
    },
    {
      variant: 'subtle',
      intent: 'primary',
      class:
        'data-[state=on]:bg-primary-fill-subtle-active data-[state=on]:border-primary-border-subtle-active data-[state=on]:text-primary-text-subtle-active',
    },
    {
      variant: 'subtle',
      intent: 'secondary',
      class:
        'data-[state=on]:bg-secondary-fill-subtle-active data-[state=on]:border-secondary-border-subtle-active data-[state=on]:text-secondary-text-subtle-active',
    },
    {
      variant: 'subtle',
      intent: 'accent',
      class:
        'data-[state=on]:bg-accent-fill-subtle-active data-[state=on]:border-accent-border-subtle-active data-[state=on]:text-accent-text-subtle-active',
    },
    {
      variant: 'subtle',
      intent: 'neutral',
      class:
        'data-[state=on]:bg-neutral-fill-subtle-active data-[state=on]:border-neutral-border-subtle-active data-[state=on]:text-neutral-text-subtle-active',
    },
    {
      variant: 'subtle',
      intent: 'info',
      class:
        'data-[state=on]:bg-info-fill-subtle-active data-[state=on]:border-info-border-subtle-active data-[state=on]:text-info-text-subtle-active',
    },
    {
      variant: 'subtle',
      intent: 'warning',
      class:
        'data-[state=on]:bg-warning-fill-subtle-active data-[state=on]:border-warning-border-subtle-active data-[state=on]:text-warning-text-subtle-active',
    },
    {
      variant: 'subtle',
      intent: 'error',
      class:
        'data-[state=on]:bg-error-fill-subtle-active data-[state=on]:border-error-border-subtle-active data-[state=on]:text-error-text-subtle-active',
    },
    {
      variant: 'subtle',
      intent: 'success',
      class:
        'data-[state=on]:bg-success-fill-subtle-active data-[state=on]:border-success-border-subtle-active data-[state=on]:text-success-text-subtle-active',
    },
    {
      variant: 'ghost',
      intent: 'primary',
      class:
        'data-[state=on]:bg-primary-fill-subtle-active data-[state=on]:border-primary-border-subtle-active data-[state=on]:text-primary-text-subtle-active',
    },
    {
      variant: 'ghost',
      intent: 'secondary',
      class:
        'data-[state=on]:bg-secondary-fill-subtle-active data-[state=on]:border-secondary-border-subtle-active data-[state=on]:text-secondary-text-subtle-active',
    },
    {
      variant: 'ghost',
      intent: 'accent',
      class:
        'data-[state=on]:bg-accent-fill-subtle-active data-[state=on]:border-accent-border-subtle-active data-[state=on]:text-accent-text-subtle-active',
    },
    {
      variant: 'ghost',
      intent: 'neutral',
      class:
        'data-[state=on]:bg-neutral-fill-subtle-active data-[state=on]:border-neutral-border-subtle-active data-[state=on]:text-neutral-text-subtle-active',
    },
    {
      variant: 'ghost',
      intent: 'info',
      class:
        'data-[state=on]:bg-info-fill-subtle-active data-[state=on]:border-info-border-subtle-active data-[state=on]:text-info-text-subtle-active',
    },
    {
      variant: 'ghost',
      intent: 'warning',
      class:
        'data-[state=on]:bg-warning-fill-subtle-active data-[state=on]:border-warning-border-subtle-active data-[state=on]:text-warning-text-subtle-active',
    },
    {
      variant: 'ghost',
      intent: 'error',
      class:
        'data-[state=on]:bg-error-fill-subtle-active data-[state=on]:border-error-border-subtle-active data-[state=on]:text-error-text-subtle-active',
    },
    {
      variant: 'ghost',
      intent: 'success',
      class:
        'data-[state=on]:bg-success-fill-subtle-active data-[state=on]:border-success-border-subtle-active data-[state=on]:text-success-text-subtle-active',
    },
  ],
})

export type ButtonVariants = VariantProps<typeof buttonVariants>
