import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { z } from 'zod'

import { useSchemaForm } from '../../app/composables/useSchemaForm'

describe('useSchemaForm', () => {
  it('wires Zod as validators for change, blur, and submit', async () => {
    const schema = z.object({ email: z.string().min(1) })

    const Consumer = defineComponent({
      setup() {
        useSchemaForm({
          schema,
          defaultValues: { email: '' },
          validateSchemaOn: ['change', 'blur', 'submit'],
          onSubmit: () => {},
        })
        return () => h('div', { 'data-ready': '1' })
      },
    })

    const wrapper = await mountSuspended(Consumer)
    expect(wrapper.find('[data-ready="1"]').exists()).toBe(true)
  })
})
