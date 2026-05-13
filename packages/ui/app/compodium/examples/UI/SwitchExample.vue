<script setup lang="ts">
const settings = ref({
  notifications: true,
  darkMode: false,
  autoUpdate: true,
  biometrics: false,
})

const sizes = ['sm', 'md', 'lg'] as const
</script>

<template>
  <div class="flex flex-col gap-12 p-6 max-w-2xl mx-auto">
    <section class="flex flex-col gap-6">
      <h2 class="text-xl font-bold">App Settings</h2>
      <div
        class="flex flex-col border border-neutral-border-subtle rounded-xl overflow-hidden bg-neutral-fill-subtle/5"
      >
        <div
          class="flex items-center justify-between p-4 border-b border-neutral-border-subtle hover:bg-neutral-fill-subtle/20 transition-colors"
        >
          <div class="flex flex-col">
            <span class="font-medium text-neutral-text-default">Enable Notifications</span>
            <span class="text-xs text-neutral-text-subtle"
              >Receive real-time alerts on your device.</span
            >
          </div>
          <UISwitch v-model:checked="settings.notifications" intent="primary" />
        </div>

        <div
          class="flex items-center justify-between p-4 border-b border-neutral-border-subtle hover:bg-neutral-fill-subtle/20 transition-colors"
        >
          <div class="flex flex-col">
            <span class="font-medium text-neutral-text-default">Dark Mode</span>
            <span class="text-xs text-neutral-text-subtle">Switch to a darker color palette.</span>
          </div>
          <UISwitch v-model:checked="settings.darkMode" intent="neutral" />
        </div>

        <div
          class="flex items-center justify-between p-4 border-b border-neutral-border-subtle hover:bg-neutral-fill-subtle/20 transition-colors"
        >
          <div class="flex flex-col">
            <span class="font-medium text-neutral-text-default">Auto-Update</span>
            <span class="text-xs text-neutral-text-subtle"
              >Keep the application up to date automatically.</span
            >
          </div>
          <UISwitch v-model:checked="settings.autoUpdate" intent="secondary" />
        </div>

        <div
          class="flex items-center justify-between p-4 hover:bg-neutral-fill-subtle/20 transition-colors"
        >
          <div class="flex flex-col">
            <span class="font-medium text-neutral-text-default">Biometric Login</span>
            <span class="text-xs text-neutral-text-subtle"
              >Use FaceID or Fingerprint to unlock.</span
            >
          </div>
          <UISwitch v-model:checked="settings.biometrics" intent="accent" />
        </div>
      </div>
    </section>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <section class="flex flex-col gap-4">
        <h3 class="text-lg font-bold">Sizes</h3>
        <div
          class="flex flex-col gap-4 p-6 bg-neutral-fill-subtle/10 rounded-xl border border-neutral-border-subtle items-start"
        >
          <UISwitch
            v-for="size in sizes"
            :key="size"
            :size="size"
            :label="`Size ${size}`"
            :model-value="true"
          />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="text-lg font-bold">States</h3>
        <div
          class="flex flex-col gap-4 p-6 bg-neutral-fill-subtle/10 rounded-xl border border-neutral-border-subtle items-start"
        >
          <UISwitch label="Required" required :model-value="false" />
          <UISwitch label="Disabled" disabled :model-value="true" />
          <UISwitch label="Disabled Off" disabled :model-value="false" />
          <UISwitch label="Invalid State" invalid error="This option is mandatory" />
        </div>
      </section>
    </div>
  </div>
</template>
