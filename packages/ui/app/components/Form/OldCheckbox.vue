<script setup lang="ts">
import { Checkbox as ArkCheckbox, type CheckboxCheckedState } from '@ark-ui/vue/checkbox'

import { type VariantProps } from 'class-variance-authority'

// import { forwardCheckboxControlClick } from '~ui/app/utils/form-checkbox-control-click'

// import {
//   formCheckboxControl,
//   formCheckboxLabel,
//   formCheckboxRoot,
// } from '~ui/app/utils/form-checkbox-variants'

defineOptions({ inheritAttrs: false })

type RootVariants = VariantProps<any>

/** Declared explicitly so Vue can resolve `defineProps` (imported `extends` breaks the SFC compiler). */

interface CheckboxProps {
  label: string

  defaultChecked?: CheckboxCheckedState

  disabled?: boolean

  readOnly?: boolean

  invalid?: boolean

  required?: boolean

  id?: string

  name?: string

  value?: string

  form?: string

  size?: RootVariants['size']

  intent?: RootVariants['intent']

  helperText?: string

  error?: string
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  defaultChecked: undefined,

  disabled: false,

  readOnly: false,

  size: 'md',

  intent: 'primary',

  invalid: false,

  required: false,

  helperText: undefined,

  error: undefined,

  id: undefined,

  name: undefined,

  value: 'on',

  form: undefined,
})

const modelValue = defineModel<CheckboxCheckedState>({ default: false })

function onControlClick(e: MouseEvent) {
  forwardCheckboxControlClick(e, {
    disabled: props.disabled,

    readOnly: props.readOnly,
  })
}

extendCompodiumMeta<typeof props & { modelValue?: CheckboxCheckedState }>({
  defaultProps: {
    // Omit `modelValue`: Compodium binds defaultProps as props and does not

    // re-apply updates on emit, so a declared model keeps the checkbox stuck

    // controlled. Without it, `defineModel` stays local in the preview.

    label: 'Label',

    disabled: false,

    readOnly: false,

    size: 'md',

    intent: 'primary',

    invalid: false,

    required: true,

    helperText: 'Helper text',
  },
})
</script>

<template>
  <div class="contents" v-bind="$attrs">
    <UIFormField
      :id="id"
      :intent="intent"
      hide-label
      :required="required"
      :helper-text="helperText"
      :error="error"
      :invalid="invalid"
      :disabled="disabled"
      :read-only="readOnly"
      :size="size"
    >
      <ArkCheckbox.Root
        v-model:checked="modelValue"
        :default-checked="defaultChecked"
        :form="form"
        :value="value"
        :name="name"
        :disabled="disabled"
        :read-only="readOnly"
        :required="required"
        :invalid="invalid"
        :class="formCheckboxRoot({ intent, size, disabled })"
      >
        <ArkCheckbox.Control
          :class="formCheckboxControl({ intent, size, invalid, disabled })"
          @click.capture="onControlClick"
        >
          <ArkCheckbox.Indicator class="text-primary-text-on-fill">
            <Icon name="tabler:check" class="size-3 shrink-0" />
          </ArkCheckbox.Indicator>
        </ArkCheckbox.Control>

        <ArkCheckbox.Label :class="formCheckboxLabel({ intent, disabled })">
          {{ label }}

          <span v-if="required" class="txt-caption text-error-icon-default" aria-hidden="true">
            *
          </span>
        </ArkCheckbox.Label>

        <ArkCheckbox.HiddenInput />
      </ArkCheckbox.Root>
    </UIFormField>
  </div>
</template>
