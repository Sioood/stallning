import type { ClassValue } from 'vue'

export type FormFieldIntent =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'warning'
  | 'error'
  | 'success'

export type FormFieldSize = 'sm' | 'md' | 'lg'
export type FormFieldOrientation = 'horizontal' | 'vertical'

export interface UIFieldSlots {
  root?: ClassValue
  label?: ClassValue
  helperText?: ClassValue
  error?: ClassValue
  requiredIndicator?: ClassValue
}

export interface UIInputSlots extends UIFieldSlots {
  shell?: ClassValue
  input?: ClassValue
  leadingIcon?: ClassValue
  trailingIcon?: ClassValue
}

export interface UICheckboxSlots {
  root?: ClassValue
  control?: ClassValue
  indicator?: ClassValue
  label?: ClassValue
  hiddenInput?: ClassValue
}

export interface UICheckboxGroupSlots {
  root?: ClassValue
}

export interface UISliderSlots extends UIFieldSlots {
  valueText?: ClassValue
  control?: ClassValue
  track?: ClassValue
  range?: ClassValue
  thumb?: ClassValue
  draggingIndicator?: ClassValue
  markerGroup?: ClassValue
  marker?: ClassValue
}

export interface UINumberInputSlots extends UIFieldSlots {
  shell?: ClassValue
  input?: ClassValue
  leadingIcon?: ClassValue
  trailingIcon?: ClassValue
  incrementTrigger?: ClassValue
  decrementTrigger?: ClassValue
  stepperGroup?: ClassValue
  scrubber?: ClassValue
}

export interface UITextareaSlots extends UIFieldSlots {
  shell?: ClassValue
  input?: ClassValue
  leadingIcon?: ClassValue
  trailingIcon?: ClassValue
}
