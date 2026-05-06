<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import { mergeProps, type ClassValue } from 'vue'

import {
  useComponentIcons,
  type UseComponentIconsProps,
  type ComponentState,
} from '~ui/app/composables/useComponentIcons'
import { buttonVariants as button } from '~ui/app/utils/button-variants'
import { cn } from '~ui/app/utils/cn'

import Link from './Link.vue'

import type { NuxtLinkProps } from '#app'

defineOptions({ inheritAttrs: false })

type ButtonCVAProps = VariantProps<typeof button>

const buttonIconCVA = cva('buttonIcon shrink-0', {
  variants: {
    size: {
      sm: 'size-2.5',
      md: 'size-3',
      lg: 'size-4',
    },
  },
})

export interface UIButtonSlots {
  root?: ClassValue
  leadingIcon?: ClassValue
  trailingIcon?: ClassValue
}

interface ButtonProps extends UseComponentIconsProps {
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
  onClick?: () => Promise<void> | void
  autoResetDelay?: number
  onStateChange?: (state: ComponentState) => void
  ui?: Partial<UIButtonSlots>
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
  onClick: undefined,
  autoResetDelay: 3500,
  onStateChange: undefined,
  variant: 'default',
  intent: 'primary',
  size: 'md',
  ui: undefined,
})

const internalState = ref<ComponentState>(props.state || 'default')

const effectiveState = computed(() => internalState.value || props.state)

const propsWithState = computed(() => ({ ...props, state: effectiveState.value }))

const { isLeading, isTrailing, leadingIconName, trailingIconName, shouldAnimate } =
  useComponentIcons(propsWithState)

const iconClass = (slotClass: ClassValue | undefined) =>
  cn(buttonIconCVA({ size: props.size }), { 'animate-spin': shouldAnimate.value }, slotClass)

const linkProps = computed(
  () => props as Omit<typeof props, keyof ButtonProps | keyof UseComponentIconsProps>,
)

const attrs = useAttrs()

const buttonRootAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs as Record<string, unknown> & { class?: unknown }
  return rest
})

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
    v-bind="
      mergeProps(
        buttonRootAttrs,
        to
          ? { ...linkProps, disabled }
          : { type, disabled: props.disabled || effectiveState === 'loading', onClick: handleClick },
      )
    "
    :class="
      cn(
        button({
          variant: props.variant,
          intent: ['success', 'error'].includes(effectiveState)
            ? (effectiveState as 'success' | 'error')
            : props.intent,
          size: props.size,
          disabled: props.disabled || effectiveState !== 'default',
        }),
        attrs.class,
        props.ui?.root,
      )
    "
  >
    <Icon
      v-if="isLeading"
      :name="leadingIconName"
      :class="iconClass(props.ui?.leadingIcon)"
    />
    <slot>
      {{ text }}
    </slot>
    <Icon
      v-if="isTrailing"
      :name="trailingIconName"
      :class="iconClass(props.ui?.trailingIcon)"
    />
  </component>
</template>
