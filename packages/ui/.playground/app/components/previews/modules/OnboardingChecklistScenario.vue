<script setup lang="ts">
/** Checkbox group for multi-select, toggle group for a mutually exclusive view mode. */

const tasks = ref<string[]>(['profile'])
const density = ref<string[]>(['comfortable'])

const items = [
  { label: 'Compléter le profil', value: 'profile' },
  { label: 'Inviter un coéquipier', value: 'invite' },
  { label: 'Connecter un dépôt', value: 'repo' },
  { label: 'Activer la double authentification', value: 'mfa' },
] as const

const progress = computed(() => Math.round((tasks.value.length / items.length) * 100))
</script>

<template>
  <div class="flex flex-col gap-5">
    <UIFormCheckboxGroup v-model="tasks" label="Mise en route" :items="items" />

    <div class="flex flex-col gap-2">
      <span class="txt-overline text-neutral-text-muted">Densité</span>
      <UIToggleGroup
        v-model="density"
        size="sm"
        :options="[
          { title: 'Compact', value: 'compact' },
          { title: 'Confortable', value: 'comfortable' },
        ]"
      />
    </div>

    <div class="flex flex-col gap-2">
      <div class="flex items-baseline justify-between">
        <span class="txt-caption text-neutral-text-subtle">Progression</span>
        <span class="txt-numeric txt-caption text-neutral-text">{{ progress }}%</span>
      </div>
      <UIProgress :model-value="progress" />
    </div>
  </div>
</template>
