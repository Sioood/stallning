import type { ClassValue } from 'vue'

export type SelectIntent = 'neutral' | 'primary' | 'secondary' | 'accent'
export type SelectSize = 'sm' | 'md' | 'lg'

export interface SelectItem {
  label: string
  value: string
  disabled: boolean
  group?: string
}

export interface UISelectSlots {
  root?: ClassValue
  label?: ClassValue
  control?: ClassValue
  trigger?: ClassValue
  valueText?: ClassValue
  indicator?: ClassValue
  clearTrigger?: ClassValue
  positioner?: ClassValue
  content?: ClassValue
  itemGroup?: ClassValue
  itemGroupLabel?: ClassValue
  item?: ClassValue
  itemText?: ClassValue
  itemIndicator?: ClassValue
}
