<script setup lang="ts">
const controlledOpen = ref(false)
const notifications = ref(true)
const marketing = ref(false)

const triggerLabels: Record<string, string> = {
  1: 'Security Settings',
  2: 'Privacy Options',
  3: 'Account Preferences',
}
</script>

<template>
  <div class="flex flex-col gap-10 p-6">
    <section class="flex flex-col gap-4">
      <h3 class="text-lg font-bold">Standard Popover</h3>
      <div class="flex gap-4">
        <UIPopover
          title="Information"
          description="Basic usage of the popover component."
          content="This is a simple popover with a title and description."
          show-close-trigger
        />

        <UIPopover
          intent="primary"
          title="Primary Intent"
          description="Branded popover style."
          content="Popovers can follow the system intents for consistent branding."
        >
          <template #trigger>
            <UIButton variant="solid" intent="primary">Primary Popover</UIButton>
          </template>
        </UIPopover>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h3 class="text-lg font-bold">Complex Content (Settings)</h3>
      <UIPopover title="Quick Settings" description="Manage your preferences.">
        <template #trigger>
          <UIButton variant="subtle" intent="neutral">
            <Icon name="tabler:settings" class="mr-2" />
            Settings
          </UIButton>
        </template>
        <template #content>
          <div class="flex flex-col gap-4 min-w-[240px]">
            <UISwitch v-model:checked="notifications" label="Push Notifications" size="sm" />
            <UISwitch v-model:checked="marketing" label="Marketing Emails" size="sm" />
            <div class="border-t border-neutral-border-subtle pt-3 mt-1 flex justify-end gap-2">
              <UIButton size="sm" variant="ghost">Reset</UIButton>
              <UIButton size="sm" variant="solid" intent="primary">Save</UIButton>
            </div>
          </div>
        </template>
      </UIPopover>
    </section>

    <section class="flex flex-col gap-4">
      <h3 class="text-lg font-bold">Multiple Triggers (Shared)</h3>
      <UIPopover title="Shared Popover" :positioning="{ placement: 'top' }">
        <template #triggers="{ trigger: Trigger }">
          <div class="join flex">
            <component
              :is="Trigger"
              v-for="i in [1, 2, 3]"
              :key="i"
              :value="i.toString()"
              class="join-item"
            >
              <UIButton variant="subtle" class="join-item">Trigger {{ i }}</UIButton>
            </component>
          </div>
        </template>
        <template #content="{ triggerValue }">
          <div class="p-2">
            <span class="font-bold text-primary-text-default">Active:</span>
            {{ triggerLabels[triggerValue ?? ''] ?? 'Select a trigger' }}
          </div>
        </template>
      </UIPopover>
    </section>

    <section class="flex flex-col gap-4">
      <h3 class="text-lg font-bold">Controlled & Modal</h3>
      <div class="flex gap-4">
        <UIPopover
          v-model:open="controlledOpen"
          title="External Control"
          content="I am managed by a parent ref."
        >
          <template #trigger>
            <UIButton variant="outline" @click="controlledOpen = !controlledOpen">
              {{ controlledOpen ? 'Close' : 'Open' }} Programmatically
            </UIButton>
          </template>
        </UIPopover>

        <UIPopover
          modal
          show-close-trigger
          title="Modal Popover"
          description="Focus is trapped inside."
          content="Great for forms or critical info that needs attention."
        >
          <template #trigger>
            <UIButton variant="solid" intent="accent">Open Modal Popover</UIButton>
          </template>
        </UIPopover>
      </div>
    </section>
  </div>
</template>
