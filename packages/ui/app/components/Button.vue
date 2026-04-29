<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'

import {
  useComponentIcons,
  type UseComponentIconsProps,
  type ComponentState,
} from '~ui/app/composables/useComponentIcons'

import Link from './Link.vue'

import type { NuxtLinkProps } from '#app'

const button = cva('button inline-flex justify-center items-center', {
  variants: {
    variant: {
      default: 'border',
      subtle: '',
      ghost: '',
    },
    intent: {
      neutral:
        'bg-neutral-fill-default border-neutral-border-default text-neutral-text-inverse hover:bg-neutral-fill-default-hover hover:border-neutral-border-hover hover:text-neutral-text-inverse-hover active:bg-neutral-fill-default-active active:border-neutral-border-default-active active:text-neutral-text-inverse-active disabled:bg-neutral-fill-default-disabled disabled:border-neutral-border-default-disabled disabled:text-neutral-text-inverse-disabled',
      primary:
        'bg-primary-fill-default border-primary-border-default text-primary-text-inverse hover:bg-primary-fill-default-hover hover:border-primary-border-hover hover:text-primary-text-inverse-hover active:bg-primary-fill-default-active active:border-primary-border-default-active active:text-primary-text-inverse-active disabled:bg-primary-fill-default-disabled disabled:border-primary-border-default-disabled disabled:text-primary-text-inverse-disabled',
      secondary:
        'bg-secondary-fill-default border-secondary-border-default text-secondary-text-inverse hover:bg-secondary-fill-default-hover hover:border-secondary-border-hover hover:text-secondary-text-inverse-hover active:bg-secondary-fill-default-active active:border-secondary-border-default-active active:text-secondary-text-inverse-active disabled:bg-secondary-fill-default-disabled disabled:border-secondary-border-default-disabled disabled:text-secondary-text-inverse-disabled',
      accent:
        'bg-accent-fill-default border-accent-border-default text-accent-text-inverse hover:bg-accent-fill-default-hover hover:border-accent-border-hover hover:text-accent-text-inverse-hover active:bg-accent-fill-default-active active:border-accent-border-default-active active:text-accent-text-inverse-active disabled:bg-accent-fill-default-disabled disabled:border-accent-border-default-disabled disabled:text-accent-text-inverse-disabled',
      info: 'bg-info-fill-default border-info-border-default text-info-text-inverse hover:bg-info-fill-default-hover hover:border-info-border-hover hover:text-info-text-inverse-hover active:bg-info-fill-default-active active:border-info-border-default-active active:text-info-text-inverse-active disabled:bg-info-fill-default-disabled disabled:border-info-border-default-disabled disabled:text-info-text-inverse-disabled',
      warning:
        'bg-warning-fill-default border-warning-border-default text-warning-text-inverse hover:bg-warning-fill-default-hover hover:border-warning-border-hover hover:text-warning-text-inverse-hover active:bg-warning-fill-default-active active:border-warning-border-default-active active:text-warning-text-inverse-active disabled:bg-warning-fill-default-disabled disabled:border-warning-border-default-disabled disabled:text-warning-text-inverse-disabled',
      error:
        'bg-error-fill-default border-error-border-default text-error-text-inverse hover:bg-error-fill-default-hover hover:border-error-border-hover hover:text-error-text-inverse-hover active:bg-error-fill-default-active active:border-error-border-default-active active:text-error-text-inverse-active disabled:bg-error-fill-default-disabled disabled:border-error-border-default-disabled disabled:text-error-text-inverse-disabled',
      success:
        'bg-success-fill-default border-success-border-default text-success-text-inverse hover:bg-success-fill-default-hover hover:border-success-border-hover hover:text-success-text-inverse-hover active:bg-success-fill-default-active active:border-success-border-default-active active:text-success-text-inverse-active disabled:bg-success-fill-default-disabled disabled:border-success-border-default-disabled disabled:text-success-text-inverse-disabled',
    },
    size: {
      sm: 'txt-caption px-2 py-1 gap-1.5',
      md: 'txt-base px-4 py-2 gap-3',
      lg: 'txt-h6 px-5 py-3 gap-4',
    },
    disabled: {
      true: 'cursor-not-allowed',
      false: 'cursor-pointer active:scale-97',
    },
  },
})

type ButtonCVAProps = VariantProps<typeof button>

interface ButtonProps {
  /**
   * text to display in the button
   * used if no slot is provided
   */
  text?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  variant?: ButtonCVAProps['variant']
  intent?: ButtonCVAProps['intent']
  size?: ButtonCVAProps['size']
  handleLoadingState?: boolean
  state?: ComponentState
  loadingIcon?: string
  successIcon?: string
  warningIcon?: string
  errorIcon?: string
  onClick?: () => Promise<void> | void
  autoResetDelay?: number
  onStateChange?: (state: ComponentState) => void
}

const props = withDefaults(defineProps<NuxtLinkProps & UseComponentIconsProps & ButtonProps>(), {
  text: '',
  type: 'button',
  disabled: false,
  icon: undefined,
  leading: false,
  leadingIcon: undefined,
  trailing: false,
  trailingIcon: undefined,
  state: 'default',
  handleLoadingState: false,
  loadingIcon: undefined,
  successIcon: undefined,
  warningIcon: undefined,
  errorIcon: undefined,
  onClick: undefined,
  autoResetDelay: 3500,
  onStateChange: undefined,
  variant: 'default',
  intent: 'primary',
  size: 'md',
})

const internalState = ref<ComponentState>(props.state || 'default')

const effectiveState = computed(() => internalState.value || props.state)

const propsWithState = computed(() => ({ ...props, state: effectiveState.value }))

const { isLeading, isTrailing, leadingIconName, trailingIconName, shouldAnimate } =
  useComponentIcons(propsWithState)

const linkProps = computed(
  () => props as Omit<typeof props, keyof ButtonProps | keyof UseComponentIconsProps>,
)

const handleClick = async () => {
  if (!props.onClick || props.to || internalState.value !== 'default' || props.disabled) return

  if (!props.handleLoadingState) return props.onClick()

  internalState.value = 'loading'
  props.onStateChange?.('loading')
  try {
    await props.onClick()

    internalState.value = 'success'
    props.onStateChange?.('success')
  } catch {
    internalState.value = 'error'
    props.onStateChange?.('error')
  }

  if (
    props.autoResetDelay &&
    (internalState.value === 'success' || internalState.value === 'error')
  ) {
    setTimeout(() => {
      internalState.value = 'default'
      props.onStateChange?.('default')
    }, props.autoResetDelay)
  }
}

extendCompodiumMeta<typeof props>({
  defaultProps: {
    text: 'Button',
    variant: 'default',
    intent: 'primary',
    size: 'md',
    icon: 'tabler:scribble',
    leading: true,
    trailing: true,
    disabled: false,
    state: 'default',
    loadingIcon: 'tabler:loader',
    successIcon: 'tabler:circle-check',
    warningIcon: 'tabler:alert-triangle',
    errorIcon: 'tabler:alert-hexagon',
  },
})
</script>

<template>
  <component
    :is="to ? Link : 'button'"
    v-bind="to ? { ...linkProps, disabled } : { type, disabled: props.disabled || effectiveState === 'loading', onClick: handleClick }"
    :class="
      button({
        variant: props.variant,
        intent: ['success', 'error'].includes(effectiveState)
          ? (effectiveState as 'success' | 'error')
          : props.intent,
        size: props.size,
        disabled: props.disabled || effectiveState !== 'default',
      })
    "
  >
    <Icon v-if="isLeading" :name="leadingIconName" :class="{ 'animate-spin': shouldAnimate }" />
    <slot>
      {{ text }}
    </slot>
    <Icon v-if="isTrailing" :name="trailingIconName" :class="{ 'animate-spin': shouldAnimate }" />
  </component>
</template>
