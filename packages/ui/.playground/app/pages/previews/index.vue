<script setup lang="ts">
const previews = [
  {
    description: '30 mini-scénarios interactifs couvrant chaque composant public.',
    tag: 'Compositions',
    title: 'Component Bento',
    to: '/previews/bento',
  },
  {
    description: 'Tokens de couleur, typographie, radius, élévation et mouvement.',
    tag: 'Tokens',
    title: 'Foundation',
    to: '/foundation',
  },
  {
    description: 'Page média complète — détail film avec sidebar et métadonnées.',
    tag: 'Product',
    title: 'Media / Movie',
    to: '/scenarios/media',
  },
  {
    description: 'Parcours produit complets : dashboard, auth, réglages, paiement.',
    tag: 'Product',
    title: 'Scénarios',
    to: '/scenarios',
  },
] as const
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
    <header class="mb-10 max-w-2xl">
      <p class="txt-caption mb-3 text-neutral-text-subtle">Previews</p>
      <h1 class="txt-h4 mb-3 text-neutral-text">Compositions</h1>
      <p class="txt-base text-neutral-text-subtle">
        Vitrines interactives du design system. Pour les pages produit complètes, voir
        <UILink to="/scenarios">Scénarios</UILink>.
      </p>
    </header>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <NuxtLink
        v-for="preview in previews"
        :key="preview.to"
        :to="preview.to"
        class="rounded-xs border border-neutral-border-subtle bg-neutral-surface p-5 transition-colors hover:border-neutral-border"
      >
        <UIBadge :label="preview.tag" size="sm" intent="neutral" variant="subtle" class="mb-3" />
        <h2 class="txt-label mb-1.5 text-neutral-text">{{ preview.title }}</h2>
        <p class="txt-caption text-neutral-text-subtle">{{ preview.description }}</p>
      </NuxtLink>
    </div>
  </div>
</template>
