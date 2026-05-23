import { cva } from 'class-variance-authority'

import type { TreeViewIntent, TreeViewSize } from './context'

export const treeViewRootCVA = cva('flex w-full flex-col gap-2', {
  variants: {
    intent: {
      neutral: 'text-neutral-text-default',
      primary: 'text-primary-text-default',
      secondary: 'text-secondary-text-default',
      accent: 'text-accent-text-default',
    } satisfies Record<TreeViewIntent, string>,
    size: {
      sm: 'max-w-xs txt-caption',
      md: 'max-w-sm txt-label',
      lg: 'max-w-md txt-base',
    } satisfies Record<TreeViewSize, string>,
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
})

export const treeViewLabelCVA = cva('font-medium select-none', {
  variants: {
    intent: {
      neutral: 'text-neutral-text-default',
      primary: 'text-primary-text-default',
      secondary: 'text-secondary-text-default',
      accent: 'text-accent-text-default',
    } satisfies Record<TreeViewIntent, string>,
    size: {
      sm: 'txt-caption',
      md: 'txt-label',
      lg: 'txt-base',
    } satisfies Record<TreeViewSize, string>,
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
})

export const treeViewTreeCVA = cva('flex flex-col outline-none', {
  variants: {
    intent: {
      neutral: '',
      primary: '',
      secondary: '',
      accent: '',
    } satisfies Record<TreeViewIntent, string>,
    size: {
      sm: 'gap-0.5',
      md: 'gap-0.5',
      lg: 'gap-1',
    } satisfies Record<TreeViewSize, string>,
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
})

const treeNodeRowBase = [
  'relative flex w-full items-center gap-2 border-0 bg-transparent text-start select-none',
  'not-data-[disabled]:cursor-pointer data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
  'ps-[calc(0.75rem+1rem*(var(--depth,1)-1))] pe-3 py-1.5',
  'focus-visible:focus-ring',
  'data-[focus]:z-1',
]

const treeNodeSelectedText = {
  neutral: 'data-[selected]:font-medium data-[selected]:text-neutral-text-strong',
  primary: 'data-[selected]:font-medium data-[selected]:text-primary-text-strong',
  secondary: 'data-[selected]:font-medium data-[selected]:text-secondary-text-strong',
  accent: 'data-[selected]:font-medium data-[selected]:text-accent-text-strong',
} satisfies Record<TreeViewIntent, string>

export const treeViewBranchControlCVA = cva(treeNodeRowBase, {
  variants: {
    intent: {
      neutral: `text-neutral-text-default hover:text-neutral-text-strong ${treeNodeSelectedText.neutral}`,
      primary: `text-primary-text-default hover:text-primary-text-strong ${treeNodeSelectedText.primary}`,
      secondary: `text-secondary-text-default hover:text-secondary-text-strong ${treeNodeSelectedText.secondary}`,
      accent: `text-accent-text-default hover:text-accent-text-strong ${treeNodeSelectedText.accent}`,
    } satisfies Record<TreeViewIntent, string>,
    size: {
      sm: 'txt-caption',
      md: 'txt-label',
      lg: 'txt-base',
    } satisfies Record<TreeViewSize, string>,
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
})

export const treeViewItemCVA = cva(treeNodeRowBase, {
  variants: {
    intent: {
      neutral: `text-neutral-text-default hover:text-neutral-text-strong ${treeNodeSelectedText.neutral}`,
      primary: `text-primary-text-default hover:text-primary-text-strong ${treeNodeSelectedText.primary}`,
      secondary: `text-secondary-text-default hover:text-secondary-text-strong ${treeNodeSelectedText.secondary}`,
      accent: `text-accent-text-default hover:text-accent-text-strong ${treeNodeSelectedText.accent}`,
    } satisfies Record<TreeViewIntent, string>,
    size: {
      sm: 'txt-caption',
      md: 'txt-label',
      lg: 'txt-base',
    } satisfies Record<TreeViewSize, string>,
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
})

export const treeViewBranchContentCVA = cva('relative', {
  variants: {
    intent: {
      neutral: '',
      primary: '',
      secondary: '',
      accent: '',
    } satisfies Record<TreeViewIntent, string>,
    size: {
      sm: '',
      md: '',
      lg: '',
    } satisfies Record<TreeViewSize, string>,
  },
})

export const treeViewBranchIndentGuideCVA = cva(
  'absolute top-0 z-1 h-full w-px p-0 left-[calc(0.75rem+1rem*(var(--depth,1)-1)+0.5rem-1px)]',
  {
    variants: {
      intent: {
        neutral: 'bg-neutral-border-subtle',
        primary: 'bg-primary-border-subtle',
        secondary: 'bg-secondary-border-subtle',
        accent: 'bg-accent-border-subtle',
      } satisfies Record<TreeViewIntent, string>,
      size: {
        sm: '',
        md: '',
        lg: '',
      } satisfies Record<TreeViewSize, string>,
    },
  },
)

export const treeViewBranchTriggerCVA = cva('inline-flex shrink-0 items-center justify-center', {
  variants: {
    intent: {
      neutral: '',
      primary: '',
      secondary: '',
      accent: '',
    } satisfies Record<TreeViewIntent, string>,
    size: {
      sm: '',
      md: '',
      lg: '',
    } satisfies Record<TreeViewSize, string>,
  },
})

export const treeViewBranchIndicatorCVA = cva(
  'inline-flex shrink-0 items-center justify-center text-neutral-text-subtle transition-transform duration-150 data-[state=open]:rotate-90',
  {
    variants: {
      intent: {
        neutral: 'text-neutral-text-subtle',
        primary: 'text-primary-text-subtle',
        secondary: 'text-secondary-text-subtle',
        accent: 'text-accent-text-subtle',
      } satisfies Record<TreeViewIntent, string>,
      size: {
        sm: 'size-3.5',
        md: 'size-4',
        lg: 'size-4',
      } satisfies Record<TreeViewSize, string>,
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  },
)

export const treeViewNodeTextCVA = cva('inline-flex min-w-0 flex-1 items-center gap-2 truncate', {
  variants: {
    intent: {
      neutral: '',
      primary: '',
      secondary: '',
      accent: '',
    } satisfies Record<TreeViewIntent, string>,
    size: {
      sm: 'txt-caption',
      md: 'txt-label',
      lg: 'txt-base',
    } satisfies Record<TreeViewSize, string>,
  },
})

export const treeViewNodeRenameInputCVA = cva(
  'min-w-0 flex-1 border border-primary-border-strong bg-neutral-fill-subtle px-1 py-0 txt-label text-primary-text-default outline-none focus-visible:focus-ring',
  {
    variants: {
      intent: {
        neutral: 'border-neutral-border-strong text-neutral-text-default',
        primary: 'border-primary-border-strong text-primary-text-default',
        secondary: 'border-secondary-border-strong text-secondary-text-default',
        accent: 'border-accent-border-strong text-accent-text-default',
      } satisfies Record<TreeViewIntent, string>,
      size: {
        sm: 'txt-caption',
        md: 'txt-label',
        lg: 'txt-base',
      } satisfies Record<TreeViewSize, string>,
    },
  },
)
