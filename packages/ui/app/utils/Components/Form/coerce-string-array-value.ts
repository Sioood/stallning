/** Normalize bound model values for Ark select/combobox (expects string[]). */
export function coerceStringArrayValue(value: unknown): string[] {
  if (value === null || value === undefined) {
    return []
  }
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string')
  }
  if (typeof value === 'string') {
    return value === '' ? [] : [value]
  }
  return []
}
