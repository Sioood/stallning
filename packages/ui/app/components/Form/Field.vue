<script setup lang="ts">
import {
  Field as ArkField,
  type FieldRootBaseProps as ArkFieldRootBaseProps,
} from '@ark-ui/vue/field'
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

export interface FieldProps extends ArkFieldRootBaseProps {
  /** Shown when `invalid` is true (e.g. validation message). */
  error?: string
  helperText?: string
  /** When true, the field label row is omitted (e.g. checkbox with label beside the control). */
  hideLabel?: boolean
  intent?: FieldCVAProps['intent']
  label?: string
  /**
   * When false, the label is rendered as plain text (no `label for=`).
   * Use for groups of controls where a single target id would be wrong.
   */
  labelAssociatesControl?: boolean
  /** Prefer setting on the field so Ark can wire label and control ids. */
  size?: FieldCVAProps['size']
}

const props = withDefaults(defineProps<FieldProps>(), {
  error: undefined,
  helperText: undefined,
  intent: 'primary',
  label: undefined,
  labelAssociatesControl: true,
  size: 'md',
})

const slots = useSlots()

const showError = computed(
  () => props.invalid && (Boolean(slots.error) || String(props.error ?? '').length > 0),
)

const rootProps = computed(() => ({
  ...pick(props, ['asChild', 'disabled', 'id', 'ids', 'readOnly', 'required'] as const),
  invalid: props.invalid || Boolean(slots.error) || String(props.error ?? '').length > 0,
}))

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
  <ArkField.Root v-bind="rootProps" :class="fieldRoot({ size, invalid })">
    <ArkField.Label
      v-if="!hideLabel && labelAssociatesControl && (label || required)"
      :class="fieldLabel({ intent, size })"
    >
      <template v-if="label">{{ label }}</template>
      <ArkField.RequiredIndicator v-if="required" class="txt-caption text-error-icon-default">
        *
      </ArkField.RequiredIndicator>
    </ArkField.Label>

    <div
      v-else-if="!hideLabel && !labelAssociatesControl && (label || required)"
      :class="fieldLabel({ intent, size })"
    >
      <template v-if="label">{{ label }}</template>
      <ArkField.RequiredIndicator v-if="required" class="txt-caption text-error-icon-default">
        *
      </ArkField.RequiredIndicator>
    </div>

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
