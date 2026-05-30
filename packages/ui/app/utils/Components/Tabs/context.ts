import type {
  SegmentedIntent,
  SegmentedOrientation,
  SegmentedSize,
  SegmentedVariant,
} from '../Segmented/variants'
import type { InjectionKey, Ref } from 'vue'

export type TabsIntent = SegmentedIntent
export type TabsSize = SegmentedSize
/** @lintignore Public tabs orientation alias */
export type TabsOrientation = SegmentedOrientation
export type TabsVariant = SegmentedVariant

export interface TabsContext {
  intent: Ref<TabsIntent>
  size: Ref<TabsSize>
  orientation: Ref<TabsOrientation>
  variant: Ref<TabsVariant>
}

export const tabsChromeKey: InjectionKey<TabsContext> = Symbol('tabsChrome')

export interface UITabOption {
  disabled?: boolean
  value: string
  label?: string
  /** Tabler icon name (e.g. `tabler:home`). Rendered before the label when using the `options` prop. */
  icon?: string
}
