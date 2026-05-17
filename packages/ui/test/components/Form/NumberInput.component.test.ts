import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { defineComponent, ref } from 'vue'

import NumberInput from '~ui/app/components/Form/NumberInput.vue'

describe('UIFormNumberInput', () => {
  it('renders with label', async () => {
    const wrapper = await mountSuspended(NumberInput, {
      props: {
        label: 'Quantity',
        min: 0,
        max: 100,
      },
    })

    expect(wrapper.text()).toContain('Quantity')
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('renders with default value', async () => {
    const wrapper = await mountSuspended(NumberInput, {
      props: {
        label: 'Age',
        defaultValue: '25',
        min: 0,
        max: 100,
      },
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('25')
  })

  it('shows increment and decrement buttons', async () => {
    const wrapper = await mountSuspended(NumberInput, {
      props: {
        label: 'Count',
        min: 0,
        max: 100,
      },
    })

    const buttons = wrapper.findAll('button')
    // Should have at least 2 buttons (decrement and increment)
    expect(buttons.length).toBeGreaterThanOrEqual(2)
  })

  it('renders with helper text', async () => {
    const wrapper = await mountSuspended(NumberInput, {
      props: {
        label: 'Score',
        helperText: 'Between 0 and 100',
        min: 0,
        max: 100,
      },
    })

    expect(wrapper.text()).toContain('Between 0 and 100')
  })

  it('renders as disabled', async () => {
    const wrapper = await mountSuspended(NumberInput, {
      props: {
        label: 'Disabled',
        disabled: true,
        min: 0,
        max: 100,
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('disabled')).toBeDefined()
  })

  it('renders as read-only', async () => {
    const wrapper = await mountSuspended(NumberInput, {
      props: {
        label: 'Read-only',
        readOnly: true,
        min: 0,
        max: 100,
        defaultValue: '42',
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('readonly')).toBeDefined()
  })

  it('renders with error message', async () => {
    const wrapper = await mountSuspended(NumberInput, {
      props: {
        label: 'Invalid',
        invalid: true,
        error: 'Must be between 0 and 100',
        min: 0,
        max: 100,
      },
    })

    expect(wrapper.text()).toContain('Must be between 0 and 100')
  })

  it('renders with leading icon span', async () => {
    const wrapper = await mountSuspended(NumberInput, {
      props: {
        label: 'With icon',
        leading: true,
        leadingIcon: 'tabler:coins',
        min: 0,
        max: 100,
      },
    })

    // The icon renders inside an aria-hidden span
    const leadingSpan = wrapper.find('span[aria-hidden="true"]')
    expect(leadingSpan.exists()).toBe(true)
  })

  it('renders an input that accepts focus', async () => {
    const wrapper = await mountSuspended(NumberInput, {
      props: {
        label: 'Focusable',
        min: 0,
        max: 100,
      },
      attachTo: document.body,
    })

    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    // Input is focusable (not disabled or read-only)
    expect(input.attributes('disabled')).toBeUndefined()
    expect(input.attributes('readonly')).toBeUndefined()
  })

  it('exposes getControlElement via ref', async () => {
    const componentRef = ref<InstanceType<typeof NumberInput> | null>(null)

    const wrapper = await mountSuspended(
      defineComponent({
        name: 'NumberInputRefTest',
        components: { NumberInput },
        setup() {
          return { componentRef }
        },
        template: `
          <NumberInput ref="componentRef" label="Ref Test" />
        `,
      }),
    )

    const vm = wrapper.vm as unknown as {
      componentRef: { getControlElement: () => HTMLInputElement | null }
    }
    const el = vm.componentRef.getControlElement()
    expect(el).toBeInstanceOf(HTMLInputElement)
  })

  it('exposes focus method via ref', async () => {
    const componentRef = ref<InstanceType<typeof NumberInput> | null>(null)

    const wrapper = await mountSuspended(
      defineComponent({
        name: 'NumberInputFocusTest',
        components: { NumberInput },
        setup() {
          return { componentRef }
        },
        template: `
          <NumberInput ref="componentRef" label="Focus Test" />
        `,
      }),
      { attachTo: document.body },
    )

    const vm = wrapper.vm as unknown as { componentRef: { focus: () => void } }
    vm.componentRef.focus()
    await wrapper.vm.$nextTick()

    const el = vm.componentRef.getControlElement()
    expect(document.activeElement).toBe(el)
  })
})
