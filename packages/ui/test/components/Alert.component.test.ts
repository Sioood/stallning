import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'

import Alert from '~ui/app/components/Alert.vue'

describe('Alert', () => {
  it('renders title and description', async () => {
    const wrapper = await mountSuspended(Alert, {
      props: {
        title: 'Important update',
        description: 'A description for this alert',
      },
    })

    expect(wrapper.text()).toContain('Important update')
    expect(wrapper.text()).toContain('A description for this alert')
  })

  it('applies classes from type to root/content and shows default icon', async () => {
    const wrapper = await mountSuspended(Alert, {
      props: {
        title: 'Success',
        type: 'success',
      },
    })

    expect(wrapper.find('.alertRoot').classes().join(' ')).toMatch(/bg-success-surface-subtle/)
    expect(wrapper.find('.alertContent').classes().join(' ')).toMatch(/text-success-text-default/)
    expect(wrapper.find('.alertContentIcon').exists()).toBe(true)
  })

  it('renders action buttons and falls back action intent/size to alert values', async () => {
    const wrapper = await mountSuspended(Alert, {
      props: {
        title: 'Take action',
        intent: 'warning',
        size: 'md',
        actions: [{ text: 'Retry' }],
      },
    })

    const actionButton = wrapper.findAll('button').find((el) => el.text().includes('Retry'))
    expect(actionButton).toBeDefined()
    expect(actionButton?.classes().join(' ')).toMatch(/bg-warning-fill-default/)
  })

  it('hides alert when close button is clicked', async () => {
    const wrapper = await mountSuspended(Alert, {
      props: {
        title: 'Closable',
        closable: true,
        actions: [{ text: 'Action' }],
      },
    })

    expect(wrapper.find('.alertRoot').exists()).toBe(true)
    await wrapper.findAll('button')[0]?.trigger('click')
    expect(wrapper.find('.alertRoot').exists()).toBe(false)
  })

  it('calls action onClick when action button is clicked', async () => {
    const onClick = vi.fn()
    const wrapper = await mountSuspended(Alert, {
      props: {
        title: 'Click action',
        actions: [{ text: 'Run', onClick }],
      },
    })

    const actionButton = wrapper.findAll('button').find((el) => el.text().includes('Run'))
    expect(actionButton).toBeDefined()
    await actionButton?.trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
