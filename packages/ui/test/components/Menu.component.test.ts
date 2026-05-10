import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Menu from '~ui/app/components/Menu/index.vue'

describe('Menu', () => {
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
            href: 'https://ark-ui.com',
            target: '_blank',
          },
        ],
      },
    })

    const link = document.body.querySelector('a[href="https://ark-ui.com"]')
    expect(link).not.toBeNull()
    expect(link?.getAttribute('target')).toBe('_blank')
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
})
