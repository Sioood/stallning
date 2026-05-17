import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import UIDrawer from '~ui/app/components/Drawer/index.vue'

describe('UIDrawer', () => {
  it('renders trigger button by default', async () => {
    const wrapper = await mountSuspended(UIDrawer, {
      props: {
        title: 'Test Drawer',
        description: 'Test description',
      },
      slots: {
        default: 'Drawer content',
      },
    })

    expect(wrapper.text()).toContain('Ouvrir')
  })

  it('hides trigger when hideTrigger is true', async () => {
    const wrapper = await mountSuspended(UIDrawer, {
      props: {
        title: 'Test Drawer',
        hideTrigger: true,
      },
      slots: {
        default: 'Drawer content',
      },
    })

    expect(wrapper.text()).not.toContain('Ouvrir')
  })

  it('renders without error when portalled is false', async () => {
    const wrapper = await mountSuspended(UIDrawer, {
      props: {
        title: 'Test Drawer',
        portalled: false,
      },
      slots: {
        default: '<span data-testid="inline">Inline content</span>',
      },
    })

    expect(wrapper.find('[data-testid="inline"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Inline content')
  })

  it('renders without error when modal is false', async () => {
    const wrapper = await mountSuspended(UIDrawer, {
      props: {
        title: 'Test Drawer',
        modal: false,
      },
      slots: {
        default: 'Content',
      },
    })

    expect(wrapper.html()).toBeTruthy()
  })

  it('passes snap points to root component', async () => {
    const wrapper = await mountSuspended(UIDrawer, {
      props: {
        title: 'Test Drawer',
        snapPoints: [0.3, 0.6, 1],
      },
      slots: {
        default: 'Content',
      },
    })

    expect(wrapper.html()).toBeTruthy()
  })

  it('prevents scroll by default', async () => {
    const wrapper = await mountSuspended(UIDrawer, {
      props: {
        title: 'Test Drawer',
        preventScroll: true,
      },
      slots: {
        default: 'Content',
      },
    })

    expect(wrapper.html()).toBeTruthy()
  })
})
