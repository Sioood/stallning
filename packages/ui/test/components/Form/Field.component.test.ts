import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Field from '../../../app/components/Form/Field.vue'

describe('UIFormField', () => {
  it('shows label, required indicator, and helper text', async () => {
    const wrapper = await mountSuspended(Field, {
      props: {
        label: 'Email',
        required: true,
        helperText: 'We never share your email',
        invalid: false,
      },
      slots: {
        default: '<input type="text" />',
      },
    })

    expect(wrapper.text()).toContain('Email')
    expect(wrapper.text()).toContain('*')
    expect(wrapper.text()).toContain('We never share your email')
  })

  it('shows error message when invalid', async () => {
    const wrapper = await mountSuspended(Field, {
      props: {
        label: 'Email',
        invalid: true,
        error: 'Required',
      },
      slots: {
        default: '<input />',
      },
    })

    expect(wrapper.text()).toContain('Required')
  })
})
