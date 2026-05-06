import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Tooltip from '../../app/components/Tooltip.vue'

describe('Tooltip', () => {
  it('renders content when controlled open is true', async () => {
    const wrapper = await mountSuspended(Tooltip, {
      props: {
        content: "I'm a tooltip",
        open: true,
      },
    })

    const content = wrapper.find('[data-part="content"]')
    expect(content.exists()).toBe(true)
    expect(content.attributes('data-state')).toBe('open')
    expect(content.text()).toContain("I'm a tooltip")
  })

  it('renders two triggers in shared tooltip slot', async () => {
    const wrapper = await mountSuspended(Tooltip, {
      props: {
        content: 'Shared tooltip',
      },
      slots: {
        triggers: `
          <template #default="{ trigger: Trigger }">
            <component :is="Trigger" value="first">First trigger</component>
            <component :is="Trigger" value="second">Second trigger</component>
          </template>
        `,
      },
    })

    const triggers = wrapper.findAll('[data-part="trigger"]')
    expect(triggers).toHaveLength(2)
  })

  it('renders dynamic slot content from controlled triggerValue', async () => {
    const wrapper = await mountSuspended(Tooltip, {
      props: {
        open: true,
        triggerValue: 'second',
      },
      slots: {
        content: `
          <template #default="{ triggerValue }">
            <span data-testid="dynamic-content">Active: {{ triggerValue }}</span>
          </template>
        `,
      },
    })

    const content = wrapper.find('[data-testid="dynamic-content"]')
    expect(content.exists()).toBe(true)
    expect(content.text()).toBe('Active: second')
  })

  it('passes triggerValue to triggers slot scope', async () => {
    const wrapper = await mountSuspended(Tooltip, {
      props: {
        triggerValue: 'third',
      },
      slots: {
        triggers: `
          <template #default="{ trigger: Trigger, triggerValue }">
            <span data-testid="trigger-value">{{ triggerValue }}</span>
            <component :is="Trigger" value="first">First trigger</component>
          </template>
        `,
      },
    })

    expect(wrapper.find('[data-testid="trigger-value"]').text()).toBe('third')
    expect(wrapper.findAll('[data-part="trigger"]')).toHaveLength(1)
  })
})
