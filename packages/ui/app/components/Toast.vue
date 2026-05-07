<script setup lang="ts">
import { Toast as ArkToast, Toaster as ArkToaster, type ToasterBaseProps } from '@ark-ui/vue/toast'
import { cva, type VariantProps } from 'class-variance-authority'

import {
  useComponentIcons,
  type ComponentState,
  type UseComponentIconsProps,
} from '~ui/app/composables/useComponentIcons'

import type { ClassValue } from 'vue'

const toaster = useToast()

const toastRootCVA = cva(
  'toastRoot border relative overflow-hidden z-index-[var(--z-index)] will-change-transform-opacity h-[var(--height)] translate-x-[var(--x)] translate-y-[var(--y)] scale-[var(--scale)] flex-col opacity-[var(--opacity)] transition-all duration-300 ease-in-out',
  {
    variants: {
      intent: {
        neutral:
          'bg-neutral-surface-default border-neutral-border-default text-neutral-text-default',
        primary:
          'bg-primary-surface-default border-primary-border-default text-primary-text-default',
        secondary:
          'bg-secondary-surface-default border-secondary-border-default text-secondary-text-default',
        accent: 'bg-accent-surface-default border-accent-border-default text-accent-text-default',
        info: 'bg-info-surface-default border-info-border-default text-info-text-default',
        warning:
          'bg-warning-surface-default border-warning-border-default text-warning-text-default',
        error: 'bg-error-surface-default border-error-border-default text-error-text-default',
        success:
          'bg-success-surface-default border-success-border-default text-success-text-default',
      },
      size: {
        md: 'min-w-64 p-2 pr-12',
      },
    },
  },
)

type ToastRootCVAProps = VariantProps<typeof toastRootCVA>

const toastTitleCVA = cva('toastTitle inline-flex gap-2', {
  variants: {
    size: {
      md: 'txt-base',
    },
  },
})

const toastDescriptionCVA = cva('toastDescription', {
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

const toastErrorCVA = cva('toastError', {
  variants: {
    size: {
      md: 'absolute top-2 right-2',
    },
  },
})

const toastActionCVA = cva('toastAction', {
  variants: {
    size: {
      md: 'mt-2',
    },
  },
})

interface UIToastSlots {
  root?: ClassValue
  title?: ClassValue
  description?: ClassValue
  action?: ClassValue
  closeTrigger?: ClassValue
}
export interface ToastProps extends ToasterBaseProps, UseComponentIconsProps {
  size?: ToastRootCVAProps['size']
  ui?: UIToastSlots
}

const props = withDefaults(defineProps<ToastProps>(), {
  size: 'md',
  ui: undefined,
})

const toasterProps = computed(() => pick(props, ['asChild'] as const))

const iconCache = new Map<string, ReturnType<typeof useComponentIcons>>()

const resolveToastMeta = (type: string | undefined) => {
  const cacheKey = type ?? '__neutral__'
  if (!iconCache.has(cacheKey)) {
    iconCache.set(cacheKey, useComponentIcons({ mode: 'single', state: type as ComponentState }))
  }
  return {
    intent: getType(type),
    iconName: iconCache.get(cacheKey)!.iconName,
    shouldAnimate: iconCache.get(cacheKey)!.shouldAnimate,
  }
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
  <Teleport v-if="toaster" to="body">
    <ArkToaster v-slot="toast" :toaster="toaster" v-bind="toasterProps">
      <ArkToast.Root
        :class="
          cn(
            toastRootCVA({
              intent: getType(toast.meta?.type ?? toast.type),
              size,
            }),
            ui?.root,
          )
        "
      >
        <ArkToast.Title :class="cn(toastTitleCVA({ size }), ui?.title)">
          <Icon
            :name="resolveToastMeta(toast.meta?.type ?? toast.type).iconName.value"
            :class="{
              'animate-spin': resolveToastMeta(toast.meta?.type ?? toast.type).shouldAnimate.value,
            }"
          />
          {{ toast.title }}
        </ArkToast.Title>
        <ArkToast.Description
          v-if="toast.description"
          :class="
            cn(
              toastDescriptionCVA({ intent: getType(toast.meta?.type ?? toast.type), size }),
              ui?.description,
            )
          "
        >
          {{ toast.description }}
        </ArkToast.Description>

        <slot :toast="toast" />

        <ArkToast.ActionTrigger
          v-if="toast.action"
          :class="cn(toastActionCVA({ size }), ui?.action)"
        >
          <UIButton size="sm" :intent="getType(toast.meta?.type ?? toast.type)">
            {{ toast.action.label }}
          </UIButton>
        </ArkToast.ActionTrigger>

        <ArkToast.CloseTrigger
          v-if="toast.closable"
          :class="cn(toastErrorCVA({ size }), ui?.closeTrigger)"
        >
          <UIButton
            size="sm"
            variant="ghost"
            icon="tabler:x"
            :intent="getType(toast.meta?.type ?? toast.type)"
          />
        </ArkToast.CloseTrigger>
      </ArkToast.Root>
    </ArkToaster>
  </Teleport>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  :deep(.toastRoot) {
    transition-duration: 0ms !important;
  }
}
</style>
