<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'

import type { ButtonProps } from './Button.vue'
import type { UseComponentIconsProps } from '@/composables/useComponentIcons'
import type { ClassValue } from 'vue'

const alertRootCVA = cva(['alertRoot', 'relative'], {
  variants: {
    intent: {
      neutral: 'bg-neutral-surface-subtle border-neutral-border-default',
      success: 'bg-success-surface-subtle border-success-border-default',
      warning: 'bg-warning-surface-subtle border-warning-border-default',
      error: 'bg-error-surface-subtle border-error-border-default',
      info: 'bg-info-surface-subtle border-info-border-default',
    },
    size: {
      md: 'p-4 flex gap-8 justify-between border',
    },
  },
})

type AlertRootCVAProps = VariantProps<typeof alertRootCVA>

const alertContentCVA = cva(['alertContent', 'group/alertContent'], {
  variants: {
    intent: {
      neutral: 'text-neutral-text-default',
      success: 'text-success-text-default',
      warning: 'text-warning-text-default',
      error: 'text-error-text-default',
      info: 'text-info-text-default',
    },
    size: {
      md: 'grid has-[>svg]:grid-cols-[auto_1fr] not-has-[>svg]:grid-rows-[auto_1fr] gap-4',
    },
  },
})

const alertContentIconCVA = cva(['alertContentIcon'], {
  variants: {
    size: {
      md: 'size-4',
    },
  },
})

const alertTitleCVA = cva(['alertTitle'], {
  variants: {
    intent: {
      neutral: 'text-neutral-text-default',
      success: 'text-success-text-default',
      warning: 'text-warning-text-default',
      error: 'text-error-text-default',
      info: 'text-info-text-default',
    },
    size: {
      md: 'txt-label',
    },
  },
})

const alertDescriptionCVA = cva(['alertDescription'], {
  variants: {
    intent: {
      neutral: 'text-neutral-text-subtle',
      success: 'text-success-text-subtle',
      warning: 'text-warning-text-subtle',
      error: 'text-error-text-subtle',
      info: 'text-info-text-subtle',
    },
    size: {
      md: 'txt-caption group-has-[>svg]/alertContent:col-start-2',
    },
  },
})

const alertSlotContentWrapperCVA = cva(['alertSlotContentWrapper'], {
  variants: {
    size: {
      md: 'group-has-[>svg]/alertContent:col-start-2',
    },
  },
})

const alertActionsCVA = cva(['alertActions'], {
  variants: {
    size: {
      md: 'pt-5 flex flex-col items-end gap-2',
    },
  },
})

interface UIAlertSlots {
  action: ClassValue
  actions: ClassValue
  close: ClassValue
  content: ClassValue
  description: ClassValue
  icon: ClassValue
  root: ClassValue
  slotContent: ClassValue
  title: ClassValue
}

interface AlertProps extends UseComponentIconsProps {
  icon?: string
  actions?: ButtonProps[]
  closable?: boolean
  description?: string
  intent?: AlertRootCVAProps['intent']
  title: string
  type?: 'info' | 'success' | 'warning' | 'error' | 'neutral'
  size?: AlertRootCVAProps['size']
  ui?: UIAlertSlots
}

const visible = defineModel<boolean>('visible', { default: true })

const props = withDefaults(defineProps<AlertProps>(), {
  actions: undefined,
  description: undefined,
  icon: undefined,
  intent: 'neutral',
  size: 'md',
  type: undefined,
  ui: undefined,
})

const { iconName } = useComponentIcons(() => ({ mode: 'single', ...props }))

const defaultIcon = computed(() => {
  if (props.type)
    return props.type === 'neutral' ? useSemanticIcons['info'] : useSemanticIcons[props.type]
  return props.icon
})

const defaultIntent = computed(() => {
  if (props.type) return props.type
  return props.intent
})

extendCompodiumMeta({
  defaultProps: {
    actions: [
      {
        text: 'Action',
        size: 'sm',
        intent: 'primary',
        onClick: () => {
          console.log('Action clicked')
        },
      },
    ],
    title: 'Alert title',
    description: 'Alert description',
  },
})
</script>

<template>
  <div v-if="visible" :class="cn(alertRootCVA({ intent: defaultIntent, size }), ui?.root)">
    <div :class="cn(alertContentCVA({ intent: defaultIntent, size }), ui?.content)">
      <Icon
        v-if="iconName || defaultIcon"
        :name="iconName || defaultIcon!"
        :class="cn(alertContentIconCVA({ size }), ui?.icon)"
      />
      <span :class="cn(alertTitleCVA({ intent: defaultIntent, size }), ui?.title)">{{
        title
      }}</span>
      <div
        v-if="description"
        :class="cn(alertDescriptionCVA({ intent: defaultIntent, size }), ui?.description)"
      >
        {{ description }}
      </div>
      <div v-if="$slots.content" :class="cn(alertSlotContentWrapperCVA({ size }), ui?.slotContent)">
        <slot name="content" />
      </div>
    </div>
    <div v-if="actions?.length" :class="cn(alertActionsCVA({ size }), ui?.actions)">
      <UIButton
        v-if="closable"
        leading-icon="tabler:x"
        variant="ghost"
        size="sm"
        :intent="defaultIntent"
        :ui="{ root: ['w-fit absolute top-2 right-2', ui?.close] }"
        @click="visible = false"
      />
      <UIButton
        v-for="(action, index) in actions"
        :key="index"
        v-bind="action"
        :intent="action.intent || defaultIntent"
        :size="action.size || size"
        :ui="{ root: ['w-fit', ui?.action] }"
      />
    </div>
  </div>
</template>
