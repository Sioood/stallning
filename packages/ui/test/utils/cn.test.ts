import { cva } from 'class-variance-authority'
import { describe, expect, it } from 'vitest'

import { cn } from '../../app/utils/cn'

const padded = cva('block', {
  variants: {
    size: {
      sm: 'p-2',
      md: 'p-4',
    },
  },
  defaultVariants: { size: 'sm' },
})

describe('cn', () => {
  it('merges conflicting Tailwind utilities with last argument winning', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })

  it('merges CVA output with overrides', () => {
    const base = padded({ size: 'sm' })
    expect(cn(base, 'p-4')).toBe('block p-4')
  })

  it('normalizes Vue class values', () => {
    expect(cn(['foo', 'bar'], { baz: true, qux: false })).toBe('foo bar baz')
  })

  it('returns empty string when no classes', () => {
    expect(cn()).toBe('')
  })
})
