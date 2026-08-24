<script setup lang="ts">
import {
  Checkbox as ArkCheckbox,
  type CheckboxRootBaseProps as ArkCheckboxRootBaseProps,
  type CheckboxCheckedState as ArkCheckboxCheckedState,
} from '@ark-ui/vue/checkbox'
import { cva, type VariantProps } from 'class-variance-authority'
import { useAttrs } from 'vue'

import type { FieldProps } from '~ui/app/components/Form/Field.vue'

import { splitArkAttrs } from '~/utils/ark'
import { checkboxControlCVA, checkboxIndicatorCVA } from '~/utils/Components/Form/checkbox-variants'

import type {
  FormFieldIntent,
  FormFieldSize,
  UICheckboxSlots,
} from '~/utils/Components/Form/context'

export type { UICheckboxSlots } from '~/utils/Components/Form/context'

defineOptions({ inheritAttrs: false })

const checkboxRootCVA = cva('group relative inline-flex items-center gap-2', {
  variants: {
    disabled: {
      false: 'cursor-pointer',
      true: 'cursor-not-allowed',
    } satisfies Record<'false' | 'true', string>,
    intent: {
      accent: '',
      error: '',
      info: '',
      neutral: '',
      primary: '',
      secondary: '',
      success: '',
      warning: '',
    } satisfies Record<FormFieldIntent, string>,
    invalid: {
      false: '',
      true: '',
    } satisfies Record<'false' | 'true', string>,
    size: {
      lg: '',
      md: '',
      sm: '',
    } satisfies Record<FormFieldSize, string>,
  },
})

type CheckboxRootVariants = VariantProps<typeof checkboxRootCVA>

const disabled = computed(() => Boolean(props.disabled))
const invalidState = computed(() => Boolean(invalid.value))

const fieldLabelCVA = cva('', {
  variants: {
    intent: {
      accent: 'text-accent-text data-[disabled]:text-accent-text-disabled',
      error: 'text-error-text data-[disabled]:text-error-text-disabled',
      info: 'text-info-text data-[disabled]:text-info-text-disabled',
      neutral: 'text-neutral-text data-[disabled]:text-neutral-text-disabled',
      primary: 'text-primary-text data-[disabled]:text-primary-text-disabled',
      secondary: 'text-secondary-text data-[disabled]:text-secondary-text-disabled',
      success: 'text-success-text data-[disabled]:text-success-text-disabled',
      warning: 'text-warning-text data-[disabled]:text-warning-text-disabled',
    } satisfies Record<FormFieldIntent, string>,
    size: {
      lg: 'txt-base',
      md: 'txt-label',
      sm: 'txt-caption',
    } satisfies Record<FormFieldSize, string>,
  },
})

interface CheckboxProps extends ArkCheckboxRootBaseProps, Omit<FieldProps, 'ids'> {
  /**
   * Renders only the checkbox control (no `UIFormField`). Use inside `UIFormCheckboxGroup`.
   * Selection is driven by the surrounding `Checkbox.Group`; do not use `v-model:checked`.
   */
  inGroup?: boolean
  /** Standalone control without field chrome; supports `v-model` (e.g. table row selection). */
  controlOnly?: boolean
  intent?: CheckboxRootVariants['intent']
  size?: CheckboxRootVariants['size']
  ui?: Partial<UICheckboxSlots>
}

const emit = defineEmits<{
  blur: [event: FocusEvent]
}>()

const checked = defineModel<ArkCheckboxCheckedState>({
  default: false,
})

const props = withDefaults(defineProps<CheckboxProps>(), {
  controlOnly: false,
  inGroup: false,
  intent: 'primary',
  label: '',
  size: 'md',
  ui: undefined,
})

const attrs = useAttrs()
const arkAttrs = computed(() => splitArkAttrs(attrs, ['ui']))

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
  const base = {
    ...rootProps.value,
    ...arkAttrs.value,
  }
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

const showField = computed(() => !props.inGroup && !props.controlOnly)

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
      <ArkCheckbox.Control
        :class="
          cn(checkboxControlCVA({ intent, size, disabled, invalid: invalidState }), ui?.control)
        "
      >
        <ArkCheckbox.Indicator
          :class="
            cn(
              checkboxIndicatorCVA({ intent, size, disabled, invalid: invalidState }),
              ui?.indicator,
            )
          "
        >
          <Icon name="tabler:check" class="size-3 shrink-0" />
        </ArkCheckbox.Indicator>
        <ArkCheckbox.Indicator
          :class="
            cn(
              checkboxIndicatorCVA({
                intent,
                size,
                disabled: Boolean(disabled),
                invalid: invalidState,
              }),
              ui?.indicator,
            )
          "
          indeterminate
        >
          <Icon name="tabler:minus" class="size-3 shrink-0" />
        </ArkCheckbox.Indicator>
      </ArkCheckbox.Control>
      <ArkCheckbox.Label
        v-if="!controlOnly || label || required"
        :class="cn(fieldLabelCVA({ intent, size }), ui?.label)"
      >
        <template v-if="label">{{ label }}</template>

        <span v-if="required" class="txt-caption text-error-icon" aria-hidden="true"> * </span>
      </ArkCheckbox.Label>
      <ArkCheckbox.HiddenInput :class="cn(ui?.hiddenInput)" @blur="emit('blur', $event)" />
    </ArkCheckbox.Root>
  </DefineCheckboxControl>

  <UIFormField v-if="showField" v-bind="fieldProps">
    <ReuseCheckboxControl :root-bindings="rootBindings" />
  </UIFormField>
  <ReuseCheckboxControl v-else :root-bindings="rootBindings" />
</template>
