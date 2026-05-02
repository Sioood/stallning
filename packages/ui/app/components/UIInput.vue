<script setup lang="ts">
import { Field as ArkField } from '@ark-ui/vue/field'
import { cva, type VariantProps } from 'class-variance-authority'

const input = cva(
  'w-full rounded-md border bg-neutral-surface-default txt-base transition-colors',
  {
    variants: {
      size: {
        sm: 'px-2.5 py-1.5',
        md: 'px-3 py-2',
      },
      intent: {
        neutral:
          'border-neutral-border-default text-neutral-text-default placeholder:text-neutral-icon-subtle hover:border-neutral-border-hover focus:border-primary-border-default focus:ring-1 focus:ring-primary-border-default disabled:bg-neutral-fill-disabled disabled:text-neutral-text-disabled',
        primary:
          'border-primary-border-default text-primary-text-default placeholder:text-primary-icon-subtle hover:border-primary-border-hover focus:border-primary-border-strong focus:ring-1 focus:ring-primary-border-strong disabled:bg-primary-fill-disabled disabled:text-primary-text-disabled',
      },
      invalid: {
        true:
          'border-error-border-default ring-1 ring-error-border-default hover:border-error-border-hover focus:border-error-border-strong focus:ring-1 focus:ring-error-border-strong',
      },
    },
    defaultVariants: {
      size: 'md',
      intent: 'neutral',
    },
  },
)

type InputCVAProps = VariantProps<typeof input>

interface InputProps {
  modelValue?: string | number
  label?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  type?: string
  size?: InputCVAProps['size']
  intent?: InputCVAProps['intent']
  invalid?: boolean
  required?: boolean
  helperText?: string
  id?: string
  name?: string
}

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  label: undefined,
  placeholder: '',
  disabled: false,
  readonly: false,
  type: 'text',
  size: 'md',
  intent: 'neutral',
  invalid: false,
  required: false,
  helperText: undefined,
  id: undefined,
  name: undefined,
})

extendCompodiumMeta<typeof props>({
  defaultProps: {
    label: 'Email',
    placeholder: 'you@example.com',
    type: 'text',
    disabled: false,
    readonly: false,
    size: 'md',
    intent: 'neutral',
    invalid: false,
    required: true,
  },
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const onInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <UIField
    :label="props.label"
    :required="props.required"
    :helper-text="props.helperText"
    :invalid="props.invalid"
    :size="props.size"
  >
    <ArkField.Input
      v-bind="{ ...$attrs }"
      :id
      :name
      :type
      :placeholder
      :disabled
      :readonly
      :value="modelValue"
      :class="input({ size, intent, invalid })"
      @input="onInput"
    />
  </UIField>
</template>
