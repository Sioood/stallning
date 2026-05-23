<script setup lang="ts">
import {
  TabsRoot,
  TabsRootProvider,
  type TabsRootBaseProps as ArkTabsRootBaseProps,
  type TabsRootProviderBaseProps as ArkTabsRootProviderBaseProps,
  type UseTabsReturn,
} from '@ark-ui/vue/tabs'

import {
  tabsChromeKey,
  type TabsIntent,
  type TabsSize,
  type TabsVariant,
} from '~/utils/Components/Tabs/context'
import { tabsRootCVA } from '~/utils/Components/Tabs/variants'

import type { ClassValue } from 'vue'

defineOptions({ inheritAttrs: false })

export interface UITabsRootSlots {
  root?: ClassValue
}

/**
 * Tabs root component.
 *
 * Supports both Root (controlled/uncontrolled via `v-model`) and
 * RootProvider (pass a `useTabs()` return via `:value`) modes.
 *
 * Compose manually with sub-components:
 * - `<UITabsList>` + `<UITabsTrigger>` + `<UITabsIndicator>`
 * - `<UITabsContent>`
 *
 * For automated list/content from `options`, use `<UITabs>` instead.
 */
export interface TabsRootProps
  extends ArkTabsRootBaseProps, Omit<ArkTabsRootProviderBaseProps, 'value'> {
  /** Pass the return value of `useTabs()` to enable RootProvider mode. */
  value?: UseTabsReturn['value']
  variant?: TabsVariant
  intent?: TabsIntent
  size?: TabsSize
  ui?: Partial<UITabsRootSlots>
}

const modelValue = defineModel<string>()

const props = withDefaults(defineProps<TabsRootProps>(), {
  intent: 'primary',
  orientation: 'horizontal',
  size: 'md',
  ui: undefined,
  value: undefined,
  variant: 'line',
})

const attrs = useAttrs()

provide(tabsChromeKey, {
  intent: computed(() => props.intent),
  size: computed(() => props.size),
  orientation: computed(() => props.orientation),
  variant: computed(() => props.variant),
})

const isProvider = computed(() => props.value !== undefined)

const rootComponent = computed(() => (isProvider.value ? TabsRootProvider : TabsRoot))

const rootProps = computed(() => {
  if (isProvider.value) {
    return pick(props, ['asChild', 'lazyMount', 'unmountOnExit', 'value'] as const)
  }
  return pick(props, [
    'asChild',
    'activationMode',
    'composite',
    'defaultValue',
    'deselectable',
    'id',
    'ids',
    'lazyMount',
    'loopFocus',
    'orientation',
    'translations',
    'unmountOnExit',
  ] as const)
})

const arkAttrs = computed(() => splitArkAttrs(attrs))

const rootClass = computed(() =>
  cn(
    tabsRootCVA({ variant: props.variant, orientation: props.orientation }),
    arkAttrs.value.class as ClassValue,
    props.ui?.root,
  ),
)

extendCompodiumMeta<typeof props & { modelValue?: string }>({
  defaultProps: {
    modelValue: 'react',
    intent: 'primary',
    orientation: 'horizontal',
    size: 'md',
    variant: 'line',
  },
})
</script>

<template>
  <component
    :is="rootComponent"
    v-if="isProvider"
    v-bind="{ ...rootProps, ...arkAttrs, class: rootClass }"
  >
    <slot />
  </component>

  <component
    :is="rootComponent"
    v-else
    v-bind="{ ...rootProps, ...arkAttrs, class: rootClass }"
    :model-value="modelValue"
    @update:model-value="(next) => (modelValue = next)"
    @value-change="(details) => (modelValue = details.value)"
  >
    <slot />
  </component>
</template>

<style scoped>
:deep([data-part='indicator']) {
  left: var(--left);
  top: var(--top);
  width: var(--width);
  height: var(--height);
}
</style>
