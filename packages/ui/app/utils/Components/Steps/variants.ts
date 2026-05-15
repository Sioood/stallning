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
  ['inline-flex items-center justify-center shrink-0', 'transition-colors duration-150'],
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
        sm: 'size-6 txt-caption border',
        md: 'size-8 txt-label border',
        lg: 'size-10 txt-base border',
      } satisfies Record<StepsSize, string>,
    },
    compoundVariants: [
      // Pending
      {
        status: 'pending',
        intent: 'neutral',
        className: 'text-neutral-text-subtle bg-neutral-fill-subtle border-neutral-border-subtle',
      },
      {
        status: 'pending',
        intent: 'primary',
        className: 'text-primary-text-subtle bg-primary-fill-subtle border-primary-border-subtle',
      },
      {
        status: 'pending',
        intent: 'secondary',
        className:
          'text-secondary-text-subtle bg-secondary-fill-subtle border-secondary-border-subtle',
      },
      {
        status: 'pending',
        intent: 'accent',
        className: 'text-accent-text-subtle bg-accent-fill-subtle border-accent-border-subtle',
      },
      // Current
      {
        status: ['current', 'completed'],
        intent: 'neutral',
        className:
          'text-neutral-text-inverse bg-neutral-fill-default border-neutral-border-default',
      },
      {
        status: ['current', 'completed'],
        intent: 'primary',
        className:
          'text-primary-text-inverse bg-primary-fill-default border-primary-border-default',
      },
      {
        status: ['current', 'completed'],
        intent: 'secondary',
        className:
          'text-secondary-text-inverse bg-secondary-fill-default border-secondary-border-default',
      },
      {
        status: ['current', 'completed'],
        intent: 'accent',
        className: 'text-accent-text-inverse bg-accent-fill-default border-accent-border-default',
      },
    ],
    defaultVariants: {
      intent: 'neutral',
      status: 'pending',
      size: 'md',
    },
  },
)

export const stepsSeparatorCVA = cva(['shrink-0 flex-1 transition-colors duration-150'], {
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
      vertical: 'w-0.5 self-stretch mx-auto my-1 flex-none',
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

export const stepsProgressCVA = cva('w-full h-1 overflow-hidden', {
  variants: {
    intent: {
      neutral: 'bg-neutral-fill-default',
      primary: 'bg-primary-fill-default',
      secondary: 'bg-secondary-fill-default',
      accent: 'bg-accent-fill-default',
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
