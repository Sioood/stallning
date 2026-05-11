import type { InjectionKey, Ref } from 'vue'

export type AccordionIntent = 'neutral' | 'primary' | 'secondary' | 'accent'
export type AccordionSize = 'md'

export interface AccordionChromeContext {
  intent: Ref<AccordionIntent>
  size: Ref<AccordionSize>
}

export const accordionChromeKey: InjectionKey<AccordionChromeContext> = Symbol.for(
  'stallning.ui.accordion.chrome',
)
