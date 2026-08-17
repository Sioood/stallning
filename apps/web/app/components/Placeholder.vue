<script setup lang="ts">
withDefaults(
  defineProps<{
    description?: string
    title?: string
  }>(),
  {
    description: 'Replace this component with real web UI.',
    title: 'Placeholder',
  },
)
</script>

<template>
  <div class="flex flex-col gap-2 rounded-lg border border-neutral-border bg-neutral-surface p-4">
    <h2 class="txt-h5 text-neutral-text">{{ title }}</h2>
    <p class="txt-sm text-neutral-text-subtle">{{ description }}</p>
  </div>
</template>
