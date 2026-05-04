<script setup lang="ts">
import {
  Field as ArkField,
  type FieldRootBaseProps as ArkFieldRootBaseProps,
} from '@ark-ui/vue/field'
import { cva, type VariantProps } from 'class-variance-authority'

import type { ClassValue } from 'vue'

defineOptions({ inheritAttrs: false })

/** Optional class overrides per field sub-part (merge with `cn` / tailwind-merge). */
export interface UIFieldSlots {
  root?: ClassValue
  label?: ClassValue
  helperText?: ClassValue
  error?: ClassValue
}

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
  ui?: Partial<UIFieldSlots>
}

const props = withDefaults(defineProps<FieldProps>(), {
  error: undefined,
  helperText: undefined,
  intent: 'primary',
  label: undefined,
  labelAssociatesControl: true,
  size: 'md',
  ui: undefined,
})

const slots = useSlots()

const attrs = useAttrs()

const fieldRootAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs as Record<string, unknown> & { class?: unknown }
  return rest
})

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
  <ArkField.Root
    v-bind="{ ...rootProps, ...fieldRootAttrs }"
    :class="cn(fieldRoot({ size, invalid }), attrs.class, ui?.root)"
  >
    <ArkField.Label
      v-if="!hideLabel && labelAssociatesControl && (label || required)"
      :class="cn(fieldLabel({ intent, size }), ui?.label)"
    >
      <template v-if="label">{{ label }}</template>
      <ArkField.RequiredIndicator v-if="required" class="txt-caption text-error-icon-default">
        *
      </ArkField.RequiredIndicator>
    </ArkField.Label>

    <div
      v-else-if="!hideLabel && !labelAssociatesControl && (label || required)"
      :class="cn(fieldLabel({ intent, size }), ui?.label)"
    >
      <template v-if="label">{{ label }}</template>
      <ArkField.RequiredIndicator v-if="required" class="txt-caption text-error-icon-default">
        *
      </ArkField.RequiredIndicator>
    </div>

    <slot />

    <ArkField.HelperText
      v-if="helperText && !invalid"
      :class="cn(fieldHelperText({ intent, size }), ui?.helperText)"
    >
      {{ helperText }}
    </ArkField.HelperText>

    <ArkField.ErrorText
      v-if="showError"
      aria-live="polite"
      :class="cn('txt-caption text-error-text-default', ui?.error)"
    >
      <slot name="error">{{ error }}</slot>
    </ArkField.ErrorText>
  </ArkField.Root>
</template>
