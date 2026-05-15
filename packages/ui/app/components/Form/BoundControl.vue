<script setup lang="ts" generic="TValues extends Record<string, unknown>">
import { formatFieldErrors } from '~ui/app/utils/form-field-errors'

import type { DeepValue, Updater } from '@tanstack/form-core'
import type { SchemaFieldConfig } from '~ui/app/utils/Form/schema'

type TFieldName = keyof TValues & string

const props = defineProps<{
  fieldName: TFieldName
  config: SchemaFieldConfig<TValues, TFieldName>
  fieldApi: {
    handleChange: (updater: Updater<DeepValue<TValues, TFieldName>>) => void
    handleBlur: () => void
  }
  state: {
    value: DeepValue<TValues, TFieldName>
    meta: { errors: readonly unknown[] }
  }
}>()
</script>

<template>
  <component
    :is="props.config.as"
    v-bind="{
      ...(props.config.props ?? {}),
      name: String(props.fieldName),
      modelValue: props.state.value,
      invalid: props.state.meta.errors.length > 0,
      error: formatFieldErrors(props.state.meta.errors),
    }"
    @update:model-value="props.fieldApi.handleChange($event as DeepValue<TValues, TFieldName>)"
    @blur="props.fieldApi.handleBlur()"
  />
</template>
