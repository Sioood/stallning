import type { ClassValue } from 'vue'

export interface UIMenuSlots {
  trigger?: ClassValue
  indicator?: ClassValue
  positioner?: ClassValue
  content?: ClassValue
  arrow?: ClassValue
  arrowTip?: ClassValue
  item?: ClassValue
  itemGroup?: ClassValue
  itemGroupLabel?: ClassValue
  separator?: ClassValue
  itemIndicator?: ClassValue
  itemText?: ClassValue
  triggerItem?: ClassValue
  contextTrigger?: ClassValue
}

export type MenuIntent = 'neutral' | 'primary' | 'secondary' | 'accent'

export type MenuSize = 'md'
