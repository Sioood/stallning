import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import UIDialog from '~ui/app/components/Dialog/index.vue'
import { MODAL_LAYER_Z_INDEX } from '~ui/app/utils/layer-z-index'

describe('UIDialog', () => {
  it('stacks backdrop and positioner above sticky page chrome', async () => {
    await mountSuspended(UIDialog, {
      props: {
        description: 'Irreversible',
        hideTrigger: true,
        open: true,
        portalled: true,
        title: 'Confirm',
      },
      slots: {
        footer: '<button type="button">OK</button>',
      },
    })

    const backdrop = document.querySelector<HTMLElement>('[data-part="backdrop"]')
    const positioner = document.querySelector<HTMLElement>('[data-part="positioner"]')

    expect(backdrop).not.toBeNull()
    expect(positioner).not.toBeNull()
    expect(backdrop?.className).toContain('z-[11000]')
    expect(positioner?.className).toContain('z-[11000]')

    const backdropZ = Number.parseInt(getComputedStyle(backdrop!).zIndex, 10)
    const positionerZ = Number.parseInt(getComputedStyle(positioner!).zIndex, 10)

    expect(backdropZ).toBeGreaterThanOrEqual(MODAL_LAYER_Z_INDEX)
    expect(positionerZ).toBeGreaterThanOrEqual(MODAL_LAYER_Z_INDEX)
    expect(backdropZ).toBeGreaterThan(40)
  })
})
