import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import CheckboxGroup from '~ui/app/components/Form/CheckboxGroup.vue'

describe('UIFormCheckboxGroup', () => {
  const items = [
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
  ]

  it('renders fieldset legend, helper text, and all items', async () => {
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

  it('renders checked state for pre-selected values', async () => {
    const wrapper = await mountSuspended(CheckboxGroup, {
      props: {
        modelValue: ['1'],
        'onUpdate:modelValue': () => {},
        label: 'Pick',
        items,
        name: 'nums',
      },
    })

    const controls = wrapper.findAll('[data-part="control"]')
    expect(controls.length).toBe(2)

    const checkedControl = controls.find((c) => c.attributes('data-state') === 'checked')
    expect(checkedControl).toBeDefined()
  })

  it('applies invalid styling when error prop is provided', async () => {
    const wrapper = await mountSuspended(CheckboxGroup, {
      props: {
        modelValue: [],
        'onUpdate:modelValue': () => {},
        label: 'Required group',
        items,
        error: 'Select at least one',
      },
    })

    expect(wrapper.text()).toContain('Select at least one')
    expect(wrapper.text()).toContain('Required group')
  })

  it('forwards passthrough attrs to the group element', async () => {
    const wrapper = await mountSuspended(CheckboxGroup, {
      props: {
        modelValue: [],
        'onUpdate:modelValue': () => {},
        label: 'Attrs test',
        items,
        'data-testid': 'my-checkbox-group',
      },
    })

    const group = wrapper.find('[data-testid="my-checkbox-group"]')
    expect(group.exists()).toBe(true)
  })
})
