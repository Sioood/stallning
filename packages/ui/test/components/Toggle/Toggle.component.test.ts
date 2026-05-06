import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Toggle from '~ui/app/components/Toggle/index.vue'

describe('Toggle', () => {
  it('shows the off slot when not pressed', async () => {
    const wrapper = await mountSuspended(Toggle, {
      props: { pressed: false },
      slots: {
        on: 'On',
        off: 'Off',
      },
    })

    expect(wrapper.text()).toContain('Off')
    expect(wrapper.text()).not.toContain('On')
  })

  it('shows the on slot when pressed', async () => {
    const wrapper = await mountSuspended(Toggle, {
      props: { pressed: true },
      slots: {
        on: 'On',
        off: 'Off',
      },
    })

    expect(wrapper.text()).toContain('On')
    expect(wrapper.text()).not.toContain('Off')
  })
})
