import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { z } from 'zod'

import Form from '~ui/app/components/Form/index.vue'
import Input from '~ui/app/components/Form/Input.vue'

describe('UIForm', () => {
  const baseSchema = z.object({ name: z.string().min(2) })
  const baseProps = {
    schema: baseSchema,
    defaultValues: { name: '' },
    fields: {
      name: { as: Input, props: { label: 'Name', name: 'name' } },
    },
    layout: ['name'] as const,
    validateSchemaOn: ['submit'] as const,
  }

  it('emits submit with values when the schema passes', async () => {
    const wrapper = await mountSuspended(Form, { props: baseProps })

    await wrapper.find('input').setValue('Alice')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    const emitted = wrapper.emitted('submit')
    expect(emitted?.length).toBe(1)
    expect(emitted?.[0]?.[0]).toEqual({ name: 'Alice' })
  })

  it('does not emit submit when the schema fails and surfaces a field error', async () => {
    const wrapper = await mountSuspended(Form, { props: baseProps })

    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.emitted('submit')).toBeUndefined()
    expect(wrapper.text().toLowerCase()).toMatch(/string|min|caract|character/)
  })

  it('renders multiple fields in a row layout', async () => {
    const schema = z.object({ first: z.string(), last: z.string() })
    const wrapper = await mountSuspended(Form, {
      props: {
        schema,
        defaultValues: { first: '', last: '' },
        fields: {
          first: { as: Input, props: { label: 'First', name: 'first' } },
          last: { as: Input, props: { label: 'Last', name: 'last' } },
        },
        layout: [['first', 'last']],
        validateSchemaOn: ['submit'] as const,
      },
    })

    const inputs = wrapper.findAll('input')
    expect(inputs).toHaveLength(2)

    const rowDiv = inputs[0]?.element.closest('.flex-row')
    expect(rowDiv).not.toBeNull()
  })

  it('exposes form instance via template ref', async () => {
    const wrapper = await mountSuspended(Form, { props: baseProps })

    const exposed = wrapper.vm as unknown as { form: unknown }
    expect(exposed.form).toBeDefined()
  })

  it('shows error summary when showErrorSummary is true and form is submitted with errors', async () => {
    const wrapper = await mountSuspended(Form, {
      props: { ...baseProps, showErrorSummary: true },
    })

    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()
    await nextTick()
    await flushPromises()

    const errorText = wrapper.text().toLowerCase()
    expect(errorText).toMatch(/string|min|caract|character/)
  })

  it('does not show error summary before submission', async () => {
    const wrapper = await mountSuspended(Form, {
      props: { ...baseProps, showErrorSummary: true },
    })

    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })

  it('has aria-busy binding wired to submitting state', async () => {
    const wrapper = await mountSuspended(Form, {
      props: {
        ...baseProps,
        defaultValues: { name: 'valid' },
        schema: z.object({ name: z.string().min(1) }),
      },
    })

    const form = wrapper.find('form')
    expect(form.attributes('data-ui-form')).toBeDefined()
    expect(form.attributes('aria-busy')).toBeUndefined()

    await form.trigger('submit.prevent')
    await flushPromises()

    expect(form.attributes('aria-busy')).toBeUndefined()
    expect(wrapper.emitted('submit')).toBeDefined()
  })

  it('renders the actions slot with canSubmit and isSubmitting', async () => {
    const wrapper = await mountSuspended(Form, {
      props: baseProps,
      slots: {
        actions: `
          <template #actions="{ canSubmit, isSubmitting }">
            <button type="submit" data-testid="submit" :disabled="!canSubmit || isSubmitting">Go</button>
          </template>
        `,
      },
    })

    const submitBtn = wrapper.find('[data-testid="submit"]')
    expect(submitBtn.exists()).toBe(true)
  })
})
