<script setup lang="ts">
const value = ref(0)

const intents = ['neutral', 'primary', 'secondary', 'accent'] as const
const sizes = ['sm', 'md', 'lg'] as const
const circularSizes = ['sm', 'md', 'lg', 'icon-sm', 'icon-md', 'icon-lg'] as const

const interval = ref<NodeJS.Timeout | null>(null)
onMounted(() => {
  interval.value = setInterval(() => {
    if (value.value >= 100) value.value = 0
    else value.value += Math.min(Math.random() * 10, 100)
  }, 1000)
})

onUnmounted(() => {
  if (interval.value) {
    clearInterval(interval.value)
  }
})
</script>

<template>
  <div class="flex w-full flex-col gap-8">
    <span class="text-neutral-text-subtle tabular-nums">Actual value: {{ value }}</span>

    <div class="flex flex-col gap-6">
      <h3 class="text-lg font-bold">Linear Progress</h3>
      <div v-for="intent in intents" :key="intent" class="flex flex-col gap-4">
        <h4 class="capitalize text-neutral-text-default font-semibold">{{ intent }}</h4>
        <div class="flex flex-col gap-2">
          <UIProgress
            v-for="size in sizes"
            :key="size"
            v-model:model-value="value"
            :label="`Loading (${size})`"
            :intent="intent"
            :size="size"
          />
        </div>
      </div>

      <h4 class="capitalize text-neutral-text-default font-semibold">Vertical</h4>
      <div class="flex h-40 gap-4">
        <UIProgress
          v-for="intent in intents"
          :key="intent"
          v-model:model-value="value"
          label="Vertical"
          :intent="intent"
          orientation="vertical"
        />
      </div>

      <h4 class="capitalize text-neutral-text-default font-semibold">Indeterminate (undefined)</h4>
      <div class="flex flex-col gap-2">
        <UIProgress :model-value="undefined" label="Indeterminate" />
      </div>
    </div>

    <div class="flex flex-col gap-6">
      <h3 class="text-lg font-bold">Circular Progress</h3>
      <div v-for="intent in intents" :key="intent" class="flex flex-col gap-4">
        <h4 class="capitalize text-neutral-text-default font-semibold">{{ intent }}</h4>
        <div class="flex flex-wrap gap-4">
          <UIProgressCircular
            v-for="size in circularSizes"
            :key="size"
            v-model:model-value="value"
            :label="size"
            :intent="intent"
            :size="size"
          />
        </div>
      </div>

      <h4 class="capitalize text-neutral-text-default font-semibold">Indeterminate (undefined)</h4>
      <div class="flex flex-wrap gap-4">
        <UIProgressCircular
          v-for="size in circularSizes"
          :key="size"
          :model-value="undefined"
          :label="size"
          :size="size"
        />
      </div>
    </div>
  </div>
</template>
