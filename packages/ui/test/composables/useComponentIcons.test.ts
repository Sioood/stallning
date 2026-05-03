import { describe, expect, it } from 'vitest'
import { effectScope, ref } from 'vue'

import { useComponentIcons } from '../../app/composables/useComponentIcons'

describe('useComponentIcons', () => {
  it('uses default tabler icons per state in single mode', () => {
    const states = [
      ['loading', 'tabler:loader', true],
      ['success', 'tabler:circle-check', false],
      ['warning', 'tabler:alert-triangle', false],
      ['error', 'tabler:alert-hexagon', false],
      ['info', 'tabler:info-circle', false],
    ] as const

    for (const [state, expected, animate] of states) {
      const scope = effectScope(true)
      scope.run(() => {
        const props = ref({
          state,
          mode: 'single' as const,
        })
        const { iconName, shouldAnimate } = useComponentIcons(props)
        expect(iconName.value).toBe(expected)
        expect(shouldAnimate.value).toBe(animate)
      })
      scope.stop()
    }
  })

  it('prefers custom state icons when provided', () => {
    const scope = effectScope(true)
    scope.run(() => {
      const props = ref({
        state: 'loading' as const,
        mode: 'single' as const,
        loadingIcon: 'custom:spin',
      })
      const { iconName } = useComponentIcons(props)
      expect(iconName.value).toBe('custom:spin')
    })
    scope.stop()
  })

  it('leading shows state icon in button mode', () => {
    const scope = effectScope(true)
    scope.run(() => {
      const props = ref({
        mode: 'button' as const,
        state: 'success' as const,
        trailing: false,
      })
      const { isLeading, leadingIconName } = useComponentIcons(props)
      expect(isLeading.value).toBe(true)
      expect(leadingIconName.value).toBe('tabler:circle-check')
    })
    scope.stop()
  })

  it('trailing shows state icon when leading is false', () => {
    const scope = effectScope(true)
    scope.run(() => {
      const props = ref({
        mode: 'button' as const,
        state: 'error' as const,
        trailing: true,
      })
      const { isTrailing, trailingIconName } = useComponentIcons(props)
      expect(isTrailing.value).toBe(true)
      expect(trailingIconName.value).toBe('tabler:alert-hexagon')
    })
    scope.stop()
  })

  it('uses icon and leading flag for default state', () => {
    const scope = effectScope(true)
    scope.run(() => {
      const props = ref({
        mode: 'button' as const,
        state: 'default' as const,
        icon: 'tabler:mail',
        leading: true,
      })
      const { isLeading, leadingIconName } = useComponentIcons(props)
      expect(isLeading.value).toBe(true)
      expect(leadingIconName.value).toBe('tabler:mail')
    })
    scope.stop()
  })

  it('uses trailingIcon when no state icon on trailing side', () => {
    const scope = effectScope(true)
    scope.run(() => {
      const props = ref({
        mode: 'button' as const,
        state: 'default' as const,
        trailing: true,
        trailingIcon: 'tabler:chevron-down',
      })
      const { trailingIconName } = useComponentIcons(props)
      expect(trailingIconName.value).toBe('tabler:chevron-down')
    })
    scope.stop()
  })

  it('returns empty leading icon for default state without icons', () => {
    const scope = effectScope(true)
    scope.run(() => {
      const props = ref({
        mode: 'button' as const,
        state: 'default' as const,
      })
      const { leadingIconName } = useComponentIcons(props)
      expect(leadingIconName.value).toBe('')
    })
    scope.stop()
  })
})
