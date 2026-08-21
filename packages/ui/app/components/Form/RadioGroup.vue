<script setup lang="ts">
import { RadioGroup as ArkRadioGroup } from '@ark-ui/vue/radio-group'
import { cva } from 'class-variance-authority'

import type { FieldProps } from '~ui/app/components/Form/Field.vue'

import type { ClassValue } from 'vue'
import type {
  FormFieldIntent,
  FormFieldOrientation,
  FormFieldSize,
} from '~/utils/Components/Form/context'

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

const radioGroupCVA = cva('', {
  variants: {
    orientation: {
      horizontal: 'flex flex-row flex-wrap gap-4',
      vertical: 'flex flex-col gap-2',
    } satisfies Record<FormFieldOrientation, string>,
  },
})

const radioItemCVA = cva(
  'inline-flex items-center not-data-[disabled]:cursor-pointer data-[disabled]:cursor-not-allowed',
  {
    variants: {
      size: {
        lg: 'gap-2.5',
        md: 'gap-2',
        sm: 'gap-1.5',
      } satisfies Record<FormFieldSize, string>,
    },
  },
)

const radioControlCVA = cva('relative', {
  variants: {
    intent: {
      accent:
        'border-accent-border data-hover:border-accent-border-hover data-[disabled]:border-accent-border-subtle data-[invalid]:border-error-border',
      error:
        'border-error-border data-hover:border-error-border-hover data-[disabled]:border-error-border-subtle data-[invalid]:border-error-border',
      info: 'border-info-border data-hover:border-info-border-hover data-[disabled]:border-info-border-subtle data-[invalid]:border-error-border',
      neutral:
        'border-neutral-border data-hover:border-neutral-border-hover data-[disabled]:border-neutral-border-subtle data-[invalid]:border-error-border',
      primary:
        'border-primary-border data-hover:border-primary-border-hover data-[disabled]:border-primary-border-subtle data-[invalid]:border-error-border',
      secondary:
        'border-secondary-border data-hover:border-secondary-border-hover data-[disabled]:border-secondary-border-subtle data-[invalid]:border-error-border',
      success:
        'border-success-border data-hover:border-success-border-hover data-[disabled]:border-success-border-subtle data-[invalid]:border-error-border',
      warning:
        'border-warning-border data-hover:border-warning-border-hover data-[disabled]:border-warning-border-subtle data-[invalid]:border-error-border',
    } satisfies Record<FormFieldIntent, string>,
    /* Sizes must track `radioIndicatorCVA` exactly: Ark positions the indicator as a
       floating element over the selected control, so a mismatch shows as a halo. */
    size: {
      lg: 'size-5 rounded-full border',
      md: 'size-4 rounded-full border',
      sm: 'size-3.5 rounded-full border',
    } satisfies Record<FormFieldSize, string>,
  },
})

const radioIndicatorCVA = cva('block shrink-0', {
  variants: {
    intent: {
      accent: 'bg-accent-fill',
      error: 'bg-error-fill',
      info: 'bg-info-fill',
      neutral: 'bg-neutral-fill',
      primary: 'bg-primary-fill',
      secondary: 'bg-secondary-fill',
      success: 'bg-success-fill',
      warning: 'bg-warning-fill',
    } satisfies Record<FormFieldIntent, string>,
    /* Mirrors `radioControlCVA` — see the note there. */
    size: {
      lg: 'size-5 rounded-full',
      md: 'size-4 rounded-full',
      sm: 'size-3.5 rounded-full',
    } satisfies Record<FormFieldSize, string>,
  },
})

const radioItemLabelCVA = cva('', {
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
  orientation?: FormFieldOrientation
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
</script>

<template>
  <UIFormField v-bind="{ ...fieldProps, ...passthroughAttrs }" :class="cn(ui?.root)">
    <ArkRadioGroup.Root
      v-model="modelValue"
      v-bind="groupProps"
      :class="cn('relative', radioGroupCVA({ orientation }), ui?.group)"
    >
      <ArkRadioGroup.Indicator :class="cn('absolute w-fit transition-none!', ui?.indicator)">
        <span :class="cn(radioIndicatorCVA({ intent, size }), ui?.indicator)" />
      </ArkRadioGroup.Indicator>
      <ArkRadioGroup.Item
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled || disabled"
        :class="cn(radioItemCVA({ size }), ui?.item)"
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
