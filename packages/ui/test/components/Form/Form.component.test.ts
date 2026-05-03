import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { z } from 'zod'

import Form from '../../../app/components/Form/index.vue'
import Input from '../../../app/components/Form/Input.vue'

describe('UIForm', () => {
  it('emits submit with values when the schema passes', async () => {
    const schema = z.object({ name: z.string().min(2) })
    const wrapper = await mountSuspended(Form, {
      props: {
        schema,
        defaultValues: { name: '' },
        fields: {
          name: { as: Input, props: { label: 'Name', name: 'name' } },
        },
        layout: ['name'],
        validateSchemaOn: ['submit'],
      },
    })

    await wrapper.find('input').setValue('Alice')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    const emitted = wrapper.emitted('submit')
    expect(emitted?.length).toBe(1)
    expect(emitted?.[0]?.[0]).toEqual({ name: 'Alice' })
  })

  it('does not emit submit when the schema fails and surfaces a field error', async () => {
    const schema = z.object({ name: z.string().min(2) })
    const wrapper = await mountSuspended(Form, {
      props: {
        schema,
        defaultValues: { name: '' },
        fields: {
          name: { as: Input, props: { label: 'Name', name: 'name' } },
        },
        layout: ['name'],
        validateSchemaOn: ['submit'],
      },
    })

    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.emitted('submit')).toBeUndefined()
    expect(wrapper.text().toLowerCase()).toMatch(/string|min|caract|character/)
  })
})
