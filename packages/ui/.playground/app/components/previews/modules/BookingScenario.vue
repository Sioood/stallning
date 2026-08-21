<script setup lang="ts">
/** Date picker plus a stepper — the shape most booking flows need. */

import type { DateValue } from '@internationalized/date'

const dates = ref<DateValue[]>([])
const guests = ref('2')
const nights = ref('3')

const summary = computed(() => {
  const [start] = dates.value
  if (!start) return null
  return `${start.toString()} · ${nights.value} nuit(s) · ${guests.value} personne(s)`
})
</script>

<template>
  <div class="flex flex-col gap-5">
    <UIFormDatePicker v-model="dates" label="Arrivée" />

    <div class="grid grid-cols-2 gap-3">
      <UIFormNumberInput v-model="guests" label="Personnes" :min="1" :max="12" :step="1" />
      <UIFormNumberInput v-model="nights" label="Nuits" :min="1" :max="30" :step="1" />
    </div>

    <div
      class="flex items-center justify-between border border-neutral-border-subtle bg-neutral-surface px-3 py-2"
    >
      <span class="txt-overline text-neutral-text-muted">Récapitulatif</span>
      <span class="txt-mono-caption text-neutral-text">{{ summary ?? 'Choisir une date' }}</span>
    </div>
  </div>
</template>
