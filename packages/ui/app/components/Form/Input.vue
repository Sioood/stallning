<script setup lang="ts">
import {
  Field as ArkField,
  type FieldInputBaseProps as ArkFieldInputBaseProps,
} from '@ark-ui/vue/field'

import { fieldInputCVA } from '~ui/app/utils/Form/variants'

import type { FormControlShellProps } from '~ui/app/components/Form/FormControlShell.vue'
import type { UIInputSlots } from '~ui/app/utils/Form/context'

export type { UIInputSlots } from '~ui/app/utils/Form/context'

/** Public API for imperative focus (e.g. dialog `initialFocusEl`). */
export interface UIFormInputExpose {
  getControlElement: () => HTMLInputElement | null
  focus: () => void
}

defineOptions({ inheritAttrs: false })

interface InputProps extends Omit<FormControlShellProps, 'ui'>, ArkFieldInputBaseProps {
  name?: string
  placeholder?: string
  type?: string
  ui?: Partial<UIInputSlots>
}

const emit = defineEmits<{
  blur: [event: FocusEvent]
}>()

const modelValue = defineModel<string>({ default: '' })

const props = withDefaults(defineProps<InputProps>(), {
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

const shellProps = computed<FormControlShellProps>(() => ({
  ...pick(props, [
    'disabled',
    'error',
    'helperText',
    'icon',
    'infoIcon',
    'intent',
    'label',
    'leading',
    'leadingIcon',
    'loadingIcon',
    'mode',
    'readOnly',
    'required',
    'size',
    'state',
    'successIcon',
    'warningIcon',
  ] as const),
  errorIcon: props.errorIcon,
  trailing: isPasswordField.value ? false : props.trailing,
  trailingIcon: isPasswordField.value ? undefined : props.trailingIcon,
  invalid: props.invalid || String(props.error ?? '').length > 0,
  ui: props.ui,
}))

const resolvedInputType = computed(() =>
  isPasswordField.value ? (showPassword.value ? 'text' : 'password') : props.type,
)

const inputProps = computed(() => ({
  ...pick(props, ['name', 'placeholder', 'disabled', 'readOnly', 'required'] as const),
  invalid: props.invalid || String(props.error ?? '').length > 0,
  type: resolvedInputType.value,
}))

const isPasswordField = computed(() => props.type === 'password')
const showPassword = ref(false)
const passwordToggleLabel = computed(() => (showPassword.value ? 'Hide password' : 'Show password'))

const attrs = useAttrs()

const inputFallthroughAttrs = computed(() => {
  const { ui: _ui, ...rest } = attrs as Record<string, unknown> & { ui?: Partial<UIInputSlots> }
  return rest
})

const arkInputRef = ref<InstanceType<typeof ArkField.Input> | null>(null)

const controlElement = computed((): HTMLInputElement | null => {
  const inst = arkInputRef.value
  if (!inst) return null
  const el = (inst as { $el?: unknown }).$el
  return el instanceof HTMLInputElement ? el : null
})

defineExpose({
  getControlElement: (): HTMLInputElement | null => controlElement.value,
  focus: (): void => {
    controlElement.value?.focus()
  },
} satisfies UIFormInputExpose)

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
  <UIFormControlShell v-bind="shellProps">
    <ArkField.Input
      ref="arkInputRef"
      v-bind="{ ...inputProps, ...inputFallthroughAttrs }"
      v-model="modelValue"
      :type="resolvedInputType"
      :class="cn(fieldInputCVA({ size, intent, disabled }), ui?.input)"
      @blur="emit('blur', $event)"
    />

    <template v-if="isPasswordField" #trailing>
      <UIToggle
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
    </template>
  </UIFormControlShell>
</template>
