<script setup lang="ts">
import {
  Field as ArkField,
  type FieldRootBaseProps as ArkFieldRootBaseProps,
} from '@ark-ui/vue/field'
import { Fieldset as ArkFieldset } from '@ark-ui/vue/fieldset'
import { cva, type VariantProps } from 'class-variance-authority'

import type { ClassValue, Component } from 'vue'

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
  /**
   * When true, the root is `Fieldset` (legend + helper under legend) for control groups
   * (e.g. `Checkbox.Group`). Error text stays last.
   */
  asFieldset?: boolean
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
   * Ignored when `asFieldset` is true (legend is always used).
   */
  labelAssociatesControl?: boolean
  /** Prefer setting on the field so Ark can wire label and control ids. */
  size?: FieldCVAProps['size']
  ui?: Partial<UIFieldSlots>
}

const props = withDefaults(defineProps<FieldProps>(), {
  asFieldset: false,
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

const invalid = computed(
  () => props.invalid || Boolean(slots.error) || String(props.error ?? '').length > 0,
)

const arkFieldRootProps = computed(() => ({
  ...pick(props, ['asChild', 'disabled', 'id', 'ids', 'readOnly', 'required'] as const),
  invalid: invalid.value,
}))

const fieldsetRootProps = computed(() => ({
  ...pick(props, ['asChild', 'disabled', 'id'] as const),
  invalid: invalid.value,
}))

const labelComponent = computed((): Component | string => {
  if (props.asFieldset) return ArkFieldset.Legend
  if (props.labelAssociatesControl) return ArkField.Label
  return 'div'
})

const errorTextComponent = computed(() =>
  props.asFieldset ? ArkFieldset.ErrorText : ArkField.ErrorText,
)

const fieldRootTag = computed(() => (props.asFieldset ? ArkFieldset.Root : ArkField.Root))

const mergedRootBind = computed(() => ({
  ...(props.asFieldset ? fieldsetRootProps.value : arkFieldRootProps.value),
  ...fieldRootAttrs.value,
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
  <component
    :is="fieldRootTag"
    v-bind="mergedRootBind"
    :class="cn(fieldRoot({ size, invalid }), attrs.class, ui?.root)"
  >
    <component
      :is="labelComponent"
      v-if="!hideLabel && (label || required)"
      :class="cn(fieldLabel({ intent, size }), ui?.label)"
    >
      <template v-if="label">{{ label }}</template>
      <ArkField.RequiredIndicator
        v-if="required && !asFieldset"
        class="txt-caption text-error-icon-default"
      >
        *
      </ArkField.RequiredIndicator>
      <span
        v-else-if="required"
        class="txt-caption text-error-icon-default"
        aria-hidden="true"
      >
        *
      </span>
    </component>

    <template v-if="asFieldset && helperText">
      <ArkFieldset.HelperText :class="cn(fieldHelperText({ intent, size }), ui?.helperText)">
        {{ helperText }}
      </ArkFieldset.HelperText>
    </template>

    <slot />

    <template v-if="!asFieldset && helperText">
      <ArkField.HelperText :class="cn(fieldHelperText({ intent, size }), ui?.helperText)">
        {{ helperText }}
      </ArkField.HelperText>
    </template>

    <component
      :is="errorTextComponent"
      v-if="showError"
      aria-live="polite"
      :class="cn('txt-caption text-error-text-default', ui?.error)"
    >
      <slot name="error">{{ error }}</slot>
    </component>
  </component>
</template>
