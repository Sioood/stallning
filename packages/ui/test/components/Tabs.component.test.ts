import { useTabs } from '@ark-ui/vue/tabs'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { defineComponent, nextTick, ref } from 'vue'

import UITabsContent from '~ui/app/components/Tabs/Content.vue'
import UITabs from '~ui/app/components/Tabs/index.vue'
import UITabsRoot from '~ui/app/components/Tabs/Root.vue'
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

    expect(wrapper.html()).toContain('border-accent-border-subtle')
    expect(wrapper.html()).toContain('bg-accent-fill-default')
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

  it('renders UITabsRoot for manual composition', async () => {
    const wrapper = await mountSuspended(UITabsRoot, {
      props: { modelValue: 'a' },
      global: {
        components: { UITabsTrigger, UITabsContent },
      },
      slots: {
        default: `
          <UITabsTrigger value="a">A</UITabsTrigger>
          <UITabsContent value="a">Panel A</UITabsContent>
        `,
      },
    })

    expect(wrapper.text()).toContain('A')
    expect(wrapper.text()).toContain('Panel A')
  })

  it('renders option icons when provided', async () => {
    const wrapper = await mountSuspended(UITabs, {
      props: {
        options: [
          { value: 'home', label: 'Home', icon: 'tabler:home' },
          { value: 'search', label: 'Search', icon: 'tabler:search' },
        ],
      },
    })

    const triggers = wrapper.findAll('[data-part="trigger"]')
    expect(triggers).toHaveLength(2)
    for (const trigger of triggers) {
      expect(trigger.find('svg').exists()).toBe(true)
      expect(trigger.classes()).toContain('inline-flex')
      expect(trigger.classes()).toContain('whitespace-nowrap')
      expect(trigger.find('.truncate').exists()).toBe(true)
    }
  })

  it('uses value prop as fallback for label', async () => {
    const wrapper = await mountSuspended(UITabs, {
      props: {
        options: [{ value: 'fallback-label' }],
      },
    })

    expect(wrapper.text()).toContain('fallback-label')
  })

  it('uses RootProvider mode when value prop is provided', async () => {
    const wrapper = await mountSuspended(
      defineComponent({
        name: 'TabsProviderTest',
        components: { UITabs },
        setup() {
          const tabs = useTabs()
          return { tabs }
        },
        template: `
          <UITabs :value="tabs" :options="[
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B' },
          ]" />
        `,
      }),
    )

    expect(wrapper.exists()).toBe(true)
    const triggers = wrapper.findAll('[data-part="trigger"]')
    expect(triggers).toHaveLength(2)
  })

  it('forwards lazyMount and unmountOnExit in RootProvider mode', async () => {
    const wrapper = await mountSuspended(
      defineComponent({
        name: 'TabsProviderPropsTest',
        components: { UITabs },
        setup() {
          const tabs = useTabs()
          return { tabs }
        },
        template: `
          <UITabs :value="tabs" :lazy-mount="true" :unmount-on-exit="true" :options="[
            { value: 'a', label: 'A' },
          ]" />
        `,
      }),
    )

    expect(wrapper.exists()).toBe(true)
  })

  it('does not render content panels when renderContent is false', async () => {
    const wrapper = await mountSuspended(UITabs, {
      props: {
        options: [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ],
        renderContent: false,
      },
    })

    expect(wrapper.findAll('[data-part="content"]')).toHaveLength(0)
    expect(wrapper.findAll('[data-part="trigger"]')).toHaveLength(2)
  })

  it('hides labels when hideLabel is set on an option', async () => {
    const wrapper = await mountSuspended(UITabs, {
      props: {
        options: [
          { value: 'home', label: 'Home', icon: 'tabler:home', hideLabel: true },
          { value: 'profile', label: 'Profile', icon: 'tabler:user' },
        ],
      },
    })

    const triggers = wrapper.findAll('[data-part="trigger"]')
    expect(triggers[0]!.text()).toBe('')
    expect(triggers[0]!.find('.truncate').exists()).toBe(false)
    expect(triggers[1]!.text()).toContain('Profile')
  })

  it('applies stacked trigger layout classes', async () => {
    const wrapper = await mountSuspended(UITabs, {
      props: {
        options: [{ value: 'goals', label: 'Goals', icon: 'tabler:target' }],
        triggerLayout: 'stacked',
      },
    })

    const trigger = wrapper.find('[data-part="trigger"]')
    expect(trigger.classes()).toContain('flex-col')
    expect(trigger.classes()).toContain('items-center')
  })

  it('renders a link when option has an external to', async () => {
    const wrapper = await mountSuspended(UITabs, {
      props: {
        options: [{ value: 'home', label: 'Home', to: 'https://example.com/home' }],
        renderContent: false,
      },
    })

    const link = wrapper.find('a[href="https://example.com/home"]')
    expect(link.exists()).toBe(true)
    expect(link.attributes('data-part')).toBe('trigger')
  })

  it('updates v-model when tab selection changes internally', async () => {
    const model = ref('a')

    const Controlled = defineComponent({
      name: 'TabsVModelUpdateTest',
      components: { UITabs },
      setup() {
        return { model }
      },
      template: `
        <UITabs v-model="model" :options="[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]" />
      `,
    })

    const wrapper = await mountSuspended(Controlled)

    const triggers = wrapper.findAll('[data-part="trigger"]')
    expect(triggers[0]!.attributes('data-selected')).toBe('')

    await triggers[1]!.trigger('click')
    await nextTick()
    await nextTick()

    expect(model.value).toBe('b')
    expect(triggers[1]!.attributes('data-selected')).toBe('')
  })
})
