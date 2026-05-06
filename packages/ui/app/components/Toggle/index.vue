<script setup lang="ts">
import { Swap } from '@ark-ui/vue/swap'
import {
  Toggle as ArkToggle,
  type ToggleRootBaseProps as ArkToggleRootBaseProps,
} from '@ark-ui/vue/toggle'

import type { ClassValue } from 'vue'
import type { ButtonVariants } from '~ui/app/utils/button-variants'

defineOptions({ inheritAttrs: false })

export interface UIToggleSlots {
  root?: ClassValue
  indicator?: ClassValue
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
  ui?: UIToggleSlots
  indicatorAnimation?: 'fade' | 'flip' | 'scale' | 'rotate'
}

const props = withDefaults(defineProps<ToggleProps>(), {
  activeBackground: false,
  iconOnly: false,
  intent: 'primary',
  size: 'sm',
  variant: 'ghost',
  ui: undefined,
  indicatorAnimation: 'fade',
})

const pressed = defineModel<boolean>('pressed',{ default: false })

const attrs = useAttrs()

const rootProps = computed(() => ({
  ...pick(props, ['asChild', 'defaultPressed', 'disabled'] as const),
}))

const rootAttrs = computed(() => {
  const { ui: _ui, ...rest } = attrs as Record<string, unknown> & { ui?: UIToggleSlots }
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
    props.ui?.root,
  ),
)
</script>

<template>
  <ArkToggle.Root
    v-bind="{ ...rootProps, ...rootAttrs }"
    v-model:pressed="pressed"
    type="button"
    :class="rootClass"
  >
    <Swap.Root :swap="pressed">
      <ArkToggle.Indicator :class="ui?.indicator">
        <Swap.Indicator type="on" :class="indicatorAnimation">
          <slot name="on" />
        </Swap.Indicator>

        <template #fallback>
          <Swap.Indicator type="off" :class="indicatorAnimation">
            <slot name="off" />
          </Swap.Indicator>
        </template>
      </ArkToggle.Indicator>
    </Swap.Root>
  </ArkToggle.Root>
</template>

<style scoped>
.fade {
  &[data-state='open'] {
    animation-name: fade-in, blur-in;
    animation-duration: 200ms;
    animation-timing-function: ease-out;
  }

  &[data-state='closed'] {
    animation-name: fade-out, blur-out;
    animation-duration: 100ms;
    animation-timing-function: ease-in;
  }
}

.flip {
  backface-visibility: hidden;

  &[data-state='open'] {
    animation-name: flip-in, blur-in;
    animation-duration: 400ms;
    animation-timing-function: ease;
  }

  &[data-state='closed'] {
    animation-name: flip-out, blur-out;
    animation-duration: 200ms;
    animation-timing-function: ease;
  }
}

.scale {
  &[data-state='open'] {
    animation-name: scale-in, fade-in, blur-in;
    animation-duration: 200ms;
    animation-timing-function: ease-out;
  }

  &[data-state='closed'] {
    animation-name: scale-out, fade-out, blur-out;
    animation-duration: 100ms;
    animation-timing-function: ease-in;
  }
}

.rotate {
  &[data-state='open'] {
    animation-name: rotate-in, fade-in, blur-in;
    animation-duration: 250ms;
    animation-timing-function: ease-out;
  }

  &[data-state='closed'] {
    animation-name: rotate-out, fade-out, blur-out;
    animation-duration: 100ms;
    animation-timing-function: ease-in;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes rotate-in {
  from {
    transform: rotate(-90deg);
  }
  to {
    transform: rotate(0deg);
  }
}

@keyframes rotate-out {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(90deg);
  }
}

@keyframes scale-in {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

@keyframes scale-out {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
}

@keyframes flip-in {
  from {
    transform: rotateY(180deg);
  }
  to {
    transform: rotateY(0deg);
  }
}

@keyframes flip-out {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(180deg);
  }
}

@keyframes blur-in {
  from {
    filter: blur(2px);
  }
  to {
    filter: blur(0);
  }
}

@keyframes blur-out {
  from {
    filter: blur(0);
  }
  to {
    filter: blur(2px);
  }
}
</style>
