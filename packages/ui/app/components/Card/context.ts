import type { ClassValue } from 'vue'

export type CardVariant = 'default' | 'subtle' | 'strong' | 'inverse'

export type CardIntent = 'neutral' | 'primary' | 'secondary' | 'accent'

export type CardSize = 'sm' | 'md' | 'lg'

export interface UICardSlots {
  root?: ClassValue
  content?: ClassValue
}
