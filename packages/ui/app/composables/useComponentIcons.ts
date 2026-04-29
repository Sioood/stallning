import { computed, toValue, type MaybeRefOrGetter } from 'vue'

export type ComponentState = 'default' | 'loading' | 'success' | 'warning' | 'error'

export interface UseComponentIconsProps {
  icon?: string
  leading?: boolean
  leadingIcon?: string
  trailing?: boolean
  trailingIcon?: string
  state?: ComponentState
  loadingIcon?: string
  successIcon?: string
  warningIcon?: string
  errorIcon?: string
}

export function useComponentIcons(componentProps: MaybeRefOrGetter<UseComponentIconsProps>) {
  const props = computed(() => toValue(componentProps))

  const isLeading = computed(
    () =>
      (props.value.icon && props.value.leading) ||
      (props.value.icon && !props.value.trailing) ||
      (props.value.state !== 'default' && !props.value.trailing) ||
      !!props.value.leadingIcon,
  )
  const isTrailing = computed(
    () =>
      (props.value.icon && props.value.trailing) ||
      (props.value.state !== 'default' && props.value.trailing) ||
      !!props.value.trailingIcon,
  )

  const leadingIconName = computed(() => {
    const state = props.value.state || 'default'
    if (state === 'loading') {
      return props.value.loadingIcon || 'tabler:loader'
    }
    if (state === 'success') {
      return props.value.successIcon || 'tabler:circle-check'
    }
    if (state === 'warning') {
      return props.value.warningIcon || 'tabler:alert-triangle'
    }
    if (state === 'error') {
      return props.value.errorIcon || 'tabler:circle-x'
    }

    return props.value.leadingIcon || props.value.icon || ''
  })
  const trailingIconName = computed(() => {
    const state = props.value.state || 'default'
    if (state !== 'default' && !isLeading.value) {
      if (state === 'loading') {
        return props.value.loadingIcon || 'tabler:loader'
      }
      if (state === 'success') {
        return props.value.successIcon || 'tabler:circle-check'
      }
      if (state === 'warning') {
        return props.value.warningIcon || 'tabler:alert-triangle'
      }
      if (state === 'error') {
        return props.value.errorIcon || 'tabler:circle-x'
      }
    }

    return props.value.trailingIcon || props.value.icon || ''
  })

  const shouldAnimate = computed(() => {
    const state = props.value.state || 'default'
    return state === 'loading'
  })

  return {
    isLeading,
    isTrailing,
    leadingIconName,
    trailingIconName,
    shouldAnimate,
  }
}
