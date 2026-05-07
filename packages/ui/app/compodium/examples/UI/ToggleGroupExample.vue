<script setup lang="ts">
const single = ref<string[]>(['center'])
const multiple = ref<string[]>(['bold'])

const alignOptions = [
  { value: 'left', title: 'Left', icon: 'tabler:align-left' },
  { value: 'center', title: 'Center', icon: 'tabler:align-center' },
  { value: 'right', title: 'Right', icon: 'tabler:align-right' },
]

const styleOptions = [
  { value: 'bold', title: 'Bold', icon: 'tabler:bold' },
  { value: 'italic', title: 'Italic', icon: 'tabler:italic' },
  { value: 'underline', title: 'Underline', icon: 'tabler:underline' },
]
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <p class="txt-caption text-primary-text-subtle">Single selection</p>
      <UIToggleGroup v-model="single" :options="alignOptions" active-background intent="primary" />
      <p class="txt-caption text-primary-text-subtle">Value: {{ single }}</p>
    </div>

    <div class="flex flex-col gap-2">
      <p class="txt-caption text-primary-text-subtle">Multiple selection with slot</p>
      <UIToggleGroup
        v-model="multiple"
        :options="styleOptions"
        multiple
        active-background
        intent="secondary"
      >
        <template #item="{ option, pressed }">
          <div class="inline-flex items-center gap-1">
            <Icon v-if="option.icon" :name="option.icon" class="size-4 shrink-0" />
            <span>{{ option.title }}</span>
            <span class="txt-caption opacity-70">({{ pressed ? 'on' : 'off' }})</span>
          </div>
        </template>
      </UIToggleGroup>
      <p class="txt-caption text-primary-text-subtle">Value: {{ multiple }}</p>
    </div>
  </div>
</template>
