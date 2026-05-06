import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Popover from '../../app/components/Popover.vue'

describe('Popover', () => {
  it('renders content in controlled open mode', async () => {
    const wrapper = await mountSuspended(Popover, {
      props: {
        open: true,
        title: 'Title',
        description: 'Description',
        content: 'Body',
      },
    })

    const content = wrapper.find('[data-part="content"]')
    expect(content.exists()).toBe(true)
    expect(content.text()).toContain('Title')
    expect(content.text()).toContain('Description')
    expect(content.text()).toContain('Body')
  })

  it('renders multiple triggers through triggers slot', async () => {
    const wrapper = await mountSuspended(Popover, {
      slots: {
        triggers: `
          <template #default="{ trigger: Trigger }">
            <component :is="Trigger" value="one">One</component>
            <component :is="Trigger" value="two">Two</component>
          </template>
        `,
      },
    })

    const triggers = wrapper.findAll('[data-part="trigger"]')
    expect(triggers).toHaveLength(2)
  })

  it('renders dynamic content from controlled triggerValue', async () => {
    const wrapper = await mountSuspended(Popover, {
      props: {
        open: true,
        triggerValue: 'two',
      },
      slots: {
        content: `
          <template #default="{ triggerValue }">
            <span data-testid="dynamic-content">Current: {{ triggerValue }}</span>
          </template>
        `,
      },
    })

    expect(wrapper.find('[data-testid="dynamic-content"]').text()).toBe('Current: two')
  })

  it('renders close trigger when enabled', async () => {
    const wrapper = await mountSuspended(Popover, {
      props: {
        open: true,
        showCloseTrigger: true,
      },
    })

    expect(wrapper.find('[data-part="close-trigger"]').exists()).toBe(true)
  })

  it('prefers content slot over content prop', async () => {
    const wrapper = await mountSuspended(Popover, {
      props: {
        open: true,
        content: 'Fallback content',
      },
      slots: {
        content: '<span data-testid="slot-content">Slot content</span>',
      },
    })

    expect(wrapper.find('[data-testid="slot-content"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Slot content')
    expect(wrapper.text()).not.toContain('Fallback content')
  })

  it('does not render visible content when controlled open is false', async () => {
    const wrapper = await mountSuspended(Popover, {
      props: {
        open: false,
        content: 'Body',
      },
    })

    const content = wrapper.find('[data-part="content"]')
    expect(content.exists()).toBe(true)
    expect(content.attributes('data-state')).toBe('closed')
  })
})
