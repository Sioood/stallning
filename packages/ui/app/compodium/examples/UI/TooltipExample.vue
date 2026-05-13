<script setup lang="ts">
const placements = ['top', 'bottom', 'left', 'right'] as const
</script>

<template>
  <div class="flex flex-col gap-12 p-8 max-w-2xl mx-auto">
    <section class="flex flex-col gap-4">
      <h3 class="text-xl font-bold">Standard Placements</h3>
      <div
        class="flex flex-wrap gap-8 justify-center p-8 bg-neutral-fill-subtle/20 rounded-xl border border-dashed border-neutral-border-subtle"
      >
        <UITooltip
          v-for="placement in placements"
          :key="placement"
          :content="`Tooltip on ${placement}`"
          :positioning="{ placement }"
        >
          <template #trigger>
            <UIButton variant="outline" size="sm" class="capitalize">{{ placement }}</UIButton>
          </template>
        </UITooltip>
      </div>
    </section>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <section class="flex flex-col gap-4">
        <h3 class="text-xl font-bold">Follow Cursor</h3>
        <p class="text-sm text-neutral-text-subtle">Tooltip tracks the mouse position.</p>
        <UITooltip
          content="I am following you!"
          follow-cursor
          :open-delay="0"
          :close-delay="50"
          class="h-32 w-full bg-primary-fill-subtle/30 rounded-lg flex items-center justify-center border border-primary-border-subtle cursor-crosshair"
        >
          <template #trigger>
            <span class="font-medium text-primary-text-default">Hover anywhere in this box</span>
          </template>
        </UITooltip>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="text-xl font-bold">Interactive Content</h3>
        <p class="text-sm text-neutral-text-subtle">Tooltips can contain links or rich text.</p>
        <UITooltip interactive :open-delay="200">
          <template #trigger>
            <UIButton variant="subtle" intent="accent">Hover for details</UIButton>
          </template>
          <template #content>
            <div class="flex flex-col gap-1 max-w-[200px]">
              <span class="font-bold">Rich Tooltip</span>
              <span
                >This tooltip is <span class="text-accent-text-default">interactive</span> and
                allows clicking inside.</span
              >
              <a href="#" class="text-primary-text-default underline mt-1">Learn more</a>
            </div>
          </template>
        </UITooltip>
      </section>
    </div>

    <section class="flex flex-col gap-4">
      <h3 class="text-xl font-bold">Shared Tooltip</h3>
      <p class="text-sm text-neutral-text-subtle">
        A single tooltip instance shared across multiple related triggers.
      </p>
      <UITooltip content="Shared tooltip" :positioning="{ placement: 'top', gutter: 12 }">
        <template #triggers="{ trigger: Trigger, onTriggerPointerMove }">
          <div
            class="flex gap-2 p-4 bg-neutral-fill-subtle/10 rounded-lg border border-neutral-border-subtle justify-center"
          >
            <component
              :is="Trigger"
              v-for="icon in ['tabler:home', 'tabler:user', 'tabler:settings', 'tabler:mail']"
              :key="icon"
              :value="icon.split(':')[1]"
              class="p-2 rounded-md hover:bg-neutral-fill-subtle transition-colors"
              @pointermove="onTriggerPointerMove($event)"
            >
              <Icon :name="icon" class="size-6 text-neutral-text-default" />
            </component>
          </div>
        </template>
        <template #content="{ triggerValue }">
          <span class="capitalize font-bold">{{ triggerValue }}</span>
        </template>
      </UITooltip>
    </section>
  </div>
</template>
