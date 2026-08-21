<script setup lang="ts">
/** Draggable carousel with thumbnail indicators and autoplay control. */

const slides = [
  { alt: 'Panneau de contrôle', src: 'https://picsum.photos/seed/stallning-1/800/480' },
  { alt: 'Vue des traces', src: 'https://picsum.photos/seed/stallning-2/800/480' },
  { alt: 'Comparaison de modèles', src: 'https://picsum.photos/seed/stallning-3/800/480' },
  { alt: 'Réglages du projet', src: 'https://picsum.photos/seed/stallning-4/800/480' },
]

const page = ref(0)
</script>

<template>
  <div class="flex flex-col gap-3">
    <UICarousel
      :items="slides"
      indicator-variant="thumbnail"
      @page-change="(d: { page: number }) => (page = d.page)"
    />
    <div class="flex items-baseline justify-between">
      <span class="txt-mono-caption text-neutral-text-muted">
        {{ slides[page]?.alt }}
      </span>
      <span class="txt-numeric txt-caption text-neutral-text-muted">
        {{ page + 1 }} / {{ slides.length }}
      </span>
    </div>
  </div>
</template>
