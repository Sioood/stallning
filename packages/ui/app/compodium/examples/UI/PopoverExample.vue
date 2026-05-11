<script setup lang="ts">
const controlledOpen = ref(false)

const triggerLabels: Record<string, string> = {
  1: 'First trigger content',
  2: 'Second trigger content',
  3: 'Third trigger content',
}
</script>

<template>
  <div class="flex w-fit flex-col gap-6">
    <UIPopover
      title="Favorite Framework"
      description="Tell us your favorite framework."
      content="Popover content"
      show-close-trigger
    />

    <UIPopover
      v-model:open="controlledOpen"
      title="Controlled popover"
      content="This popover is controlled from outside."
    >
      <template #trigger>
        <UIButton type="button" variant="subtle" intent="primary">
          {{ controlledOpen ? 'Close controlled popover' : 'Open controlled popover' }}
        </UIButton>
      </template>
    </UIPopover>

    <UIPopover
      modal
      show-close-trigger
      title="Modal popover"
      description="Focus is trapped while open."
      content="Modal mode enabled."
    />

    <UIPopover title="Multiple triggers" :positioning="{ placement: 'top' }">
      <template #triggers="{ trigger: Trigger }">
        <div class="join flex">
          <component
            :is="Trigger"
            v-for="i in [1, 2, 3]"
            :key="i"
            :value="i.toString()"
            class="join-item"
          >
            <UIToggle active-background>
              <template #on>
                <span>On</span>
              </template>
              <template #off>
                <span>Off</span>
              </template>
            </UIToggle>
          </component>
        </div>
      </template>
      <template #content="{ triggerValue }">
        {{ triggerLabels[triggerValue ?? ''] ?? 'Select a trigger' }}
      </template>
    </UIPopover>
  </div>
</template>
