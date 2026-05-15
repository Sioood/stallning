import type { ComponentIntent, ComponentSize } from '../contextBase'
import type { InjectionKey, Ref } from 'vue'

export type SegmentGroupIntent = NonNullable<
  Extract<ComponentIntent, 'neutral' | 'primary' | 'secondary' | 'accent'>
>
export type SegmentGroupSize = NonNullable<ComponentSize>

export interface SegmentGroupContext {
  intent: Ref<SegmentGroupIntent>
  size: Ref<SegmentGroupSize>
}

export const segmentGroupChromeKey: InjectionKey<SegmentGroupContext> = Symbol('segmentGroupChrome')
