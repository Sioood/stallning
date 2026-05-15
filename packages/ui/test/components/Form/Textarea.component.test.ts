import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Textarea from '~ui/app/components/Form/Textarea.vue'

describe('UIFormTextarea', () => {
  it('renders a textarea with label and placeholder', async () => {
    const wrapper = await mountSuspended(Textarea, {
      props: {
        label: 'Bio',
        name: 'bio',
        placeholder: 'Tell us about yourself…',
      },
    })

    const textarea = wrapper.find('textarea')
    expect(textarea.exists()).toBe(true)
    expect(textarea.attributes('placeholder')).toBe('Tell us about yourself…')
    expect(wrapper.text()).toContain('Bio')
  })

  it('renders with model value', async () => {
    const wrapper = await mountSuspended(Textarea, {
      props: {
        label: 'Description',
        modelValue: 'Hello world',
      },
    })

    const textarea = wrapper.find('textarea')
    expect(textarea.element.value).toBe('Hello world')
  })

  it('renders as disabled', async () => {
    const wrapper = await mountSuspended(Textarea, {
      props: {
        label: 'Disabled',
        disabled: true,
      },
    })

    const textarea = wrapper.find('textarea')
    expect(textarea.attributes('disabled')).toBeDefined()
  })

  it('renders as read-only', async () => {
    const wrapper = await mountSuspended(Textarea, {
      props: {
        label: 'Read-only',
        readOnly: true,
        modelValue: 'Cannot edit',
      },
    })

    const textarea = wrapper.find('textarea')
    expect(textarea.attributes('readonly')).toBeDefined()
  })

  it('renders with helper text', async () => {
    const wrapper = await mountSuspended(Textarea, {
      props: {
        label: 'Comments',
        helperText: 'Max 500 characters',
      },
    })

    expect(wrapper.text()).toContain('Max 500 characters')
  })

  it('renders with error message', async () => {
    const wrapper = await mountSuspended(Textarea, {
      props: {
        label: 'Required',
        invalid: true,
        error: 'This field is required',
      },
    })

    expect(wrapper.text()).toContain('This field is required')
  })

  it('renders with autoresize', async () => {
    const wrapper = await mountSuspended(Textarea, {
      props: {
        label: 'Autoresize',
        autoresize: true,
      },
    })

    expect(wrapper.find('textarea').exists()).toBe(true)
  })

  it('renders with leading icon span', async () => {
    const wrapper = await mountSuspended(Textarea, {
      props: {
        label: 'With icon',
        leading: true,
        leadingIcon: 'tabler:message',
      },
    })

    // The icon renders as <Icon name="tabler:message"> inside an aria-hidden span
    const leadingSpan = wrapper.find('span[aria-hidden="true"]')
    expect(leadingSpan.exists()).toBe(true)
  })

  it('renders a textarea that accepts focus', async () => {
    const wrapper = await mountSuspended(Textarea, {
      props: {
        label: 'Focusable',
      },
      attachTo: document.body,
    })

    const textarea = wrapper.find('textarea')
    expect(textarea.exists()).toBe(true)
    // Textarea is focusable (not disabled or read-only)
    expect(textarea.attributes('disabled')).toBeUndefined()
    expect(textarea.attributes('readonly')).toBeUndefined()
  })
})
