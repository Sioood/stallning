<script setup lang="ts" generic="TItem">
import type { FilterFieldConfig, FilterFieldValue } from '~/utils/Components/Filter/schema'

type FilterFieldIntent = 'accent' | 'neutral' | 'primary' | 'secondary'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    fieldKey: string
    config: FilterFieldConfig<TItem>
    intent?: FilterFieldIntent
    menuMode?: boolean
  }>(),
  {
    intent: 'primary',
    menuMode: false,
  },
)

const modelValue = defineModel<FilterFieldValue>({ required: true })

const selectSize = computed(() => {
  if (props.config.type !== 'select') {
    return 'sm' as const
  }
  const size = props.config.props?.size
  return size === 'md' || size === 'lg' ? size : 'sm'
})

const toggleGroupSize = computed(() => {
  if (props.config.type !== 'toggle-group') {
    return 'sm' as const
  }
  const size = props.config.props?.size
  return size === 'md' || size === 'lg' ? size : 'sm'
})

const portalled = computed(() => {
  if (props.menuMode) {
    return false
  }
  if (props.config.type === 'select') {
    return props.config.props?.portalled ?? true
  }
  return true
})
</script>

<template>
  <UIFormSelect
    v-if="config.type === 'select'"
    v-model="modelValue as string[]"
    :intent="props.intent"
    :label="config.label"
    :items="config.props?.items ?? []"
    :multiple="config.props?.multiple ?? true"
    :placeholder="config.props?.placeholder"
    :portalled="portalled"
    :size="selectSize"
    v-bind="config.props ?? {}"
    class="min-w-40"
  />

  <UISwitch
    v-else-if="config.type === 'toggle' && (config.variant ?? 'switch') === 'switch'"
    v-model="modelValue as boolean"
    :intent="props.intent"
    :label="config.label"
    size="sm"
    v-bind="config.props ?? {}"
  />

  <UIToggle
    v-else-if="config.type === 'toggle' && config.variant === 'toggle'"
    v-model:pressed="modelValue as boolean"
    :intent="props.intent"
    variant="subtle"
    size="sm"
    v-bind="config.props ?? {}"
  >
    <template #off>{{ config.label }}</template>
    <template #on>{{ config.label }}</template>
  </UIToggle>

  <UIToggleGroup
    v-else-if="config.type === 'toggle-group'"
    v-model="modelValue as string[]"
    active-background
    :intent="props.intent"
    :options="config.props?.options ?? []"
    :icon-only="config.props?.iconOnly"
    :size="toggleGroupSize"
    variant="subtle"
    v-bind="config.props ?? {}"
  />
</template>
