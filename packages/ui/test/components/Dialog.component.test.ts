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
    // `z-modal` resolves from the `--z-index-modal` theme token; asserting the class
    // (not just the computed value) keeps the utility from being dropped in favour of
    // relying solely on the imperative `useLayerZIndexRef` fallback.
    expect(backdrop?.className).toContain('z-modal')
    expect(positioner?.className).toContain('z-modal')

    const backdropZ = Number.parseInt(getComputedStyle(backdrop!).zIndex, 10)
    const positionerZ = Number.parseInt(getComputedStyle(positioner!).zIndex, 10)

    expect(backdropZ).toBeGreaterThanOrEqual(MODAL_LAYER_Z_INDEX)
    expect(positionerZ).toBeGreaterThanOrEqual(MODAL_LAYER_Z_INDEX)
    expect(backdropZ).toBeGreaterThan(40)
  })
})
