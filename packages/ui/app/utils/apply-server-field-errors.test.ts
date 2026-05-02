import { describe, expect, it, vi } from 'vitest'

import { applyServerFieldErrors } from './apply-server-field-errors'

describe('applyServerFieldErrors', () => {
  it('calls setFieldMeta with string message', () => {
    const setFieldMeta = vi.fn((_, updater) => updater({}))
    applyServerFieldErrors({ setFieldMeta }, { email: 'Invalid' })
    expect(setFieldMeta).toHaveBeenCalledWith('email', expect.any(Function))
    const call = setFieldMeta.mock.calls[0]
    if (!call) throw new Error('expected setFieldMeta call')
    const updater = call[1] as (p: unknown) => Record<string, unknown>
    expect(updater({})).toEqual({ errors: ['Invalid'] })
  })

  it('supports string arrays', () => {
    const setFieldMeta = vi.fn((_, updater) => updater({}))
    applyServerFieldErrors({ setFieldMeta }, { email: ['a', 'b'] })
    const call = setFieldMeta.mock.calls[0]
    if (!call) throw new Error('expected setFieldMeta call')
    const updater = call[1] as (p: unknown) => Record<string, unknown>
    expect(updater({})).toEqual({ errors: ['a', 'b'] })
  })

  it('skips undefined entries', () => {
    const setFieldMeta = vi.fn()
    applyServerFieldErrors({ setFieldMeta }, { email: undefined })
    expect(setFieldMeta).not.toHaveBeenCalled()
  })
})
