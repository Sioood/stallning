<script setup lang="ts">
const route = useRoute()

const backTo = computed(() => {
  if (route.path.startsWith('/scenarios/')) return '/scenarios'
  return '/'
})
</script>

<template>
  <div class="flex min-h-svh flex-col">
    <header
      class="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-neutral-border-subtle bg-primary-bg/90 px-4 py-2.5 backdrop-blur-md md:px-6 dark:bg-primary-bg-subtle/90"
    >
      <NuxtLink
        :to="backTo"
        class="txt-caption inline-flex items-center gap-1.5 rounded-xs px-2 py-1 text-neutral-text-subtle transition-colors hover:bg-neutral-fill-subtle hover:text-neutral-text"
      >
        <Icon name="tabler:arrow-left" class="size-4" />
        Retour
      </NuxtLink>
      <p class="txt-caption text-neutral-text-subtle">Scénario produit</p>
      <UIToggleTheme />
    </header>
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>
