<script setup lang="ts">
import {
  Popover as ArkPopover,
  type PopoverRootBaseProps as ArkPopoverRootBaseProps,
  type PopoverRootProviderBaseProps as ArkPopoverRootProviderBaseProps,
  type UsePopoverReturn,
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

interface PopoverProps
  extends Omit<ArkPopoverRootBaseProps, 'open'>, Omit<ArkPopoverRootProviderBaseProps, 'value'> {
  /**
   * Pass the return value of `usePopover()` to enable **RootProvider** mode —
   * the component will be controlled entirely from outside via the Ark API object.
   * Omit (or leave `undefined`) to use the default **Root** mode with `v-model:open`.
   */
  value?: UsePopoverReturn['value']
  title?: string
  content?: string
  description?: string
  intent?: PopoverCVAProps['intent']
  showCloseTrigger?: boolean
  size?: PopoverCVAProps['size']
  ui?: Partial<UIPopoverSlots>
}

const open = defineModel<boolean>('open', { required: false })

const props = withDefaults(defineProps<PopoverProps>(), {
  closeOnEscape: true,
  closeOnInteractOutside: true,
  content: '',
  description: '',
  intent: 'neutral',
  modal: false,
  showCloseTrigger: false,
  size: 'md',
  title: '',
  value: undefined,
  ui: undefined,
})

const attrs = useAttrs()
const arkAttrs = computed(() => splitArkAttrs(attrs))

const isProvider = computed(() => props.value !== undefined)

const rootComponent = computed(() => (isProvider.value ? ArkPopover.RootProvider : ArkPopover.Root))

const rootProps = computed(() => {
  if (isProvider.value) {
    return pick(props, ['asChild', 'lazyMount', 'unmountOnExit', 'value'] as const)
  }
  const base: Record<string, unknown> = {
    ...pick(props, [
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
      'persistentElements',
      'portalled',
      'positioning',
      'restoreFocus',
      'translations',
      'triggerValue',
      'unmountOnExit',
    ] as const),
  }

  if (open.value !== undefined) {
    base.open = open.value
    base['onUpdate:open'] = (val: boolean) => {
      open.value = val
    }
  }

  return base
})

const rootBindings = computed(() => ({
  ...arkAttrs.value,
  ...rootProps.value,
}))
</script>

<template>
  <component :is="rootComponent" v-bind="rootBindings">
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
  </component>
</template>
