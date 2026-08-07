<script setup lang="ts">
const sections = [
  {
    description: 'Couleurs, radius, typographie et spacing du design system.',
    href: '/foundation',
    icon: 'tabler:palette',
    tag: 'Foundation',
    title: 'Foundation',
  },
  {
    description: 'Mini-scénarios interactifs entre composants, en grille bento.',
    href: '/previews/bento',
    icon: 'tabler:layout-board',
    tag: 'Compositions',
    title: 'Component Bento',
  },
  {
    description: 'Pages concrètes : dashboard, auth, settings, checkout, media.',
    href: '/scenarios',
    icon: 'tabler:app-window',
    tag: 'Product',
    title: 'Scénarios produit',
  },
] as const

const highlights = [
  {
    description: 'KPI, onglets, table et activité — coquille d’app complète.',
    href: '/scenarios/dashboard',
    title: 'Dashboard',
  },
  {
    description: 'Connexion, OTP et confirmation en parcours multi-étapes.',
    href: '/scenarios/auth',
    title: 'Authentification',
  },
  {
    description: 'Profil, notifications et zone de danger.',
    href: '/scenarios/settings',
    title: 'Paramètres',
  },
] as const
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
    <header class="mb-12 max-w-2xl">
      <p class="txt-caption mb-3 text-neutral-text-subtle">Playground</p>
      <h1 class="txt-h3 mb-3 text-neutral-text">Stallning UI</h1>
      <p class="txt-base text-neutral-text-subtle">
        Bac à sable visuel du design system — explorez les fondations, les mini-scénarios et des
        pages produit réalistes pour vous projeter dans l’usage des composants.
      </p>
    </header>

    <section class="mb-14">
      <h2 class="txt-h6 mb-5 text-neutral-text">Explorer</h2>
      <div class="grid gap-4 md:grid-cols-3">
        <NuxtLink
          v-for="item in sections"
          :key="item.href"
          :to="item.href"
          class="group block rounded-xs border border-neutral-border-subtle bg-neutral-surface p-5 transition-colors hover:border-neutral-border hover:bg-neutral-surface-subtle"
        >
          <div class="mb-4 flex items-center justify-between gap-3">
            <span
              class="flex size-9 items-center justify-center rounded-xs bg-neutral-fill-subtle text-neutral-text"
            >
              <Icon :name="item.icon" class="size-5" />
            </span>
            <UIBadge :label="item.tag" size="sm" intent="neutral" variant="subtle" />
          </div>
          <h3 class="txt-label mb-1.5 text-neutral-text group-hover:text-primary-text">
            {{ item.title }}
          </h3>
          <p class="txt-caption text-neutral-text-subtle">{{ item.description }}</p>
        </NuxtLink>
      </div>
    </section>

    <section>
      <div class="mb-5 flex items-end justify-between gap-4">
        <h2 class="txt-h6 text-neutral-text">Accès rapide</h2>
        <UILink to="/scenarios" class="txt-caption">Tous les scénarios</UILink>
      </div>
      <div class="grid gap-3 sm:grid-cols-3">
        <NuxtLink
          v-for="item in highlights"
          :key="item.href"
          :to="item.href"
          class="rounded-xs border border-neutral-border-subtle bg-primary-bg-subtle/40 p-4 transition-colors hover:border-neutral-border"
        >
          <h3 class="txt-label mb-1 text-neutral-text">{{ item.title }}</h3>
          <p class="txt-caption text-neutral-text-subtle">{{ item.description }}</p>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
