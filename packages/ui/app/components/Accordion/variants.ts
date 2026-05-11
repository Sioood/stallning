import { cva } from 'class-variance-authority'

import type { AccordionIntent, AccordionSize } from './context'

export const accordionRootCVA = cva(
  [
    'accordionRoot flex w-full',
    'data-[orientation=vertical]:flex-col data-[orientation=horizontal]:flex-row',
  ],
  {
    variants: {
      intent: {
        neutral: 'text-neutral-text-default',
        primary: 'text-primary-text-default',
        secondary: 'text-secondary-text-default',
        accent: 'text-accent-text-default',
      } satisfies Record<AccordionIntent, string>,
      size: {
        md: '',
      } satisfies Record<AccordionSize, string>,
    },
    defaultVariants: {
      intent: 'neutral',
      size: 'md',
    },
  },
)

export const accordionItemCVA = cva(
  [
    'accordionItem',
    'overflow-hidden',
    'w-full data-[orientation=horizontal]:w-fit flex data-[orientation=vertical]:flex-col items-center',
  ],
  {
    variants: {
      intent: {
        neutral: 'border-neutral-border-subtle',
        primary: 'border-primary-border-subtle',
        secondary: 'border-secondary-border-subtle',
        accent: 'border-accent-border-subtle',
      } satisfies Record<AccordionIntent, string>,
      size: {
        md: 'gap-3 p-1 txt-h6 data-[orientation=vertical]:border-b data-[orientation=horizontal]:border-r',
      } satisfies Record<AccordionSize, string>,
    },
    defaultVariants: {
      intent: 'neutral',
      size: 'md',
    },
  },
)

export const accordionItemTriggerCVA = cva(
  [
    'accordionItemTrigger',
    'w-full data-[orientation=horizontal]:w-fit flex data-[orientation=horizontal]:flex-col items-center justify-between text-left',
    'not-disabled:cursor-pointer disabled:pointer-events-none',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  ],
  {
    variants: {
      intent: {
        neutral: 'text-neutral-text-default',
        primary: 'text-primary-text-default',
        secondary: 'text-secondary-text-default',
        accent: 'text-accent-text-default',
      } satisfies Record<AccordionIntent, string>,
      size: {
        md: 'gap-3 p-1 txt-h6',
      } satisfies Record<AccordionSize, string>,
    },
    defaultVariants: {
      intent: 'neutral',
      size: 'md',
    },
  },
)

export const accordionItemContentCVA = cva(
  [
    'accordionItemContent',
    'size-full',
    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1',
    'data-[orientation=horizontal]:data-[state=closed]:slide-out-to-left-1 data-[orientation=horizontal]:data-[state=open]:slide-in-from-left-1',
  ],
  {
    variants: {
      intent: {
        neutral: 'text-neutral-text-default border-neutral-border-subtle',
        primary: 'text-primary-text-default border-primary-border-subtle',
        secondary: 'text-secondary-text-default border-secondary-border-subtle',
        accent: 'text-accent-text-default border-accent-border-subtle',
      } satisfies Record<AccordionIntent, string>,
      size: {
        md: 'data-[orientation=vertical]:py-4 data-[orientation=horizontal]:px-4 txt-base data-[orientation=vertical]:border-t data-[orientation=horizontal]:border-l',
      } satisfies Record<AccordionSize, string>,
    },
    defaultVariants: {
      intent: 'neutral',
      size: 'md',
    },
  },
)

export const accordionItemIndicatorCVA = cva(
  [
    'accordionItemIndicator inline-flex shrink-0 transition-transform duration-200',
    'data-[state=open]:data-[orientation=vertical]:rotate-180',
    'data-[state=open]:data-[orientation=horizontal]:rotate-90',
  ],
  {
    variants: {
      intent: {
        neutral: 'text-neutral-text-subtle',
        primary: 'text-primary-text-subtle',
        secondary: 'text-secondary-text-subtle',
        accent: 'text-accent-text-subtle',
      } satisfies Record<AccordionIntent, string>,
      size: {
        md: 'size-4',
      } satisfies Record<AccordionSize, string>,
    },
    defaultVariants: {
      intent: 'neutral',
      size: 'md',
    },
  },
)
