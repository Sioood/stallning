<script setup lang="ts">
import {
  Tooltip as ArkTooltip,
  type TooltipRootBaseProps as ArkTooltipRootBaseProps,
} from '@ark-ui/vue/tooltip'
import { cva, type VariantProps } from 'class-variance-authority'

defineOptions({ inheritAttrs: false })

const tooltipContent = cva(
  [
    'tooltipContent',
    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
    'w-[min(var(--available-width),max-content)] max-w-[min(var(--available-width),28rem)]',
  ].join(' '),
  {
    variants: {
      intent: {
        neutral: 'bg-neutral-surface-default text-neutral-text-default',
        primary: 'bg-primary-surface-default text-primary-text-default',
        secondary: 'bg-secondary-surface-default text-secondary-text-default',
        accent: 'bg-accent-surface-default text-accent-text-default',
        info: 'bg-info-surface-default text-info-text-default',
        success: 'bg-success-surface-default text-success-text-default',
        warning: 'bg-warning-surface-default text-warning-text-default',
        error: 'bg-error-surface-default text-error-text-default',
      },
      size: {
        md: 'txt-caption px-2 py-1',
      },
    },
  },
)

const tooltipArrow = cva(['tooltipArrow', 'flex items-center justify-center'].join(' '), {
  variants: {
    intent: {
      neutral: '[--arrow-background:var(--color-neutral-surface-default)]',
      primary: '[--arrow-background:var(--color-primary-surface-default)]',
      secondary: '[--arrow-background:var(--color-secondary-surface-default)]',
      accent: '[--arrow-background:var(--color-accent-surface-default)]',
      info: '[--arrow-background:var(--color-info-surface-default)]',
      success: '[--arrow-background:var(--color-success-surface-default)]',
      warning: '[--arrow-background:var(--color-warning-surface-default)]',
      error: '[--arrow-background:var(--color-error-surface-default)]',
    },
    size: {
      md: '[--arrow-size:calc(var(--spacing)*2)]',
    },
  },
})
const tooltipArrowTip = cva(['tooltipArrowTip', 'size-full'].join(' '))

type TooltipCVAProps = VariantProps<typeof tooltipContent>

interface TooltipProps extends ArkTooltipRootBaseProps {
  content?: string
  followCursor?: boolean
  intent?: TooltipCVAProps['intent']
  size?: TooltipCVAProps['size']
}

const props = withDefaults(defineProps<TooltipProps>(), {
  closeDelay: 100,
  content: '',
  defaultOpen: undefined,
  defaultTriggerValue: undefined,
  disabled: undefined,
  followCursor: false,
  id: undefined,
  ids: undefined,
  intent: 'neutral',
  interactive: undefined,
  open: undefined,
  openDelay: 300,
  positioning: undefined,
  size: 'md',
  triggerValue: undefined,
})

const anchorRect = ref<DOMRect | null>(null)

const rootProps = computed(() => {
  const basePositioning = props.positioning ?? {}
  const positioning = props.followCursor
    ? {
        ...basePositioning,
        gutter: basePositioning.gutter ?? 8,
        placement: basePositioning.placement ?? 'top-start',
        getAnchorRect: () => anchorRect.value,
      }
    : basePositioning

  return {
    ...pick(props, [
      'closeDelay',
      'defaultOpen',
      'defaultTriggerValue',
      'disabled',
      'id',
      'ids',
      'interactive',
      'open',
      'openDelay',
      'triggerValue',
    ]),
    positioning,
  }
})

function handleTriggerPointerMove(
  event: PointerEvent,
  tooltip: { reposition: (options?: Record<string, unknown>) => void },
) {
  if (!props.followCursor) return
  anchorRect.value = new DOMRect(event.clientX, event.clientY, 1, 1)
  tooltip.reposition()
}
</script>

<template>
  <ArkTooltip.Root v-bind="rootProps">
    <ArkTooltip.Context v-slot="tooltip">
      <slot
        name="triggers"
        :trigger="ArkTooltip.Trigger"
        :tooltip="tooltip"
        :trigger-value="
          (tooltip as unknown as { triggerValue?: string | null }).triggerValue ?? null
        "
        :on-trigger-pointer-move="(event: PointerEvent) => handleTriggerPointerMove(event, tooltip)"
      >
        <ArkTooltip.Trigger @pointermove="handleTriggerPointerMove($event, tooltip)">
          <slot name="trigger">
            <span class="inline-flex">Hover me</span>
          </slot>
        </ArkTooltip.Trigger>
      </slot>
      <ArkTooltip.Positioner class="[--z-index:9999] origin-(--transform-origin)">
        <ArkTooltip.Content :class="cn(tooltipContent({ intent, size }))">
          <slot
            name="content"
            :tooltip="tooltip"
            :trigger-value="
              (tooltip as unknown as { triggerValue?: string | null }).triggerValue ?? null
            "
          >
            {{ content }}
          </slot>
          <ArkTooltip.Arrow :class="cn(tooltipArrow({ intent, size }))">
            <ArkTooltip.ArrowTip :class="cn(tooltipArrowTip())" />
          </ArkTooltip.Arrow>
        </ArkTooltip.Content>
      </ArkTooltip.Positioner>
    </ArkTooltip.Context>
  </ArkTooltip.Root>
</template>
