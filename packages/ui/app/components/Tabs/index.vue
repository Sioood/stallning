<script setup lang="ts">
import {
  TabsRoot,
  TabsRootProvider,
  type TabsRootBaseProps as ArkTabsRootBaseProps,
  type TabsRootProviderBaseProps as ArkTabsRootProviderBaseProps,
  type UseTabsReturn,
} from '@ark-ui/vue/tabs'
import { cva } from 'class-variance-authority'

import {
  tabsChromeKey,
  type TabsIntent,
  type TabsSize,
  type TabsVariant,
} from '~/utils/Components/Tabs/context'

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
  /** Visual style variant. @default 'default' */
  variant?: TabsVariant
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
    variant: {
      line: '',
      pill: '',
    },
    orientation: {
      horizontal: 'flex flex-col',
      vertical: 'flex',
    },
  },
  defaultVariants: {
    variant: 'line',
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

const resolvedOptions = computed(() => (props.options.length > 0 ? props.options : []))

const rootBindings = computed(() => {
  const base: Record<string, unknown> = {
    ...rootProps.value,
    ...arkAttrs.value,
    class: cn(
      tabsRootCVA({ variant: props.variant, orientation: props.orientation }),
      arkAttrs.value.class as string,
      props.ui?.root,
    ),
  }

  if (!isProvider.value && modelValue.value !== undefined) {
    base.modelValue = modelValue.value
    base['onUpdate:modelValue'] = (next: string) => {
      modelValue.value = next
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
    variant: 'line',
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
    <UITabsList :ui="{ root: ui?.list }">
      <template v-if="resolvedOptions.length > 0">
        <UITabsTrigger
          v-for="option in resolvedOptions"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
          :ui="{ root: ui?.trigger }"
        >
          {{ option.label ?? option.value }}
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
