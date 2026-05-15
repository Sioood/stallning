<script setup lang="ts">
import {
  useComponentIcons,
  type UseComponentIconsProps,
} from '~ui/app/composables/useComponentIcons'
import { controlShellCVA } from '~ui/app/utils/Form/variants'

import type { FieldProps } from '~ui/app/components/Form/Field.vue'
import type { FormFieldIntent, FormFieldSize, UIInputSlots } from '~ui/app/utils/Form/context'

defineOptions({ inheritAttrs: false })

/**
 * Reusable control shell for form inputs (Input, Textarea, NumberInput).
 * Renders UIFormField + visual shell (border, focus ring, icons) and
 * accepts the actual input element via the default slot.
 *
 * Additional trailing content (password toggle, etc.) goes in the `trailing` slot.
 */
export interface FormControlShellProps extends Omit<FieldProps, 'ui'>, UseComponentIconsProps {
  intent?: FormFieldIntent
  size?: FormFieldSize
  ui?: Partial<UIInputSlots>
}

const props = withDefaults(defineProps<FormControlShellProps>(), {
  error: undefined,
  errorIcon: undefined,
  helperText: undefined,
  icon: undefined,
  infoIcon: undefined,
  intent: 'primary',
  label: undefined,
  leading: false,
  leadingIcon: undefined,
  loadingIcon: undefined,
  mode: 'leadingAndTrailing',
  size: 'md',
  state: 'default',
  successIcon: undefined,
  trailing: false,
  trailingIcon: undefined,
  warningIcon: undefined,
  ui: undefined,
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
    'ui',
  ] as const),
  invalid: props.invalid || String(props.error ?? '').length > 0,
}))

const iconProps = computed<UseComponentIconsProps>(() => ({
  ...pick(props, [
    'errorIcon',
    'icon',
    'infoIcon',
    'leading',
    'leadingIcon',
    'loadingIcon',
    'state',
    'successIcon',
    'trailing',
    'trailingIcon',
    'warningIcon',
  ] as const),
}))

const { isLeading, isTrailing, leadingIconName, trailingIconName, shouldAnimate } =
  useComponentIcons(iconProps)

const invalid = computed(() => props.invalid || String(props.error ?? '').length > 0)
const disabled = computed(() => props.disabled ?? false)
</script>

<template>
  <UIFormField v-bind="fieldProps">
    <!-- TODO add slot for leading and trailing elements like having a select after or just having an indicator like .com see https://shadcnstudio.com/docs/components/input so maybe those can be used a prefix/suffix for the value -->
    <div
      :class="
        cn(
          controlShellCVA({
            intent,
            size,
            invalid,
            disabled,
          }),
          ui?.shell,
        )
      "
    >
      <span
        v-if="isLeading && leadingIconName"
        :class="cn('flex shrink-0 items-center pl-2 text-primary-icon-subtle', ui?.leadingIcon)"
        aria-hidden="true"
      >
        <Icon
          :name="leadingIconName"
          class="size-4 shrink-0"
          :class="{ 'animate-spin': shouldAnimate }"
        />
      </span>

      <slot />

      <slot name="trailing" />

      <span
        v-if="isTrailing && trailingIconName"
        :class="cn('flex shrink-0 items-center pr-2 text-primary-icon-subtle', ui?.trailingIcon)"
        aria-hidden="true"
      >
        <Icon
          :name="trailingIconName"
          class="size-4 shrink-0"
          :class="{ 'animate-spin': shouldAnimate }"
        />
      </span>
    </div>
  </UIFormField>
</template>
