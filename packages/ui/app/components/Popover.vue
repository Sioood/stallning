<script setup lang="ts">
import {
  Popover as ArkPopover,
  type PopoverRootBaseProps as ArkPopoverRootBaseProps,
} from '@ark-ui/vue/popover'
import { cva, type VariantProps } from 'class-variance-authority'

import type { ClassValue } from 'vue'

type PopoverIntent = 'neutral'
type PopoverSize = 'md'

type PopoverTriggerValueSource = { triggerValue?: string | null }

function popoverTriggerValue(popover: unknown): string | null {
  return (popover as PopoverTriggerValueSource).triggerValue ?? null
}

defineOptions({ inheritAttrs: false })

const popoverContentCVA = cva(
  [
    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
    'w-[min(var(--available-width),max-content)] max-w-[min(var(--available-width),28rem)]',
  ],
  {
    variants: {
      intent: {
        neutral: 'bg-neutral-surface-default text-neutral-text-default',
      } satisfies Record<PopoverIntent, string>,
      size: {
        md: 'txt-caption flex flex-col gap-2 p-2',
      } satisfies Record<PopoverSize, string>,
    },
  },
)

const popoverArrowCVA = cva('flex items-center justify-center', {
  variants: {
    intent: {
      neutral: '[--arrow-background:var(--color-neutral-surface-default)]',
    } satisfies Record<PopoverIntent, string>,
    size: {
      md: '[--arrow-size:calc(var(--spacing)*2)]',
    } satisfies Record<PopoverSize, string>,
  },
})

const popoverArrowTipCVA = cva('size-full')
const popoverTitleCVA = cva('', {
  variants: {
    intent: {
      neutral: 'text-neutral-text-default',
    } satisfies Record<PopoverIntent, string>,
    size: {
      md: 'txt-label',
    } satisfies Record<PopoverSize, string>,
  },
})
const popoverDescriptionCVA = cva('', {
  variants: {
    intent: {
      neutral: 'text-neutral-text-subtle',
    } satisfies Record<PopoverIntent, string>,
    size: {
      md: 'txt-caption',
    } satisfies Record<PopoverSize, string>,
  },
})
const popoverCloseCVA = cva('absolute top-1 right-1')

type PopoverCVAProps = VariantProps<typeof popoverContentCVA>

interface UIPopoverSlots {
  content?: ClassValue
  title?: ClassValue
  description?: ClassValue
  closeTrigger?: ClassValue
  arrow?: ClassValue
  arrowTip?: ClassValue
}
interface PopoverProps extends ArkPopoverRootBaseProps {
  title?: string
  content?: string
  description?: string
  intent?: PopoverCVAProps['intent']
  showCloseTrigger?: boolean
  size?: PopoverCVAProps['size']
  ui?: Partial<UIPopoverSlots>
}

const open = defineModel<boolean>('open', { default: false })

const props = withDefaults(defineProps<PopoverProps>(), {
  content: '',
  description: '',
  intent: 'neutral',
  modal: false,
  showCloseTrigger: false,
  size: 'md',
  title: '',
  ui: undefined,
})

const rootProps = computed(() =>
  pick(props, [
    'autoFocus',
    'closeOnEscape',
    'closeOnInteractOutside',
    'defaultOpen',
    'defaultTriggerValue',
    'finalFocusEl',
    'id',
    'ids',
    'initialFocusEl',
    'lazyMount',
    'modal',
    // 'onEscapeKeyDown',
    // 'onExitComplete',
    // 'onFocusOutside',
    // 'onInteractOutside',
    // 'onOpenChange',
    // 'onPointerDownOutside',
    // 'onRequestDismiss',
    // 'onTriggerValueChange',
    'open',
    'persistentElements',
    'portalled',
    'positioning',
    'restoreFocus',
    'translations',
    'triggerValue',
    'unmountOnExit',
  ]),
)
</script>

<template>
  <ArkPopover.Root v-bind="rootProps" v-model:open="open">
    <ArkPopover.Context v-slot="popover">
      <slot
        name="triggers"
        :trigger="ArkPopover.Trigger"
        :popover="popover"
        :trigger-value="popoverTriggerValue(popover)"
      >
        <ArkPopover.Trigger>
          <slot name="trigger">
            <UIButton type="button" variant="subtle" intent="neutral">Open popover</UIButton>
          </slot>
        </ArkPopover.Trigger>
      </slot>

      <ArkPopover.Positioner class="origin-(--transform-origin) [--z-index:9999]">
        <ArkPopover.Content :class="cn(popoverContentCVA({ intent, size }), ui?.content)">
          <ArkPopover.Title v-if="title" :class="cn(popoverTitleCVA({ intent, size }), ui?.title)">
            {{ title }}
          </ArkPopover.Title>
          <ArkPopover.Description
            v-if="description"
            :class="cn(popoverDescriptionCVA({ intent, size }), ui?.description)"
          >
            {{ description }}
          </ArkPopover.Description>

          <slot name="content" :popover="popover" :trigger-value="popoverTriggerValue(popover)">
            {{ content }}
          </slot>

          <ArkPopover.CloseTrigger
            v-if="showCloseTrigger"
            :class="cn(popoverCloseCVA(), ui?.closeTrigger)"
          >
            <slot name="close-trigger">
              <UIButton type="button" size="sm" variant="ghost" icon="tabler:x" intent="neutral" />
            </slot>
          </ArkPopover.CloseTrigger>

          <ArkPopover.Arrow :class="cn(popoverArrowCVA({ intent, size }), ui?.arrow)">
            <ArkPopover.ArrowTip :class="cn(popoverArrowTipCVA(), ui?.arrowTip)" />
          </ArkPopover.Arrow>
        </ArkPopover.Content>
      </ArkPopover.Positioner>
    </ArkPopover.Context>
  </ArkPopover.Root>
</template>
