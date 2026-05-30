import { cva } from 'class-variance-authority'

import type { StepsIntent, StepsSize } from './context'

export const stepsRootCVA = cva('flex flex-col gap-4', {
  variants: {
    intent: {
      neutral: '',
      primary: '',
      secondary: '',
      accent: '',
    } satisfies Record<StepsIntent, string>,
    size: {
      sm: '',
      md: '',
      lg: '',
    } satisfies Record<StepsSize, string>,
  },
  defaultVariants: {
    intent: 'neutral',
    size: 'md',
  },
})

export const stepsListCVA = cva('flex w-full justify-center data-[orientation=vertical]:flex-col', {
  variants: {
    intent: {
      neutral: '',
      primary: '',
      secondary: '',
      accent: '',
    } satisfies Record<StepsIntent, string>,
    size: {
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
    } satisfies Record<StepsSize, string>,
  },
  defaultVariants: {
    intent: 'neutral',
    size: 'md',
  },
})

export const stepsItemCVA = cva(
  'group flex flex-1 items-center last:flex-none data-[orientation=vertical]:items-start',
  {
    variants: {
      intent: {
        neutral: '',
        primary: '',
        secondary: '',
        accent: '',
      } satisfies Record<StepsIntent, string>,
      size: {
        sm: 'gap-1.5',
        md: 'gap-2',
        lg: 'gap-3',
      } satisfies Record<StepsSize, string>,
    },
    defaultVariants: {
      intent: 'neutral',
      size: 'md',
    },
  },
)

export const stepsContentCVA = cva('w-full', {
  variants: {
    intent: {
      neutral: 'text-neutral-text-default',
      primary: 'text-primary-text-default',
      secondary: 'text-secondary-text-default',
      accent: 'text-accent-text-default',
    } satisfies Record<StepsIntent, string>,
    size: {
      sm: 'txt-body-sm py-2',
      md: 'txt-base py-3',
      lg: 'txt-h6 py-4',
    } satisfies Record<StepsSize, string>,
  },
  defaultVariants: {
    intent: 'neutral',
    size: 'md',
  },
})

export const stepsIndicatorCVA = cva(
  ['inline-flex shrink-0 items-center justify-center', 'transition-colors duration-150'],
  {
    variants: {
      intent: {
        neutral: '',
        primary: '',
        secondary: '',
        accent: '',
      } satisfies Record<StepsIntent, string>,
      status: {
        pending: '',
        current: '',
        completed: '',
      },
      size: {
        sm: 'txt-caption size-6 border',
        md: 'txt-label size-8 border',
        lg: 'txt-base size-10 border',
      } satisfies Record<StepsSize, string>,
    },
    compoundVariants: [
      // Pending
      {
        status: 'pending',
        intent: 'neutral',
        className: 'border-neutral-border-subtle bg-neutral-fill-subtle text-neutral-text-subtle',
      },
      {
        status: 'pending',
        intent: 'primary',
        className: 'border-primary-border-subtle bg-primary-fill-subtle text-primary-text-subtle',
      },
      {
        status: 'pending',
        intent: 'secondary',
        className:
          'border-secondary-border-subtle bg-secondary-fill-subtle text-secondary-text-subtle',
      },
      {
        status: 'pending',
        intent: 'accent',
        className: 'border-accent-border-subtle bg-accent-fill-subtle text-accent-text-subtle',
      },
      // Current
      {
        status: ['current', 'completed'],
        intent: 'neutral',
        className:
          'border-neutral-border-default bg-neutral-fill-default text-neutral-text-inverse',
      },
      {
        status: ['current', 'completed'],
        intent: 'primary',
        className:
          'border-primary-border-default bg-primary-fill-default text-primary-text-inverse',
      },
      {
        status: ['current', 'completed'],
        intent: 'secondary',
        className:
          'border-secondary-border-default bg-secondary-fill-default text-secondary-text-inverse',
      },
      {
        status: ['current', 'completed'],
        intent: 'accent',
        className: 'border-accent-border-default bg-accent-fill-default text-accent-text-inverse',
      },
    ],
    defaultVariants: {
      intent: 'neutral',
      status: 'pending',
      size: 'md',
    },
  },
)

export const stepsSeparatorCVA = cva(['flex-1 shrink-0 transition-colors duration-150'], {
  variants: {
    intent: {
      neutral: 'bg-neutral-border-subtle',
      primary: 'bg-primary-border-subtle',
      secondary: 'bg-secondary-border-subtle',
      accent: 'bg-accent-border-subtle',
    } satisfies Record<StepsIntent, string>,
    completed: {
      true: '',
      false: '',
    },
    orientation: {
      horizontal: 'h-px self-center',
      vertical: 'mx-auto my-1 w-0.5 flex-none self-stretch',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    } satisfies Record<StepsSize, string>,
  },
  compoundVariants: [
    {
      completed: true,
      intent: 'neutral',
      className: 'bg-neutral-border-default',
    },
    {
      completed: true,
      intent: 'primary',
      className: 'bg-primary-border-default',
    },
    {
      completed: true,
      intent: 'secondary',
      className: 'bg-secondary-border-default',
    },
    {
      completed: true,
      intent: 'accent',
      className: 'bg-accent-border-default',
    },
  ],
  defaultVariants: {
    intent: 'neutral',
    completed: false,
    orientation: 'horizontal',
    size: 'md',
  },
})

export const stepsCompletedContentCVA = cva('w-full', {
  variants: {
    intent: {
      neutral: 'text-neutral-text-default',
      primary: 'text-primary-text-default',
      secondary: 'text-secondary-text-default',
      accent: 'text-accent-text-default',
    } satisfies Record<StepsIntent, string>,
    size: {
      sm: 'txt-body-sm py-2',
      md: 'txt-base py-3',
      lg: 'txt-h6 py-4',
    } satisfies Record<StepsSize, string>,
  },
  defaultVariants: {
    intent: 'neutral',
    size: 'md',
  },
})
