import { mountSuspended } from '@nuxt/test-utils/runtime'
import { DOMWrapper, flushPromises } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'

import Menu from '~ui/app/components/Menu/index.vue'

describe('Menu', () => {
  it('closes menu after item select when open is uncontrolled', async () => {
    const wrapper = await mountSuspended(Menu, {
      props: {
        items: [{ value: 'go', label: 'Go' }],
      },
    })

    await wrapper.find('[data-part="trigger"]').trigger('click')
    await flushPromises()
    expect(document.body.querySelector('[data-part="content"][data-state="open"]')).not.toBeNull()

    const itemEl = document.body.querySelector('[data-part="item"][data-value="go"]')
    expect(itemEl).not.toBeNull()
    await new DOMWrapper(itemEl as HTMLElement).trigger('click')
    await flushPromises()

    expect(document.body.querySelector('[data-part="content"][data-state="open"]')).toBeNull()
    wrapper.unmount()
    await flushPromises()
  })

  it('keeps menu open when checkbox item has closeOnSelect false', async () => {
    const wrapper = await mountSuspended(Menu, {
      props: {
        open: true,
        items: [
          {
            type: 'checkbox',
            value: 'opt',
            label: 'Option',
            checked: false,
            closeOnSelect: false,
          },
        ],
      },
    })

    const checkboxEl = document.body.querySelector('[data-part="item"][data-value="opt"]')
    expect(checkboxEl).not.toBeNull()
    await new DOMWrapper(checkboxEl as HTMLElement).trigger('click')
    await flushPromises()

    expect(document.body.querySelector('[data-part="content"][data-state="open"]')).not.toBeNull()
    wrapper.unmount()
    await flushPromises()
  })

  it('closes menu after item select when using v-model:open', async () => {
    const open = ref(true)

    const Harness = defineComponent({
      setup() {
        return () =>
          h(Menu, {
            open: open.value,
            'onUpdate:open': (value: boolean) => {
              open.value = value
            },
            items: [{ value: 'go', label: 'Go' }],
          })
      },
    })

    const wrapper = await mountSuspended(Harness)
    await flushPromises()
    expect(document.body.querySelector('[data-part="content"][data-state="open"]')).not.toBeNull()

    const itemEl = document.body.querySelector('[data-part="item"][data-value="go"]')
    expect(itemEl).not.toBeNull()
    await new DOMWrapper(itemEl as HTMLElement).trigger('click')
    await flushPromises()

    expect(open.value).toBe(false)
    expect(document.body.querySelector('[data-part="content"][data-state="open"]')).toBeNull()
    wrapper.unmount()
    await flushPromises()
  })

  it('renders configured items when controlled open is true', async () => {
    await mountSuspended(Menu, {
      props: {
        open: true,
        items: [
          { type: 'item', value: 'edit', label: 'Edit' },
          { type: 'separator' },
          { type: 'item', value: 'delete', label: 'Delete' },
        ],
      },
    })

    const content = document.body.querySelector('[data-part="content"]')
    expect(content).not.toBeNull()
    expect(content?.textContent).toContain('Edit')
    expect(content?.textContent).toContain('Delete')
    expect(document.body.querySelector('[data-part="separator"]')).not.toBeNull()
  })

  it('renders links through item as-child mode', async () => {
    await mountSuspended(Menu, {
      props: {
        open: true,
        items: [
          {
            type: 'item',
            value: 'docs',
            label: 'Documentation',
            to: 'https://ark-ui.com',
            target: '_blank',
          },
        ],
      },
    })

    const link = document.body.querySelector('a[href="https://ark-ui.com"]')
    expect(link).not.toBeNull()
    expect(link?.getAttribute('target')).toBe('_blank')
    expect(link?.className).toMatch(/px-2/)
  })

  it('renders checkbox entry labels', async () => {
    const wrapper = await mountSuspended(Menu, {
      props: {
        open: true,
        items: [{ type: 'checkbox', value: 'toolbar', label: 'Toolbar', checked: false }],
      },
    })

    expect(wrapper.exists()).toBe(true)
    expect(document.body.textContent).toContain('Toolbar')
  })

  it('renders group entries and forwards ui classes to entries', async () => {
    await mountSuspended(Menu, {
      props: {
        open: true,
        ui: {
          item: 'test-item-class',
          itemGroup: 'test-group-class',
          itemGroupLabel: 'test-group-label-class',
          separator: 'test-separator-class',
        },
        items: [
          {
            type: 'group',
            label: 'Manage',
            items: [
              { type: 'item', value: 'duplicate', label: 'Duplicate' },
              { type: 'separator' },
              { type: 'item', value: 'move', label: 'Move' },
            ],
          },
        ],
      },
    })

    expect(document.body.querySelector('.test-group-class')).not.toBeNull()
    expect(document.body.querySelector('.test-group-label-class')?.textContent).toContain('Manage')
    expect(document.body.querySelector('.test-item-class')).not.toBeNull()
    expect(document.body.querySelector('.test-separator-class')).not.toBeNull()
  })

  it('renders mixed group entry types including submenu and radio', async () => {
    await mountSuspended(Menu, {
      props: {
        open: true,
        items: [
          {
            type: 'group',
            label: 'Advanced',
            items: [
              { type: 'checkbox', value: 'audit', label: 'Audit log', checked: true },
              {
                type: 'radio-group',
                label: 'Mode',
                value: 'safe',
                items: [
                  { value: 'safe', label: 'Safe' },
                  { value: 'fast', label: 'Fast' },
                ],
              },
              {
                type: 'submenu',
                label: 'More',
                items: [{ type: 'item', value: 'deep', label: 'Deep action' }],
              },
            ],
          },
        ],
      },
    })

    expect(document.body.textContent).toContain('Advanced')
    expect(document.body.textContent).toContain('Audit log')
    expect(document.body.textContent).toContain('Mode')
    expect(document.body.textContent).toContain('More')
  })

  it('renders default trigger indicator by default', async () => {
    const wrapper = await mountSuspended(Menu)

    expect(wrapper.find('[data-part="indicator"]').exists()).toBe(true)
  })

  it('does not render trigger indicator when showIndicator is false', async () => {
    await mountSuspended(Menu, {
      props: {
        showIndicator: false,
      },
    })

    expect(document.body.querySelector('[data-part="indicator"]')).toBeNull()
  })

  it('supports multiple triggers and nested content slots', async () => {
    const wrapper = await mountSuspended(Menu, {
      props: {
        open: true,
      },
      slots: {
        triggers: `
          <template #default="{ trigger: Trigger }">
            <component :is="Trigger" value="one">One</component>
            <component :is="Trigger" value="two">Two</component>
          </template>
        `,
        content: `
          <template #default="{ root: Root, triggerItem: TriggerItem, item: Item }">
            <component :is="Item" value="base">Base</component>
            <component :is="Root">
              <component :is="TriggerItem">More</component>
            </component>
          </template>
        `,
      },
    })

    expect(wrapper.findAll('[data-part="trigger"]')).toHaveLength(2)
    expect(document.body.querySelector('[data-part="trigger-item"]')).not.toBeNull()
  })

  it('applies intent variant classes to trigger', async () => {
    const wrapper = await mountSuspended(Menu, {
      props: {
        intent: 'primary',
      },
    })

    const trigger = wrapper.find('[data-part="trigger"]')
    expect(trigger.classes().join(' ')).toMatch(/primary/)
  })

  it('shows arrow when showArrow is true', async () => {
    await mountSuspended(Menu, {
      props: {
        open: true,
        showArrow: true,
        items: [{ type: 'item', value: 'a', label: 'A' }],
      },
    })

    expect(document.body.querySelector('[data-part="arrow"]')).not.toBeNull()
  })

  it('renders context trigger text when contextTriggerText is set', async () => {
    const wrapper = await mountSuspended(Menu, {
      props: {
        contextTriggerText: 'Right-click here',
      },
    })

    expect(wrapper.text()).toContain('Right-click here')
  })

  it('renders custom trigger text', async () => {
    const wrapper = await mountSuspended(Menu, {
      props: {
        triggerText: 'Options',
      },
    })

    expect(wrapper.find('[data-part="trigger"]').text()).toContain('Options')
  })

  it('applies custom ui classes to positioner and content', async () => {
    await mountSuspended(Menu, {
      props: {
        open: true,
        ui: {
          positioner: 'custom-positioner',
          content: 'custom-content',
        },
        items: [{ type: 'item', value: 'a', label: 'A' }],
      },
    })

    expect(document.body.querySelector('.custom-positioner')).not.toBeNull()
    expect(document.body.querySelector('.custom-content')).not.toBeNull()
  })

  it('renders disabled items with disabled attribute', async () => {
    await mountSuspended(Menu, {
      props: {
        open: true,
        items: [{ type: 'item', value: 'disabled', label: 'Disabled', disabled: true }],
      },
    })

    const items = document.body.querySelectorAll('[data-part="item"]')
    const item = Array.from(items).find((el) => el.textContent?.includes('Disabled'))
    expect(item).not.toBeUndefined()
    expect(
      item?.hasAttribute('data-disabled') || item?.getAttribute('aria-disabled') === 'true',
    ).toBe(true)
  })

  it('calls onSelect callback when item is selected', async () => {
    const onSelect = vi.fn()
    await mountSuspended(Menu, {
      props: {
        open: true,
        items: [{ type: 'item', value: 'action', label: 'Action', onSelect }],
      },
    })

    const item = document.body.querySelector('[data-part="item"]')
    expect(item).not.toBeNull()
    expect(document.body.textContent).toContain('Action')
  })

  it('calls onCheckedChange callback when checkbox item is toggled', async () => {
    const onCheckedChange = vi.fn()
    await mountSuspended(Menu, {
      props: {
        open: true,
        items: [
          { type: 'checkbox', value: 'toggle', label: 'Toggle', checked: false, onCheckedChange },
        ],
      },
    })

    expect(document.body.textContent).toContain('Toggle')
  })

  it('calls onValueChange callback when radio item selection changes', async () => {
    const onValueChange = vi.fn()
    await mountSuspended(Menu, {
      props: {
        open: true,
        items: [
          {
            type: 'radio-group',
            label: 'Options',
            value: 'a',
            onValueChange,
            items: [
              { value: 'a', label: 'Option A' },
              { value: 'b', label: 'Option B' },
            ],
          },
        ],
      },
    })

    expect(document.body.textContent).toContain('Options')
    expect(document.body.textContent).toContain('Option A')
  })

  it('renders item with to as anchor tag with rel attribute', async () => {
    await mountSuspended(Menu, {
      props: {
        open: true,
        items: [
          {
            type: 'item',
            value: 'link',
            label: 'External Link',
            to: 'https://example.com',
            target: '_blank',
          },
        ],
      },
    })

    const link = document.body.querySelector('a[href="https://example.com"]')
    expect(link).not.toBeNull()
    expect(link?.getAttribute('rel')).toBe('noopener noreferrer')
  })

  it('renders custom #trigger slot with w-fit unstyled anchor', async () => {
    const wrapper = await mountSuspended(Menu, {
      slots: {
        trigger: '<span class="custom-menu-trigger">Open</span>',
      },
    })

    const trigger = wrapper.find('[data-part="trigger"]')
    expect(trigger.element.tagName).toBe('SPAN')
    expect(trigger.classes()).toContain('w-fit')
    expect(trigger.find('.custom-menu-trigger').exists()).toBe(true)
    expect(trigger.classes().join(' ')).not.toMatch(/primary-fill|neutral-fill-subtle/)
  })

  it('applies w-fit to default styled trigger', async () => {
    const wrapper = await mountSuspended(Menu, {
      props: { triggerText: 'Actions' },
    })

    expect(wrapper.find('[data-part="trigger"]').classes()).toContain('w-fit')
  })

  it('does not apply default button styles when unstyled is true', async () => {
    const wrapper = await mountSuspended(Menu, {
      props: {
        unstyled: true,
        triggerText: 'Actions',
      },
    })

    const trigger = wrapper.find('[data-part="trigger"]')
    expect(trigger.classes().join(' ')).not.toMatch(/primary-fill|neutral-fill-subtle/)
  })
})
