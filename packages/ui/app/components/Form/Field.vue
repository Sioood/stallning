<script setup lang="ts">
import { Field as ArkField } from '@ark-ui/vue/field'
import { cva, type VariantProps } from 'class-variance-authority'

const fieldRoot = cva('fieldRoot flex flex-col gap-1', {
  variants: {
    intent: {
      primary: '',
    },
    size: {
      md: '',
    },
    invalid: {
      true: '',
    },
  },
})

type FieldCVAProps = VariantProps<typeof fieldRoot>

const fieldLabel = cva('fieldLabel', {
  variants: {
    intent: {
      primary: 'text-primary-text-default',
    },
    size: {
      md: 'txt-label',
    },
  },
})

const fieldHelperText = cva('fieldHelperText', {
  variants: {
    intent: {
      primary: 'text-primary-text-subtle',
    },
    size: {
      md: 'txt-caption',
    },
  },
})

interface FieldProps {
  intent?: FieldCVAProps['intent']
  label?: string
  required?: boolean
  helperText?: string
  /** Shown when `invalid` is true (e.g. validation message). */
  error?: string
  invalid?: boolean
  disabled?: boolean
  readOnly?: boolean
  /** Prefer setting on the field so Ark can wire label and control ids. */
  id?: string
  size?: FieldCVAProps['size']
}

const props = withDefaults(defineProps<FieldProps>(), {
  intent: 'primary',
  label: undefined,
  required: false,
  helperText: undefined,
  error: undefined,
  invalid: false,
  disabled: false,
  readOnly: false,
  id: undefined,
  size: 'md',
})

const slots = useSlots()

const showError = computed(
  () => props.invalid && (Boolean(slots.error) || String(props.error ?? '').length > 0),
)

extendCompodiumMeta<typeof props>({
  defaultProps: {
    intent: 'primary',
    label: 'Email',
    required: true,
    helperText: 'Enter your email address',
    error: undefined,
    invalid: false,
    size: 'md',
  },
})
</script>

<template>
  <ArkField.Root
    :id="id"
    :class="fieldRoot({ size, invalid })"
    :disabled="disabled"
    :invalid="invalid"
    :read-only="readOnly"
    :required="required"
  >
    <ArkField.Label v-if="label || required" :class="fieldLabel({ intent, size })">
      <template v-if="label">{{ label }}</template>
      <ArkField.RequiredIndicator v-if="required" class="txt-caption text-error-icon-default">
        *
      </ArkField.RequiredIndicator>
    </ArkField.Label>

    <slot />

    <ArkField.HelperText v-if="helperText && !invalid" :class="fieldHelperText({ intent, size })">
      {{ helperText }}
    </ArkField.HelperText>

    <ArkField.ErrorText
      v-if="showError"
      aria-live="polite"
      class="txt-caption text-error-text-default"
    >
      <slot name="error">{{ error }}</slot>
    </ArkField.ErrorText>
  </ArkField.Root>
</template>
