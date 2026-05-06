import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'

import BoundControl from '~ui/app/components/Form/BoundControl.vue'

const DummyInput = defineComponent({
  props: {
    modelValue: { type: String, default: '' },
    invalid: Boolean,
    error: String,
    name: String,
    extra: String,
  },
  emits: ['update:modelValue', 'blur'],
  setup(props, { emit }) {
    return () =>
      h('input', {
        'data-extra': props.extra,
        value: props.modelValue,
        onInput: (e: Event) => emit('update:modelValue', (e.target as HTMLInputElement).value),
        onBlur: () => emit('blur'),
      })
  },
})

describe('UIFormBoundControl', () => {
  it('merges config props, validation state, and field handlers', async () => {
    const handleChange = vi.fn()
    const handleBlur = vi.fn()

    const wrapper = await mountSuspended(BoundControl, {
      props: {
        fieldName: 'title',
        config: {
          as: DummyInput,
          props: { extra: 'merged' },
        },
        fieldApi: {
          handleChange,
          handleBlur,
        },
        state: {
          value: 'hi',
          meta: { errors: ['bad'] },
        },
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('data-extra')).toBe('merged')
    expect(input.element.value).toBe('hi')

    await input.setValue('yo')
    expect(handleChange).toHaveBeenCalled()

    await input.trigger('blur')
    expect(handleBlur).toHaveBeenCalled()
  })
})
