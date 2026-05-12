<script setup lang="ts">
import { Switch as ArkSwitch, type SwitchRootProps as ArkSwitchRootProps } from '@ark-ui/vue/switch'
import { cva } from 'class-variance-authority'

import type { ClassValue } from 'vue'
import type { FieldProps } from '~ui/app/components/Form/Field.vue'

defineOptions({ inheritAttrs: false })

type SwitchIntent = 'neutral' | 'primary' | 'secondary' | 'accent'
type SwitchSize = 'sm' | 'md' | 'lg'

interface UISwitchSlots {
  root?: ClassValue
  control?: ClassValue
  thumb?: ClassValue
  label?: ClassValue
}

const switchControlCVA = cva(
  [
    'relative inline-flex shrink-0 items-center transition-colors duration-200',
    'not-data-[disabled]:cursor-pointer data-[disabled]:cursor-not-allowed',
    'data-[invalid]:outline-error-border-default data-[invalid]:outline',
  ],
  {
    variants: {
      intent: {
        neutral:
          'bg-neutral-fill-default data-[disabled]:bg-primary-fill-default-disabled! data-[state=checked]:bg-neutral-fill-default-active',
        primary:
          'bg-primary-fill-default data-[disabled]:bg-primary-fill-default-disabled! data-[state=checked]:bg-primary-fill-default-active',
        secondary:
          'bg-secondary-fill-default data-[disabled]:bg-primary-fill-default-disabled! data-[state=checked]:bg-secondary-fill-default-active',
        accent:
          'bg-accent-fill-default data-[disabled]:bg-primary-fill-default-disabled! data-[state=checked]:bg-accent-fill-default-active',
      } satisfies Record<SwitchIntent, string>,
      size: {
        sm: 'h-4 w-7',
        md: 'h-5 w-9',
        lg: 'h-6 w-11',
      } satisfies Record<SwitchSize, string>,
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  },
)

const switchThumbCVA = cva(
  'pointer-events-none block transition-transform duration-150 ease-in-out data-[state=checked]:rotate-90',
  {
    variants: {
      intent: {
        neutral: 'bg-neutral-fill-inverse',
        primary: 'bg-primary-fill-inverse',
        secondary: 'bg-secondary-fill-inverse',
        accent: 'bg-accent-fill-inverse',
      } satisfies Record<SwitchIntent, string>,
      size: {
        sm: 'size-2.5 translate-x-1 data-[state=checked]:translate-x-3.75',
        md: 'size-3.5 translate-x-1 data-[state=checked]:translate-x-4.75',
        lg: 'size-4 translate-x-1 data-[state=checked]:translate-x-6',
      } satisfies Record<SwitchSize, string>,
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const switchLabelCVA = cva('', {
  variants: {
    intent: {
      neutral: 'text-neutral-text-default data-[disabled]:text-neutral-text-default-disabled',
      primary: 'text-primary-text-default data-[disabled]:text-primary-text-default-disabled',
      secondary: 'text-secondary-text-default data-[disabled]:text-secondary-text-default-disabled',
      accent: 'text-accent-text-default data-[disabled]:text-accent-text-default-disabled',
    } satisfies Record<SwitchIntent, string>,
    size: {
      sm: 'txt-base',
      md: 'txt-label',
      lg: 'txt-h6',
    } satisfies Record<SwitchSize, string>,
  },
})

export interface SwitchProps
  extends Omit<ArkSwitchRootProps, 'checked'>, Omit<FieldProps, 'ids' | 'intent' | 'size'> {
  intent?: SwitchIntent
  size?: SwitchSize
  ui?: Partial<UISwitchSlots>
}

const props = withDefaults(defineProps<SwitchProps>(), {
  intent: 'primary',
  size: 'md',
  ui: undefined,
})

const modelValue = defineModel<boolean>('modelValue', { default: false })

const invalid = computed(() =>
  Boolean(props.invalid || (props.error && String(props.error).length > 0)),
)

const attrs = useAttrs()

const rootProps = computed(() => ({
  ...pick(props, [
    'asChild',
    'defaultChecked',
    'disabled',
    'id',
    'name',
    'required',
    'value',
  ] as const),
}))

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

const rootAttrs = computed(() => {
  const { ui: _ui, ...rest } = attrs as Record<string, unknown> & { ui?: Partial<UISwitchSlots> }
  return rest
})

extendCompodiumMeta<typeof props>({
  defaultProps: {
    intent: 'primary',
    size: 'md',
    disabled: false,
  },
})
</script>

<template>
  <UIFormField v-bind="fieldProps as FieldProps">
    <ArkSwitch.Root
      v-bind="{ ...rootProps, ...rootAttrs }"
      v-model:checked="modelValue"
      :class="cn('inline-flex items-center gap-2', ui?.root)"
    >
      <ArkSwitch.Control
        :class="
          cn(
            switchControlCVA({
              intent,
              size,
            }),
            ui?.control,
          )
        "
      >
        <ArkSwitch.Thumb
          :class="
            cn(
              switchThumbCVA({
                intent,
                size,
              }),
              ui?.thumb,
            )
          "
        />
      </ArkSwitch.Control>
      <ArkSwitch.Label :class="cn(switchLabelCVA({ intent, size }), ui?.label)">
        <template v-if="label">{{ label }}</template>

        <span v-if="required" class="txt-caption text-error-icon-default" aria-hidden="true">
          *
        </span>
      </ArkSwitch.Label>
      <ArkSwitch.HiddenInput />
    </ArkSwitch.Root>
  </UIFormField>
</template>
