<script setup lang="ts">
import {
  Toggle as ArkToggle,
  type ToggleRootBaseProps as ArkToggleRootBaseProps,
} from '@ark-ui/vue/toggle'

import type { ClassValue } from 'vue'
import type { ButtonVariants } from '~ui/app/utils/button-variants'

defineOptions({ inheritAttrs: false })

export interface UIToggleSlots {
  root?: ClassValue
}

/** `pressed` is provided via `v-model:pressed`, not as a static root prop. */
export interface ToggleProps extends Omit<ArkToggleRootBaseProps, 'pressed'> {
  /** When on, use the same background / border / text as the button’s active (pressed) state. */
  activeBackground?: boolean
  /** Compact square padding for icon-only toggles (e.g. password visibility). */
  iconOnly?: boolean
  intent?: ButtonVariants['intent']
  size?: ButtonVariants['size']
  variant?: ButtonVariants['variant']
  ui?: Partial<UIToggleSlots>
}

const props = withDefaults(defineProps<ToggleProps>(), {
  activeBackground: false,
  iconOnly: false,
  intent: 'primary',
  size: 'sm',
  variant: 'ghost',
  ui: undefined,
})

const modelValue = defineModel<boolean>({ default: false })

const attrs = useAttrs()

const rootProps = computed(() => ({
  ...pick(props, ['asChild', 'defaultPressed', 'disabled'] as const),
}))

const rootAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs as Record<string, unknown> & { class?: unknown }
  return rest
})

const rootClass = computed(() =>
  cn(
    buttonVariants({
      disabled: props.disabled,
      intent: props.intent,
      size: props.size,
      variant: props.variant,
    }),
    props.activeBackground
      ? togglePressedOn({ intent: props.intent, variant: props.variant })
      : null,
    props.iconOnly ? 'min-w-0 shrink-0 gap-0 px-1.5 py-1.5' : null,
    attrs.class,
    props.ui?.root,
  ),
)

extendCompodiumMeta<typeof props & { modelValue?: boolean }>({
  defaultProps: {
    activeBackground: true,
    iconOnly: true,
    intent: 'primary',
    size: 'sm',
    variant: 'ghost',
  },
})
</script>

<template>
  <ArkToggle.Root
    v-bind="{ ...rootProps, ...rootAttrs }"
    v-model:pressed="modelValue"
    type="button"
    :class="rootClass"
  >
    <ArkToggle.Indicator>
      <slot name="on" />
      <template #fallback>
        <slot name="off" />
      </template>
    </ArkToggle.Indicator>
  </ArkToggle.Root>
</template>
