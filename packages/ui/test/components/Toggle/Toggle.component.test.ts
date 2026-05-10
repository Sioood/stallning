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

  it('emits update:pressed when clicked', async () => {
    const wrapper = await mountSuspended(Toggle, {
      props: { pressed: false },
      slots: { on: 'On', off: 'Off' },
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:pressed')?.[0]?.[0]).toBe(true)
  })

  it('does not emit when disabled', async () => {
    const wrapper = await mountSuspended(Toggle, {
      props: { pressed: false, disabled: true },
      slots: { on: 'On', off: 'Off' },
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:pressed')).toBeUndefined()
  })

  it('applies variant and intent classes to root button', async () => {
    const wrapper = await mountSuspended(Toggle, {
      props: { pressed: false, variant: 'subtle', intent: 'accent' },
      slots: { on: 'On', off: 'Off' },
    })

    const classes = wrapper.find('button').classes().join(' ')
    expect(classes).toMatch(/bg-accent-fill-subtle/)
  })

  it('applies iconOnly compact padding when set', async () => {
    const wrapper = await mountSuspended(Toggle, {
      props: { pressed: false, iconOnly: true },
      slots: { on: 'On', off: 'Off' },
    })

    const classes = wrapper.find('button').classes().join(' ')
    expect(classes).toContain('px-1.5')
  })

  it('applies activeBackground pressed-on styles when pressed and activeBackground is true', async () => {
    const wrapper = await mountSuspended(Toggle, {
      props: { pressed: true, activeBackground: true, intent: 'primary', variant: 'default' },
      slots: { on: 'On', off: 'Off' },
    })

    const classes = wrapper.find('button').classes().join(' ')
    expect(classes).toMatch(/data-\[state=on\]/)
  })

  it('renders as a button element with type button', async () => {
    const wrapper = await mountSuspended(Toggle, {
      props: { pressed: false },
      slots: { on: 'On', off: 'Off' },
    })

    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.attributes('type')).toBe('button')
  })
})
