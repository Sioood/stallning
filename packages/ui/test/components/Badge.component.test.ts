import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Badge from '~ui/app/components/Badge.vue'

describe('Badge', () => {
  it('renders the label', async () => {
    const wrapper = await mountSuspended(Badge, {
      props: { label: 'Badge' },
    })

    expect(wrapper.text()).toContain('Badge')
  })

  it('applies badgeIcon size classes for each size variant', async () => {
    const sizes = [
      { size: 'sm' as const, iconSizeClass: 'size-2.5' },
      { size: 'md' as const, iconSizeClass: 'size-3' },
      { size: 'lg' as const, iconSizeClass: 'size-4' },
    ]

    for (const { size, iconSizeClass } of sizes) {
      const wrapper = await mountSuspended(Badge, {
        props: {
          label: 'X',
          size,
          leadingIcon: 'tabler:badge',
        },
      })

      const icon = wrapper.findAll('*').find((w) => w.classes().includes(iconSizeClass))
      expect(icon, `leading icon for size ${size}`).toBeDefined()
      expect(icon!.classes()).toContain(iconSizeClass)
    }
  })

  it('merges ui.icon onto the icon', async () => {
    const wrapper = await mountSuspended(Badge, {
      props: {
        label: 'Y',
        leadingIcon: 'tabler:badge',
        ui: { icon: 'custom-icon-class' },
      },
    })

    const icon = wrapper.find('.custom-icon-class')
    expect(icon.exists()).toBe(true)
    expect(icon.classes()).toContain('size-3')
  })
})
