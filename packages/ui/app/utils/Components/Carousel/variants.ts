import { cva } from 'class-variance-authority'

import type { CarouselIntent, CarouselSize } from './context'

export const carouselRootCVA = cva(
  'relative flex w-full flex-col gap-4 data-[orientation=vertical]:flex-row',
  {
    variants: {
      intent: {
        neutral: 'text-neutral-text-default',
        primary: 'text-primary-text-default',
        secondary: 'text-secondary-text-default',
        accent: 'text-accent-text-default',
      } satisfies Record<CarouselIntent, string>,
      size: {
        sm: 'gap-3',
        md: 'gap-4',
        lg: 'gap-5',
      } satisfies Record<CarouselSize, string>,
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  },
)

export const carouselControlCVA = cva('flex items-center gap-2', {
  variants: {
    orientation: {
      horizontal: 'flex-row justify-between',
      vertical: 'flex-col justify-between',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
})

export const carouselItemGroupCVA = cva(
  [
    'flex min-w-0 flex-1 overflow-x-auto overflow-y-hidden',
    'scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]',
    '[&::-webkit-scrollbar]:hidden',
    'data-[orientation=vertical]:flex-col data-[orientation=vertical]:overflow-x-hidden data-[orientation=vertical]:overflow-y-auto',
  ].join(' '),
)

export const carouselItemCVA = cva('min-w-0 shrink-0 grow-0 basis-[var(--slide-item-size,100%)]', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    } satisfies Record<CarouselSize, string>,
  },
})

export const carouselViewportCVA = cva('group/viewport relative w-full')

export const carouselOverlayTriggerCVA = cva(
  [
    'absolute z-10 opacity-0 transition-opacity',
    'group-hover/viewport:opacity-100 group-focus-within/viewport:opacity-100',
    'focus-visible:opacity-100',
  ].join(' '),
  {
    variants: {
      position: {
        prev: '',
        next: '',
      },
      orientation: {
        horizontal: '',
        vertical: '',
      },
    },
    compoundVariants: [
      {
        position: 'prev',
        orientation: 'horizontal',
        class: 'top-1/2 left-2 -translate-y-1/2',
      },
      {
        position: 'next',
        orientation: 'horizontal',
        class: 'top-1/2 right-2 -translate-y-1/2',
      },
      {
        position: 'prev',
        orientation: 'vertical',
        class: 'top-2 left-1/2 -translate-x-1/2',
      },
      {
        position: 'next',
        orientation: 'vertical',
        class: 'bottom-2 left-1/2 -translate-x-1/2',
      },
    ],
    defaultVariants: {
      position: 'prev',
      orientation: 'horizontal',
    },
  },
)

export const carouselIndicatorGroupCVA = cva('flex items-center justify-center', {
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
    variant: {
      dot: 'gap-2',
      thumbnail: 'gap-3',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    variant: 'dot',
  },
})

export const carouselDotIndicatorCVA = cva(
  'size-2.5 shrink-0 cursor-pointer border-0 p-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-border-default disabled:cursor-not-allowed disabled:opacity-50 data-[current]:ring',
  {
    variants: {
      intent: {
        neutral:
          'bg-neutral-fill-subtle data-[current]:bg-neutral-fill-default data-[current]:ring-neutral-border-default',
        primary:
          'bg-primary-fill-subtle data-[current]:bg-primary-fill-default data-[current]:ring-primary-border-default',
        secondary:
          'bg-secondary-fill-subtle data-[current]:bg-secondary-fill-default data-[current]:ring-secondary-border-default',
        accent:
          'bg-accent-fill-subtle data-[current]:bg-accent-fill-default data-[current]:ring-accent-border-default',
      } satisfies Record<CarouselIntent, string>,
    },
    defaultVariants: {
      intent: 'primary',
    },
  },
)

export const carouselThumbnailIndicatorCVA = cva(
  'block shrink-0 cursor-pointer overflow-hidden border-2 border-transparent p-0 opacity-60 transition-[opacity,border-color] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-border-default disabled:cursor-not-allowed disabled:opacity-50 data-[current]:opacity-100 data-[current]:ring',
  {
    variants: {
      intent: {
        neutral: 'data-[current]:ring-neutral-border-default',
        primary: 'data-[current]:ring-primary-border-default',
        secondary: 'data-[current]:ring-secondary-border-default',
        accent: 'data-[current]:ring-accent-border-default',
      } satisfies Record<CarouselIntent, string>,
      size: {
        sm: 'h-20 w-28',
        md: 'h-24 w-36',
        lg: 'h-28 w-44',
      } satisfies Record<CarouselSize, string>,
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  },
)

export const carouselProgressTextCVA = cva('txt-label font-medium tabular-nums', {
  variants: {
    intent: {
      neutral: 'text-neutral-text-subtle',
      primary: 'text-primary-text-subtle',
      secondary: 'text-secondary-text-subtle',
      accent: 'text-accent-text-subtle',
    } satisfies Record<CarouselIntent, string>,
    size: {
      sm: 'txt-caption',
      md: 'txt-label',
      lg: 'txt-base',
    } satisfies Record<CarouselSize, string>,
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
})
