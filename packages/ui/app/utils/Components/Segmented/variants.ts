import { cva } from 'class-variance-authority'

import type { ComponentIntent, ComponentSize } from '../contextBase'

export type SegmentedIntent = NonNullable<
  Extract<ComponentIntent, 'neutral' | 'primary' | 'secondary' | 'accent'>
>
export type SegmentedSize = NonNullable<ComponentSize>
export type SegmentedOrientation = 'horizontal' | 'vertical'

export const segmentedRootCVA = cva('relative inline-flex w-fit items-center border p-0.5', {
  variants: {
    intent: {
      neutral: '',
      primary: '',
      secondary: '',
      accent: '',
    } satisfies Record<SegmentedIntent, string>,
    size: {
      sm: 'gap-0.5 p-0.5',
      md: 'gap-1 p-1',
      lg: 'gap-1.5 p-1.5',
    } satisfies Record<SegmentedSize, string>,
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    } satisfies Record<SegmentedOrientation, string>,
  },
  compoundVariants: [
    {
      intent: 'neutral',
      class: 'border-neutral-border-default bg-neutral-fill-subtle',
    },
    {
      intent: 'primary',
      class: 'border-primary-border-default bg-primary-fill-subtle',
    },
    {
      intent: 'secondary',
      class: 'border-secondary-border-default bg-secondary-fill-subtle',
    },
    {
      intent: 'accent',
      class: 'border-accent-border-default bg-accent-fill-subtle',
    },
  ],
  defaultVariants: {
    intent: 'primary',
    size: 'md',
    orientation: 'horizontal',
  },
})

export const segmentedItemCVA = cva(
  'relative z-10 cursor-pointer font-medium transition-colors duration-200',
  {
    variants: {
      intent: {
        neutral:
          'text-neutral-text-subtle hover:text-neutral-text-default data-[state="checked"]:text-neutral-text-inverse data-selected:text-neutral-text-inverse',
        primary:
          'text-primary-text-subtle hover:text-primary-text-default data-[state="checked"]:text-primary-text-inverse data-selected:text-primary-text-inverse',
        secondary:
          'text-secondary-text-subtle hover:text-secondary-text-default data-[state="checked"]:text-secondary-text-inverse data-selected:text-secondary-text-inverse',
        accent:
          'text-accent-text-subtle hover:text-accent-text-default data-[state="checked"]:text-accent-text-inverse data-selected:text-accent-text-inverse',
      } satisfies Record<SegmentedIntent, string>,
      size: {
        sm: 'txt-caption px-2 py-1',
        md: 'txt-label px-3 py-1.5',
        lg: 'txt-base px-4 py-2',
      } satisfies Record<SegmentedSize, string>,
      orientation: {
        horizontal: 'text-center',
        vertical: 'w-full text-left',
      } satisfies Record<SegmentedOrientation, string>,
      disabled: {
        true: 'pointer-events-none cursor-not-allowed opacity-50',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
      orientation: 'horizontal',
      disabled: false,
    },
  },
)

export const segmentedIndicatorCVA = cva(
  'pointer-events-none absolute transition-all duration-200 ease-out',
  {
    variants: {
      intent: {
        neutral: 'bg-neutral-fill-default',
        primary: 'bg-primary-fill-default',
        secondary: 'bg-secondary-fill-default',
        accent: 'bg-accent-fill-default',
      } satisfies Record<SegmentedIntent, string>,
    },
    defaultVariants: {
      intent: 'primary',
    },
  },
)
