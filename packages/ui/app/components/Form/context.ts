import type { ClassValue } from 'vue'

export type FormFieldIntent = 'primary'

export type FormFieldSize = 'md'

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
