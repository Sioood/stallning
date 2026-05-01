import { computed, toValue, type MaybeRefOrGetter } from 'vue'

export type ComponentState = 'default' | 'loading' | 'success' | 'warning' | 'error' | 'info'

export type IconMode = 'button' | 'single'

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
  infoIcon?: string
  mode?: IconMode
}

const defaultIcons = {
  loading: 'tabler:loader',
  success: 'tabler:circle-check',
  warning: 'tabler:alert-triangle',
  error: 'tabler:alert-hexagon',
  info: 'tabler:info-circle',
}

export function useComponentIcons(componentProps: MaybeRefOrGetter<UseComponentIconsProps>) {
  const props = computed(() => toValue(componentProps))
  const mode = computed(() => props.value.mode || 'button')

  const isLeading = computed(
    () =>
      mode.value === 'button' &&
      ((props.value.icon && props.value.leading) ||
        (props.value.icon && !props.value.trailing) ||
        (props.value.state !== 'default' && !props.value.trailing) ||
        !!props.value.leadingIcon),
  )
  const isTrailing = computed(
    () =>
      mode.value === 'button' &&
      ((props.value.icon && props.value.trailing) ||
        (props.value.state !== 'default' && props.value.trailing) ||
        !!props.value.trailingIcon),
  )

  const getStateIcon = (state: ComponentState) => {
    if (state === 'loading') return props.value.loadingIcon || defaultIcons.loading
    if (state === 'success') return props.value.successIcon || defaultIcons.success
    if (state === 'warning') return props.value.warningIcon || defaultIcons.warning
    if (state === 'error') return props.value.errorIcon || defaultIcons.error
    if (state === 'info') return props.value.infoIcon || defaultIcons.info
    return ''
  }

  const leadingIconName = computed(() => {
    const state = props.value.state || 'default'
    const stateIcon = getStateIcon(state)
    if (stateIcon) return stateIcon

    return props.value.leadingIcon || props.value.icon || ''
  })

  const trailingIconName = computed(() => {
    const state = props.value.state || 'default'
    const stateIcon = getStateIcon(state)
    if (stateIcon && !isLeading.value) return stateIcon

    return props.value.trailingIcon || props.value.icon || ''
  })

  const iconName = computed(() => {
    const state = props.value.state || 'default'
    const stateIcon = getStateIcon(state)
    if (stateIcon) return stateIcon

    return props.value.icon || props.value.leadingIcon || ''
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
    iconName,
    shouldAnimate,
  }
}
