<script setup lang="ts">
import {
  Field as ArkField,
  type FieldInputBaseProps as ArkFieldInputBaseProps,
} from '@ark-ui/vue/field'
import { cva, type VariantProps } from 'class-variance-authority'

import {
  useComponentIcons,
  type UseComponentIconsProps,
} from '~ui/app/composables/useComponentIcons'

import type { ClassValue } from 'vue'
import type { FieldProps, UIFieldSlots } from '~ui/app/components/Form/Field.vue'


defineOptions({ inheritAttrs: false })

/** Field slots plus control-specific parts for `UIFormInput`. */
export interface UIInputSlots extends UIFieldSlots {
  shell?: ClassValue
  input?: ClassValue
  leadingIcon?: ClassValue
  trailingIcon?: ClassValue
}

const controlShell = cva(
  'controlShell flex w-full min-w-0 items-center gap-0.5 transition-[box-shadow,border-color]',
  {
    variants: {
      intent: {
        primary: '',
      },
      size: {
        md: 'border focus-within:outline',
      },
      invalid: {
        true: 'border-error-border-default! focus-within:border-error-border-strong!',
      },
      disabled: {
        true: 'cursor-not-allowed',
      },
    },
    compoundVariants: [
      {
        intent: 'primary',
        disabled: false,
        class:
          'bg-primary-fill-subtle border-primary-border-default text-primary-text-default focus-within:outline-primary-border-default focus-within:border-primary-border-strong',
      },
      {
        intent: 'primary',
        disabled: true,
        class:
          'bg-primary-fill-subtle-disabled border-primary-border-default-disabled text-primary-text-default-disabled focus-within:outline-primary-border-default focus-within:border-primary-border-strong',
      },
    ],
  },
)

const fieldInput = cva(
  'fieldInput min-w-0 flex-1 border-0 txt-base outline-none read-only:cursor-default',
  {
    variants: {
      size: {
        md: 'px-2 py-1',
      },
      intent: {
        primary: '',
      },
      disabled: {
        true: 'disabled:cursor-not-allowed',
      },
    },
    compoundVariants: [
      {
        intent: 'primary',
        disabled: false,
        class: 'placeholder:text-primary-text-subtle text-primary-text-default',
      },
      {
        intent: 'primary',
        disabled: true,
        class: 'placeholder:text-primary-text-subtle-disabled text-primary-text-default-disabled',
      },
    ],
  },
)

type ShellVariants = VariantProps<typeof controlShell>

interface InputProps extends Omit<FieldProps, 'ui'>, ArkFieldInputBaseProps {
  intent?: ShellVariants['intent']
  name?: string
  placeholder?: string
  size?: ShellVariants['size']
  type?: string
  ui?: Partial<UIInputSlots>
}

const emit = defineEmits<{
  blur: [event: FocusEvent]
}>()

const modelValue = defineModel<string>({ default: '' })

const props = withDefaults(defineProps<InputProps & UseComponentIconsProps>(), {
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
  mode: 'button',
  name: undefined,
  placeholder: '',
  size: 'md',
  state: 'default',
  successIcon: undefined,
  trailing: false,
  trailingIcon: undefined,
  type: 'text',
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
    'mode',
    'state',
    'successIcon',
    'warningIcon',
  ] as const),
  trailing: isPasswordField.value ? false : props.trailing,
  trailingIcon: isPasswordField.value ? undefined : props.trailingIcon,
}))

const inputProps = computed(() => ({
  ...pick(props, ['type', 'name', 'placeholder', 'disabled', 'readOnly', 'required'] as const),
  invalid: props.invalid || String(props.error ?? '').length > 0,
}))

const isPasswordField = computed(() => props.type === 'password')
const showPassword = ref(false)
// TODO: i18n
const passwordToggleLabel = computed(() => (showPassword.value ? 'Hide password' : 'Show password'))

const resolvedInputType = computed(() =>
  isPasswordField.value ? (showPassword.value ? 'text' : 'password') : props.type,
)

const { isLeading, isTrailing, leadingIconName, trailingIconName, shouldAnimate } =
  useComponentIcons(iconProps)

const attrs = useAttrs()

const inputFallthroughAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs as Record<string, unknown> & { class?: unknown }
  return rest
})

extendCompodiumMeta<typeof props & { modelValue?: string }>({
  defaultProps: {
    modelValue: '',
    label: 'Email',
    placeholder: 'you@example.com',
    type: 'text',
    size: 'md',
    intent: 'primary',
    required: true,
    leading: true,
    leadingIcon: 'tabler:sparkles',
  },
})
</script>

<template>
  <UIFormField
    v-bind="fieldProps"
  >
    <div
      :class="
        cn(
          controlShell({
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
        :class="
          cn('flex shrink-0 items-center pl-2 text-primary-icon-subtle', ui?.leadingIcon)
        "
        aria-hidden="true"
      >
        <Icon
          :name="leadingIconName"
          class="size-4 shrink-0"
          :class="{ 'animate-spin': shouldAnimate }"
        />
      </span>

      <ArkField.Input
        v-bind="{ ...inputProps, ...inputFallthroughAttrs }"
        v-model="modelValue"
        :type="resolvedInputType"
        :class="cn(fieldInput({ size, intent, disabled }), attrs.class, ui?.input)"
        @blur="emit('blur', $event)"
      />

      <UIToggle
        v-if="isPasswordField"
        v-model:pressed="showPassword"
        variant="ghost"
        intent="primary"
        size="sm"
        icon-only
        :disabled="disabled || readOnly"
        :aria-label="passwordToggleLabel"
      >
        <template #on>
          <Icon name="tabler:eye-off" class="size-4 shrink-0" />
        </template>
        <template #off>
          <Icon name="tabler:eye" class="size-4 shrink-0" />
        </template>
      </UIToggle>

      <span
        v-else-if="isTrailing && trailingIconName"
        :class="
          cn('flex shrink-0 items-center pr-2 text-primary-icon-subtle', ui?.trailingIcon)
        "
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
