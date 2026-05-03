import { describe, expect, it, vi } from 'vitest'

import { applyServerFieldErrors } from '../../app/utils/apply-server-field-errors'

const getUpdater = (spy: ReturnType<typeof vi.fn>, callIndex = 0) => {
  const call = spy.mock.calls[callIndex]
  if (!call) throw new Error('expected setFieldMeta call')
  return call[1] as (p: unknown) => Record<string, unknown>
}

describe('applyServerFieldErrors', () => {
  it('calls setFieldMeta with string message', () => {
    const setFieldMeta = vi.fn((_, updater) => updater({}))
    applyServerFieldErrors({ setFieldMeta }, { email: 'Invalid' })
    expect(setFieldMeta).toHaveBeenCalledWith('email', expect.any(Function))
    expect(getUpdater(setFieldMeta)({})).toEqual({ errors: ['Invalid'] })
  })

  it('supports string arrays', () => {
    const setFieldMeta = vi.fn((_, updater) => updater({}))
    applyServerFieldErrors({ setFieldMeta }, { email: ['a', 'b'] })
    expect(getUpdater(setFieldMeta)({})).toEqual({ errors: ['a', 'b'] })
  })

  it('skips undefined entries', () => {
    const setFieldMeta = vi.fn()
    applyServerFieldErrors({ setFieldMeta }, { email: undefined })
    expect(setFieldMeta).not.toHaveBeenCalled()
  })
})
