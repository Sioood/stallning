import { cva } from 'class-variance-authority'

import type { ComponentIntent, ComponentSize } from '../contextBase'

export type SegmentedIntent = NonNullable<
  Extract<ComponentIntent, 'neutral' | 'primary' | 'secondary' | 'accent'>
>
export type SegmentedSize = NonNullable<ComponentSize>
export type SegmentedOrientation = 'horizontal' | 'vertical'
export type SegmentedVariant = 'pill' | 'line'

export const segmentedRootCVA = cva('relative inline-flex w-fit items-center', {
  variants: {
    variant: {
      pill: 'border p-0.5',
      line: '',
    } satisfies Record<SegmentedVariant, string>,
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
      variant: 'pill',
      intent: 'neutral',
      class: 'border-neutral-border-default bg-neutral-fill-subtle',
    },
    {
      variant: 'pill',
      intent: 'primary',
      class: 'border-primary-border-default bg-primary-fill-subtle',
    },
    {
      variant: 'pill',
      intent: 'secondary',
      class: 'border-secondary-border-default bg-secondary-fill-subtle',
    },
    {
      variant: 'pill',
      intent: 'accent',
      class: 'border-accent-border-default bg-accent-fill-subtle',
    },
    {
      variant: 'line',
      orientation: 'horizontal',
      class: 'border-b p-0',
    },
    {
      variant: 'line',
      orientation: 'vertical',
      class: 'border-r p-0',
    },
    {
      variant: 'line',
      intent: 'neutral',
      class: 'border-neutral-border-subtle',
    },
    {
      variant: 'line',
      intent: 'primary',
      class: 'border-primary-border-subtle',
    },
    {
      variant: 'line',
      intent: 'secondary',
      class: 'border-secondary-border-subtle',
    },
    {
      variant: 'line',
      intent: 'accent',
      class: 'border-accent-border-subtle',
    },
  ],
  defaultVariants: {
    variant: 'pill',
    intent: 'primary',
    size: 'md',
    orientation: 'horizontal',
  },
})

export const segmentedItemCVA = cva(
  'relative z-10 cursor-pointer font-medium transition-colors duration-200',
  {
    variants: {
      variant: {
        pill: '',
        line: '',
      } satisfies Record<SegmentedVariant, string>,
      intent: {
        neutral:
          'border-neutral-border-subtle text-neutral-text-subtle hover:text-neutral-text-default',
        primary:
          'border-primary-border-subtle text-primary-text-subtle hover:text-primary-text-default',
        secondary:
          'border-secondary-border-subtle text-secondary-text-subtle hover:text-secondary-text-default',
        accent:
          'border-accent-border-subtle text-accent-text-subtle hover:text-accent-text-default',
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
    compoundVariants: [
      {
        variant: 'pill',
        intent: 'neutral',
        class:
          'data-selected:text-neutral-text-inverse data-[state="checked"]:text-neutral-text-inverse',
      },
      {
        variant: 'pill',
        intent: 'primary',
        class:
          'data-selected:text-primary-text-inverse data-[state="checked"]:text-primary-text-inverse',
      },
      {
        variant: 'pill',
        intent: 'secondary',
        class:
          'data-selected:text-secondary-text-inverse data-[state="checked"]:text-secondary-text-inverse',
      },
      {
        variant: 'pill',
        intent: 'accent',
        class:
          'data-selected:text-accent-text-inverse data-[state="checked"]:text-accent-text-inverse',
      },
      {
        variant: 'line',
        intent: 'neutral',
        class:
          'data-selected:text-neutral-text-default data-[state="checked"]:text-neutral-text-default',
      },
      {
        variant: 'line',
        intent: 'primary',
        class:
          'data-selected:text-primary-text-default data-[state="checked"]:text-primary-text-default',
      },
      {
        variant: 'line',
        intent: 'secondary',
        class:
          'data-selected:text-secondary-text-default data-[state="checked"]:text-secondary-text-default',
      },
      {
        variant: 'line',
        intent: 'accent',
        class:
          'data-selected:text-accent-text-default data-[state="checked"]:text-accent-text-default',
      },
    ],
    defaultVariants: {
      variant: 'pill',
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
      variant: {
        pill: '',
        line: 'z-10 bg-transparent!',
      } satisfies Record<SegmentedVariant, string>,
      intent: {
        neutral: 'bg-neutral-fill-default',
        primary: 'bg-primary-fill-default',
        secondary: 'bg-secondary-fill-default',
        accent: 'bg-accent-fill-default',
      } satisfies Record<SegmentedIntent, string>,
      orientation: {
        horizontal: '',
        vertical: '',
      } satisfies Record<SegmentedOrientation, string>,
    },
    compoundVariants: [
      {
        variant: 'line',
        orientation: 'horizontal',
        class: 'translate-y-[1px] border-b-2',
      },
      {
        variant: 'line',
        orientation: 'vertical',
        class: 'translate-x-[1px] border-r-2',
      },
      {
        variant: 'line',
        intent: 'neutral',
        class: 'border-neutral-fill-default',
      },
      {
        variant: 'line',
        intent: 'primary',
        class: 'border-primary-fill-default',
      },
      {
        variant: 'line',
        intent: 'secondary',
        class: 'border-secondary-fill-default',
      },
      {
        variant: 'line',
        intent: 'accent',
        class: 'border-accent-fill-default',
      },
    ],
    defaultVariants: {
      variant: 'pill',
      intent: 'primary',
      orientation: 'horizontal',
    },
  },
)
