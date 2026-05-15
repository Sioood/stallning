<script setup lang="ts">
import { SegmentGroup as ArkSegmentGroup } from '@ark-ui/vue/segment-group'
import { cva } from 'class-variance-authority'

import {
  segmentGroupChromeKey,
  type SegmentGroupIntent,
} from '~/utils/Components/SegmentGroup/context'

defineOptions({ inheritAttrs: false })

interface IndicatorProps {
  intent?: SegmentGroupIntent
}

const segmentGroupIndicatorCVA = cva(
  'pointer-events-none absolute transition-all duration-200 ease-out',
  {
    variants: {
      intent: {
        neutral: 'bg-neutral-fill-default',
        primary: 'bg-primary-fill-default',
        secondary: 'bg-secondary-fill-default',
        accent: 'bg-accent-fill-default',
      } satisfies Record<SegmentGroupIntent, string>,
    },
  },
)

const props = defineProps<IndicatorProps>()
const attrs = useAttrs()

const chrome = inject(segmentGroupChromeKey, null)
const intent = computed<SegmentGroupIntent>(() => props.intent ?? chrome?.intent.value ?? 'primary')

const arkAttrs = computed(() => splitArkAttrs(attrs))
</script>

<template>
  <ArkSegmentGroup.Indicator
    v-bind="arkAttrs"
    :class="cn(segmentGroupIndicatorCVA({ intent }), $attrs.class as string)"
  />
</template>
