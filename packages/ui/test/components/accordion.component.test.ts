import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'

import UIAccordion from '~ui/app/components/Accordion/index.vue'
import UIAccordionItem from '~ui/app/components/Accordion/Item.vue'
import UIAccordionItemContent from '~ui/app/components/Accordion/ItemContent.vue'
import UIAccordionItemTrigger from '~ui/app/components/Accordion/ItemTrigger.vue'

function accordionHarness(accordionProps: Record<string, unknown> = {}) {
  return defineComponent({
    name: 'AccordionHarness',
    setup() {
      return () =>
        h(
          UIAccordion,
          { ...accordionProps, 'data-testid': 'accordion-root' },
          {
            default: () => [
              h(UIAccordionItem, { value: 'a' }, () => [
                h(UIAccordionItemTrigger, null, { default: () => 'Title A' }),
                h(UIAccordionItemContent, null, { default: () => 'Body A' }),
              ]),
              h(UIAccordionItem, { value: 'b' }, () => [
                h(UIAccordionItemTrigger, null, { default: () => 'Title B' }),
                h(UIAccordionItemContent, null, { default: () => 'Body B' }),
              ]),
            ],
          },
        )
    },
  })
}

describe('UIAccordion', () => {
  it('opens panels that match uncontrolled defaultValue', async () => {
    const wrapper = await mountSuspended(
      accordionHarness({ collapsible: true, defaultValue: ['a'] }),
    )

    const a = wrapper.findAll('button').find((b) => b.text().includes('Title A'))!
    const b = wrapper.findAll('button').find((btn) => btn.text().includes('Title B'))!

    expect(a.attributes('aria-expanded')).toBe('true')
    expect(b.attributes('aria-expanded')).toBe('false')
    expect(wrapper.text()).toContain('Body A')
  })

  it('reflects controlled modelValue and updates when the model changes', async () => {
    const model = ref<string[]>(['a'])

    const Controlled = defineComponent({
      name: 'AccordionControlledHarness',
      setup() {
        return () =>
          h(
            UIAccordion,
            {
              modelValue: model.value,
              collapsible: true,
              'onUpdate:modelValue': (v: string[]) => {
                model.value = v
              },
            },
            {
              default: () => [
                h(UIAccordionItem, { value: 'a' }, () => [
                  h(UIAccordionItemTrigger, null, { default: () => 'Title A' }),
                  h(UIAccordionItemContent, null, { default: () => 'Body A' }),
                ]),
              ],
            },
          )
      },
    })

    const wrapper = await mountSuspended(Controlled)

    const trigger = wrapper.find('button')
    expect(trigger.attributes('aria-expanded')).toBe('true')

    model.value = []
    await nextTick()
    expect(trigger.attributes('aria-expanded')).toBe('false')
  })

  it('does not pass modelValue to Ark when v-model is omitted (uncontrolled)', async () => {
    const wrapper = await mountSuspended(
      accordionHarness({ collapsible: true, defaultValue: ['b'] }),
    )

    const b = wrapper.findAll('button').find((btn) => btn.text().includes('Title B'))!
    expect(b.attributes('aria-expanded')).toBe('true')
  })
})
