import { cva } from 'class-variance-authority'

import type { MenuIntent, MenuSize } from './context'

export const menuIndicatorCVA = cva('inline-flex items-center')

/** Unstyled trigger shell for `#trigger` slot (`as-child` anchor). */
export const menuUnstyledTriggerCVA = cva(
  'inline-flex w-fit cursor-pointer items-center border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-primary-border-default',
)

export const menuPositionerCVA = cva('z-9999 origin-(--transform-origin) [--z-index:9999]')
export const menuContentCVA = cva(
  [
    'z-9999',
    'border',
    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
    'min-w-48 p-1',
  ],
  {
    variants: {
      intent: {
        neutral: 'border-neutral-border-subtle bg-neutral-fill-subtle text-neutral-text-default',
        primary: 'border-primary-border-subtle bg-primary-fill-subtle text-primary-text-default',
        secondary:
          'border-secondary-border-subtle bg-secondary-fill-subtle text-secondary-text-default',
        accent: 'border-accent-border-subtle bg-accent-fill-subtle text-accent-text-default',
      } satisfies Record<MenuIntent, string>,
      size: {
        md: 'txt-label',
      } satisfies Record<MenuSize, string>,
    },
  },
)

export const menuArrowCVA = cva('', {
  variants: {
    intent: {
      neutral: '[--arrow-background:var(--color-neutral-fill-subtle)]',
      primary: '[--arrow-background:var(--color-primary-fill-subtle)]',
      secondary: '[--arrow-background:var(--color-secondary-fill-subtle)]',
      accent: '[--arrow-background:var(--color-accent-fill-subtle)]',
    } satisfies Record<MenuIntent, string>,
    size: {
      md: '[--arrow-size:calc(var(--spacing)*2)]',
    } satisfies Record<MenuSize, string>,
  },
})

export const menuArrowTipCVA = cva('size-full')
