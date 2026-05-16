<script setup lang="ts">
import {
  SegmentGroup as ArkSegmentGroup,
  type SegmentGroupRootBaseProps as ArkSegmentGroupRootBaseProps,
  type SegmentGroupRootProviderBaseProps as ArkSegmentGroupRootProviderBaseProps,
  type UseSegmentGroupReturn,
} from '@ark-ui/vue/segment-group'

import {
  segmentedRootCVA,
  type SegmentedOrientation,
  type SegmentedVariant,
} from '~/utils/Components/Segmented/variants'
import {
  segmentGroupChromeKey,
  type SegmentGroupIntent,
  type SegmentGroupSize,
} from '~/utils/Components/SegmentGroup/context'

import type { ClassValue } from 'vue'

defineOptions({ inheritAttrs: false })

export interface UISegmentGroupSlots {
  root?: ClassValue
  indicator?: ClassValue
  item?: ClassValue
  itemControl?: ClassValue
  itemText?: ClassValue
}

interface SegmentGroupOption {
  disabled?: boolean
  value: string
  label?: string
}

export interface SegmentGroupProps
  extends ArkSegmentGroupRootBaseProps, Omit<ArkSegmentGroupRootProviderBaseProps, 'value'> {
  /**
   * Pass the return value of `useSegmentGroup()` to enable **RootProvider** mode.
   * Omit (or leave `undefined`) to use the default **Root** mode with `v-model`.
   */
  value?: UseSegmentGroupReturn['value']
  /** Visual style variant. @default 'default' */
  variant?: SegmentedVariant
  /** Visual intent for the group. @default 'primary' */
  intent?: SegmentGroupIntent
  /** Visual size for the items. @default 'md' */
  size?: SegmentGroupSize
  /** Layout orientation. @default 'horizontal' */
  orientation?: SegmentedOrientation
  /** Predefined options to render. */
  options?: SegmentGroupOption[]
  /** Slot-level class overrides. */
  ui?: Partial<UISegmentGroupSlots>
}

const modelValue = defineModel<string>()

const props = withDefaults(defineProps<SegmentGroupProps>(), {
  disabled: false,
  intent: 'primary',
  options: () => [],
  orientation: 'horizontal',
  size: 'md',
  ui: undefined,
  value: undefined,
  variant: 'line',
})

const attrs = useAttrs()

provide(segmentGroupChromeKey, {
  intent: computed(() => props.intent),
  size: computed(() => props.size),
  orientation: computed(() => props.orientation),
  variant: computed(() => props.variant),
})

const isProvider = computed(() => props.value !== undefined)

const rootComponent = computed(() =>
  isProvider.value ? ArkSegmentGroup.RootProvider : ArkSegmentGroup.Root,
)

const rootProps = computed(() => {
  if (isProvider.value) {
    return pick(props, ['asChild', 'value'] as const)
  }
  return pick(props, ['asChild', 'defaultValue', 'disabled', 'id', 'ids', 'orientation'] as const)
})

const arkAttrs = computed(() => splitArkAttrs(attrs))

const resolvedOptions = computed(() => (props.options.length > 0 ? props.options : []))

const rootBindings = computed(() => {
  const base: Record<string, unknown> = {
    ...rootProps.value,
    ...arkAttrs.value,
    class: cn(
      segmentedRootCVA({
        variant: props.variant,
        intent: props.intent,
        size: props.size,
        orientation: props.orientation,
      }),
      arkAttrs.value.class as string,
      props.ui?.root,
    ),
  }

  if (!isProvider.value) {
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
    <UISegmentGroupItem
      v-for="option in resolvedOptions"
      :key="option.value"
      :value="option.value"
      :disabled="props.disabled || option.disabled"
      :ui="{ root: ui?.item }"
    >
      <UISegmentGroupItemText :ui="{ root: ui?.itemText }">
        {{ option.label ?? option.value }}
      </UISegmentGroupItemText>
      <UISegmentGroupItemControl :ui="{ root: ui?.itemControl }" />
    </UISegmentGroupItem>
    <UISegmentGroupIndicator />
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
