<script setup lang="ts">
import {
  SegmentGroup as ArkSegmentGroup,
  type SegmentGroupRootBaseProps as ArkSegmentGroupRootBaseProps,
  type SegmentGroupRootProviderBaseProps as ArkSegmentGroupRootProviderBaseProps,
  type UseSegmentGroupReturn,
} from '@ark-ui/vue/segment-group'
import { cva } from 'class-variance-authority'

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
  /** Visual intent for the group. @default 'primary' */
  intent?: SegmentGroupIntent
  /** Visual size for the items. @default 'md' */
  size?: SegmentGroupSize
  /** Predefined options to render. */
  options?: SegmentGroupOption[]
  /** Slot-level class overrides. */
  ui?: Partial<UISegmentGroupSlots>
}

const segmentGroupRootCVA = cva('w-fit relative inline-flex items-center gap-0.5 border p-0.5', {
  variants: {
    intent: {
      neutral: '',
      primary: '',
      secondary: '',
      accent: '',
    } satisfies Record<SegmentGroupIntent, string>,
    size: {
      sm: 'gap-0.5 p-0.5',
      md: 'gap-1 p-1',
      lg: 'gap-1.5 p-1.5',
    } satisfies Record<SegmentGroupSize, string>,
  },
  compoundVariants: [
    {
      intent: 'neutral',
      class: 'border-neutral-border-default bg-neutral-fill-subtle',
    },
    {
      intent: 'primary',
      class: 'border-primary-border-default bg-primary-fill-subtle',
    },
    {
      intent: 'secondary',
      class: 'border-secondary-border-default bg-secondary-fill-subtle',
    },
    {
      intent: 'accent',
      class: 'border-accent-border-default bg-accent-fill-subtle',
    },
  ],
})

const modelValue = defineModel<string>()

const props = withDefaults(defineProps<SegmentGroupProps>(), {
  disabled: false,
  intent: 'primary',
  options: () => [],
  size: 'md',
  ui: undefined,
  value: undefined,
})

const attrs = useAttrs()

const intent = toRef(props, 'intent')
const size = toRef(props, 'size')

provide(segmentGroupChromeKey, { intent, size })

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
    class: cn(segmentGroupRootCVA({ intent: intent.value, size: size.value }), props.ui?.root),
  }

  if (!isProvider.value) base.defaultValue = modelValue.value

  return base
})

extendCompodiumMeta<typeof props & { modelValue?: string }>({
  defaultProps: {
    modelValue: 'react',
    intent: 'primary',
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
    <template v-if="resolvedOptions.length > 0">
      <UISegmentGroupItem
        v-for="option in resolvedOptions"
        :key="option.value"
        :value="option.value"
        :disabled="disabled || option.disabled"
      >
        <UISegmentGroupItemText>{{ option.label ?? option.value }}</UISegmentGroupItemText>
        <UISegmentGroupItemControl />
        <UISegmentGroupItemHiddenInput />
      </UISegmentGroupItem>
    </template>

    <slot />

    <UISegmentGroupIndicator />
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
