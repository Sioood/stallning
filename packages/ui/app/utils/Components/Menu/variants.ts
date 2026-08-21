import { cva } from 'class-variance-authority'

import type { MenuIntent, MenuSize } from './context'

export const menuIndicatorCVA = cva('inline-flex items-center')

/** Unstyled trigger shell for `#trigger` slot (`as-child` anchor). */
export const menuUnstyledTriggerCVA = cva(
  'inline-flex w-fit cursor-pointer items-center border-0 bg-transparent p-0 outline-none focus-visible:focus-ring',
)

export const menuPositionerCVA = cva('origin-(--transform-origin)')

/* ── item primitives ──────────────────────────────────────────────────────
  These were duplicated verbatim across `Menu/Item.vue`, `Menu/CheckboxItem.vue`,
  `Menu/RadioGroup.vue`, `Menu/Submenu.vue` and `Menu/Group.vue` — the item CVA
  four times over. The only real difference between the copies was whether a
  trailing indicator is pushed to the far edge, which is now the `layout` axis.
  ---------------------------------------------------------------------- */

const menuItemIntent = {
  accent:
    'text-accent-text data-[disabled]:text-accent-text-subtle data-[highlighted]:bg-accent-fill-subtle-hover',
  neutral:
    'text-neutral-text data-[disabled]:text-neutral-text-subtle data-[highlighted]:bg-neutral-fill-subtle-hover',
  primary:
    'text-primary-text data-[disabled]:text-primary-text-subtle data-[highlighted]:bg-primary-fill-subtle-hover',
  secondary:
    'text-secondary-text data-[disabled]:text-secondary-text-subtle data-[highlighted]:bg-secondary-fill-subtle-hover',
} satisfies Record<MenuIntent, string>

export const menuItemCVA = cva(
  'flex cursor-pointer items-center gap-2 outline-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70',
  {
    defaultVariants: {
      layout: 'plain',
    },
    variants: {
      intent: menuItemIntent,
      /** `split` pushes a trailing indicator to the far edge (checkbox / radio items). */
      layout: {
        plain: 'w-full',
        split: 'justify-between',
      },
      size: {
        md: 'txt-caption px-2 py-1.5',
      } satisfies Record<MenuSize, string>,
    },
  },
)

export const menuItemTextCVA = cva('', {
  variants: {
    intent: {
      accent: 'text-accent-text',
      neutral: 'text-neutral-text',
      primary: 'text-primary-text',
      secondary: 'text-secondary-text',
    } satisfies Record<MenuIntent, string>,
    size: {
      md: 'txt-caption',
    } satisfies Record<MenuSize, string>,
  },
})

export const menuItemIndicatorCVA = cva('inline-flex items-center justify-center', {
  variants: {
    intent: {
      accent: 'text-accent-text',
      neutral: 'text-neutral-text',
      primary: 'text-primary-text',
      secondary: 'text-secondary-text',
    } satisfies Record<MenuIntent, string>,
    size: {
      md: 'size-4',
    } satisfies Record<MenuSize, string>,
  },
})

/** Reserves the indicator gutter so labels stay aligned whether or not one renders. */
export const menuItemIndicatorSlotCVA = cva('inline-flex shrink-0 items-center justify-center', {
  variants: {
    size: {
      md: 'size-4',
    } satisfies Record<MenuSize, string>,
  },
})

export const menuItemGroupLabelCVA = cva('', {
  variants: {
    intent: {
      accent: 'text-accent-text-subtle',
      neutral: 'text-neutral-text-subtle',
      primary: 'text-primary-text-subtle',
      secondary: 'text-secondary-text-subtle',
    } satisfies Record<MenuIntent, string>,
    size: {
      md: 'txt-caption px-2 py-1',
    } satisfies Record<MenuSize, string>,
  },
})
export const menuContentCVA = cva(
  [
    'border',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0',
    'min-w-48 p-1',
  ],
  {
    variants: {
      intent: {
        accent:
          'border-accent-border-subtle bg-accent-fill-subtle text-accent-text disabled:pointer-events-none disabled:opacity-40',
        neutral:
          'border-neutral-border-subtle bg-neutral-fill-subtle text-neutral-text disabled:pointer-events-none disabled:opacity-40',
        primary:
          'border-primary-border-subtle bg-primary-fill-subtle text-primary-text disabled:pointer-events-none disabled:opacity-40',
        secondary:
          'border-secondary-border-subtle bg-secondary-fill-subtle text-secondary-text disabled:pointer-events-none disabled:opacity-40',
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
      accent: '[--arrow-background:var(--color-accent-fill-subtle)]',
      neutral: '[--arrow-background:var(--color-neutral-fill-subtle)]',
      primary: '[--arrow-background:var(--color-primary-fill-subtle)]',
      secondary: '[--arrow-background:var(--color-secondary-fill-subtle)]',
    } satisfies Record<MenuIntent, string>,
    size: {
      md: '[--arrow-size:calc(var(--spacing)*2)]',
    } satisfies Record<MenuSize, string>,
  },
})

export const menuArrowTipCVA = cva('size-full')
