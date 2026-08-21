<script setup lang="ts">
/** Free-form tags alongside a searchable single-select combobox. */

const tags = ref<string[]>(['design-system', 'a11y'])
const owner = ref<string[]>(['marie'])

const suggestions = [
  { label: 'design-system', value: 'design-system' },
  { label: 'a11y', value: 'a11y' },
  { label: 'tokens', value: 'tokens' },
  { label: 'storybook', value: 'storybook' },
  { label: 'performance', value: 'performance' },
]

const owners = [
  { label: 'Marie Dupont', value: 'marie' },
  { label: 'Ahmed Benali', value: 'ahmed' },
  { label: 'Clara Nguyen', value: 'clara' },
]
</script>

<template>
  <div class="flex flex-col gap-5">
    <UIFormTagsInput
      v-model="tags"
      label="Étiquettes"
      :items="suggestions"
      placeholder="Ajouter une étiquette…"
      helper-text="Entrée pour valider, Retour arrière pour supprimer."
    />

    <UIFormCombobox v-model="owner" label="Responsable" :items="owners" placeholder="Rechercher…" />

    <div v-if="tags.length" class="flex flex-wrap gap-1.5">
      <UIChip v-for="tag in tags" :key="tag" :label="tag" size="sm" intent="neutral" />
    </div>
  </div>
</template>
