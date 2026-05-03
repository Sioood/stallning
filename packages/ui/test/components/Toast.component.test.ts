import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import Toast from '../../app/components/Toast.vue'

describe('Toast', () => {
  it('renders the toaster tree after the client initializes', async () => {
    const wrapper = await mountSuspended(Toast)
    await flushPromises()
    await vi.waitFor(
      () => {
        expect(wrapper.html()).toMatch(/toastRoot|toastTitle|teleport/i)
      },
      { timeout: 5000 },
    )
  })
})
