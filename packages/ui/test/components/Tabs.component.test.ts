import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import UITabsContent from '~ui/app/components/Tabs/Content.vue'
import UITabs from '~ui/app/components/Tabs/index.vue'
import UITabsTrigger from '~ui/app/components/Tabs/Trigger.vue'

describe('UITabs', () => {
  it('renders the correct number of triggers from options prop', async () => {
    const wrapper = await mountSuspended(UITabs, {
      props: {
        options: [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
          { value: 'c', label: 'C' },
        ],
      },
    })

    const triggers = wrapper.findAll('[data-part="trigger"]')
    expect(triggers).toHaveLength(3)
  })

  it('renders trigger labels correctly', async () => {
    const wrapper = await mountSuspended(UITabs, {
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
    const wrapper = await mountSuspended(UITabs, {
      props: {
        options: [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ],
        modelValue: 'b',
      },
    })

    const triggers = wrapper.findAll('[data-part="trigger"]')
    expect(triggers[1]!.attributes('data-selected')).toBe('')
  })

  it('renders the indicator element', async () => {
    const wrapper = await mountSuspended(UITabs, {
      props: {
        options: [{ value: 'a', label: 'A' }],
        modelValue: 'a',
      },
    })

    const indicator = wrapper.find('[data-part="indicator"]')
    expect(indicator.exists()).toBe(true)
  })

  it('applies intent classes to list', async () => {
    const wrapper = await mountSuspended(UITabs, {
      props: {
        options: [{ value: 'a', label: 'A' }],
        intent: 'accent',
      },
    })

    expect(wrapper.html()).toContain('border-accent-border-default')
    expect(wrapper.html()).toContain('bg-accent-fill-subtle')
  })

  it('applies size classes to list', async () => {
    const wrapper = await mountSuspended(UITabs, {
      props: {
        options: [{ value: 'a', label: 'A' }],
        size: 'lg',
      },
    })

    expect(wrapper.html()).toContain('gap-1.5')
    expect(wrapper.html()).toContain('p-1.5')
  })

  it('applies orientation classes to list', async () => {
    const wrapper = await mountSuspended(UITabs, {
      props: {
        options: [{ value: 'a', label: 'A' }],
        orientation: 'vertical' as const,
      },
    })

    const list = wrapper.find('[data-part="list"]')
    expect(list.classes()).toContain('flex-col')
  })

  it('renders without crashing when tabs are disabled', async () => {
    const wrapper = await mountSuspended(UITabs, {
      props: {
        options: [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ],
        disabled: true,
      },
    })

    const triggers = wrapper.findAll('[data-part="trigger"]')
    expect(triggers).toHaveLength(2)
  })

  it('renders triggers with disabled option', async () => {
    const wrapper = await mountSuspended(UITabs, {
      props: {
        options: [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B', disabled: true },
        ],
      },
    })

    const triggers = wrapper.findAll('[data-part="trigger"]')
    expect(triggers).toHaveLength(2)
    expect(wrapper.text()).toContain('A')
    expect(wrapper.text()).toContain('B')
  })

  it('renders custom slot content', async () => {
    const wrapper = await mountSuspended(UITabs, {
      global: {
        components: {
          UITabsTrigger,
          UITabsContent,
        },
      },
      slots: {
        default: `
          <UITabsTrigger value="custom">Custom Tab</UITabsTrigger>
          <UITabsContent value="custom">Custom Content</UITabsContent>
        `,
      },
    })

    expect(wrapper.text()).toContain('Custom Tab')
    expect(wrapper.text()).toContain('Custom Content')
  })

  it('uses value prop as fallback for label', async () => {
    const wrapper = await mountSuspended(UITabs, {
      props: {
        options: [{ value: 'fallback-label' }],
      },
    })

    expect(wrapper.text()).toContain('fallback-label')
  })
})
