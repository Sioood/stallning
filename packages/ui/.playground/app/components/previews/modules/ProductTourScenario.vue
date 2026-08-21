<script setup lang="ts">
import { useTour, type TourStepDetails } from '@ark-ui/vue/tour'

/**
 * Guided tour driven from outside via `useTour` (RootProvider mode) — the pattern for
 * anything that needs imperative control over an Ark machine.
 */

const steps: TourStepDetails[] = [
  {
    actions: [{ action: 'next', label: 'Commencer' }],
    description: 'Trois étapes pour situer les zones principales.',
    id: 'intro',
    title: 'Bienvenue',
    type: 'dialog',
  },
  {
    actions: [
      { action: 'prev', label: 'Précédent' },
      { action: 'next', label: 'Suivant' },
    ],
    description: 'Le filtre restreint la liste sans recharger la page.',
    id: 'filters',
    target: () => document.querySelector<HTMLElement>('#tour-filters'),
    title: 'Filtres',
    type: 'tooltip',
  },
  {
    actions: [
      { action: 'prev', label: 'Précédent' },
      { action: 'next', label: 'Terminer' },
    ],
    description: 'Les mesures se rafraîchissent en direct.',
    id: 'metrics',
    target: () => document.querySelector<HTMLElement>('#tour-metrics'),
    title: 'Mesures',
    type: 'tooltip',
  },
]

const tour = useTour({ steps })
</script>

<template>
  <div class="flex flex-col gap-4">
    <UIButton
      intent="primary"
      variant="subtle"
      size="sm"
      text="Lancer la visite"
      class="w-fit"
      @click="tour.start()"
    />

    <div class="grid grid-cols-2 gap-3">
      <div
        id="tour-filters"
        class="flex flex-col gap-1 border border-neutral-border-subtle px-3 py-2"
      >
        <span class="txt-overline text-neutral-text-muted">Filtres</span>
        <span class="txt-label text-neutral-text">3 actifs</span>
      </div>
      <div
        id="tour-metrics"
        class="flex flex-col gap-1 border border-neutral-border-subtle px-3 py-2"
      >
        <span class="txt-overline text-neutral-text-muted">Mesures</span>
        <span class="txt-numeric txt-label text-neutral-text">99.97%</span>
      </div>
    </div>

    <UITour :tour="tour" intent="neutral" size="md" show-progress-bar />
  </div>
</template>
