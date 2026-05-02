<script setup lang="ts">
import { Field as ArkField } from '@ark-ui/vue/field'
import { cva, type VariantProps } from 'class-variance-authority'

const fieldWrapper = cva('flex flex-col gap-1.5', {
  variants: {
    size: {
      sm: '',
      md: '',
    },
    invalid: {
      true: '',
    },
  },
})

type FieldWrapperCVAProps = VariantProps<typeof fieldWrapper>

interface FieldWrapperProps {
  label?: string
  required?: boolean
  helperText?: string
  invalid?: boolean
  size?: FieldWrapperCVAProps['size']
}

const props = withDefaults(defineProps<FieldWrapperProps>(), {
  label: undefined,
  required: false,
  helperText: undefined,
  invalid: false,
  size: 'md',
})

extendCompodiumMeta<typeof props>({
  defaultProps: {
    label: 'Email',
    required: true,
    helperText: 'Enter your email address',
    invalid: false,
    size: 'md',
  },
})
</script>

<template>
  <ArkField.Root :class="fieldWrapper({ size, invalid })">
    <div class="flex items-center gap-1">
      <ArkField.Label class="txt-caption font-medium text-neutral-text-subtle">
      {{ label }}
    </ArkField.Label>
    <ArkField.RequiredIndicator v-if="required" class="text-error-icon-default txt-caption">
        *
      </ArkField.RequiredIndicator>
    </div>

    <slot />

    <ArkField.HelperText v-if="helperText && !invalid" class="txt-caption text-neutral-text-subtle">
      {{ helperText }}
    </ArkField.HelperText>

    <ArkField.ErrorText v-if="invalid" class="txt-caption text-error-icon-default">
      <slot name="error" />
    </ArkField.ErrorText>
  </ArkField.Root>
</template>
