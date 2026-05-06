import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import Button from '~ui/app/components/Button.vue'

describe('Button', () => {
  it('renders text prop when there is no slot', async () => {
    const wrapper = await mountSuspended(Button, {
      props: { text: 'Submit' },
    })

    expect(wrapper.text()).toContain('Submit')
  })

  it('calls onClick when used as a button', async () => {
    const onClick = vi.fn()
    const wrapper = await mountSuspended(Button, {
      props: { text: 'Go', onClick },
    })

    await wrapper.find('button').trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('enters loading then success and resets after autoResetDelay', async () => {
    const onClick = vi.fn(() => Promise.resolve())
    const onStateChange = vi.fn()
    const wrapper = await mountSuspended(Button, {
      props: {
        text: 'Save',
        handleLoadingState: true,
        onClick,
        onStateChange,
        autoResetDelay: 15,
      },
    })

    await wrapper.find('button').trigger('click')
    await flushPromises()
    expect(onStateChange).toHaveBeenCalledWith('loading')

    await flushPromises()
    expect(onClick).toHaveBeenCalled()
    expect(onStateChange).toHaveBeenCalledWith('success')

    await vi.waitFor(
      () => {
        expect(onStateChange).toHaveBeenCalledWith('default')
      },
      { timeout: 2000 },
    )
  })

  it('enters loading then error when onClick rejects and resets after autoResetDelay', async () => {
    const onClick = vi.fn(() => Promise.reject(new Error('fail')))
    const onStateChange = vi.fn()
    const wrapper = await mountSuspended(Button, {
      props: {
        text: 'Save',
        handleLoadingState: true,
        onClick,
        onStateChange,
        autoResetDelay: 15,
      },
    })

    await wrapper.find('button').trigger('click')
    await flushPromises()
    expect(onStateChange).toHaveBeenCalledWith('loading')

    await flushPromises()
    expect(onStateChange).toHaveBeenCalledWith('error')

    await vi.waitFor(
      () => {
        expect(onStateChange).toHaveBeenCalledWith('default')
      },
      { timeout: 2000 },
    )
  })

  it('does not run async state machine when handleLoadingState is false', async () => {
    const onClick = vi.fn(() => Promise.resolve())
    const onStateChange = vi.fn()
    const wrapper = await mountSuspended(Button, {
      props: {
        text: 'Go',
        handleLoadingState: false,
        onClick,
        onStateChange,
      },
    })

    await wrapper.find('button').trigger('click')
    await flushPromises()
    expect(onClick).toHaveBeenCalled()
    expect(onStateChange).not.toHaveBeenCalled()
  })

  it('renders as a link when `to` is an external URL', async () => {
    const wrapper = await mountSuspended(Button, {
      props: {
        to: 'https://example.com/docs',
        text: 'Docs',
      },
    })

    const anchor = wrapper.find('a')
    expect(anchor.exists()).toBe(true)
    expect(anchor.attributes('href')).toMatch(/example\.com/)
    expect(anchor.attributes('target')).toBe('_blank')
  })

  it('renders a trailing icon when trailing + trailingIcon are set', async () => {
    const wrapper = await mountSuspended(Button, {
      props: {
        text: 'Next',
        trailing: true,
        trailingIcon: 'tabler:arrow-right',
      },
    })

    expect(wrapper.find('button svg').exists()).toBe(true)
  })

  it('applies buttonIcon size classes for each size variant on the leading icon', async () => {
    const sizes = [
      { size: 'sm' as const, iconSizeClass: 'size-2.5' },
      { size: 'md' as const, iconSizeClass: 'size-3' },
      { size: 'lg' as const, iconSizeClass: 'size-4' },
    ]

    for (const { size, iconSizeClass } of sizes) {
      const wrapper = await mountSuspended(Button, {
        props: {
          text: 'Go',
          size,
          leadingIcon: 'tabler:arrow-right',
        },
      })

      const icon = wrapper.find('.buttonIcon')
      expect(icon.exists(), `leading icon for size ${size}`).toBe(true)
      expect(icon.classes()).toContain(iconSizeClass)
    }
  })
})
