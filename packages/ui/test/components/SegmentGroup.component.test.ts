import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import UISegmentGroup from '~ui/app/components/SegmentGroup/index.vue'

describe('UISegmentGroup', () => {
  it('renders the correct number of items from options prop', async () => {
    const wrapper = await mountSuspended(UISegmentGroup, {
      props: {
        options: [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
          { value: 'c', label: 'C' },
        ],
      },
    })

    const items = wrapper.findAll('[data-part="item"]')
    expect(items).toHaveLength(3)
  })

  it('renders item labels correctly', async () => {
    const wrapper = await mountSuspended(UISegmentGroup, {
      props: {
        options: [
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue' },
        ],
      },
    })

    expect(wrapper.text()).toContain('React')
    expect(wrapper.text()).toContain('Vue')
  })

  it('sets the initial modelValue as selected', async () => {
    const wrapper = await mountSuspended(UISegmentGroup, {
      props: {
        options: [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ],
        modelValue: 'b',
      },
    })

    const items = wrapper.findAll('[data-part="item"]')
    expect(items[1]!.attributes('data-state')).toBe('checked')
  })

  it('renders the indicator element', async () => {
    const wrapper = await mountSuspended(UISegmentGroup, {
      props: {
        options: [{ value: 'a', label: 'A' }],
        modelValue: 'a',
      },
    })

    const indicator = wrapper.find('[data-part="indicator"]')
    expect(indicator.exists()).toBe(true)
  })

  it('applies intent classes to root', async () => {
    const wrapper = await mountSuspended(UISegmentGroup, {
      props: {
        options: [{ value: 'a', label: 'A' }],
        intent: 'accent',
      },
    })

    expect(wrapper.html()).toContain('border-accent-border-subtle')
    expect(wrapper.html()).toContain('bg-accent-fill-default')
  })

  it('applies size classes to root', async () => {
    const wrapper = await mountSuspended(UISegmentGroup, {
      props: {
        options: [{ value: 'a', label: 'A' }],
        size: 'lg',
      },
    })

    expect(wrapper.html()).toContain('gap-1.5')
    expect(wrapper.html()).toContain('p-1.5')
  })

  it('renders without crashing when group is disabled', async () => {
    const wrapper = await mountSuspended(UISegmentGroup, {
      props: {
        options: [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ],
        disabled: true,
      },
    })

    const items = wrapper.findAll('[data-part="item"]')
    expect(items).toHaveLength(2)
  })

  it('renders items with disabled option', async () => {
    const wrapper = await mountSuspended(UISegmentGroup, {
      props: {
        options: [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B', disabled: true },
        ],
      },
    })

    const items = wrapper.findAll('[data-part="item"]')
    expect(items).toHaveLength(2)
    expect(wrapper.text()).toContain('A')
    expect(wrapper.text()).toContain('B')
  })

  it('uses value prop as fallback for label', async () => {
    const wrapper = await mountSuspended(UISegmentGroup, {
      props: {
        options: [{ value: 'fallback-label' }],
      },
    })

    expect(wrapper.text()).toContain('fallback-label')
  })
})
