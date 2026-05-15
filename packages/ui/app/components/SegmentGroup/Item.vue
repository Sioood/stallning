<script setup lang="ts">
import {
  SegmentGroup as ArkSegmentGroup,
  type SegmentGroupItemBaseProps,
} from '@ark-ui/vue/segment-group'
import { cva } from 'class-variance-authority'

import {
  segmentGroupChromeKey,
  type SegmentGroupIntent,
  type SegmentGroupSize,
} from '~/utils/Components/SegmentGroup/context'

import type { ClassValue } from 'vue'

defineOptions({ inheritAttrs: false })

export interface UISegmentGroupItemSlots {
  root?: ClassValue
}

export interface SegmentGroupItemProps extends SegmentGroupItemBaseProps {
  intent?: SegmentGroupIntent
  size?: SegmentGroupSize
  ui?: Partial<UISegmentGroupItemSlots>
}

const segmentGroupItemCVA = cva(
  'relative z-10 cursor-pointer px-3 py-1.5 text-center font-medium transition-colors duration-200',
  {
    variants: {
      intent: {
        neutral:
          'text-neutral-text-subtle hover:text-neutral-text-default data-[state=checked]:text-neutral-text-inverse',
        primary:
          'text-primary-text-subtle hover:text-primary-text-default data-[state=checked]:text-primary-text-inverse',
        secondary:
          'text-secondary-text-subtle hover:text-secondary-text-default data-[state=checked]:text-secondary-text-inverse',
        accent:
          'text-accent-text-subtle hover:text-accent-text-default data-[state=checked]:text-accent-text-inverse',
      } satisfies Record<SegmentGroupIntent, string>,
      size: {
        sm: 'txt-caption px-2 py-1',
        md: 'txt-label px-3 py-1.5',
        lg: 'txt-base px-4 py-2',
      } satisfies Record<SegmentGroupSize, string>,
    },
  },
)

const props = withDefaults(defineProps<SegmentGroupItemProps>(), {
  intent: undefined,
  size: undefined,
  disabled: undefined,
  ui: undefined,
})

const attrs = useAttrs()

const chrome = inject(segmentGroupChromeKey, null)

const intent = computed<SegmentGroupIntent>(() => props.intent ?? chrome?.intent.value ?? 'primary')
const size = computed<SegmentGroupSize>(() => props.size ?? chrome?.size.value ?? 'md')

const itemProps = computed(() => pick(props, ['asChild', 'disabled', 'value'] as const))
const itemAttrs = computed(() => splitArkAttrs(attrs))

extendCompodiumMeta<SegmentGroupItemProps>({
  defaultProps: {
    value: 'react',
  },
})
</script>

<template>
  <ArkSegmentGroup.Item
    v-bind="{ ...itemProps, ...itemAttrs }"
    :class="cn(segmentGroupItemCVA({ intent, size }), ui?.root)"
  >
    <slot />
  </ArkSegmentGroup.Item>
</template>
