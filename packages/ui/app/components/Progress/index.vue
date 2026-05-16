<script setup lang="ts">
import {
  Progress as ArkProgress,
  type ProgressRootBaseProps as ArkProgressRootBaseProps,
  type ProgressRootProviderBaseProps as ArkProgressRootProviderBaseProps,
  type UseProgressReturn,
} from '@ark-ui/vue/progress'
import { cva } from 'class-variance-authority'

import type { ClassValue } from 'vue'
import type { ProgressIntent, ProgressSize } from '~/utils/Components/Progress/context'

defineOptions({ inheritAttrs: false })

const progressRootCVA = cva('', {
  variants: {
    size: {
      sm: '',
      md: 'row-gap-2 grid w-full grid-cols-2 items-center gap-1',
      lg: '',
    } satisfies Record<ProgressSize, string>,
  },
})

const progressLabelCVA = cva('', {
  variants: {
    intent: {
      neutral: 'text-neutral-text-subtle',
      primary: 'text-primary-text-subtle',
      secondary: 'text-secondary-text-subtle',
      accent: 'text-accent-text-subtle',
    } satisfies Record<ProgressIntent, string>,
    size: {
      sm: 'text-small',
      md: 'text-base',
      lg: 'text-lg',
    } satisfies Record<ProgressSize, string>,
  },
})

const progressTrackCVA = cva('overflow-hidden', {
  variants: {
    intent: {
      neutral: 'bg-neutral-fill-subtle',
      primary: 'bg-primary-fill-subtle',
      secondary: 'bg-secondary-fill-subtle',
      accent: 'bg-accent-fill-subtle',
    } satisfies Record<ProgressIntent, string>,
    size: {
      sm: 'col-span-full h-1',
      md: 'col-span-full h-1.5',
      lg: 'col-span-full h-2',
    } satisfies Record<ProgressSize, string>,
    orientation: {
      horizontal: '',
      vertical: 'h-50 w-1.5',
    } satisfies Record<'horizontal' | 'vertical', string>,
  },
})

const progressRangeCVA = cva('', {
  variants: {
    intent: {
      neutral: 'bg-neutral-fill-default',
      primary: 'bg-primary-fill-default',
      secondary: 'bg-secondary-fill-default',
      accent: 'bg-accent-fill-default',
    } satisfies Record<ProgressIntent, string>,
    size: {
      sm: 'h-full',
      md: 'h-full',
      lg: 'h-full',
    } satisfies Record<ProgressSize, string>,
  },
})

const progressValueTextCVA = cva('text-right font-mono tabular-nums', {
  variants: {
    intent: {
      neutral: 'text-neutral-text-subtle',
      primary: 'text-primary-text-subtle',
      secondary: 'text-secondary-text-subtle',
      accent: 'text-accent-text-subtle',
    } satisfies Record<ProgressIntent, string>,
    size: {
      sm: 'txt-small',
      md: 'txt-caption',
      lg: 'txt-base',
    } satisfies Record<ProgressSize, string>,
  },
})

interface UIProgressSlots {
  label?: ClassValue
  range?: ClassValue
  root?: ClassValue
  track?: ClassValue
  valueText?: ClassValue
}

interface UIProgressProps
  extends ArkProgressRootBaseProps, Omit<ArkProgressRootProviderBaseProps, 'value'> {
  /**
   * Pass the return value of `useProgress()` to enable **RootProvider** mode —
   * the component will be controlled entirely from outside via the Ark API object.
   * Omit (or leave `undefined`) to use the default **Root** mode with `v-model`.
   */
  value?: UseProgressReturn['value']
  label?: string
  intent?: ProgressIntent
  size?: ProgressSize
  ui?: Partial<UIProgressSlots>
}

const modelValue = defineModel<number>({ default: null })

const props = withDefaults(defineProps<UIProgressProps>(), {
  label: '',
  intent: 'neutral',
  size: 'md',
  value: undefined,
  ui: undefined,
})

const { locale } = useI18n()

const isProvider = computed(() => props.value !== undefined)

const rootComponent = computed(() =>
  isProvider.value ? ArkProgress.RootProvider : ArkProgress.Root,
)

const rootProps = computed(() => {
  if (isProvider.value) {
    return pick(props, ['asChild', 'value'] as const)
  }
  return {
    ...pick(props, [
      'asChild',
      'defaultValue',
      'formatOptions',
      'id',
      'ids',
      'max',
      'min',
      'orientation',
      'translations',
    ] as const),
    locale: locale.value,
  }
})

const attrs = useAttrs()
const arkAttrs = computed(() => splitArkAttrs(attrs))

extendCompodiumMeta({
  defaultProps: {
    label: 'Loading...',
  },
})
</script>

<template>
  <component
    :is="rootComponent"
    v-bind="
      isProvider
        ? {
            ...arkAttrs,
            ...rootProps,
            class: cn(progressRootCVA({ size }), arkAttrs.class as ClassValue, ui?.root),
          }
        : {
            ...arkAttrs,
            ...rootProps,
            class: cn(progressRootCVA({ size }), arkAttrs.class as ClassValue, ui?.root),
            modelValue: modelValue,
            'onUpdate:modelValue': (v: number) => (modelValue = v),
          }
    "
  >
    <ArkProgress.Label :class="cn(progressLabelCVA({ intent, size }), ui?.label)">
      {{ $te(label) ? $t(label) : label }}
    </ArkProgress.Label>
    <ArkProgress.ValueText :class="cn(progressValueTextCVA({ intent, size }), ui?.valueText)" />
    <ArkProgress.Track :class="cn(progressTrackCVA({ intent, size, orientation }), ui?.track)">
      <ArkProgress.Range :class="cn(progressRangeCVA({ intent, size }), ui?.range)" />
    </ArkProgress.Track>
  </component>
</template>

<style scoped>
@keyframes indeterminate {
  0% {
    transform: translateX(-100%);
  }
  80% {
    transform: translateX(200%);
  }
  100% {
    transform: translateX(200%);
  }
}

:deep([data-part='range'][data-state='indeterminate']) {
  @apply w-1/2;
  animation: indeterminate 1500ms ease-in-out infinite;
}
</style>
