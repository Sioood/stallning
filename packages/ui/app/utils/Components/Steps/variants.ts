import { cva } from 'class-variance-authority'

import type { StepsIntent, StepsSize } from './context'

export const stepsRootCVA = cva('flex flex-col gap-4', {
  defaultVariants: {
    intent: 'neutral',
    size: 'md',
  },
  variants: {
    intent: {
      accent: '',
      neutral: '',
      primary: '',
      secondary: '',
    } satisfies Record<StepsIntent, string>,
    size: {
      lg: '',
      md: '',
      sm: '',
    } satisfies Record<StepsSize, string>,
  },
})

export const stepsListCVA = cva('flex w-full justify-center data-[orientation=vertical]:flex-col', {
  defaultVariants: {
    intent: 'neutral',
    size: 'md',
  },
  variants: {
    intent: {
      accent: '',
      neutral: '',
      primary: '',
      secondary: '',
    } satisfies Record<StepsIntent, string>,
    size: {
      lg: 'gap-4',
      md: 'gap-3',
      sm: 'gap-2',
    } satisfies Record<StepsSize, string>,
  },
})

export const stepsItemCVA = cva(
  'group flex flex-1 items-center last:flex-none data-[orientation=vertical]:items-start',
  {
    defaultVariants: {
      intent: 'neutral',
      size: 'md',
    },
    variants: {
      intent: {
        accent: '',
        neutral: '',
        primary: '',
        secondary: '',
      } satisfies Record<StepsIntent, string>,
      size: {
        lg: 'gap-3',
        md: 'gap-2',
        sm: 'gap-1.5',
      } satisfies Record<StepsSize, string>,
    },
  },
)

export const stepsContentCVA = cva('w-full', {
  defaultVariants: {
    intent: 'neutral',
    size: 'md',
  },
  variants: {
    intent: {
      accent: 'text-accent-text-default',
      neutral: 'text-neutral-text-default',
      primary: 'text-primary-text-default',
      secondary: 'text-secondary-text-default',
    } satisfies Record<StepsIntent, string>,
    size: {
      lg: 'txt-h6 py-4',
      md: 'txt-base py-3',
      sm: 'txt-body-sm py-2',
    } satisfies Record<StepsSize, string>,
  },
})

export const stepsIndicatorCVA = cva(
  ['inline-flex shrink-0 items-center justify-center', 'transition-colors duration-150'],
  {
    compoundVariants: [
      // Pending
      {
        className: 'border-neutral-border-subtle bg-neutral-fill-subtle text-neutral-text-subtle',
        intent: 'neutral',
        status: 'pending',
      },
      {
        className: 'border-primary-border-subtle bg-primary-fill-subtle text-primary-text-subtle',
        intent: 'primary',
        status: 'pending',
      },
      {
        className:
          'border-secondary-border-subtle bg-secondary-fill-subtle text-secondary-text-subtle',
        intent: 'secondary',
        status: 'pending',
      },
      {
        className: 'border-accent-border-subtle bg-accent-fill-subtle text-accent-text-subtle',
        intent: 'accent',
        status: 'pending',
      },
      // Current
      {
        className:
          'border-neutral-border-default bg-neutral-fill-default text-neutral-text-inverse',
        intent: 'neutral',
        status: ['current', 'completed'],
      },
      {
        className:
          'border-primary-border-default bg-primary-fill-default text-primary-text-inverse',
        intent: 'primary',
        status: ['current', 'completed'],
      },
      {
        className:
          'border-secondary-border-default bg-secondary-fill-default text-secondary-text-inverse',
        intent: 'secondary',
        status: ['current', 'completed'],
      },
      {
        className: 'border-accent-border-default bg-accent-fill-default text-accent-text-inverse',
        intent: 'accent',
        status: ['current', 'completed'],
      },
    ],
    defaultVariants: {
      intent: 'neutral',
      size: 'md',
      status: 'pending',
    },
    variants: {
      intent: {
        accent: '',
        neutral: '',
        primary: '',
        secondary: '',
      } satisfies Record<StepsIntent, string>,
      size: {
        lg: 'txt-base size-10 border',
        md: 'txt-label size-8 border',
        sm: 'txt-caption size-6 border',
      } satisfies Record<StepsSize, string>,
      status: {
        completed: '',
        current: '',
        pending: '',
      },
    },
  },
)

export const stepsSeparatorCVA = cva(['flex-1 shrink-0 transition-colors duration-150'], {
  compoundVariants: [
    {
      className: 'bg-neutral-border-default',
      completed: true,
      intent: 'neutral',
    },
    {
      className: 'bg-primary-border-default',
      completed: true,
      intent: 'primary',
    },
    {
      className: 'bg-secondary-border-default',
      completed: true,
      intent: 'secondary',
    },
    {
      className: 'bg-accent-border-default',
      completed: true,
      intent: 'accent',
    },
  ],
  defaultVariants: {
    completed: false,
    intent: 'neutral',
    orientation: 'horizontal',
    size: 'md',
  },
  variants: {
    completed: {
      false: '',
      true: '',
    },
    intent: {
      accent: 'bg-accent-border-subtle',
      neutral: 'bg-neutral-border-subtle',
      primary: 'bg-primary-border-subtle',
      secondary: 'bg-secondary-border-subtle',
    } satisfies Record<StepsIntent, string>,
    orientation: {
      horizontal: 'h-px self-center',
      vertical: 'mx-auto my-1 w-0.5 flex-none self-stretch',
    },
    size: {
      lg: '',
      md: '',
      sm: '',
    } satisfies Record<StepsSize, string>,
  },
})

export const stepsCompletedContentCVA = cva('w-full', {
  defaultVariants: {
    intent: 'neutral',
    size: 'md',
  },
  variants: {
    intent: {
      accent: 'text-accent-text-default',
      neutral: 'text-neutral-text-default',
      primary: 'text-primary-text-default',
      secondary: 'text-secondary-text-default',
    } satisfies Record<StepsIntent, string>,
    size: {
      lg: 'txt-h6 py-4',
      md: 'txt-base py-3',
      sm: 'txt-body-sm py-2',
    } satisfies Record<StepsSize, string>,
  },
})
