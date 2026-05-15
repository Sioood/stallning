<script setup lang="ts">
import {
  TabsRoot,
  TabsRootProvider,
  type TabsRootBaseProps as ArkTabsRootBaseProps,
  type TabsRootProviderBaseProps as ArkTabsRootProviderBaseProps,
  type UseTabsReturn,
} from '@ark-ui/vue/tabs'
import { cva } from 'class-variance-authority'

import { tabsChromeKey, type TabsIntent, type TabsSize } from '~/utils/Components/Tabs/context'

import type { ClassValue } from 'vue'

defineOptions({ inheritAttrs: false })

export interface UITabsSlots {
  root?: ClassValue
  list?: ClassValue
  indicator?: ClassValue
  trigger?: ClassValue
  content?: ClassValue
}

interface TabOption {
  disabled?: boolean
  value: string
  label?: string
}

export interface TabsProps
  extends ArkTabsRootBaseProps, Omit<ArkTabsRootProviderBaseProps, 'value'> {
  /**
   * Pass the return value of `useTabs()` to enable **RootProvider** mode.
   * Omit (or leave `undefined`) to use the default **Root** mode with `v-model`.
   */
  value?: UseTabsReturn['value']
  /** Visual intent for the tabs. @default 'primary' */
  intent?: TabsIntent
  /** Visual size for the items. @default 'md' */
  size?: TabsSize
  /** Predefined tab options to render. */
  options?: TabOption[]
  /** Slot-level class overrides. */
  ui?: Partial<UITabsSlots>
}

const tabsRootCVA = cva('w-fit', {
  variants: {
    orientation: {
      horizontal: 'flex flex-col',
      vertical: 'flex',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
})

const modelValue = defineModel<string>()

const props = withDefaults(defineProps<TabsProps>(), {
  intent: 'primary',
  options: () => [],
  orientation: 'horizontal',
  size: 'md',
  ui: undefined,
  value: undefined,
})

const attrs = useAttrs()

provide(tabsChromeKey, {
  intent: computed(() => props.intent),
  size: computed(() => props.size),
  orientation: computed(() => props.orientation),
})

const isProvider = computed(() => props.value !== undefined)

const rootComponent = computed(() => (isProvider.value ? TabsRootProvider : TabsRoot))

const rootProps = computed(() => {
  if (isProvider.value) {
    return pick(props, ['asChild', 'value'] as const)
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
    'unmountOnExit',
    'value',
  ] as const)
})

const arkAttrs = computed(() => splitArkAttrs(attrs))

const resolvedOptions = computed(() => (props.options.length > 0 ? props.options : []))

const rootBindings = computed(() => {
  const base: Record<string, unknown> = {
    ...rootProps.value,
    ...arkAttrs.value,
    class: cn(
      tabsRootCVA({ orientation: props.orientation }),
      arkAttrs.value.class as string,
      props.ui?.root,
    ),
  }

  if (!isProvider.value) {
    base.defaultValue = modelValue.value
    base.onValueChange = (details: { value: string }) => {
      modelValue.value = details.value
    }
  }

  return base
})

extendCompodiumMeta<typeof props & { modelValue?: string }>({
  defaultProps: {
    modelValue: 'react',
    intent: 'primary',
    orientation: 'horizontal',
    size: 'md',
    options: [
      { value: 'react', label: 'React' },
      { value: 'solid', label: 'Solid' },
      { value: 'svelte', label: 'Svelte' },
      { value: 'vue', label: 'Vue' },
    ],
  },
})
</script>

<template>
  <component :is="rootComponent" v-bind="rootBindings">
    <UITabsList :class="ui?.list">
      <template v-if="resolvedOptions.length > 0">
        <UITabsTrigger
          v-for="option in resolvedOptions"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label ?? option.value }}
        </UITabsTrigger>
      </template>

      <slot name="list" />

      <UITabsIndicator />
    </UITabsList>

    <template v-if="resolvedOptions.length > 0">
      <UITabsContent v-for="option in resolvedOptions" :key="option.value" :value="option.value">
        <slot :name="`content-${option.value}`">
          Content for {{ option.label ?? option.value }}
        </slot>
      </UITabsContent>
    </template>

    <slot />
  </component>
</template>

<style scoped>
/* Indicators need to be able to access the CSS variables set by Ark. */
:deep([data-part='indicator']) {
  left: var(--left);
  top: var(--top);
  width: var(--width);
  height: var(--height);
}
</style>
