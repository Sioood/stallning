<script setup lang="ts">
import {
  Accordion as ArkAccordion,
  type AccordionRootProviderBaseProps,
} from '@ark-ui/vue/accordion'

import { accordionChromeKey, type AccordionIntent, type AccordionSize } from './context'
import { accordionRootCVA } from './variants'

import type { ClassValue } from 'vue'

defineOptions({ inheritAttrs: false })

export interface UIAccordionRootProviderSlots {
  root?: ClassValue
}

/** Headless root from `useAccordion()` with the same chrome (`intent`, `size`, `ui`) as `UIAccordion`. */
export interface AccordionRootProviderProps extends AccordionRootProviderBaseProps {
  intent?: AccordionIntent
  size?: AccordionSize
  ui?: Partial<UIAccordionRootProviderSlots>
}

const props = withDefaults(defineProps<AccordionRootProviderProps>(), {
  intent: 'neutral',
  size: 'md',
  ui: undefined,
})

const attrs = useAttrs()

const intent = toRef(props, 'intent')
const size = toRef(props, 'size')

provide(accordionChromeKey, { intent, size })

const providerProps = computed(() =>
  pick(props, ['asChild', 'lazyMount', 'unmountOnExit', 'value'] as const),
)

const providerAttrs = computed(() => {
  const { ui: _ui, ...rest } = attrs as Record<string, unknown> & {
    ui?: Partial<UIAccordionRootProviderSlots>
  }
  return rest
})

extendCompodiumMeta<AccordionRootProviderProps>({
  defaultProps: {
    intent: 'neutral',
    size: 'md',
  },
})
</script>

<template>
  <ArkAccordion.RootProvider
    v-bind="{ ...providerProps, ...providerAttrs }"
    :class="cn(accordionRootCVA({ intent, size }), ui?.root)"
  >
    <slot />
  </ArkAccordion.RootProvider>
</template>
