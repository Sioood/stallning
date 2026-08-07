<script setup lang="ts">
const scenarios = [
  {
    description: 'KPI, onglets, activité et table — coquille d’application complète.',
    href: '/scenarios/dashboard',
    icon: 'tabler:layout-dashboard',
    tag: 'App',
    title: 'Dashboard',
  },
  {
    description: 'Connexion, vérification OTP et confirmation de session.',
    href: '/scenarios/auth',
    icon: 'tabler:lock',
    tag: 'Auth',
    title: 'Authentification',
  },
  {
    description: 'Profil, notifications et zone de danger en layout deux colonnes.',
    href: '/scenarios/settings',
    icon: 'tabler:settings',
    tag: 'Account',
    title: 'Paramètres',
  },
  {
    description: 'Stepper panier → livraison → paiement avec récapitulatif.',
    href: '/scenarios/checkout',
    icon: 'tabler:shopping-cart',
    tag: 'Commerce',
    title: 'Checkout',
  },
  {
    description: 'Fiche média complète avec sidebar et métadonnées bento.',
    href: '/scenarios/media',
    icon: 'tabler:movie',
    tag: 'Media',
    title: 'Media / Movie',
  },
] as const
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
    <header class="mb-10 max-w-2xl">
      <p class="txt-caption mb-3 text-neutral-text-subtle">Product</p>
      <h1 class="txt-h4 mb-3 text-neutral-text">Scénarios produit</h1>
      <p class="txt-base text-neutral-text-subtle">
        Pages concrètes répandues dans la majorité des projets — pour valider le design system en
        situation réelle.
      </p>
    </header>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="item in scenarios"
        :key="item.href"
        :to="item.href"
        class="group flex flex-col gap-4 rounded-xs border border-neutral-border-subtle bg-neutral-surface p-5 transition-colors hover:border-neutral-border"
      >
        <div class="flex items-center justify-between gap-3">
          <span
            class="flex size-9 items-center justify-center rounded-xs bg-neutral-fill-subtle text-neutral-text"
          >
            <Icon :name="item.icon" class="size-5" />
          </span>
          <UIBadge :label="item.tag" size="sm" intent="neutral" variant="subtle" />
        </div>
        <div>
          <h2 class="txt-label mb-1.5 text-neutral-text">{{ item.title }}</h2>
          <p class="txt-caption text-neutral-text-subtle">{{ item.description }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
