<script setup lang="ts">
import { Field as ArkField } from '@ark-ui/vue/field'
import { cva, type VariantProps } from 'class-variance-authority'
import { computed, ref } from 'vue'

import {
  useComponentIcons,
  type UseComponentIconsProps,
} from '~ui/app/composables/useComponentIcons'

defineOptions({ inheritAttrs: false })

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

interface InputProps {
  label?: string
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  type?: string
  size?: ShellVariants['size']
  intent?: ShellVariants['intent']
  invalid?: boolean
  required?: boolean
  helperText?: string
  error?: string
  id?: string
  name?: string
}

const props = withDefaults(defineProps<InputProps & UseComponentIconsProps>(), {
  label: undefined,
  placeholder: '',
  disabled: false,
  readOnly: false,
  type: 'text',
  size: 'md',
  intent: 'primary',
  invalid: false,
  required: false,
  helperText: undefined,
  error: undefined,
  id: undefined,
  name: undefined,
  icon: undefined,
  leading: false,
  leadingIcon: undefined,
  trailing: false,
  trailingIcon: undefined,
  state: 'default',
  loadingIcon: undefined,
  successIcon: undefined,
  warningIcon: undefined,
  errorIcon: undefined,
  infoIcon: undefined,
  mode: 'button',
})

const modelValue = defineModel<string>({ default: '' })

const emit = defineEmits<{
  blur: [event: FocusEvent]
}>()

const isPasswordField = computed(() => props.type === 'password')
const showPassword = ref(false)

const resolvedInputType = computed(() =>
  isPasswordField.value ? (showPassword.value ? 'text' : 'password') : props.type,
)

const iconProps = computed<UseComponentIconsProps>(() => ({
  icon: props.icon,
  leading: props.leading,
  leadingIcon: props.leadingIcon,
  trailing: isPasswordField.value ? false : props.trailing,
  trailingIcon: isPasswordField.value ? undefined : props.trailingIcon,
  state: props.state,
  loadingIcon: props.loadingIcon,
  successIcon: props.successIcon,
  warningIcon: props.warningIcon,
  errorIcon: props.errorIcon,
  infoIcon: props.infoIcon,
  mode: props.mode,
}))

const { isLeading, isTrailing, leadingIconName, trailingIconName, shouldAnimate } =
  useComponentIcons(iconProps)

const passwordToggleLabel = computed(() => (showPassword.value ? 'Hide password' : 'Show password'))

extendCompodiumMeta<typeof props & { modelValue?: string }>({
  defaultProps: {
    modelValue: '',
    label: 'Email',
    placeholder: 'you@example.com',
    type: 'text',
    disabled: false,
    readOnly: false,
    size: 'md',
    intent: 'primary',
    invalid: false,
    required: true,
    leading: true,
    leadingIcon: 'tabler:sparkles',
  },
})
</script>

<template>
  <UIFormField
    :id="id"
    :intent
    :label
    :required
    :helper-text
    :error
    :invalid
    :disabled
    :read-only
    :size
  >
    <div
      :class="
        controlShell({
          intent,
          size,
          invalid,
          disabled,
        })
      "
    >
      <span
        v-if="isLeading && leadingIconName"
        class="flex shrink-0 items-center pl-2 text-primary-icon-subtle"
        aria-hidden="true"
      >
        <Icon
          :name="leadingIconName"
          class="size-4 shrink-0"
          :class="{ 'animate-spin': shouldAnimate }"
        />
      </span>

      <ArkField.Input
        v-bind="$attrs"
        v-model="modelValue"
        :type="resolvedInputType"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :read-only="readOnly"
        :class="fieldInput({ size })"
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
        class="flex shrink-0 items-center pr-2 text-primary-icon-subtle"
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
