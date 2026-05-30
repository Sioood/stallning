import { describe, expect, it } from 'vitest'

import { resolveActionVariant, type TourStepAction } from '~ui/app/utils/Components/Tour/variants'

describe('Tour variants', () => {
  describe('resolveActionVariant', () => {
    it('returns primary for dismiss action as last action', () => {
      const actions: TourStepAction[] = [
        { label: 'Back', action: 'prev' },
        { label: 'Finish', action: 'dismiss' },
      ]

      expect(resolveActionVariant(actions[1]!, actions, 1)).toBe('primary')
    })

    it('returns primary for next action as last action', () => {
      const actions: TourStepAction[] = [{ label: 'Next', action: 'next' }]

      expect(resolveActionVariant(actions[0]!, actions, 0)).toBe('primary')
    })

    it('returns default for prev action as last action', () => {
      const actions: TourStepAction[] = [
        { label: 'Next', action: 'next' },
        { label: 'Back', action: 'prev' },
      ]

      expect(resolveActionVariant(actions[1]!, actions, 1)).toBe('default')
    })

    it('returns default for non-last actions', () => {
      const actions: TourStepAction[] = [
        { label: 'Back', action: 'prev' },
        { label: 'Next', action: 'next' },
        { label: 'Finish', action: 'dismiss' },
      ]

      expect(resolveActionVariant(actions[0]!, actions, 0)).toBe('default')
      expect(resolveActionVariant(actions[1]!, actions, 1)).toBe('default')
    })

    it('returns primary for next action when it is the only action', () => {
      const actions: TourStepAction[] = [{ label: 'Next', action: 'next' }]

      expect(resolveActionVariant(actions[0]!, actions, 0)).toBe('primary')
    })

    it('returns primary for dismiss action when it is the only action', () => {
      const actions: TourStepAction[] = [{ label: 'Close', action: 'dismiss' }]

      expect(resolveActionVariant(actions[0]!, actions, 0)).toBe('primary')
    })
  })
})
