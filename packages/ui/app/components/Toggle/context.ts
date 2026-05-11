import type { ClassValue } from 'vue'
import type { ButtonVariants } from '~ui/app/utils/button-variants'

export type ToggleIntent = NonNullable<ButtonVariants['intent']>
export type ToggleSize = NonNullable<ButtonVariants['size']>
export type ToggleVariant = NonNullable<ButtonVariants['variant']>

export type ToggleGroupOrientation = 'horizontal' | 'vertical'

export interface UIToggleSlots {
  root?: ClassValue
  indicator?: ClassValue
}

export interface UIToggleGroupSlots {
  root?: ClassValue
  item?: ClassValue
}
