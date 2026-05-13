import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import Checkbox from '~ui/app/components/Form/Checkbox.vue'

describe('UIFormCheckbox', () => {
  it('renders label and hidden input with name', async () => {
    const wrapper = await mountSuspended(Checkbox, {
      props: {
        label: 'Accept terms',
        name: 'terms',
      },
    })

    expect(wrapper.text()).toContain('Accept terms')
    const hidden = wrapper.find('input[type="checkbox"]')
    expect(hidden.exists()).toBe(true)
    expect(hidden.attributes('name')).toBe('terms')
  })

  it('reflects checked state from modelValue', async () => {
    const wrapperChecked = await mountSuspended(Checkbox, {
      props: {
        label: 'Opt in',
        name: 'opt',
        modelValue: true,
      },
    })

    expect(
      wrapperChecked.find('[data-scope="checkbox"][data-part="root"]').attributes('data-state'),
    ).toBe('checked')

    const wrapperUnchecked = await mountSuspended(Checkbox, {
      props: {
        label: 'Opt out',
        name: 'opt2',
        modelValue: false,
      },
    })

    expect(
      wrapperUnchecked.find('[data-scope="checkbox"][data-part="root"]').attributes('data-state'),
    ).toBe('unchecked')
  })

  it('emits update:modelValue when toggled', async () => {
    const onUpdateModelValue = vi.fn()
    const wrapper = await mountSuspended(Checkbox, {
      props: {
        label: 'Subscribe',
        name: 'sub',
        modelValue: false,
        'onUpdate:modelValue': onUpdateModelValue,
      },
    })

    await wrapper.find('input[type="checkbox"]').trigger('click')
    await flushPromises()

    expect(onUpdateModelValue).toHaveBeenCalledWith(true)
  })

  it('shows required indicator when required', async () => {
    const wrapper = await mountSuspended(Checkbox, {
      props: {
        label: 'Required box',
        name: 'req',
        required: true,
      },
    })

    expect(wrapper.text()).toContain('*')
  })
})
