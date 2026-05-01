<script setup lang="ts">
import { Toast, Toaster } from '@ark-ui/vue/toast'
import { cva, type VariantProps } from 'class-variance-authority'

import { useComponentIcons, type ComponentState } from '~ui/app/composables/useComponentIcons'

const toaster = useToast()

const toastRoot = cva('toastRoot border relative overflow-hidden z-index-[var(--z-index)] will-change-transform-opacity h-[var(--height)] translate-x-[var(--x)] translate-y-[var(--y)] scale-[var(--scale)] flex-col opacity-[var(--opacity)] transition-all duration-300 ease-in-out', {
  variants: {
    intent: {
      neutral: 'bg-neutral-surface-default border-neutral-border-default text-neutral-text-default',
      primary: 'bg-primary-surface-default border-primary-border-default text-primary-text-default',
      secondary:
        'bg-secondary-surface-default border-secondary-border-default text-secondary-text-default',
      accent: 'bg-accent-surface-default border-accent-border-default text-accent-text-default',
      info: 'bg-info-surface-default border-info-border-default text-info-text-default',
      warning: 'bg-warning-surface-default border-warning-border-default text-warning-text-default',
      error: 'bg-error-surface-default border-error-border-default text-error-text-default',
      success: 'bg-success-surface-default border-success-border-default text-success-text-default',
    },
    size: {
      md: 'min-w-64 p-2 pr-12',
    },
  },
})

type ToastRootCVAProps = VariantProps<typeof toastRoot>

const toastTitle = cva('toastTitle inline-flex gap-2', {
  variants: {
    size: {
      md: 'txt-base',
    },
  },
})

const toastDescription = cva('toastDescription', {
  variants: {
    intent: {
      neutral: 'text-neutral-text-subtle',
      primary: 'text-primary-text-subtle',
      secondary: 'text-secondary-text-subtle',
      accent: 'text-accent-text-subtle',
      info: 'text-info-text-subtle',
      warning: 'text-warning-text-subtle',
      error: 'text-error-text-subtle',
      success: 'text-success-text-subtle',
    },
    size: {
      md: 'txt-caption',
    },
  },
})

const toastError = cva('toastError', {
  variants: {
    size: {
      md: 'absolute top-2 right-2',
    },
  },
})

const toastAction = cva('toastAction', {
  variants: {
    size: {
      md: 'mt-2',
    },
  },
})

interface ToastProps {
  size?: ToastRootCVAProps['size']
}

withDefaults(defineProps<ToastProps>(), {
  size: 'md',
})

const getToastIcon = (type: string | undefined) => {
  const { iconName, shouldAnimate } = useComponentIcons({
    state: type as ComponentState,
    mode: 'single',
  })
  return { iconName, shouldAnimate }
}

const getType = (type: string | undefined): ToastRootCVAProps['intent'] | undefined => {
  const possibleTypes = ['primary', 'secondary', 'accent', 'info', 'warning', 'error', 'success']
  if (!type || !possibleTypes.includes(type)) {
    return 'neutral'
  }
  return type as ToastRootCVAProps['intent']
}
</script>

<template>
  <div v-if="toaster">
    <Teleport to="body">
      <Toaster v-slot="toast" :toaster="toaster">
        <Toast.Root
          :class="
            toastRoot({
              intent: getType(toast.meta?.type || toast.type),
              size,
            })
          "
        >
          <Toast.Title :class="toastTitle({ size })">
            <Icon
              :name="getToastIcon(toast.meta?.type || toast.type).iconName.value"
              :class="{
                'animate-spin': getToastIcon(toast.meta?.type || toast.type).shouldAnimate.value,
              }"
            />
            {{ toast.title }}
          </Toast.Title>
          <Toast.Description
            v-if="toast.description"
            :class="toastDescription({ intent: getType(toast.meta?.type || toast.type), size })"
          >
            {{ toast.description }}
          </Toast.Description>

          <slot :toast="toast" />

          <Toast.ActionTrigger v-if="toast.action" :class="toastAction({ size })">
            <UIButton size="sm" :intent="getType(toast.meta?.type || toast.type)">
              {{ toast.action.label }}
            </UIButton>
          </Toast.ActionTrigger>

          <Toast.CloseTrigger v-if="toast.closable" :class="toastError({ size })">
            <UIButton
              size="sm"
              variant="ghost"
              icon="tabler:x"
              :intent="getType(toast.meta?.type || toast.type)"
            />
          </Toast.CloseTrigger>
        </Toast.Root>
      </Toaster>
    </Teleport>
  </div>
</template>
