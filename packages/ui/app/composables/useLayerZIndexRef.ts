import { onScopeDispose } from 'vue'

import { LAYER_Z_INDEX, type LayerZIndexKey } from '@/utils/layer-z-index'

function resolveHTMLElement(node: unknown): HTMLElement | null {
  if (node instanceof HTMLElement) return node
  if (!node || typeof node !== 'object') return null

  if ('$el' in node) {
    const el = (node as { $el: unknown }).$el
    if (el instanceof HTMLElement) return el
  }

  return null
}

function applyLayerZIndex(el: HTMLElement, zIndex: number): void {
  const current = el.style.getPropertyValue('z-index')
  const priority = el.style.getPropertyPriority('z-index')
  if (current === String(zIndex) && priority === 'important') {
    return
  }
  el.style.setProperty('z-index', String(zIndex), 'important')
  // Ark nested-layer plumbing reads this CSS variable on some parts.
  el.style.setProperty('--z-index', String(zIndex))
}

/**
 * Zag/Ark positioners often set `z-index: auto` (or `--z-index: auto`) inline,
 * which beats Tailwind classes. Re-apply the layer z-index when the node mounts
 * and whenever Zag mutates `style`.
 *
 * Ark Presence may briefly expose a Comment as `$el` before swapping to the
 * real element — retry briefly so backdrop/positioner refs still bind.
 */
export function useLayerZIndexRef(layer: LayerZIndexKey = 'floating'): (node: unknown) => void {
  const zIndex = LAYER_Z_INDEX[layer]
  let observer: MutationObserver | undefined
  let retryFrame = 0
  let retryCount = 0

  const clearRetry = () => {
    if (retryFrame) {
      cancelAnimationFrame(retryFrame)
      retryFrame = 0
    }
    retryCount = 0
  }

  onScopeDispose(() => {
    observer?.disconnect()
    observer = undefined
    clearRetry()
  })

  const bind = (el: HTMLElement) => {
    applyLayerZIndex(el, zIndex)
    observer?.disconnect()
    observer = new MutationObserver(() => {
      applyLayerZIndex(el, zIndex)
    })
    observer.observe(el, { attributeFilter: ['style'], attributes: true })
  }

  return (node: unknown) => {
    observer?.disconnect()
    observer = undefined
    clearRetry()

    if (!node) return

    const el = resolveHTMLElement(node)
    if (el) {
      bind(el)
      return
    }

    // Presence Comment → Element: keep polling the same component ref briefly.
    const poll = () => {
      retryCount += 1
      const resolved = resolveHTMLElement(node)
      if (resolved) {
        clearRetry()
        bind(resolved)
        return
      }
      if (retryCount < 30) {
        retryFrame = requestAnimationFrame(poll)
      }
    }
    retryFrame = requestAnimationFrame(poll)
  }
}

/** Alias for select/combobox/date-picker/menu/popover/tooltip positioners. */
export function useFloatingLayerPositionerRef(): (node: unknown) => void {
  return useLayerZIndexRef('floating')
}
