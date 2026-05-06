<script setup lang="ts">
import {
  Popover as ArkPopover,
  type PopoverRootBaseProps as ArkPopoverRootBaseProps,
} from '@ark-ui/vue/popover'
import { cva, type VariantProps } from 'class-variance-authority'

defineOptions({ inheritAttrs: false })

const popoverContent = cva(
  [
    'popoverContent',
    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
    'w-[min(var(--available-width),max-content)] max-w-[min(var(--available-width),28rem)]',
  ].join(' '),
  {
    variants: {
      intent: {
        neutral: 'bg-neutral-surface-default text-neutral-text-default',
      },
      size: {
        md: 'p-2 flex flex-col gap-2 txt-caption',
      },
    },
  },
)

const popoverArrow = cva(['popoverArrow', 'flex items-center justify-center'].join(' '), {
  variants: {
    intent: {
      neutral: '[--arrow-background:var(--color-neutral-surface-default)]',
    },
    size: {
      md: '[--arrow-size:calc(var(--spacing)*2)]',
    },
  },
})

const popoverArrowTip = cva(['popoverArrowTip', 'size-full'].join(' '))
const popoverTitle = cva('popoverTitle', {
  variants: {
    size: {
      md: 'txt-label',
    },
  },
})
const popoverDescription = cva('popoverDescription', {
  variants: {
    size: {
      md: 'txt-caption',
    },
  },
})
const popoverClose = cva('absolute right-1 top-1')

type PopoverCVAProps = VariantProps<typeof popoverContent>

interface PopoverProps extends ArkPopoverRootBaseProps {
  content?: string
  description?: string
  intent?: PopoverCVAProps['intent']
  showCloseTrigger?: boolean
  size?: PopoverCVAProps['size']
  title?: string
}

const open = defineModel<boolean>('open', { default: false })

const props = withDefaults(defineProps<PopoverProps>(), {
  autoFocus: undefined,
  closeOnEscape: undefined,
  closeOnInteractOutside: undefined,
  content: '',
  defaultOpen: undefined,
  defaultTriggerValue: undefined,
  description: '',
  finalFocusEl: undefined,
  id: undefined,
  ids: undefined,
  initialFocusEl: undefined,
  intent: 'neutral',
  lazyMount: undefined,
  modal: false,
  onEscapeKeyDown: undefined,
  onExitComplete: undefined,
  onFocusOutside: undefined,
  onInteractOutside: undefined,
  onOpenChange: undefined,
  onPointerDownOutside: undefined,
  onRequestDismiss: undefined,
  onTriggerValueChange: undefined,
  persistentElements: undefined,
  portalled: undefined,
  positioning: undefined,
  present: undefined,
  restoreFocus: undefined,
  showCloseTrigger: false,
  size: 'md',
  skipAnimationOnMount: undefined,
  title: '',
  translations: undefined,
  triggerValue: undefined,
  unmountOnExit: undefined,
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
  <ArkPopover.Root v-bind="rootProps" v-model:open="open" @open-change="console.log($event)">
    <ArkPopover.Context v-slot="popover">
      <slot
        name="triggers"
        :trigger="ArkPopover.Trigger"
        :popover="popover"
        :trigger-value="
          (popover as unknown as { triggerValue?: string | null }).triggerValue ?? null
        "
      >
        <ArkPopover.Trigger>
          <slot name="trigger">
            <UIButton type="button" variant="subtle" intent="neutral">Open popover</UIButton>
          </slot>
        </ArkPopover.Trigger>
      </slot>

      <ArkPopover.Positioner class="[--z-index:9999] origin-(--transform-origin)">
        <ArkPopover.Content :class="cn(popoverContent({ intent, size }))">
          <ArkPopover.Title v-if="title" :class="cn(popoverTitle({ size }))">
            {{ title }}
          </ArkPopover.Title>
          <ArkPopover.Description v-if="description" :class="cn(popoverDescription({ size }))">
            {{ description }}
          </ArkPopover.Description>

          <slot
            name="content"
            :popover="popover"
            :trigger-value="
              (popover as unknown as { triggerValue?: string | null }).triggerValue ?? null
            "
          >
            {{ content }}
          </slot>

          <ArkPopover.CloseTrigger v-if="showCloseTrigger" :class="cn(popoverClose())">
            <slot name="close-trigger">
              <UIButton type="button" size="sm" variant="ghost" icon="tabler:x" intent="neutral" />
            </slot>
          </ArkPopover.CloseTrigger>

          <ArkPopover.Arrow :class="cn(popoverArrow({ intent, size }))">
            <ArkPopover.ArrowTip :class="cn(popoverArrowTip())" />
          </ArkPopover.Arrow>
        </ArkPopover.Content>
      </ArkPopover.Positioner>
    </ArkPopover.Context>
  </ArkPopover.Root>
</template>
