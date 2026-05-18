<script setup lang="ts">
import {
  type TabsRootBaseProps as ArkTabsRootBaseProps,
  type TabsRootProviderBaseProps as ArkTabsRootProviderBaseProps,
  type UseTabsReturn,
} from '@ark-ui/vue/tabs'

import {
  type TabsIntent,
  type TabsSize,
  type TabsVariant,
  type UITabOption,
} from '~/utils/Components/Tabs/context'
import { tabsOptionIconCVA } from '~/utils/Components/Tabs/variants'

import type { UITabsRootSlots } from './Root.vue'
import type { ClassValue } from 'vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

export type { UITabOption } from '~/utils/Components/Tabs/context'

export interface UITabsSlots extends UITabsRootSlots {
  list?: ClassValue
  indicator?: ClassValue
  trigger?: ClassValue
  content?: ClassValue
}

/**
 * High-level Tabs component.
 *
 * Automates rendering of list, triggers (with optional icons), indicator, and content panels
 * from the `options` prop.
 *
 * For full control, use `<UITabsRoot>` with `<UITabsList>`, `<UITabsTrigger>`, etc.
 */
export interface TabsProps
  extends ArkTabsRootBaseProps, Omit<ArkTabsRootProviderBaseProps, 'value'> {
  value?: UseTabsReturn['value']
  variant?: TabsVariant
  intent?: TabsIntent
  size?: TabsSize
  options?: UITabOption[]
  ui?: Partial<UITabsSlots>
}

const modelValue = defineModel<string>()

const props = withDefaults(defineProps<TabsProps>(), {
  intent: 'primary',
  options: () => [],
  orientation: 'horizontal',
  size: 'md',
  ui: undefined,
  value: undefined,
  variant: 'line',
})

const resolvedOptions = computed(() => (props.options.length > 0 ? props.options : []))

const rootProps = computed(() => {
  const { options: _, ui: __, ...rest } = props
  return rest
})

const optionIconClass = computed(() => tabsOptionIconCVA({ size: props.size }))

extendCompodiumMeta<typeof props & { modelValue?: string }>({
  defaultProps: {
    modelValue: 'react',
    intent: 'primary',
    orientation: 'horizontal',
    size: 'md',
    variant: 'line',
    options: [
      { value: 'react', label: 'React', icon: 'tabler:brand-react' },
      { value: 'solid', label: 'Solid' },
      { value: 'svelte', label: 'Svelte', icon: 'tabler:brand-svelte' },
      { value: 'vue', label: 'Vue', icon: 'tabler:brand-vue' },
    ],
  },
})
</script>

<template>
  <UITabsRoot v-bind="{ ...rootProps, ...attrs }" v-model="modelValue" :ui="{ root: ui?.root }">
    <UITabsList :ui="{ root: ui?.list }">
      <template v-if="resolvedOptions.length > 0">
        <UITabsTrigger
          v-for="option in resolvedOptions"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
          :ui="{ root: ui?.trigger }"
        >
          <Icon v-if="option.icon" :name="option.icon" :class="optionIconClass" />
          <span>{{ option.label ?? option.value }}</span>
        </UITabsTrigger>
      </template>

      <slot name="list" />

      <UITabsIndicator :ui="{ root: ui?.indicator }" />
    </UITabsList>

    <template v-if="resolvedOptions.length > 0">
      <UITabsContent
        v-for="option in resolvedOptions"
        :key="option.value"
        :value="option.value"
        :ui="{ root: ui?.content }"
      >
        <slot :name="`content-${option.value}`">
          Content for {{ option.label ?? option.value }}
        </slot>
      </UITabsContent>
    </template>

    <slot />
  </UITabsRoot>
</template>
