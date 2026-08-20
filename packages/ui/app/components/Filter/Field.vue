<script setup lang="ts" generic="TItem">
import type { FilterFieldConfig, FilterFieldValue } from '~/utils/Components/Filter/schema'

type FilterFieldIntent = 'accent' | 'neutral' | 'primary' | 'secondary'
type FilterFieldSize = 'sm' | 'md' | 'lg'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    fieldKey: string
    config: FilterFieldConfig<TItem>
    intent?: FilterFieldIntent
    menuMode?: boolean
    size?: 'sm' | 'md'
  }>(),
  {
    intent: 'primary',
    menuMode: false,
    size: 'md',
  },
)

const modelValue = defineModel<FilterFieldValue>({ required: true })

const resolvedSize = computed((): FilterFieldSize => {
  if (
    props.config.type === 'select' ||
    props.config.type === 'toggle' ||
    props.config.type === 'toggle-group'
  ) {
    const size = props.config.props?.size
    if (size === 'sm' || size === 'md' || size === 'lg') {
      return size
    }
  }
  return props.menuMode ? 'sm' : props.size
})

const controlHeightClass = computed(() => {
  if (resolvedSize.value === 'sm') {
    return 'h-7'
  }
  if (resolvedSize.value === 'lg') {
    return 'h-9'
  }
  return 'h-8'
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

const fieldRootClass = computed(() => {
  if (props.menuMode) {
    return 'w-full'
  }
  if (props.config.type === 'select') {
    return 'max-w-48 min-w-40'
  }
  return 'shrink-0'
})
</script>

<template>
  <UIFormSelect
    v-if="config.type === 'select'"
    v-model="modelValue as string[]"
    :intent
    :label="config.label"
    :items="config.props?.items ?? []"
    :multiple="config.props?.multiple ?? true"
    :placeholder="config.props?.placeholder"
    :portalled
    v-bind="config.props ?? {}"
    :size="resolvedSize"
    :class="fieldRootClass"
    :ui="{ control: controlHeightClass, trigger: 'h-full py-0' }"
  />

  <UISwitch
    v-else-if="config.type === 'toggle' && (config.variant ?? 'switch') === 'switch'"
    v-model="modelValue as boolean"
    :intent
    :label="config.label"
    v-bind="config.props ?? {}"
    :size="resolvedSize"
    :ui="{ root: cn(fieldRootClass, controlHeightClass) }"
  />

  <UIToggle
    v-else-if="config.type === 'toggle' && config.variant === 'toggle'"
    v-model:pressed="modelValue as boolean"
    :intent
    variant="subtle"
    v-bind="config.props ?? {}"
    :size="resolvedSize"
    :class="cn(fieldRootClass, controlHeightClass)"
  >
    <template #off>{{ config.label }}</template>
    <template #on>{{ config.label }}</template>
  </UIToggle>

  <UIToggleGroup
    v-else-if="config.type === 'toggle-group'"
    v-model="modelValue as string[]"
    active-background
    :intent
    :options="config.props?.options ?? []"
    :icon-only="config.props?.iconOnly"
    variant="subtle"
    v-bind="config.props ?? {}"
    :size="resolvedSize"
    :class="cn(fieldRootClass, controlHeightClass)"
    :ui="{ item: 'h-full' }"
  />
</template>
