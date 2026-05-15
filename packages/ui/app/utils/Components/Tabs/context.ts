import type { SegmentedIntent, SegmentedOrientation, SegmentedSize } from '../Segmented/variants'
import type { InjectionKey, Ref } from 'vue'

export type TabsIntent = SegmentedIntent
export type TabsSize = SegmentedSize
export type TabsOrientation = SegmentedOrientation

export interface TabsContext {
  intent: Ref<TabsIntent>
  size: Ref<TabsSize>
  orientation: Ref<TabsOrientation>
}

export const tabsChromeKey: InjectionKey<TabsContext> = Symbol('tabsChrome')
