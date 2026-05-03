import { describe, expect, it } from 'vitest'

import { useForm, useStore } from '../../app/composables/tanstackForm'

describe('tanstackForm', () => {
  it('re-exports useForm from @tanstack/vue-form', () => {
    expect(typeof useForm).toBe('function')
  })

  it('re-exports useStore from @tanstack/vue-form', () => {
    expect(typeof useStore).toBe('function')
  })
})
