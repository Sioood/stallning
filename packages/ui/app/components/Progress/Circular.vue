<script setup lang="ts">
import {
  Progress as ArkProgress,
  type ProgressRootBaseProps as ArkProgressRootBaseProps,
} from '@ark-ui/vue/progress'
import { cva } from 'class-variance-authority'

import type { ProgressCircularSize, ProgressIntent } from './context'
import type { ClassValue } from 'vue'

const progressCircleRootCVA = cva('', {
  variants: {
    intent: {
      neutral: 'text-neutral-text-default',
      primary: 'text-primary-text-default',
      secondary: 'text-secondary-text-default',
      accent: 'text-accent-text-default',
    } satisfies Record<ProgressIntent, string>,
    size: {
      sm: 'flex w-min flex-col gap-1',
      md: 'flex w-min flex-col gap-1',
      lg: 'flex w-min flex-col gap-1',
      'icon-sm': 'flex w-min flex-col',
      'icon-md': 'flex w-min flex-col',
      'icon-lg': 'flex w-min flex-col',
    } satisfies Record<ProgressCircularSize, string>,
  },
})

const progressCircleLabelCVA = cva('', {
  variants: {
    intent: {
      neutral: 'text-neutral-text-subtle',
      primary: 'text-primary-text-subtle',
      secondary: 'text-secondary-text-subtle',
      accent: 'text-accent-text-subtle',
    } satisfies Record<ProgressIntent, string>,
    size: {
      sm: 'txt-small',
      md: 'txt-base',
      lg: 'txt-lg',
      'icon-sm': 'hidden',
      'icon-md': 'hidden',
      'icon-lg': 'hidden',
    } satisfies Record<ProgressCircularSize, string>,
  },
})

const progressCircleCVA = cva('', {
  variants: {
    size: {
      sm: '[--size:3rem] [--thickness:calc(var(--size)/11)]',
      md: '[--size:4rem] [--thickness:calc(var(--size)/11)]',
      lg: '[--size:5rem] [--thickness:calc(var(--size)/11)]',
      'icon-sm': '[--size:0.785rem] [--thickness:calc(var(--size)/5)]',
      'icon-md': '[--size:0.94rem] [--thickness:calc(var(--size)/5)]',
      'icon-lg': '[--size:1.25rem] [--thickness:calc(var(--size)/5)]',
    } satisfies Record<ProgressCircularSize, string>,
  },
})

const progressCircleTrackCVA = cva('', {
  variants: {
    intent: {
      neutral: 'stroke-neutral-fill-subtle',
      primary: 'stroke-primary-fill-subtle',
      secondary: 'stroke-secondary-fill-subtle',
      accent: 'stroke-accent-fill-subtle',
    } satisfies Record<ProgressIntent, string>,
  },
})

const progressCircleRangeCVA = cva('[transition-[stroke-dasharray,stroke] ease-out] duration-600', {
  variants: {
    intent: {
      neutral: 'stroke-neutral-fill-default',
      primary: 'stroke-primary-fill-default',
      secondary: 'stroke-secondary-fill-default',
      accent: 'stroke-accent-fill-default',
    } satisfies Record<ProgressIntent, string>,
  },
})

const progressCircleValueTextCVA = cva('absolute text-right font-mono tabular-nums', {
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
      'icon-sm': 'hidden',
      'icon-md': 'hidden',
      'icon-lg': 'hidden',
    } satisfies Record<ProgressCircularSize, string>,
  },
})

interface UIProgressCircularSlots {
  circle?: ClassValue
  label?: ClassValue
  track?: ClassValue
  range?: ClassValue
  root?: ClassValue
  valueText?: ClassValue
}

interface UIProgressCircularProps extends ArkProgressRootBaseProps {
  label?: string
  intent?: ProgressIntent
  size?: ProgressCircularSize
  ui?: Partial<UIProgressCircularSlots>
}

const modelValue = defineModel<number>({ default: null })

const props = withDefaults(defineProps<UIProgressCircularProps>(), {
  label: '',
  intent: 'neutral',
  size: 'md',
  ui: undefined,
})

const { locale } = useI18n()

const rootProps = computed(() => ({
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
  ]),
  locale: locale.value,
}))

extendCompodiumMeta({
  defaultProps: {
    label: 'Loading...',
  },
})
</script>

<template>
  <ArkProgress.Root
    v-bind="rootProps"
    v-model:model-value="modelValue"
    :class="cn(progressCircleRootCVA({ intent, size }), ui?.root)"
  >
    <ArkProgress.Label :class="cn(progressCircleLabelCVA({ intent, size }), ui?.label)">
      {{ $te(label) ? $t(label) : label }}
    </ArkProgress.Label>

    <div class="relative inline-flex items-center justify-center">
      <ArkProgress.Circle :class="cn(progressCircleCVA({ size }), ui?.circle)">
        <ArkProgress.CircleTrack :class="cn(progressCircleTrackCVA({ intent }), ui?.track)" />
        <ArkProgress.CircleRange :class="cn(progressCircleRangeCVA({ intent }), ui?.range)" />
      </ArkProgress.Circle>
      <ArkProgress.ValueText
        :class="cn(progressCircleValueTextCVA({ intent, size }), ui?.valueText)"
      />
    </div>
  </ArkProgress.Root>
</template>

<style scoped>
@keyframes circle-range-indeterminate {
  0% {
    stroke-dasharray: calc(var(--circumference) / 2) calc(var(--circumference) / 2);
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dasharray: calc(var(--circumference) / 2) calc(var(--circumference) / 2);
    stroke-dashoffset: calc(var(--circumference) * -1);
  }
}

:deep([data-part='circle-range'][data-state='indeterminate']) {
  animation: circle-range-indeterminate 1500ms linear infinite;
}
</style>
