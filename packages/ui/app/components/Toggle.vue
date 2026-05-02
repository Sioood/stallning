<script setup lang="ts">
import { Toggle as ArkToggle } from '@ark-ui/vue/toggle'

import { buttonVariants, togglePressedOn } from '../utils/button-variants'

import type { ButtonVariants } from '~ui/app/utils/button-variants'

defineOptions({ inheritAttrs: false })

interface ToggleProps {
  disabled?: boolean
  variant?: ButtonVariants['variant']
  intent?: ButtonVariants['intent']
  size?: ButtonVariants['size']
  /** Compact square padding for icon-only toggles (e.g. password visibility). */
  iconOnly?: boolean
  /** When on, use the same background / border / text as the button’s active (pressed) state. */
  activeBackground?: boolean
}

const props = withDefaults(defineProps<ToggleProps>(), {
  disabled: false,
  variant: 'ghost',
  intent: 'primary',
  size: 'sm',
  iconOnly: false,
  activeBackground: false,
})

const pressed = defineModel<boolean>('pressed', { default: false })

const rootClass = computed(() => [
  buttonVariants({
    variant: props.variant,
    intent: props.intent,
    size: props.size,
    disabled: props.disabled,
  }),
  props.activeBackground ? togglePressedOn({ variant: props.variant, intent: props.intent }) : null,
  props.iconOnly ? 'min-w-0 shrink-0 gap-0 px-1.5 py-1.5' : null,
])

extendCompodiumMeta<typeof props & { pressed?: boolean }>({
  defaultProps: {
    pressed: false,
    disabled: false,
    variant: 'ghost',
    intent: 'primary',
    size: 'sm',
    iconOnly: true,
    activeBackground: true,
  },
})
</script>

<template>
  <ArkToggle.Root
    v-bind="$attrs"
    v-model:pressed="pressed"
    type="button"
    :disabled
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
