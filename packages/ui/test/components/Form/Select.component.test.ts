import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import UIFormSelect from '~ui/app/components/Form/Select/index.vue'

const items = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
]

describe('UIFormSelect', () => {
  it('renders the label and placeholder', async () => {
    const wrapper = await mountSuspended(UIFormSelect, {
      props: {
        label: 'Select an option',
        placeholder: 'Pick one',
        items,
      },
    })

    expect(wrapper.text()).toContain('Select an option')
    expect(wrapper.text()).toContain('Pick one')
  })

  it('renders items when open', async () => {
    const wrapper = await mountSuspended(UIFormSelect, {
      props: {
        items,
        portalled: false,
      },
    })

    await wrapper.find('button[data-part="trigger"]').trigger('click')
    await flushPromises()

    for (const item of items) {
      expect(wrapper.text()).toContain(item.label)
    }
  })

  it('emits update:modelValue when an item is selected', async () => {
    const onUpdateModelValue = vi.fn()
    const wrapper = await mountSuspended(UIFormSelect, {
      props: {
        items,
        portalled: false,
        'onUpdate:modelValue': onUpdateModelValue,
      },
    })

    await wrapper.find('button[data-part="trigger"]').trigger('click')
    await flushPromises()

    // Find the first item and click it
    const firstItem = wrapper.find('[data-part="item"][data-value="1"]')
    await firstItem.trigger('click')
    await flushPromises()

    expect(onUpdateModelValue).toHaveBeenCalledWith(['1'])
  })

  it('handles multiple selection', async () => {
    const onUpdateModelValue = vi.fn()
    const wrapper = await mountSuspended(UIFormSelect, {
      props: {
        items,
        multiple: true,
        portalled: false,
        modelValue: ['1'],
        'onUpdate:modelValue': onUpdateModelValue,
      },
    })

    await wrapper.find('button[data-part="trigger"]').trigger('click')
    await flushPromises()

    const secondItem = wrapper.find('[data-part="item"][data-value="2"]')
    await secondItem.trigger('click')
    await flushPromises()

    expect(onUpdateModelValue).toHaveBeenCalledWith(['1', '2'])
  })

  it('shows loading state', async () => {
    const wrapper = await mountSuspended(UIFormSelect, {
      props: {
        loading: true,
        loadingText: 'Loading items...',
        portalled: false,
      },
    })

    await wrapper.find('button[data-part="trigger"]').trigger('click')
    await flushPromises()

    expect(wrapper.text()).toContain('Loading items...')
  })

  it('shows empty state', async () => {
    const wrapper = await mountSuspended(UIFormSelect, {
      props: {
        items: [],
        emptyText: 'No results found',
        portalled: false,
      },
    })

    await wrapper.find('button[data-part="trigger"]').trigger('click')
    await flushPromises()

    expect(wrapper.text()).toContain('No results found')
  })

  it('clears selection when clear button is clicked', async () => {
    const onUpdateModelValue = vi.fn()
    const wrapper = await mountSuspended(UIFormSelect, {
      props: {
        items,
        modelValue: ['1'],
        showClear: true,
        'onUpdate:modelValue': onUpdateModelValue,
      },
    })

    const clearButton = wrapper.find('[data-part="clear-trigger"]')
    expect(clearButton.exists()).toBe(true)

    await clearButton.trigger('click')
    await flushPromises()

    expect(onUpdateModelValue).toHaveBeenCalledWith([])
  })
})
