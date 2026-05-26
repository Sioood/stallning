<script setup lang="ts">
import {
  SignaturePad as ArkSignaturePad,
  type SignaturePadRootBaseProps as ArkSignaturePadRootBaseProps,
  type SignaturePadRootProviderBaseProps as ArkSignaturePadRootProviderBaseProps,
  type UseSignaturePadReturn,
} from '@ark-ui/vue/signature-pad'
import { cva } from 'class-variance-authority'

import type {
  FormFieldIntent,
  FormFieldSize,
  FormFieldVariant,
  UISignaturePadSlots,
} from '~/utils/Components/Form/context'

defineOptions({ inheritAttrs: false })

const signaturePadSegmentCVA = cva(
  'w-full touch-none focus-visible:focus-ring [&_path]:fill-current',
  {
    variants: {
      intent: {
        neutral: 'text-neutral-text-default',
        primary: 'text-primary-text-default',
        secondary: 'text-secondary-text-default',
        accent: 'text-accent-text-default',
      } satisfies Record<FormFieldIntent, string>,
      size: {
        sm: 'min-h-32',
        md: 'min-h-40',
        lg: 'min-h-48',
      } satisfies Record<FormFieldSize, string>,
    },
  },
)

const signaturePadShellCVA = cva('flex w-full min-w-0 items-stretch gap-0.5 border p-0', {
  variants: {
    variant: {
      default: '',
      subtle: '',
    } satisfies Record<FormFieldVariant, string>,
    intent: {
      neutral: '',
      primary: '',
      secondary: '',
      accent: '',
    } satisfies Record<FormFieldIntent, string>,
    size: {
      sm: 'min-h-32',
      md: 'min-h-40',
      lg: 'min-h-48',
    } satisfies Record<FormFieldSize, string>,
    invalid: {
      true: 'border-error-border-default!',
    },
    disabled: {
      true: 'cursor-not-allowed',
    },
  },
  compoundVariants: [
    {
      variant: 'default',
      intent: 'neutral',
      disabled: false,
      class:
        'border-neutral-border-default bg-neutral-fill-subtle text-neutral-text-default focus-within:border-neutral-border-strong focus-within:focus-ring',
    },
    {
      variant: 'default',
      intent: 'neutral',
      disabled: true,
      class:
        'border-neutral-border-default-disabled bg-neutral-fill-subtle-disabled text-neutral-text-default-disabled',
    },
    {
      variant: 'default',
      intent: 'primary',
      disabled: false,
      class:
        'border-primary-border-default bg-primary-fill-subtle text-primary-text-default focus-within:border-primary-border-strong focus-within:focus-ring',
    },
    {
      variant: 'default',
      intent: 'primary',
      disabled: true,
      class:
        'border-primary-border-default-disabled bg-primary-fill-subtle-disabled text-primary-text-default-disabled',
    },
    {
      variant: 'default',
      intent: 'secondary',
      disabled: false,
      class:
        'border-secondary-border-default bg-secondary-fill-subtle text-secondary-text-default focus-within:border-secondary-border-strong focus-within:focus-ring',
    },
    {
      variant: 'default',
      intent: 'secondary',
      disabled: true,
      class:
        'border-secondary-border-default-disabled bg-secondary-fill-subtle-disabled text-secondary-text-default-disabled',
    },
    {
      variant: 'default',
      intent: 'accent',
      disabled: false,
      class:
        'border-accent-border-default bg-accent-fill-subtle text-accent-text-default focus-within:border-accent-border-strong focus-within:focus-ring',
    },
    {
      variant: 'default',
      intent: 'accent',
      disabled: true,
      class:
        'border-accent-border-default-disabled bg-accent-fill-subtle-disabled text-accent-text-default-disabled',
    },
    {
      variant: 'subtle',
      intent: 'neutral',
      disabled: false,
      class:
        'border-neutral-border-default bg-transparent text-neutral-text-default focus-within:border-neutral-border-strong focus-within:focus-ring',
    },
    {
      variant: 'subtle',
      intent: 'neutral',
      disabled: true,
      class:
        'border-neutral-border-default-disabled bg-transparent text-neutral-text-default-disabled',
    },
    {
      variant: 'subtle',
      intent: 'primary',
      disabled: false,
      class:
        'border-primary-border-default bg-transparent text-primary-text-default focus-within:border-primary-border-strong focus-within:focus-ring',
    },
    {
      variant: 'subtle',
      intent: 'primary',
      disabled: true,
      class:
        'border-primary-border-default-disabled bg-transparent text-primary-text-default-disabled',
    },
    {
      variant: 'subtle',
      intent: 'secondary',
      disabled: false,
      class:
        'border-secondary-border-default bg-transparent text-secondary-text-default focus-within:border-secondary-border-strong focus-within:focus-ring',
    },
    {
      variant: 'subtle',
      intent: 'secondary',
      disabled: true,
      class:
        'border-secondary-border-default-disabled bg-transparent text-secondary-text-default-disabled',
    },
    {
      variant: 'subtle',
      intent: 'accent',
      disabled: false,
      class:
        'border-accent-border-default bg-transparent text-accent-text-default focus-within:border-accent-border-strong focus-within:focus-ring',
    },
    {
      variant: 'subtle',
      intent: 'accent',
      disabled: true,
      class:
        'border-accent-border-default-disabled bg-transparent text-accent-text-default-disabled',
    },
  ],
  defaultVariants: {
    variant: 'default',
  },
})

const signaturePadGuideCVA = cva(
  'pointer-events-none absolute right-6 bottom-6 left-6 border-b border-dashed',
  {
    variants: {
      intent: {
        neutral: 'border-neutral-border-default',
        primary: 'border-primary-border-default',
        secondary: 'border-secondary-border-default',
        accent: 'border-accent-border-default',
      } satisfies Record<FormFieldIntent, string>,
    },
  },
)

export interface SignaturePadProps
  extends
    Omit<ArkSignaturePadRootBaseProps, 'defaultPaths'>,
    Omit<ArkSignaturePadRootProviderBaseProps, 'value'> {
  /**
   * Pass the return value of `useSignaturePad()` to enable **RootProvider** mode.
   * Omit (or leave `undefined`) to use the default **Root** mode with `v-model`.
   */
  value?: UseSignaturePadReturn['value']
  /** Visual shell style. @default 'default' */
  variant?: FormFieldVariant
  intent?: FormFieldIntent
  size?: FormFieldSize
  label?: string
  helperText?: string
  error?: string
  invalid?: boolean
  /** When false, hides the built-in clear button. @default true */
  clearable?: boolean
  ui?: Partial<UISignaturePadSlots>
}

const modelValue = defineModel<string[]>()

const props = withDefaults(defineProps<SignaturePadProps>(), {
  clearable: true,
  disabled: undefined,
  drawing: undefined,
  error: undefined,
  helperText: undefined,
  invalid: undefined,
  id: undefined,
  ids: undefined,
  intent: 'primary',
  label: undefined,
  name: undefined,
  readOnly: undefined,
  required: undefined,
  size: 'md',
  translations: undefined,
  ui: undefined,
  value: undefined,
  variant: 'default',
})

const attrs = useAttrs()

const isProvider = computed(() => props.value !== undefined)

const rootComponent = computed(() =>
  isProvider.value ? ArkSignaturePad.RootProvider : ArkSignaturePad.Root,
)

const rootProps = computed(() => {
  if (isProvider.value) {
    return pick(props, ['asChild', 'value'])
  }
  return pick(props, [
    'asChild',
    'disabled',
    'drawing',
    'id',
    'ids',
    'name',
    'readOnly',
    'required',
    'translations',
  ])
})

const arkAttrs = computed(() =>
  splitArkAttrs(attrs, [
    'ui',
    'label',
    'error',
    'helperText',
    'clearable',
    'intent',
    'invalid',
    'size',
    'variant',
  ]),
)

const invalid = computed(() => props.invalid || String(props.error ?? '').length > 0)

const rootBindings = computed(() => {
  const base: Record<string, unknown> = {
    ...rootProps.value,
    ...arkAttrs.value,
    class: cn('flex w-full flex-col gap-0', props.ui?.root),
  }

  if (!isProvider.value) {
    if (modelValue.value !== undefined && modelValue.value.length > 0) {
      base.defaultPaths = [...modelValue.value]
    }
    base['onUpdate:paths'] = (paths: string[]) => {
      modelValue.value = paths
    }
  }

  return base
})

const fieldProps = computed(() => ({
  ...pick(props, [
    'asChild',
    'disabled',
    'error',
    'helperText',
    'id',
    'ids',
    'label',
    'readOnly',
    'required',
  ]),
  intent: props.intent,
  size: props.size,
  invalid: invalid.value,
  ui: {
    root: props.ui?.root,
    label: props.ui?.label,
    helperText: props.ui?.helperText,
    error: props.ui?.error,
    requiredIndicator: props.ui?.requiredIndicator,
  },
}))

extendCompodiumMeta<typeof props & { modelValue?: string[] }>({
  defaultProps: {
    modelValue: [],
    label: 'Signature',
    helperText: 'Sign in the box above',
    intent: 'primary',
    size: 'md',
    variant: 'default',
    clearable: true,
  },
})
</script>

<template>
  <UIFormField v-bind="fieldProps">
    <component :is="rootComponent" v-bind="rootBindings">
      <ArkSignaturePad.Context v-slot="api">
        <div
          :class="
            cn(
              signaturePadShellCVA({
                variant,
                intent,
                size,
                invalid,
                disabled: disabled ?? false,
              }),
              'relative',
              ui?.shell,
            )
          "
        >
          <ArkSignaturePad.Control :class="cn('flex w-full flex-1', ui?.control)">
            <ArkSignaturePad.Segment
              :class="cn(signaturePadSegmentCVA({ intent, size }), ui?.segment)"
            />

            <ArkSignaturePad.Guide :class="cn(signaturePadGuideCVA({ intent }), ui?.guide)" />

            <ArkSignaturePad.ClearTrigger v-if="clearable" as-child>
              <UIButton
                variant="ghost"
                :intent
                size="sm"
                icon-only
                icon="tabler:x"
                :disabled="disabled || readOnly"
                :ui="{ root: cn('absolute top-2 right-2 z-10', ui?.clearTrigger) }"
                aria-label="Clear signature"
              />
            </ArkSignaturePad.ClearTrigger>
          </ArkSignaturePad.Control>
        </div>

        <ArkSignaturePad.HiddenInput :value="JSON.stringify(api.paths)" :class="ui?.hiddenInput" />

        <slot :api="api" />
      </ArkSignaturePad.Context>
    </component>
  </UIFormField>
</template>
