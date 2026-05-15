<script setup lang="ts">
import {
  Pagination as ArkPagination,
  type PaginationEllipsisBaseProps,
} from '@ark-ui/vue/pagination'
import { cva } from 'class-variance-authority'

import { paginationChromeKey, type PaginationSize } from '~/utils/Components/Pagination/context'

import type { ClassValue } from 'vue'

defineOptions({ inheritAttrs: false })

const paginationEllipsisCVA = cva(
  ['inline-flex items-center justify-center', 'pointer-events-none select-none'],
  {
    variants: {
      size: {
        sm: 'txt-caption min-w-8 px-1 py-1',
        md: 'txt-base min-w-10 px-2 py-2',
        lg: 'txt-h6 min-w-12 px-2 py-3',
      } satisfies Record<PaginationSize, string>,
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

export interface UIPaginationEllipsisSlots {
  root?: ClassValue
}

export interface PaginationEllipsisProps extends PaginationEllipsisBaseProps {
  size?: PaginationSize
  ui?: Partial<UIPaginationEllipsisSlots>
}

const props = withDefaults(defineProps<PaginationEllipsisProps>(), {
  size: undefined,
  ui: undefined,
})

const attrs = useAttrs()

const chrome = inject(paginationChromeKey, null)

const size = computed<PaginationSize>(() => props.size ?? chrome?.size.value ?? 'md')

const ellipsisProps = computed(() => pick(props, ['index'] as const))

const ellipsisAttrs = computed(() => {
  const { ui: _ui, ...rest } = attrs as Record<string, unknown> & {
    ui?: Partial<UIPaginationEllipsisSlots>
  }
  return rest
})

extendCompodiumMeta<PaginationEllipsisProps>({
  defaultProps: {
    index: 0,
  },
})
</script>

<template>
  <ArkPagination.Ellipsis
    v-bind="{ ...ellipsisProps, ...ellipsisAttrs }"
    :class="cn(paginationEllipsisCVA({ size }), ui?.root)"
  >
    <slot>
      <Icon name="tabler:dots" class="size-4 shrink-0" />
    </slot>
  </ArkPagination.Ellipsis>
</template>
