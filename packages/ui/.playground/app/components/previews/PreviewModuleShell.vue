<script setup lang="ts">
import type { ClassValue } from 'vue'

defineProps<{
  title: string
  category?: string
  description?: string
  class?: ClassValue
}>()
</script>

<template>
  <UICardBase
    variant="subtle"
    intent="neutral"
    size="lg"
    :class="cn('flex flex-col gap-5', $props.class)"
  >
    <header class="flex flex-col gap-2">
      <div class="flex items-start justify-between gap-3">
        <h2 class="txt-label text-neutral-text">{{ title }}</h2>
        <UIBadge v-if="category" :label="category" size="sm" intent="neutral" variant="subtle" />
      </div>
      <p v-if="description" class="txt-caption text-neutral-text-subtle">{{ description }}</p>
    </header>
    <slot />
  </UICardBase>
</template>
