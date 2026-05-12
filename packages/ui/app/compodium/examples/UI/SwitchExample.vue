<script setup lang="ts">
const checkedBasic = ref(false)
const checkedControlled = ref(true)
const checkedDisabled = ref(true)
</script>

<template>
  <div class="flex flex-col gap-6 p-4">
    <div class="flex flex-col gap-4">
      <h3 class="txt-h6">Basic Switch</h3>
      <div class="flex items-center gap-4">
        <UISwitch v-model:checked="checkedBasic" label="Enable notifications" />
        <span class="txt-caption text-neutral-text-subtle">
          {{ checkedBasic ? 'Enabled' : 'Disabled' }}
        </span>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <h3 class="txt-h6">Intents</h3>
      <div class="flex flex-col gap-3">
        <UISwitch v-model:checked="checkedControlled" intent="neutral" label="Neutral switch" />
        <UISwitch v-model:checked="checkedControlled" intent="primary" label="Primary switch" />
        <UISwitch v-model:checked="checkedControlled" intent="secondary" label="Secondary switch" />
        <UISwitch v-model:checked="checkedControlled" intent="accent" label="Accent switch" />
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <h3 class="txt-h6">Sizes</h3>
      <div class="flex flex-col gap-3">
        <UISwitch v-model:checked="checkedControlled" size="sm" label="Small switch" />
        <UISwitch v-model:checked="checkedControlled" size="md" label="Medium switch" />
        <UISwitch v-model:checked="checkedControlled" size="lg" label="Large switch" />
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <h3 class="txt-h6">States</h3>
      <div class="flex flex-col gap-3">
        <UISwitch
          v-model:checked="checkedControlled"
          label="Normal switch"
          required
          helper-text="This is a helper text"
          error="This is an error"
        />
        <UISwitch v-model:checked="checkedDisabled" disabled label="Disabled switch" />
      </div>
    </div>
  </div>
</template>
