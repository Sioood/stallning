<script setup lang="ts">
import {
  Collapsible,
  type CollapsibleRootBaseProps as ArkCollapsibleRootBaseProps,
} from '@ark-ui/vue/collapsible'
import { cva, type VariantProps } from 'class-variance-authority'

import type { ClassValue } from 'vue'

defineOptions({ inheritAttrs: false })

type CollapsibleIntent = 'neutral'
type CollapsibleSize = 'md'

const collapsibleTriggerCVA = cva(
  'collapsibleTrigger flex w-full items-center justify-between border-b text-left',
  {
    variants: {
      intent: {
        neutral: 'border-neutral-border-default text-neutral-text-default',
      } satisfies Record<CollapsibleIntent, string>,
      size: {
        md: 'txt-h6 gap-3 p-1',
      } satisfies Record<CollapsibleSize, string>,
      disabled: {
        true: 'cursor-not-allowed',
        false: 'cursor-pointer',
      },
    },
  },
)

const collapsibleTitleCVA = cva('collapsibleTitle', {
  variants: {
    size: {
      md: 'txt-h6',
    } satisfies Record<CollapsibleSize, string>,
  },
})

const collapsibleIndicatorCVA = cva(
  'collapsibleIndicator flex shrink-0 items-center justify-center transition-transform duration-200 ease-out will-change-transform data-[state=open]:rotate-180',
  {
    variants: {
      size: {
        md: 'size-5',
      } satisfies Record<CollapsibleSize, string>,
    },
  },
)

const collapsibleIconCVA = cva('collapsibleIcon shrink-0', {
  variants: {
    size: {
      md: 'size-4',
    } satisfies Record<CollapsibleSize, string>,
  },
})

const collapsibleContentCVA = cva('collapsibleContent overflow-hidden', {
  variants: {
    size: {
      md: 'pt-2',
    } satisfies Record<CollapsibleSize, string>,
    animated: {
      true: '',
      false: 'collapsibleContent--static',
    },
  },
})

type CollapsibleTriggerVariants = VariantProps<typeof collapsibleTriggerCVA>

interface UICollapsibleSlots {
  content?: ClassValue
  icon?: ClassValue
  indicator?: ClassValue
  title?: ClassValue
  trigger?: ClassValue
}

export interface CollapsibleProps extends ArkCollapsibleRootBaseProps {
  /** When false, panel height open/close animation is off (same effect as prefers-reduced-motion for content). */
  contentAnimated?: boolean
  /** Shown when the `#title` slot is empty. */
  heading?: string
  intent?: CollapsibleTriggerVariants['intent']
  ui?: Partial<UICollapsibleSlots>
  size?: CollapsibleTriggerVariants['size']
}

const modelValue = defineModel<boolean>({ default: false })

/**
 * Default `open` to `undefined` so Vue does not coerce absent Boolean props to `false` (controlled stuck closed).
 */
const props = withDefaults(defineProps<CollapsibleProps>(), {
  contentAnimated: true,
  heading: '',
  intent: 'neutral',
  size: 'md',
  ui: undefined,
})

const rootProps = computed(() => ({
  ...pick(props, [
    'asChild',
    'collapsedHeight',
    'collapsedWidth',
    'defaultOpen',
    'disabled',
    'id',
    'ids',
    'lazyMount',
    'unmountOnExit',
  ] as const),
}))

extendCompodiumMeta<CollapsibleProps>({
  defaultProps: {
    heading: 'Heading',
    intent: 'neutral',
    size: 'md',
  },
})
</script>

<template>
  <Collapsible.Root v-bind="{ ...rootProps, ...$attrs }" v-model:open="modelValue">
    <Collapsible.Trigger
      type="button"
      :class="cn(collapsibleTriggerCVA({ intent, size, disabled }), ui?.trigger)"
    >
      <span :class="cn(collapsibleTitleCVA({ size }))">
        <slot name="title">{{ heading }}</slot>
      </span>
      <Collapsible.Indicator :class="cn(collapsibleIndicatorCVA({ size }), ui?.indicator)">
        <Icon name="tabler:chevron-down" :class="cn(collapsibleIconCVA({ size }), ui?.icon)" />
      </Collapsible.Indicator>
    </Collapsible.Trigger>

    <Collapsible.Content
      :class="cn(collapsibleContentCVA({ size, animated: contentAnimated }), ui?.content)"
    >
      <slot />
    </Collapsible.Content>
  </Collapsible.Root>
</template>

<style scoped>
/* Height from Ark inline --height / --collapsed-height (content animation guide) */
@keyframes collapsible-expand {
  from {
    height: var(--collapsed-height, 0);
  }

  to {
    height: var(--height);
  }
}

@keyframes collapsible-collapse {
  from {
    height: var(--height);
  }

  to {
    height: var(--collapsed-height, 0);
  }
}

:deep(.collapsibleContent[data-state='open']) {
  animation: collapsible-expand 150ms ease-out;
}

:deep(.collapsibleContent[data-state='closed']) {
  animation: collapsible-collapse 100ms ease-out;
}

@media (prefers-reduced-motion: reduce) {
  :deep(.collapsibleContent[data-state='open']),
  :deep(.collapsibleContent[data-state='closed']) {
    animation: none;
  }
}

:deep(.collapsibleContent--static[data-state='open']),
:deep(.collapsibleContent--static[data-state='closed']) {
  animation: none;
}
</style>
