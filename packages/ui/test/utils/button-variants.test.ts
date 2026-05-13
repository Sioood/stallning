import { describe, expect, it } from 'vitest'

import { buttonVariants as button, togglePressedOn } from '../../app/utils/button-variants'

describe('buttonVariants', () => {
  it('returns base classes', () => {
    const result = button({ variant: 'default', intent: 'primary', size: 'md', disabled: false })
    expect(result).toContain('inline-flex')
    expect(result).toContain('justify-center')
  })

  it('applies ghost variant base classes', () => {
    const result = button({ variant: 'ghost', intent: 'primary' })
    expect(result).toContain('border-transparent')
  })

  it('applies size classes', () => {
    const sm = button({ size: 'sm' })
    expect(sm).toContain('txt-caption')
    expect(sm).toContain('px-2')

    const md = button({ size: 'md' })
    expect(md).toContain('txt-base')
    expect(md).toContain('px-4')

    const lg = button({ size: 'lg' })
    expect(lg).toContain('txt-h6')
    expect(lg).toContain('px-5')
  })

  it('applies disabled state classes', () => {
    const disabled = button({ disabled: true })
    expect(disabled).toContain('cursor-not-allowed')

    const enabled = button({ disabled: false })
    expect(enabled).toContain('cursor-pointer')
  })

  it('generates compound variant for default + primary intent', () => {
    const result = button({ variant: 'default', intent: 'primary' })
    expect(result).toContain('bg-primary-fill-default')
    expect(result).toContain('border-primary-border-default')
    expect(result).toContain('text-primary-text-inverse')
  })

  it('generates compound variant for subtle + error intent', () => {
    const result = button({ variant: 'subtle', intent: 'error' })
    expect(result).toContain('bg-error-fill-subtle')
    expect(result).toContain('border-error-border-subtle')
    expect(result).toContain('text-error-text-subtle')
  })

  it('generates compound variant for ghost + accent intent', () => {
    const result = button({ variant: 'ghost', intent: 'accent' })
    expect(result).toContain('bg-transparent')
    expect(result).toContain('text-accent-text-subtle')
  })
})

describe('togglePressedOn', () => {
  it('applies pressed state classes for default + primary', () => {
    const result = togglePressedOn({ variant: 'default', intent: 'primary' })
    expect(result).toContain('data-[state=on]:bg-primary-fill-default-active')
    expect(result).toContain('data-[state=on]:border-primary-border-default-active')
  })

  it('applies pressed state classes for ghost + success', () => {
    const result = togglePressedOn({ variant: 'ghost', intent: 'success' })
    expect(result).toContain('data-[state=on]:bg-success-fill-subtle-active')
  })
})
