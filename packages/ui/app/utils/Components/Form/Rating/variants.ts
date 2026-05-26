import { cva } from 'class-variance-authority'

import type { RatingIntent, RatingSize } from './context'

export const ratingRootCVA = cva('flex flex-col gap-1.5 data-[readonly]:pointer-events-none', {
  variants: {
    intent: {
      neutral: 'text-neutral-text-default',
      primary: 'text-primary-text-default',
      secondary: 'text-secondary-text-default',
      accent: 'text-accent-text-default',
    } satisfies Record<RatingIntent, string>,
  },
  defaultVariants: {
    intent: 'primary',
  },
})

export const ratingLabelCVA = cva('select-none data-[disabled]:opacity-50', {
  variants: {
    intent: {
      neutral: 'text-neutral-text-default',
      primary: 'text-primary-text-default',
      secondary: 'text-secondary-text-default',
      accent: 'text-accent-text-default',
    } satisfies Record<RatingIntent, string>,
    size: {
      sm: 'txt-caption',
      md: 'txt-label',
      lg: 'txt-h6',
    } satisfies Record<RatingSize, string>,
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
})

export const ratingControlCVA = cva('inline-flex items-center', {
  variants: {
    size: {
      sm: 'gap-0.5',
      md: 'gap-1',
      lg: 'gap-1.5',
    } satisfies Record<RatingSize, string>,
  },
  defaultVariants: {
    size: 'md',
  },
})

export const ratingItemCVA = cva(
  'inline-flex items-center justify-center outline-none not-data-[disabled]:cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:grayscale',
  {
    variants: {
      intent: {
        neutral: 'focus-visible:ring-neutral-border-default',
        primary: 'focus-visible:ring-primary-border-default',
        secondary: 'focus-visible:ring-secondary-border-default',
        accent: 'focus-visible:ring-accent-border-default',
      } satisfies Record<RatingIntent, string>,
      size: {
        sm: '',
        md: '',
        lg: '',
      } satisfies Record<RatingSize, string>,
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  },
)

export const ratingStarIconCVA = cva('shrink-0', {
  variants: {
    intent: {
      neutral: '',
      primary: '',
      secondary: '',
      accent: '',
    } satisfies Record<RatingIntent, string>,
    size: {
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
    } satisfies Record<RatingSize, string>,
    state: {
      empty: '',
      half: '',
      full: '',
    } satisfies Record<'empty' | 'full' | 'half', string>,
  },
  compoundVariants: [
    {
      intent: 'neutral',
      state: 'empty',
      class: 'text-neutral-text-subtle',
    },
    {
      intent: 'primary',
      state: 'empty',
      class: 'text-primary-text-subtle',
    },
    {
      intent: 'secondary',
      state: 'empty',
      class: 'text-secondary-text-subtle',
    },
    {
      intent: 'accent',
      state: 'empty',
      class: 'text-accent-text-subtle',
    },
    {
      intent: 'neutral',
      state: 'half',
      class: 'text-neutral-fill-default',
    },
    {
      intent: 'primary',
      state: 'half',
      class: 'text-primary-fill-default',
    },
    {
      intent: 'secondary',
      state: 'half',
      class: 'text-secondary-fill-default',
    },
    {
      intent: 'accent',
      state: 'half',
      class: 'text-accent-fill-default',
    },
    {
      intent: 'neutral',
      state: 'full',
      class: 'text-neutral-fill-default',
    },
    {
      intent: 'primary',
      state: 'full',
      class: 'text-primary-fill-default',
    },
    {
      intent: 'secondary',
      state: 'full',
      class: 'text-secondary-fill-default',
    },
    {
      intent: 'accent',
      state: 'full',
      class: 'text-accent-fill-default',
    },
  ],
  defaultVariants: {
    intent: 'primary',
    size: 'md',
    state: 'empty',
  },
})

export const ratingValueTextCVA = cva('font-mono tabular-nums', {
  variants: {
    intent: {
      neutral: 'text-neutral-text-subtle',
      primary: 'text-primary-text-subtle',
      secondary: 'text-secondary-text-subtle',
      accent: 'text-accent-text-subtle',
    } satisfies Record<RatingIntent, string>,
    size: {
      sm: 'txt-caption',
      md: 'txt-label',
      lg: 'txt-base',
    } satisfies Record<RatingSize, string>,
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
})
