import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import ToggleGroup from '~ui/app/components/Toggle/Group.vue'

describe('Toggle/Group', () => {
  it('renders options fallback labels', async () => {
    const wrapper = await mountSuspended(ToggleGroup, {
      props: {
        options: [
          { value: 'grid', title: 'Grid', icon: 'tabler:layout-grid' },
          { value: 'list', title: 'List' },
        ],
      },
    })

    expect(wrapper.text()).toContain('Grid')
    expect(wrapper.text()).toContain('List')
  })

  it('supports item slot customization', async () => {
    const wrapper = await mountSuspended(ToggleGroup, {
      props: {
        modelValue: ['a'],
        options: [{ value: 'a', title: 'A' }],
      },
      slots: {
        item: `
          <template #item="{ option, pressed }">
            <span data-testid="item-slot">{{ option.title }}:{{ pressed ? 'on' : 'off' }}</span>
          </template>
        `,
      },
    })

    expect(wrapper.find('[data-testid="item-slot"]').text()).toBe('A:on')
  })

  it('passes icon and title to item slot props', async () => {
    const wrapper = await mountSuspended(ToggleGroup, {
      props: {
        options: [{ value: 'grid', title: 'Grid', icon: 'tabler:layout-grid' }],
      },
      slots: {
        item: `
          <template #item="{ option }">
            <span data-testid="slot-props">{{ option.title }}|{{ option.icon }}</span>
          </template>
        `,
      },
    })

    expect(wrapper.find('[data-testid="slot-props"]').text()).toBe('Grid|tabler:layout-grid')
  })

  it('emits single selected value by default', async () => {
    const wrapper = await mountSuspended(ToggleGroup, {
      props: {
        options: [
          { value: 'left', title: 'Left' },
          { value: 'center', title: 'Center' },
        ],
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[0]!.trigger('click')
    await buttons[1]!.trigger('click')

    const events = wrapper.emitted('update:modelValue') ?? []
    expect(events.length).toBeGreaterThan(0)
    expect(events.at(-1)?.[0]).toEqual(['center'])
  })

  it('emits multiple selected values when multiple is true', async () => {
    const wrapper = await mountSuspended(ToggleGroup, {
      props: {
        multiple: true,
        options: [
          { value: 'left', title: 'Left' },
          { value: 'center', title: 'Center' },
        ],
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[0]!.trigger('click')
    await buttons[1]!.trigger('click')

    const events = wrapper.emitted('update:modelValue') ?? []
    expect(events.length).toBeGreaterThan(0)
    expect(events.at(-1)?.[0]).toEqual(['left', 'center'])
  })

  it('does not emit selection for disabled option', async () => {
    const wrapper = await mountSuspended(ToggleGroup, {
      props: {
        options: [{ value: 'left', title: 'Left', disabled: true }],
      },
    })

    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
