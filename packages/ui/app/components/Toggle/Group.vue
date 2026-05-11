<script setup lang="ts">
import {
  ToggleGroup as ArkToggleGroup,
  type ToggleGroupRootBaseProps as ArkToggleGroupRootBaseProps,
} from '@ark-ui/vue/toggle-group'
import { cva } from 'class-variance-authority'

import type {
  ToggleGroupOrientation,
  ToggleIntent,
  ToggleSize,
  ToggleVariant,
  UIToggleGroupSlots,
} from './context'

export type { UIToggleGroupSlots } from './context'

const groupRootCVA = cva('join', {
  variants: {
    orientation: {
      horizontal: 'join-horizontal',
      vertical: 'join-vertical',
    } satisfies Record<ToggleGroupOrientation, string>,
  },
})

export interface ToggleGroupOption {
  disabled?: boolean
  icon?: string
  title?: string
  value: string
}

interface ToggleGroupProps extends ArkToggleGroupRootBaseProps {
  activeBackground?: boolean
  iconOnly?: boolean
  intent?: ToggleIntent
  options?: ToggleGroupOption[]
  size?: ToggleSize
  ui?: Partial<UIToggleGroupSlots>
  variant?: ToggleVariant
}

const modelValue = defineModel<string[]>({ default: [] })
const pressedByValue = reactive<Record<string, boolean>>({})

const props = withDefaults(defineProps<ToggleGroupProps>(), {
  activeBackground: false,
  iconOnly: false,
  intent: 'primary',
  options: () => [],
  size: 'sm',
  ui: undefined,
  variant: 'default',
})

const rootProps = computed(() => ({
  ...pick(props, [
    'asChild',
    'defaultValue',
    'deselectable',
    'disabled',
    'id',
    'ids',
    'loopFocus',
    'multiple',
    'orientation',
    'rovingFocus',
  ]),
}))

watchEffect(() => {
  for (const option of props.options) {
    pressedByValue[option.value] = modelValue.value.includes(option.value)
  }
})
</script>

<template>
  <ArkToggleGroup.Root
    v-bind="rootProps"
    v-model:model-value="modelValue"
    :class="cn(groupRootCVA({ orientation }), ui?.root)"
  >
    <ArkToggleGroup.Item
      v-for="option in options"
      :key="option.value"
      as-child
      :value="option.value"
      :disabled="disabled || option.disabled"
    >
      <UIToggle
        :pressed="pressedByValue[option.value]"
        :active-background="activeBackground"
        :disabled="disabled || option.disabled"
        :icon-only="iconOnly"
        :intent="intent"
        :size="size"
        :variant="variant"
        :ui="{ root: cn('join-item', ui?.item) }"
      >
        <template #on>
          <slot name="item" :option="option" :pressed="true">
            <Icon v-if="option.icon" :name="option.icon" class="size-4 shrink-0" />
            <span v-if="option.title">{{ option.title }}</span>
          </slot>
        </template>
        <template #off>
          <slot name="item" :option="option" :pressed="false">
            <Icon v-if="option.icon" :name="option.icon" class="size-4 shrink-0" />
            <span v-if="option.title">{{ option.title }}</span>
          </slot>
        </template>
      </UIToggle>
    </ArkToggleGroup.Item>
  </ArkToggleGroup.Root>
</template>
