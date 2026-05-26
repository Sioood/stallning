import { cva } from 'class-variance-authority'

import type { TableIntent, TableSize, TableSticky } from './context'

const tableIntents = [
  'neutral',
  'primary',
  'secondary',
  'accent',
] as const satisfies readonly TableIntent[]

const stickyHeaderBackground: Record<TableIntent, string> = {
  neutral: 'sticky inset-x-0 top-0 z-10 bg-neutral-fill-subtle backdrop-blur-sm',
  primary: 'sticky inset-x-0 top-0 z-10 bg-primary-fill-subtle backdrop-blur-sm',
  secondary: 'sticky inset-x-0 top-0 z-10 bg-secondary-fill-subtle backdrop-blur-sm',
  accent: 'sticky inset-x-0 top-0 z-10 bg-accent-fill-subtle backdrop-blur-sm',
}

const stickyFooterBackground: Record<TableIntent, string> = {
  neutral: 'sticky inset-x-0 bottom-0 z-10 bg-neutral-fill-subtle backdrop-blur-sm',
  primary: 'sticky inset-x-0 bottom-0 z-10 bg-primary-fill-subtle backdrop-blur-sm',
  secondary: 'sticky inset-x-0 bottom-0 z-10 bg-secondary-fill-subtle backdrop-blur-sm',
  accent: 'sticky inset-x-0 bottom-0 z-10 bg-accent-fill-subtle backdrop-blur-sm',
}

const loadingIndicatorBackground: Record<TableIntent, string> = {
  neutral: 'after:bg-neutral-fill-default',
  primary: 'after:bg-primary-fill-default',
  secondary: 'after:bg-secondary-fill-default',
  accent: 'after:bg-accent-fill-default',
}

const pinnedHeadBackground: Record<TableIntent, string> = {
  neutral: 'bg-neutral-fill-subtle/95',
  primary: 'bg-primary-fill-subtle/95',
  secondary: 'bg-secondary-fill-subtle/95',
  accent: 'bg-accent-fill-subtle/95',
}

const pinnedCellBackground: Record<TableIntent, string> = {
  neutral: 'bg-neutral-fill-subtle/95',
  primary: 'bg-primary-fill-subtle/95',
  secondary: 'bg-secondary-fill-subtle/95',
  accent: 'bg-accent-fill-subtle/95',
}

const selectedRowBackground: Record<TableIntent, string> = {
  neutral: 'bg-neutral-fill-subtle/70',
  primary: 'bg-primary-fill-subtle/70',
  secondary: 'bg-secondary-fill-subtle/70',
  accent: 'bg-accent-fill-subtle/70',
}

const pinnedRowBackground: Record<TableIntent, string> = {
  neutral: 'bg-neutral-fill-subtle/90',
  primary: 'bg-primary-fill-subtle/90',
  secondary: 'bg-secondary-fill-subtle/90',
  accent: 'bg-accent-fill-subtle/90',
}

const expandedRowBackground: Record<TableIntent, string> = {
  neutral: 'bg-neutral-fill-subtle/40',
  primary: 'bg-primary-fill-subtle/40',
  secondary: 'bg-secondary-fill-subtle/40',
  accent: 'bg-accent-fill-subtle/40',
}

export const tableRootCVA = cva('relative overflow-auto', {
  variants: {
    sticky: {
      true: '',
      header: '',
      footer: '',
      false: '',
    } satisfies Record<string, string>,
  },
  defaultVariants: {
    sticky: false,
  },
})

export const tableBaseCVA = cva('w-full caption-bottom border-separate border-spacing-0', {
  variants: {
    size: {
      sm: 'txt-caption',
      md: 'txt-base',
      lg: 'txt-base',
    } satisfies Record<TableSize, string>,
  },
  defaultVariants: {
    size: 'md',
  },
})

export const tableCaptionCVA = cva('mb-2 caption-top', {
  variants: {
    intent: {
      neutral: 'text-neutral-text-subtle',
      primary: 'text-primary-text-subtle',
      secondary: 'text-secondary-text-subtle',
      accent: 'text-accent-text-subtle',
    } satisfies Record<TableIntent, string>,
    size: {
      sm: 'txt-caption',
      md: 'txt-label',
      lg: 'txt-base',
    } satisfies Record<TableSize, string>,
  },
  defaultVariants: {
    intent: 'neutral',
    size: 'md',
  },
})

export const tableTheadCVA = cva('relative', {
  variants: {
    intent: {
      neutral: '',
      primary: '',
      secondary: '',
      accent: '',
    } satisfies Record<TableIntent, string>,
    sticky: {
      true: '',
      header: '',
      footer: '',
      false: '',
    } satisfies Record<string, string>,
    loading: {
      true: 'after:absolute after:inset-x-0 after:top-0 after:z-20 after:h-px',
      false: '',
    } satisfies Record<string, string>,
  },
  compoundVariants: tableIntents.flatMap((intent) => [
    { intent, sticky: true as const, class: stickyHeaderBackground[intent] },
    { intent, sticky: 'header' as const, class: stickyHeaderBackground[intent] },
    { intent, loading: true as const, class: loadingIndicatorBackground[intent] },
  ]),
  defaultVariants: {
    intent: 'neutral',
    sticky: false,
    loading: false,
  },
})

export const tableTbodyCVA = cva('', {
  variants: {
    intent: {
      neutral: '[&>tr[data-selectable=true]:hover]:bg-neutral-fill-subtle/60',
      primary: '[&>tr[data-selectable=true]:hover]:bg-primary-fill-subtle/40',
      secondary: '[&>tr[data-selectable=true]:hover]:bg-secondary-fill-subtle/40',
      accent: '[&>tr[data-selectable=true]:hover]:bg-accent-fill-subtle/40',
    } satisfies Record<TableIntent, string>,
  },
  defaultVariants: {
    intent: 'neutral',
  },
})

export const tableTfootCVA = cva('relative', {
  variants: {
    intent: {
      neutral: '',
      primary: '',
      secondary: '',
      accent: '',
    } satisfies Record<TableIntent, string>,
    sticky: {
      true: '',
      footer: '',
      header: '',
      false: '',
    } satisfies Record<string, string>,
  },
  compoundVariants: tableIntents.flatMap((intent) => [
    { intent, sticky: true as const, class: stickyFooterBackground[intent] },
    { intent, sticky: 'footer' as const, class: stickyFooterBackground[intent] },
  ]),
  defaultVariants: {
    intent: 'neutral',
    sticky: false,
  },
})

export const tableRowCVA = cva('border-b transition-colors', {
  variants: {
    intent: {
      neutral: 'border-neutral-border-subtle',
      primary: 'border-primary-border-subtle',
      secondary: 'border-secondary-border-subtle',
      accent: 'border-accent-border-subtle',
    } satisfies Record<TableIntent, string>,
    selected: {
      true: '',
      false: '',
    },
    pinned: {
      true: '',
      false: '',
    },
    expanded: {
      true: '',
      false: '',
    },
  },
  compoundVariants: tableIntents.flatMap((intent) => [
    { intent, selected: true as const, class: selectedRowBackground[intent] },
    { intent, pinned: true as const, class: pinnedRowBackground[intent] },
    { intent, expanded: true as const, class: expandedRowBackground[intent] },
  ]),
  defaultVariants: {
    intent: 'neutral',
    selected: false,
    pinned: false,
    expanded: false,
  },
})

export const tableHeadCVA = cva(
  'border-b text-left align-middle font-semibold [&:has([role=checkbox])]:pe-0',
  {
    variants: {
      intent: {
        neutral: 'border-neutral-border-subtle text-neutral-text-default',
        primary: 'border-primary-border-subtle text-primary-text-default',
        secondary: 'border-secondary-border-subtle text-secondary-text-default',
        accent: 'border-accent-border-subtle text-accent-text-default',
      } satisfies Record<TableIntent, string>,
      size: {
        sm: 'txt-caption px-2 py-2',
        md: 'txt-label px-4 py-3',
        lg: 'txt-base px-4 py-3.5',
      } satisfies Record<TableSize, string>,
      pinned: {
        true: 'sticky z-20',
        false: '',
      },
    },
    compoundVariants: tableIntents.map((intent) => ({
      intent,
      pinned: true as const,
      class: pinnedHeadBackground[intent],
    })),
    defaultVariants: {
      intent: 'neutral',
      size: 'md',
      pinned: false,
    },
  },
)

export const tableCellCVA = cva('border-b align-middle [&:has([role=checkbox])]:pe-0', {
  variants: {
    intent: {
      neutral: 'border-neutral-border-subtle text-neutral-text-subtle',
      primary: 'border-primary-border-subtle text-primary-text-subtle',
      secondary: 'border-secondary-border-subtle text-secondary-text-subtle',
      accent: 'border-accent-border-subtle text-accent-text-subtle',
    } satisfies Record<TableIntent, string>,
    size: {
      sm: 'txt-caption px-2 py-2',
      md: 'txt-base px-4 py-3',
      lg: 'txt-base px-4 py-3.5',
    } satisfies Record<TableSize, string>,
    pinned: {
      true: 'sticky z-10',
      false: '',
    },
  },
  compoundVariants: tableIntents.map((intent) => ({
    intent,
    pinned: true as const,
    class: pinnedCellBackground[intent],
  })),
  defaultVariants: {
    intent: 'neutral',
    size: 'md',
    pinned: false,
  },
})

export const tableEmptyCVA = cva('py-8 text-center', {
  variants: {
    intent: {
      neutral: 'text-neutral-text-subtle',
      primary: 'text-primary-text-subtle',
      secondary: 'text-secondary-text-subtle',
      accent: 'text-accent-text-subtle',
    } satisfies Record<TableIntent, string>,
    size: {
      sm: 'txt-caption',
      md: 'txt-base',
      lg: 'txt-base',
    } satisfies Record<TableSize, string>,
  },
  defaultVariants: {
    intent: 'neutral',
    size: 'md',
  },
})

export const tableLoadingCVA = cva('py-8 text-center', {
  variants: {
    intent: {
      neutral: 'text-neutral-text-subtle',
      primary: 'text-primary-text-subtle',
      secondary: 'text-secondary-text-subtle',
      accent: 'text-accent-text-subtle',
    } satisfies Record<TableIntent, string>,
    size: {
      sm: 'txt-caption',
      md: 'txt-base',
      lg: 'txt-base',
    } satisfies Record<TableSize, string>,
  },
  defaultVariants: {
    intent: 'neutral',
    size: 'md',
  },
})

export function resolveStickyVariant(
  sticky: TableSticky | undefined,
): boolean | 'header' | 'footer' {
  if (sticky === true) return true
  if (sticky === 'header') return 'header'
  if (sticky === 'footer') return 'footer'
  return false
}
