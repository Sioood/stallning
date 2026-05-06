import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Input from '~ui/app/components/Form/Input.vue'

describe('UIFormInput', () => {
  it('renders a text input with label and placeholder', async () => {
    const wrapper = await mountSuspended(Input, {
      props: {
        label: 'Name',
        name: 'name',
        placeholder: 'Jane',
      },
    })

    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('Jane')
    expect(wrapper.text()).toContain('Name')
  })

  it('toggles password field visibility', async () => {
    const wrapper = await mountSuspended(Input, {
      props: {
        label: 'Password',
        name: 'password',
        type: 'password',
      },
    })

    expect(wrapper.find('input').attributes('type')).toBe('password')

    const toggle = wrapper.find('button[aria-label="Show password"]')
    expect(toggle.exists()).toBe(true)
    await toggle.trigger('click')

    expect(wrapper.find('input').attributes('type')).toBe('text')
  })
})
