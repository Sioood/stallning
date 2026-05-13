<script setup lang="ts">
const align = ref<string[]>(['center'])
const formatting = ref<string[]>(['bold'])
const devices = ref<string[]>(['desktop'])

const alignOptions = [
  { value: 'left', title: 'Align Left', icon: 'tabler:align-left' },
  { value: 'center', title: 'Align Center', icon: 'tabler:align-center' },
  { value: 'right', title: 'Align Right', icon: 'tabler:align-right' },
  { value: 'justify', title: 'Justify', icon: 'tabler:align-justified' },
]

const formattingOptions = [
  { value: 'bold', title: 'Bold', icon: 'tabler:bold' },
  { value: 'italic', title: 'Italic', icon: 'tabler:italic' },
  { value: 'underline', title: 'Underline', icon: 'tabler:underline' },
  { value: 'strike', title: 'Strikethrough', icon: 'tabler:strikethrough' },
]

const deviceOptions = [
  { value: 'mobile', title: 'Mobile', icon: 'tabler:device-mobile' },
  { value: 'tablet', title: 'Tablet', icon: 'tabler:device-tablet' },
  { value: 'desktop', title: 'Desktop', icon: 'tabler:device-desktop' },
]
</script>

<template>
  <div class="flex flex-col gap-12 p-8 max-w-2xl mx-auto">
    <section class="flex flex-col gap-4">
      <h3 class="text-xl font-bold">Text Alignment (Single)</h3>
      <div
        class="flex flex-col gap-2 p-6 bg-neutral-fill-subtle/10 rounded-xl border border-neutral-border-subtle items-center"
      >
        <UIToggleGroup v-model="align" :options="alignOptions" active-background intent="primary" />
        <p class="text-xs text-neutral-text-subtle mt-2 font-mono">Value: {{ align }}</p>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h3 class="text-xl font-bold">Rich Text Formatting (Multiple)</h3>
      <div
        class="flex flex-col gap-2 p-6 bg-neutral-fill-subtle/10 rounded-xl border border-neutral-border-subtle items-center"
      >
        <UIToggleGroup
          v-model="formatting"
          :options="formattingOptions"
          multiple
          active-background
          intent="accent"
        />
        <p class="text-xs text-neutral-text-subtle mt-2 font-mono">Value: {{ formatting }}</p>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h3 class="text-xl font-bold">Responsive Viewports (With Custom Slot)</h3>
      <div
        class="flex flex-col gap-2 p-6 bg-neutral-fill-subtle/10 rounded-xl border border-neutral-border-subtle items-center"
      >
        <UIToggleGroup
          v-model="devices"
          :options="deviceOptions"
          active-background
          intent="secondary"
          size="lg"
        >
          <template #item="{ option, pressed }">
            <div class="flex items-center gap-2 px-1">
              <Icon :name="option.icon!" class="size-5" />
              <span class="font-medium">{{ option.title }}</span>
              <div
                v-if="pressed"
                class="size-1.5 rounded-full bg-secondary-fill-default animate-pulse"
              />
            </div>
          </template>
        </UIToggleGroup>
      </div>
    </section>
  </div>
</template>
