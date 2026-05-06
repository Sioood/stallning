import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import CheckboxGroup from '~ui/app/components/Form/CheckboxGroup.vue'

describe('UIFormCheckboxGroup', () => {
  it('renders fieldset legend, items, and binds v-model', async () => {
    const items = [
      { label: 'One', value: '1' },
      { label: 'Two', value: '2' },
    ]

    const wrapper = await mountSuspended(CheckboxGroup, {
      props: {
        modelValue: ['1'],
        'onUpdate:modelValue': () => {},
        label: 'Pick',
        helperText: 'Choose items',
        items,
        name: 'nums',
      },
    })

    expect(wrapper.text()).toContain('Pick')
    expect(wrapper.text()).toContain('Choose items')
    expect(wrapper.text()).toContain('One')
    expect(wrapper.text()).toContain('Two')
  })
})
