import { useTour, type TourStepDetails } from '@ark-ui/vue/tour'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'

import Tour from '~ui/app/components/Tour/index.vue'

const steps: TourStepDetails[] = [
  {
    id: 'step-1',
    type: 'dialog',
    title: 'Step 1',
    description: 'First step description',
    actions: [{ label: 'Next', action: 'next' }],
  },
  {
    id: 'step-2',
    type: 'tooltip',
    title: 'Step 2',
    description: 'Second step description',
    target: () => document.querySelector<HTMLElement>('#target'),
    actions: [
      { label: 'Back', action: 'prev' },
      { label: 'Next', action: 'next' },
    ],
  },
]

describe('Tour', () => {
  it('mounts without errors', async () => {
    const wrapper = await mountSuspended(
      defineComponent({
        name: 'TourTestHarness',
        components: { Tour },
        setup() {
          const tour = useTour({ steps })
          return { tour }
        },
        template: `
          <Tour :tour="tour">
            <div id="target">Target</div>
          </Tour>
        `,
      }),
    )

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('#target').exists()).toBe(true)
  })

  it('accepts showBackdrop prop', async () => {
    const wrapper = await mountSuspended(
      defineComponent({
        name: 'TourTestHarness',
        components: { Tour },
        setup() {
          const tour = useTour({ steps })
          return { tour }
        },
        template: `
          <Tour :tour="tour" :show-backdrop="false">
            <div id="target">Target</div>
          </Tour>
        `,
      }),
    )

    expect(wrapper.exists()).toBe(true)
  })

  it('accepts showSpotlight prop', async () => {
    const wrapper = await mountSuspended(
      defineComponent({
        name: 'TourTestHarness',
        components: { Tour },
        setup() {
          const tour = useTour({ steps })
          return { tour }
        },
        template: `
          <Tour :tour="tour" :show-spotlight="false">
            <div id="target">Target</div>
          </Tour>
        `,
      }),
    )

    expect(wrapper.exists()).toBe(true)
  })

  it('accepts showClose prop', async () => {
    const wrapper = await mountSuspended(
      defineComponent({
        name: 'TourTestHarness',
        components: { Tour },
        setup() {
          const tour = useTour({ steps })
          return { tour }
        },
        template: `
          <Tour :tour="tour" :show-close="false">
            <div id="target">Target</div>
          </Tour>
        `,
      }),
    )

    expect(wrapper.exists()).toBe(true)
  })

  it('accepts intent and size props', async () => {
    const wrapper = await mountSuspended(
      defineComponent({
        name: 'TourTestHarness',
        components: { Tour },
        setup() {
          const tour = useTour({ steps })
          return { tour }
        },
        template: `
          <Tour :tour="tour" intent="primary" size="lg">
            <div id="target">Target</div>
          </Tour>
        `,
      }),
    )

    expect(wrapper.exists()).toBe(true)
  })
})
