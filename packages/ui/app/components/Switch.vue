<script setup lang="ts">
import {
  Switch as ArkSwitch,
  type SwitchRootBaseProps as ArkSwitchRootBaseProps,
  type SwitchRootProviderBaseProps as ArkSwitchRootProviderBaseProps,
  type UseSwitchReturn,
} from '@ark-ui/vue/switch'
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
    'data-[invalid]:outline data-[invalid]:outline-error-border-default',
  ],
  {
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
    variants: {
      intent: {
        accent:
          'bg-accent-fill-default data-[disabled]:bg-primary-fill-default-disabled! data-[state=checked]:bg-accent-fill-default-active',
        neutral:
          'bg-neutral-fill-default data-[disabled]:bg-primary-fill-default-disabled! data-[state=checked]:bg-neutral-fill-default-active',
        primary:
          'bg-primary-fill-default data-[disabled]:bg-primary-fill-default-disabled! data-[state=checked]:bg-primary-fill-default-active',
        secondary:
          'bg-secondary-fill-default data-[disabled]:bg-primary-fill-default-disabled! data-[state=checked]:bg-secondary-fill-default-active',
      } satisfies Record<SwitchIntent, string>,
      size: {
        lg: 'h-6 w-11',
        md: 'h-5 w-9',
        sm: 'h-4 w-7',
      } satisfies Record<SwitchSize, string>,
    },
  },
)

const switchThumbCVA = cva(
  'pointer-events-none block transition-transform duration-150 ease-in-out data-[state=checked]:rotate-90',
  {
    defaultVariants: {
      size: 'md',
    },
    variants: {
      intent: {
        accent: 'bg-accent-fill-inverse',
        neutral: 'bg-neutral-fill-inverse',
        primary: 'bg-primary-fill-inverse',
        secondary: 'bg-secondary-fill-inverse',
      } satisfies Record<SwitchIntent, string>,
      size: {
        lg: 'size-4 translate-x-1 data-[state=checked]:translate-x-6',
        md: 'size-3.5 translate-x-1 data-[state=checked]:translate-x-4.75',
        sm: 'size-2.5 translate-x-1 data-[state=checked]:translate-x-3.75',
      } satisfies Record<SwitchSize, string>,
    },
  },
)

const switchLabelCVA = cva('', {
  variants: {
    intent: {
      accent: 'text-accent-text-default data-[disabled]:text-accent-text-default-disabled',
      neutral: 'text-neutral-text-default data-[disabled]:text-neutral-text-default-disabled',
      primary: 'text-primary-text-default data-[disabled]:text-primary-text-default-disabled',
      secondary: 'text-secondary-text-default data-[disabled]:text-secondary-text-default-disabled',
    } satisfies Record<SwitchIntent, string>,
    size: {
      lg: 'txt-h6',
      md: 'txt-label',
      sm: 'txt-base',
    } satisfies Record<SwitchSize, string>,
  },
})

export interface SwitchProps
  extends
    Omit<ArkSwitchRootBaseProps, 'value' | 'checked'>,
    Omit<ArkSwitchRootProviderBaseProps, 'value'>,
    Omit<FieldProps, 'ids' | 'intent' | 'size'> {
  /**
   * Pass the return value of `useSwitch()` to enable **RootProvider** mode —
   * the component will be controlled entirely from outside via the Ark API object.
   * Omit (or leave `undefined`) to use the default **Root** mode with `v-model`.
   */
  value?: UseSwitchReturn['value']
  intent?: SwitchIntent
  size?: SwitchSize
  ui?: Partial<UISwitchSlots>
}

const props = withDefaults(defineProps<SwitchProps>(), {
  intent: 'primary',
  size: 'md',
  ui: undefined,
  value: undefined,
})

const modelValue = defineModel<boolean>('modelValue', { default: false })

const invalid = computed(() =>
  Boolean(props.invalid || (props.error && String(props.error).length > 0)),
)

const attrs = useAttrs()

const isProvider = computed(() => props.value !== undefined)

const rootComponent = computed(() => (isProvider.value ? ArkSwitch.RootProvider : ArkSwitch.Root))

const rootProps = computed(() => {
  if (isProvider.value) {
    return pick(props, ['asChild', 'value'] as const)
  }
  return pick(props, ['asChild', 'defaultChecked', 'disabled', 'id', 'name', 'required'] as const)
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
  ] as const),
  hideLabel: true,
  invalid: invalid.value,
}))

const rootAttrs = computed(() => splitArkAttrs(attrs))

const rootBindings = computed(() => {
  const base: Record<string, unknown> = {
    ...rootProps.value,
    ...rootAttrs.value,
    class: cn('inline-flex items-center gap-2', props.ui?.root),
  }
  if (!isProvider.value) {
    base.checked = modelValue.value
    base['onUpdate:checked'] = (next: boolean) => {
      modelValue.value = next
    }
  }
  return base
})

extendCompodiumMeta({
  defaultProps: {
    disabled: false,
    intent: 'primary',
    size: 'md',
  },
})
</script>

<template>
  <UIFormField v-bind="fieldProps as FieldProps">
    <component :is="rootComponent" v-bind="rootBindings">
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
    </component>
  </UIFormField>
</template>
