import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import RadioGroup from '~ui/app/components/Form/RadioGroup.vue'

describe('UIFormRadioGroup', () => {
  const items = [
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
  ]

  it('renders fieldset legend, helper text, and all items', async () => {
    const wrapper = await mountSuspended(RadioGroup, {
      props: {
        modelValue: '1',
        'onUpdate:modelValue': () => {},
        label: 'Pick one',
        helperText: 'Choose an option',
        items,
        name: 'nums',
      },
    })

    expect(wrapper.text()).toContain('Pick one')
    expect(wrapper.text()).toContain('Choose an option')
    expect(wrapper.text()).toContain('One')
    expect(wrapper.text()).toContain('Two')
  })

  it('renders checked state for pre-selected value', async () => {
    const wrapper = await mountSuspended(RadioGroup, {
      props: {
        modelValue: '1',
        'onUpdate:modelValue': () => {},
        label: 'Pick one',
        items,
        name: 'nums',
      },
    })

    const controls = wrapper.findAll('[data-part="item-control"]')
    expect(controls.length).toBe(2)

    const checkedControl = controls.find((c) => c.attributes('data-state') === 'checked')
    expect(checkedControl).toBeDefined()
  })

  it('renders items in a row when orientation is horizontal', async () => {
    const wrapper = await mountSuspended(RadioGroup, {
      props: {
        modelValue: '1',
        'onUpdate:modelValue': () => {},
        label: 'Pick one',
        items,
        orientation: 'horizontal',
      },
    })

    const itemControls = wrapper.findAll('[data-part="item-control"]')
    expect(itemControls.length).toBe(2)
  })

  it('applies invalid styling when error prop is provided', async () => {
    const wrapper = await mountSuspended(RadioGroup, {
      props: {
        modelValue: null,
        'onUpdate:modelValue': () => {},
        label: 'Required radio',
        items,
        error: 'Please select an option',
      },
    })

    expect(wrapper.text()).toContain('Please select an option')
    expect(wrapper.text()).toContain('Required radio')
  })

  it('renders radio items with labels', async () => {
    const wrapper = await mountSuspended(RadioGroup, {
      props: {
        modelValue: '1',
        'onUpdate:modelValue': () => {},
        label: 'Radio items test',
        items,
      },
    })

    expect(wrapper.text()).toContain('One')
    expect(wrapper.text()).toContain('Two')
  })
})
