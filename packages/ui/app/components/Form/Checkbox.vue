<script setup lang="ts">
import {
  Checkbox as ArkCheckbox,
  type CheckboxRootBaseProps as ArkCheckboxRootBaseProps,
  type CheckboxCheckedState as ArkCheckboxCheckedState,
} from '@ark-ui/vue/checkbox'
import { createReusableTemplate } from '@vueuse/core'
import { cva, type VariantProps } from 'class-variance-authority'

import type { ClassValue } from 'vue'
import type { FieldProps } from '~ui/app/components/Form/Field.vue'

const checkboxRootCVA = cva('checkboxRoot group inline-flex items-center gap-2', {
  variants: {
    intent: {
      primary: '',
    },
    size: {
      md: '',
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

type CheckboxRootVariants = VariantProps<typeof checkboxRootCVA>

const checkboxControlCVA = cva('checkboxControl size-4 border', {
  variants: {
    intent: {
      primary:
        'border-primary-border-default data-hover:border-primary-border-default-hover data-[disabled]:border-primary-border-subtle data-[invalid]:border-error-border-default',
    },
    size: {
      md: '',
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

const checkboxIndicatorCVA = cva(
  [
    'checkboxIndicator size-full flex items-center justify-center',
    'bg-primary-fill-subtle text-primary-text-default',
    'group-data-[state=checked]:bg-primary-fill-default group-data-[state=checked]:text-primary-fill-inverse',
    'group-data-[state=indeterminate]:bg-primary-fill-default group-data-[state=indeterminate]:text-primary-fill-inverse',
  ],
  {
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
      invalid: {
        true: '',
        false: '',
      },
    },
  },
)

const fieldLabelCVA = cva('fieldLabel', {
  variants: {
    intent: {
      primary: 'text-primary-text-default data-[disabled]:text-primary-text-default-disabled',
    },
    size: {
      md: 'txt-label',
    },
  },
})

interface UICheckboxSlots {
  root?: ClassValue
  control?: ClassValue
  indicator?: ClassValue
  label?: ClassValue
  hiddenInput?: ClassValue
}

interface CheckboxProps extends ArkCheckboxRootBaseProps, Omit<FieldProps, 'ids'> {
  /**
   * Renders only the checkbox control (no `UIFormField`). Use inside `UIFormCheckboxGroup`.
   * Selection is driven by the surrounding `Checkbox.Group`; do not use `v-model:checked`.
   */
  inGroup?: boolean
  intent?: CheckboxRootVariants['intent']
  size?: CheckboxRootVariants['size']
  ui?: UICheckboxSlots
}

const emit = defineEmits<{
  blur: [event: FocusEvent]
}>()

const checked = defineModel<ArkCheckboxCheckedState>({
  default: false,
})

const props = withDefaults(defineProps<CheckboxProps>(), {
  inGroup: false,
  intent: 'primary',
  label: '',
  size: 'md',
  ui: undefined,
})

const invalid = computed(() =>
  Boolean(props.invalid || (props.error && String(props.error).length > 0)),
)

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
  invalid: invalid.value,
}))

const ROOT_PROP_KEYS = [
  'asChild',
  'defaultChecked',
  'disabled',
  'form',
  'id',
  'ids',
  'intent',
  'invalid',
  'readOnly',
  'required',
  'size',
  'value',
] as const satisfies readonly (keyof CheckboxProps)[]

const rootProps = computed(() => ({
  ...pick(props, props.inGroup ? ROOT_PROP_KEYS : [...ROOT_PROP_KEYS, 'name']),
  invalid: invalid.value,
}))

const rootBindings = computed(() => {
  const base = rootProps.value
  if (props.inGroup) {
    return base
  }
  return {
    ...base,
    checked: checked.value,
    ['onUpdate:checked' as const]: (v: ArkCheckboxCheckedState) => {
      checked.value = v
    },
  }
})

type CheckboxControlBindings = {
  rootBindings: Record<string, unknown>
}

const [DefineCheckboxControl, ReuseCheckboxControl] =
  createReusableTemplate<CheckboxControlBindings>()
</script>
<template>
  <DefineCheckboxControl v-slot="p">
    <ArkCheckbox.Root
      v-bind="p.rootBindings"
      :class="cn(checkboxRootCVA({ intent, size, disabled }), ui?.root)"
    >
      <ArkCheckbox.Control :class="cn(checkboxControlCVA({ intent, size, disabled }), ui?.control)">
        <ArkCheckbox.Indicator
          :class="cn(checkboxIndicatorCVA({ intent, size, disabled }), ui?.indicator)"
        >
          <Icon name="tabler:check" class="size-3 shrink-0" />
        </ArkCheckbox.Indicator>
        <ArkCheckbox.Indicator
          :class="cn(checkboxIndicatorCVA({ intent, size, disabled }), ui?.indicator)"
          indeterminate
        >
          <Icon name="tabler:minus" class="size-3 shrink-0" />
        </ArkCheckbox.Indicator>
      </ArkCheckbox.Control>
      <ArkCheckbox.Label :class="cn(fieldLabelCVA({ intent, size }), ui?.label)">
        <template v-if="label">{{ label }}</template>

        <span v-if="required" class="txt-caption text-error-icon-default" aria-hidden="true">
          *
        </span>
      </ArkCheckbox.Label>
      <ArkCheckbox.HiddenInput :class="cn(ui?.hiddenInput)" @blur="emit('blur', $event)" />
    </ArkCheckbox.Root>
  </DefineCheckboxControl>

  <UIFormField v-if="!inGroup" v-bind="fieldProps">
    <ReuseCheckboxControl :root-bindings="rootBindings" />
  </UIFormField>
  <ReuseCheckboxControl v-else :root-bindings="rootBindings" />
</template>
