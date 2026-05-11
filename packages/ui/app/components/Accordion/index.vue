<script setup lang="ts">
import { Accordion as ArkAccordion, type AccordionRootBaseProps } from '@ark-ui/vue/accordion'

import { accordionChromeKey, type AccordionIntent, type AccordionSize } from './context'
import { accordionRootCVA } from './variants'

import type { ClassValue } from 'vue'

defineOptions({ inheritAttrs: false })

export interface UIAccordionSlots {
  root?: ClassValue
}

/** Forwards Ark `Accordion.Root` props, `v-model` (`modelValue`), events, and render strategy. */
export interface AccordionProps extends Omit<AccordionRootBaseProps, 'modelValue'> {
  intent?: AccordionIntent
  size?: AccordionSize
  ui?: Partial<UIAccordionSlots>
}

const props = withDefaults(defineProps<AccordionProps>(), {
  intent: 'neutral',
  size: 'md',
  ui: undefined,
})

const modelValue = defineModel<string[]>({ required: false })

const attrs = useAttrs()

const intent = toRef(props, 'intent')
const size = toRef(props, 'size')

provide(accordionChromeKey, { intent, size })

const rootProps = computed(() =>
  pick(props, [
    'asChild',
    'collapsible',
    'defaultValue',
    'disabled',
    'id',
    'ids',
    'lazyMount',
    'multiple',
    'orientation',
    'unmountOnExit',
  ] as const),
)

const rootAttrs = computed(() => {
  const { ui: _ui, ...rest } = attrs as Record<string, unknown> & { ui?: Partial<UIAccordionSlots> }
  return rest
})

/**
 * When `v-model` is omitted, `defineModel` is `undefined` — binding it to Ark would keep the
 * machine controlled with no value. Only forward `modelValue` when the parent actually bound it.
 */
const rootBindings = computed(() => {
  const base: Record<string, unknown> = {
    ...rootProps.value,
    ...rootAttrs.value,
    class: cn(accordionRootCVA({ intent: intent.value, size: size.value }), props.ui?.root),
  }
  const m = modelValue.value
  if (m !== undefined) {
    base.modelValue = m
    base['onUpdate:modelValue'] = (next: string[]) => {
      modelValue.value = next
    }
  }
  return base
})

extendCompodiumMeta<AccordionProps>({
  defaultProps: {
    intent: 'neutral',
    size: 'md',
    defaultValue: ['one'],
    collapsible: true,
  },
})
</script>

<template>
  <ArkAccordion.Root v-bind="rootBindings">
    <slot />
  </ArkAccordion.Root>
</template>
