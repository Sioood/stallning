import { describe, expect, it } from 'vitest'

import { coerceStringArrayValue } from '~ui/app/utils/Components/Form/coerce-string-array-value'

describe('coerceStringArrayValue', () => {
  it('returns [] for nullish values', () => {
    expect(coerceStringArrayValue(null)).toEqual([])
    expect(coerceStringArrayValue(undefined)).toEqual([])
  })

  it('wraps a non-empty string', () => {
    expect(coerceStringArrayValue('react')).toEqual(['react'])
    expect(coerceStringArrayValue('')).toEqual([])
  })

  it('passes through string arrays and filters non-strings', () => {
    expect(coerceStringArrayValue(['a', 'b'])).toEqual(['a', 'b'])
    expect(coerceStringArrayValue(['a', 1, null])).toEqual(['a'])
  })

  it('returns [] for unsupported types', () => {
    expect(coerceStringArrayValue(42)).toEqual([])
    expect(coerceStringArrayValue({})).toEqual([])
  })
})
