import { cva } from 'class-variance-authority'

import type { DatePickerIntent, DatePickerSize } from './context'

export const datePickerRootCVA = cva('flex w-full flex-col gap-1')

export const datePickerLabelCVA = cva('block', {
  variants: {
    intent: {
      accent:
        'text-accent-text-subtle data-[disabled]:opacity-50 data-[invalid]:text-error-text-default',
      neutral:
        'text-neutral-text-subtle data-[disabled]:opacity-50 data-[invalid]:text-error-text-default',
      primary:
        'text-primary-text-subtle data-[disabled]:opacity-50 data-[invalid]:text-error-text-default',
      secondary:
        'text-secondary-text-subtle data-[disabled]:opacity-50 data-[invalid]:text-error-text-default',
    } satisfies Record<DatePickerIntent, string>,
    size: {
      lg: 'txt-label mb-1.5',
      md: 'txt-caption mb-1',
      sm: 'txt-caption mb-1',
    } satisfies Record<DatePickerSize, string>,
  },
})

export const datePickerControlCVA = cva('flex w-full min-w-0 items-stretch gap-0')

export const datePickerInputCVA = cva(
  'txt-base min-w-0 flex-1 border-0 bg-transparent outline-none',
  {
    variants: {
      intent: {
        accent:
          'text-accent-text-default placeholder:text-accent-text-subtle disabled:text-accent-text-default-disabled',
        neutral:
          'text-neutral-text-default placeholder:text-neutral-text-subtle disabled:text-neutral-text-default-disabled',
        primary:
          'text-primary-text-default placeholder:text-primary-text-subtle disabled:text-primary-text-default-disabled',
        secondary:
          'text-secondary-text-default placeholder:text-secondary-text-subtle disabled:text-secondary-text-default-disabled',
      } satisfies Record<DatePickerIntent, string>,
      size: {
        lg: 'px-3 py-1.5',
        md: 'px-2 py-1',
        sm: 'px-1.5 py-0.5',
      } satisfies Record<DatePickerSize, string>,
    },
  },
)

export const datePickerTriggerCVA = cva(
  'inline-flex shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent outline-none disabled:cursor-not-allowed',
  {
    variants: {
      intent: {
        accent:
          'text-accent-text-subtle hover:text-accent-text-default disabled:text-accent-text-default-disabled',
        neutral:
          'text-neutral-text-subtle hover:text-neutral-text-default disabled:text-neutral-text-default-disabled',
        primary:
          'text-primary-text-subtle hover:text-primary-text-default disabled:text-primary-text-default-disabled',
        secondary:
          'text-secondary-text-subtle hover:text-secondary-text-default disabled:text-secondary-text-default-disabled',
      } satisfies Record<DatePickerIntent, string>,
      size: {
        lg: 'size-9',
        md: 'size-8',
        sm: 'size-7',
      } satisfies Record<DatePickerSize, string>,
    },
  },
)

export const datePickerClearTriggerCVA = cva(
  'inline-flex shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent outline-none hover:text-error-text-default-hover data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
  {
    variants: {
      size: {
        lg: 'size-9',
        md: 'size-8',
        sm: 'size-7',
      } satisfies Record<DatePickerSize, string>,
    },
  },
)

export const datePickerPositionerCVA = cva('origin-(--transform-origin)')

export const datePickerContentCVA = cva(
  [
    'flex flex-col gap-3 border p-3 shadow-md outline-none',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
    'data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95',
    'min-w-[17.5rem]',
  ],
  {
    variants: {
      intent: {
        accent: 'border-accent-border-subtle bg-accent-fill-subtle text-accent-text-default',
        neutral: 'border-neutral-border-subtle bg-neutral-fill-subtle text-neutral-text-default',
        primary: 'border-primary-border-subtle bg-primary-fill-subtle text-primary-text-default',
        secondary:
          'border-secondary-border-subtle bg-secondary-fill-subtle text-secondary-text-default',
      } satisfies Record<DatePickerIntent, string>,
    },
  },
)

export const datePickerViewCVA = cva('flex flex-col gap-3 data-[hidden]:hidden')

export const datePickerViewControlCVA = cva('flex min-h-8 items-stretch justify-between gap-2')

export const datePickerRangeTextCVA = cva('txt-label font-semibold', {
  variants: {
    intent: {
      accent: 'text-accent-text-default',
      neutral: 'text-neutral-text-default',
      primary: 'text-primary-text-default',
      secondary: 'text-secondary-text-default',
    } satisfies Record<DatePickerIntent, string>,
  },
})

export const datePickerSelectCVA = cva(
  'txt-caption h-8 border bg-transparent px-2 outline-none focus-visible:focus-ring',
  {
    variants: {
      intent: {
        accent: 'border-accent-border-default text-neutral-text-default',
        neutral: 'border-neutral-border-default text-neutral-text-default',
        primary: 'border-primary-border-default text-neutral-text-default',
        secondary: 'border-secondary-border-default text-neutral-text-default',
      } satisfies Record<DatePickerIntent, string>,
    },
  },
)

export const datePickerTableCVA = cva('w-full border-collapse border-spacing-0')

export const datePickerTableHeaderCVA = cva(
  'txt-caption px-0 py-2 text-center font-medium tracking-wide uppercase',
  {
    variants: {
      intent: {
        accent: 'text-accent-text-subtle',
        neutral: 'text-neutral-text-subtle',
        primary: 'text-primary-text-subtle',
        secondary: 'text-secondary-text-subtle',
      } satisfies Record<DatePickerIntent, string>,
    },
  },
)

export const datePickerTableCellCVA = cva('p-0 text-center')

const dayCellIntentClasses = {
  accent:
    'text-accent-text-default hover:data-[disabled=false]:data-[selected=false]:data-[unavailable=false]:bg-accent-fill-subtle-hover data-[today]:font-semibold data-[today]:text-accent-text-default data-[selected]:bg-accent-fill-default data-[selected]:text-accent-text-inverse data-[in-range]:bg-accent-fill-subtle data-[range-start]:bg-accent-fill-default data-[range-start]:text-accent-text-inverse data-[range-end]:bg-accent-fill-default data-[range-end]:text-accent-text-inverse data-[outside-range]:text-accent-text-subtle data-[outside-range]:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40 data-[unavailable]:cursor-not-allowed data-[unavailable]:line-through data-[unavailable]:opacity-40',
  neutral:
    'text-neutral-text-default hover:data-[disabled=false]:data-[selected=false]:data-[unavailable=false]:bg-neutral-fill-subtle-hover data-[today]:font-semibold data-[today]:text-neutral-text-default data-[selected]:bg-neutral-fill-default data-[selected]:text-neutral-text-inverse data-[in-range]:bg-neutral-fill-subtle data-[range-start]:bg-neutral-fill-default data-[range-start]:text-neutral-text-inverse data-[range-end]:bg-neutral-fill-default data-[range-end]:text-neutral-text-inverse data-[outside-range]:text-neutral-text-subtle data-[outside-range]:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40 data-[unavailable]:cursor-not-allowed data-[unavailable]:line-through data-[unavailable]:opacity-40',
  primary:
    'text-primary-text-default hover:data-[disabled=false]:data-[selected=false]:data-[unavailable=false]:bg-primary-fill-subtle-hover data-[today]:font-semibold data-[today]:text-primary-text-default data-[selected]:bg-primary-fill-default data-[selected]:text-primary-text-inverse data-[in-range]:bg-primary-fill-subtle data-[range-start]:bg-primary-fill-default data-[range-start]:text-primary-text-inverse data-[range-end]:bg-primary-fill-default data-[range-end]:text-primary-text-inverse data-[outside-range]:text-primary-text-subtle data-[outside-range]:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40 data-[unavailable]:cursor-not-allowed data-[unavailable]:line-through data-[unavailable]:opacity-40',
  secondary:
    'text-secondary-text-default hover:data-[disabled=false]:data-[selected=false]:data-[unavailable=false]:bg-secondary-fill-subtle-hover data-[today]:font-semibold data-[today]:text-secondary-text-default data-[selected]:bg-secondary-fill-default data-[selected]:text-secondary-text-inverse data-[in-range]:bg-secondary-fill-subtle data-[range-start]:bg-secondary-fill-default data-[range-start]:text-secondary-text-inverse data-[range-end]:bg-secondary-fill-default data-[range-end]:text-secondary-text-inverse data-[outside-range]:text-secondary-text-subtle data-[outside-range]:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40 data-[unavailable]:cursor-not-allowed data-[unavailable]:line-through data-[unavailable]:opacity-40',
} satisfies Record<DatePickerIntent, string>

export const datePickerDayCellTriggerCVA = cva(
  'txt-label inline-flex size-10 cursor-pointer items-center justify-center border-0 bg-transparent outline-none select-none focus-visible:focus-ring data-[focus]:focus-ring',
  {
    variants: {
      intent: dayCellIntentClasses,
    },
  },
)

export const datePickerMonthCellTriggerCVA = cva(
  'txt-label inline-flex h-10 w-full cursor-pointer items-center justify-center border-0 bg-transparent px-2 outline-none select-none focus-visible:focus-ring data-[focus]:focus-ring data-[outside-range]:invisible',
  {
    variants: {
      intent: dayCellIntentClasses,
    },
  },
)

export const datePickerYearCellTriggerCVA = cva(
  'txt-label inline-flex h-10 w-full cursor-pointer items-center justify-center border-0 bg-transparent px-2 outline-none select-none focus-visible:focus-ring data-[focus]:focus-ring data-[outside-range]:invisible',
  {
    variants: {
      intent: dayCellIntentClasses,
    },
  },
)

export const datePickerWeekNumberHeaderCellCVA = cva(
  'txt-caption w-8 px-0 py-2 text-center font-medium tracking-wide uppercase',
  {
    variants: {
      intent: {
        accent: 'bg-accent-fill-subtle text-accent-text-subtle',
        neutral: 'bg-neutral-fill-subtle text-neutral-text-subtle',
        primary: 'bg-primary-fill-subtle text-primary-text-subtle',
        secondary: 'bg-secondary-fill-subtle text-secondary-text-subtle',
      } satisfies Record<DatePickerIntent, string>,
    },
  },
)

export const datePickerWeekNumberCellCVA = cva('txt-caption w-8 p-0 text-center', {
  variants: {
    intent: {
      accent: 'bg-accent-fill-subtle text-accent-text-subtle',
      neutral: 'bg-neutral-fill-subtle text-neutral-text-subtle',
      primary: 'bg-primary-fill-subtle text-primary-text-subtle',
      secondary: 'bg-secondary-fill-subtle text-secondary-text-subtle',
    } satisfies Record<DatePickerIntent, string>,
  },
})

export const datePickerPresetTriggerCVA = cva(
  'txt-caption inline-flex cursor-pointer items-center justify-center border px-3 py-1.5 outline-none focus-visible:focus-ring data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
  {
    variants: {
      intent: {
        accent:
          'border-accent-border-default text-accent-text-default hover:bg-accent-fill-subtle-hover',
        neutral:
          'border-neutral-border-default text-neutral-text-default hover:bg-neutral-fill-subtle-hover',
        primary:
          'border-primary-border-default text-primary-text-default hover:bg-primary-fill-subtle-hover',
        secondary:
          'border-secondary-border-default text-secondary-text-default hover:bg-secondary-fill-subtle-hover',
      } satisfies Record<DatePickerIntent, string>,
    },
  },
)

export const datePickerPresetGroupCVA = cva('flex flex-wrap gap-2')

export const datePickerSelectedDatesCVA = cva(
  'flex min-h-10 min-w-0 flex-1 flex-wrap items-center gap-1.5 border px-2 py-1',
  {
    variants: {
      intent: {
        accent: 'border-accent-border-default bg-accent-fill-subtle',
        neutral: 'border-neutral-border-default bg-neutral-fill-subtle',
        primary: 'border-primary-border-default bg-primary-fill-subtle',
        secondary: 'border-secondary-border-default bg-secondary-fill-subtle',
      } satisfies Record<DatePickerIntent, string>,
    },
  },
)

export const datePickerTimeInputCVA = cva(
  'txt-base mt-2 h-10 w-full border bg-transparent px-3 outline-none focus-visible:focus-ring',
  {
    variants: {
      intent: {
        accent: 'border-accent-border-default text-neutral-text-default',
        neutral: 'border-neutral-border-default text-neutral-text-default',
        primary: 'border-primary-border-default text-neutral-text-default',
        secondary: 'border-secondary-border-default text-neutral-text-default',
      } satisfies Record<DatePickerIntent, string>,
    },
  },
)

export const datePickerIconSizeCVA = cva('shrink-0', {
  variants: {
    size: {
      lg: 'size-4',
      md: 'size-3.5',
      sm: 'size-3',
    } satisfies Record<DatePickerSize, string>,
  },
})

export const datePickerMultipleMonthsCVA = cva('flex gap-4')
