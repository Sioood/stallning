<script setup lang="ts">
import {
  Checkbox as ArkCheckbox,
  type CheckboxRootBaseProps as ArkCheckboxRootBaseProps,
  type CheckboxCheckedState as ArkCheckboxCheckedState,
} from '@ark-ui/vue/checkbox'
import { cva, type VariantProps } from 'class-variance-authority'

import type { FieldProps } from '~ui/app/components/Form/Field.vue'

const checkboxRoot = cva('checkboxRoot inline-flex items-center gap-2', {
  variants: {
    intent: {
      primary: '',
    },
    size: {
      md: '',
    },
    checked: {
      true: '',
      false: '',
      indeterminate: '',
    },
    disabled: {
      true: 'cursor-not-allowed',
      false: 'cursor-pointer',
    },
    invalid: {
      true: '',
      false: '',
    },
  },
})

type CheckboxRootVariants = VariantProps<typeof checkboxRoot>

const checkboxControl = cva('checkboxControl size-4 border', {
  variants: {
    intent: {
      primary:
        'border-primary-border-default data-hover:border-primary-border-default-hover data-[disabled]:border-primary-border-subtle data-[invalid]:border-error-border-default',
    },
    size: {
      md: '',
    },
    checked: {
      true: '',
      false: '',
      indeterminate: '',
    },
    disabled: {
      true: '',
      false: '',
    },
    invalid: {
      true: '',
      false: '',
    },
  },
})

const checkboxIndicator = cva('checkboxIndicator size-full flex items-center justify-center', {
  variants: {
    intent: {
      primary: '',
    },
    size: {
      md: '',
    },
    disabled: {
      true: '',
      false: '',
    },
    checked: {
      true: 'bg-primary-fill-default text-primary-fill-inverse',
      false: 'bg-primary-fill-subtle text-primary-text-default',
      indeterminate: 'bg-primary-fill-default text-primary-fill-inverse',
    },
    invalid: {
      true: '',
      false: '',
    },
  },
})

const fieldLabel = cva('fieldLabel', {
  variants: {
    intent: {
      primary: 'text-primary-text-default data-[disabled]:text-primary-text-default-disabled',
    },
    size: {
      md: 'txt-label',
    },
  },
})

interface CheckboxProps extends ArkCheckboxRootBaseProps, Omit<FieldProps, 'ids'> {
  intent?: CheckboxRootVariants['intent']
  size?: CheckboxRootVariants['size']
}

const checked = defineModel<ArkCheckboxCheckedState>({
  default: false,
})

const props = withDefaults(defineProps<CheckboxProps>(), {
  intent: 'primary',
  label: '',
  size: 'md',
})

const fieldProps = computed(() => ({
  ...pick(props, [
    'asChild',
    'disabled',
    'error',
    'helperText',
    'hideLabel',
    'id',
    'ids',
    'intent',
    'label',
    'labelAssociatesControl',
    'readOnly',
    'required',
    'size',
  ] as const),
  hideLabel: true,
  invalid: Boolean(props.invalid || (props.error && String(props.error).length > 0)),
}))

const rootProps = computed(() => ({
  ...pick(props, [
    'asChild',
    'defaultChecked',
    'disabled',
    'form',
    'id',
    'ids',
    'intent',
    'invalid',
    'name',
    'readOnly',
    'required',
    'size',
    'value',
  ] as const),
  invalid: Boolean(props.invalid || (props.error && String(props.error).length > 0)),
}))
</script>
<template>
  <UIFormField v-bind="fieldProps">
    <ArkCheckbox.Root
      v-model:checked="checked"
      v-bind="rootProps"
      :class="checkboxRoot({ intent, size, checked, disabled })"
    >
      <ArkCheckbox.Control :class="checkboxControl({ intent, size, checked, disabled })">
        <ArkCheckbox.Indicator :class="checkboxIndicator({ intent, size, checked, disabled })">
          <Icon name="tabler:check" class="size-3 shrink-0" />
        </ArkCheckbox.Indicator>
        <ArkCheckbox.Indicator :class="checkboxIndicator({ intent, size, checked, disabled })" indeterminate>
          <Icon name="tabler:minus" class="size-3 shrink-0" />
        </ArkCheckbox.Indicator>
      </ArkCheckbox.Control>
      <ArkCheckbox.Label :class="fieldLabel({ intent, size })">
        <template v-if="label">{{ label }}</template>

        <span v-if="required" class="txt-caption text-error-icon-default" aria-hidden="true">
          *
        </span>
      </ArkCheckbox.Label>
      <ArkCheckbox.HiddenInput />
    </ArkCheckbox.Root>
  </UIFormField>
</template>
