<script setup lang="ts">
import {
  RatingGroup as ArkRatingGroup,
  type RatingGroupItemBaseProps,
} from '@ark-ui/vue/rating-group'

import {
  ratingChromeKey,
  type RatingIntent,
  type RatingSize,
} from '~/utils/Components/Form/Rating/context'
import { ratingItemCVA } from '~/utils/Components/Form/Rating/variants'

import type { ClassValue } from 'vue'

defineOptions({ inheritAttrs: false })

export interface RatingItemProps extends RatingGroupItemBaseProps {
  intent?: RatingIntent
  size?: RatingSize
  ui?: ClassValue
}

const props = withDefaults(defineProps<RatingItemProps>(), {
  intent: undefined,
  size: undefined,
  ui: undefined,
})

const chrome = inject(ratingChromeKey, null)
const attrs = useAttrs()

const intent = computed(() => props.intent ?? chrome?.intent.value ?? 'primary')
const size = computed(() => props.size ?? chrome?.size.value ?? 'md')

/**
 * Re-provide the chrome so a per-item `intent` / `size` override reaches the indicator
 * rendered in this item's slot. Previously these props only tinted the item's own focus
 * ring, so overriding them on a single item had no visible effect on its star.
 */
provide(ratingChromeKey, { intent, size })

const itemProps = computed(() => pick(props, ['asChild', 'index']))

const itemAttrs = computed(() => {
  const {
    intent: _intent,
    size: _size,
    ui: _ui,
    ...rest
  } = attrs as Record<string, unknown> & {
    intent?: RatingIntent
    size?: RatingSize
    ui?: ClassValue
  }
  return rest
})
</script>

<template>
  <ArkRatingGroup.Item
    v-bind="{ ...itemProps, ...itemAttrs }"
    :class="cn(ratingItemCVA(), itemAttrs.class as ClassValue, ui)"
  >
    <slot />
  </ArkRatingGroup.Item>
</template>
