<script setup lang="ts">
import { TabTrigger, type TabTriggerBaseProps } from '@ark-ui/vue/tabs'

import { segmentedItemCVA } from '~/utils/Components/Segmented/variants'
import { tabsChromeKey, type TabsIntent, type TabsSize } from '~/utils/Components/Tabs/context'

import type { ClassValue } from 'vue'

defineOptions({ inheritAttrs: false })

export interface UITabsTriggerSlots {
  root?: ClassValue
}

export interface TabsTriggerProps extends TabTriggerBaseProps {
  intent?: TabsIntent
  size?: TabsSize
  ui?: Partial<UITabsTriggerSlots>
}

const props = withDefaults(defineProps<TabsTriggerProps>(), {
  intent: undefined,
  size: undefined,
  disabled: undefined,
  ui: undefined,
})

const attrs = useAttrs()

const chrome = inject(tabsChromeKey, null)

const intent = computed<TabsIntent>(() => props.intent ?? chrome?.intent.value ?? 'primary')
const size = computed<TabsSize>(() => props.size ?? chrome?.size.value ?? 'md')
const orientation = computed(() => chrome?.orientation.value ?? 'horizontal')
const variant = computed(() => chrome?.variant.value ?? 'line')
const isDisabled = computed(() => props.disabled ?? false)

const triggerProps = computed(() => pick(props, ['asChild', 'disabled', 'value'] as const))
const triggerAttrs = computed(() => splitArkAttrs(attrs))

extendCompodiumMeta({
  defaultProps: {
    value: 'react',
  },
})
</script>

<template>
  <TabTrigger
    v-bind="{ ...triggerProps, ...triggerAttrs }"
    :class="
      cn(segmentedItemCVA({ variant, intent, size, orientation, disabled: isDisabled }), ui?.root)
    "
  >
    <slot />
  </TabTrigger>
</template>
