import type {
  SegmentedIntent,
  SegmentedOrientation,
  SegmentedSize,
  SegmentedVariant,
} from '../Segmented/variants'
import type { InjectionKey, Ref } from 'vue'

export type TabsIntent = SegmentedIntent
export type TabsSize = SegmentedSize
export type TabsOrientation = SegmentedOrientation
export type TabsVariant = SegmentedVariant

export interface TabsContext {
  intent: Ref<TabsIntent>
  size: Ref<TabsSize>
  orientation: Ref<TabsOrientation>
  variant: Ref<TabsVariant>
}

export const tabsChromeKey: InjectionKey<TabsContext> = Symbol('tabsChrome')
