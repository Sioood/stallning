<script setup lang="ts">
import { RadioGroup as ArkRadioGroup } from '@ark-ui/vue/radio-group'
import { cva } from 'class-variance-authority'

import type { FormFieldIntent, FormFieldSize } from './context'
import type { ClassValue } from 'vue'
import type { FieldProps } from '~ui/app/components/Form/Field.vue'

export interface UIRadioGroupSlots {
  root?: ClassValue
  group?: ClassValue
  item?: ClassValue
  control?: ClassValue
  indicator?: ClassValue
  label?: ClassValue
  hiddenInput?: ClassValue
}

defineOptions({ inheritAttrs: false })

const radioItemCVA = cva(
  'inline-flex items-center not-data-[disabled]:cursor-pointer data-[disabled]:cursor-not-allowed',
  {
    variants: {
      intent: {
        primary: '',
      } satisfies Record<FormFieldIntent, string>,
      size: {
        md: 'gap-2',
      } satisfies Record<FormFieldSize, string>,
    },
  },
)

const radioControlCVA = cva('relative', {
  variants: {
    intent: {
      primary:
        'border-primary-border-default data-hover:border-primary-border-default-hover data-[disabled]:border-primary-border-subtle data-[invalid]:border-error-border-default',
    } satisfies Record<FormFieldIntent, string>,
    size: {
      md: 'size-4 rounded-full border',
    } satisfies Record<FormFieldSize, string>,
  },
})

const radioIndicatorCVA = cva('block shrink-0', {
  variants: {
    intent: {
      primary: 'bg-primary-fill-default',
    } satisfies Record<FormFieldIntent, string>,
    size: {
      md: 'size-4 rounded-full',
    } satisfies Record<FormFieldSize, string>,
  },
})

const radioItemLabelCVA = cva('', {
  variants: {
    intent: {
      primary: 'text-primary-text-default data-[disabled]:text-primary-text-default-disabled',
    } satisfies Record<FormFieldIntent, string>,
    size: {
      md: 'txt-label',
    } satisfies Record<FormFieldSize, string>,
  },
})

export interface RadioGroupItem {
  disabled?: boolean
  label: string
  value: string
}

export interface RadioGroupProps extends FieldProps {
  items: RadioGroupItem[]
  /** Passed to `RadioGroup.Root` for form submission. */
  name?: string
  /** Layout direction. Defaults to `vertical`. */
  orientation?: 'horizontal' | 'vertical'
  ui?: Partial<UIRadioGroupSlots>
}

const props = withDefaults(defineProps<RadioGroupProps>(), {
  intent: 'primary',
  name: undefined,
  orientation: 'vertical',
  size: 'md',
  ui: undefined,
})

const attrs = useAttrs()

const modelValue = defineModel<string | null>({
  default: null,
})

const invalid = computed(() =>
  Boolean(props.invalid || (props.error && String(props.error).length > 0)),
)

const fieldProps = computed(() => ({
  asFieldset: true,
  ...pick(props, [
    'disabled',
    'error',
    'helperText',
    'id',
    'intent',
    'label',
    'readOnly',
    'required',
    'size',
    'ui',
  ] as const),
  hideLabel: false,
  invalid: invalid.value,
}))

const groupProps = computed(() => ({
  ...pick(props, ['disabled', 'readOnly', 'name', 'orientation'] as const),
  invalid: invalid.value,
}))

const passthroughAttrs = computed(() => {
  const { ui: _ui, ...rest } = attrs as Record<string, unknown> & {
    ui?: Partial<UIRadioGroupSlots>
  }
  return rest
})

extendCompodiumMeta<typeof props & { modelValue?: string | null }>({
  defaultProps: {
    modelValue: 'react',
    label: 'Framework (radio group)',
    helperText: 'Choose your preferred framework',
    required: true,
    orientation: 'vertical',
    items: [
      { label: 'React', value: 'react' },
      { label: 'Solid', value: 'solid', disabled: true },
      { label: 'Vue', value: 'vue' },
    ],
  },
})
</script>

<template>
  <UIFormField v-bind="{ ...fieldProps, ...passthroughAttrs }" :class="cn(ui?.root)">
    <ArkRadioGroup.Root
      v-model="modelValue"
      v-bind="groupProps"
      :class="
        cn(
          'relative',
          orientation === 'horizontal' ? 'flex flex-row flex-wrap gap-4' : 'flex flex-col gap-2',
          ui?.group,
        )
      "
    >
      <ArkRadioGroup.Indicator :class="cn('absolute w-fit transition-none!', ui?.indicator)">
        <span :class="cn(radioIndicatorCVA({ intent, size }), ui?.indicator)" />
      </ArkRadioGroup.Indicator>
      <ArkRadioGroup.Item
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled || disabled"
        :class="cn(radioItemCVA({ intent, size }), ui?.item)"
      >
        <ArkRadioGroup.ItemControl :class="cn(radioControlCVA({ intent, size }), ui?.control)" />
        <ArkRadioGroup.ItemText :class="cn(radioItemLabelCVA({ intent, size }), ui?.label)">
          {{ item.label }}
        </ArkRadioGroup.ItemText>
        <ArkRadioGroup.ItemHiddenInput :class="cn(ui?.hiddenInput)" />
      </ArkRadioGroup.Item>
    </ArkRadioGroup.Root>
  </UIFormField>
</template>
