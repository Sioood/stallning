<script setup lang="ts">
const route = useRoute()

const navItems = [
  { label: 'Hub', to: '/' },
  { label: 'Foundation', to: '/foundation' },
  { label: 'Bento', to: '/previews/bento' },
  { label: 'Scénarios', to: '/scenarios' },
] as const

function isActive(to: string) {
  if (to === '/') return route.path === '/'
  return route.path === to || route.path.startsWith(`${to}/`)
}
</script>

<template>
  <div class="flex min-h-svh flex-col">
    <header
      class="sticky top-0 z-40 border-b border-neutral-border-subtle bg-primary-bg/90 backdrop-blur-md dark:bg-primary-bg-subtle/90"
    >
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <div class="flex min-w-0 items-center gap-6">
          <NuxtLink to="/" class="txt-label shrink-0 font-medium text-neutral-text">
            Stallning UI
          </NuxtLink>
          <nav class="hidden items-center gap-1 sm:flex" aria-label="Playground">
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="txt-caption rounded-xs px-2.5 py-1.5 transition-colors"
              :class="
                isActive(item.to)
                  ? 'bg-neutral-fill-subtle text-neutral-text'
                  : 'text-neutral-text-subtle hover:bg-neutral-fill-subtle/60 hover:text-neutral-text'
              "
            >
              {{ item.label }}
            </NuxtLink>
          </nav>
        </div>
        <div class="flex items-center gap-2">
          <UIToggleTheme />
        </div>
      </div>
      <nav
        class="flex gap-1 overflow-x-auto border-t border-neutral-border-subtle px-4 py-2 sm:hidden"
        aria-label="Playground mobile"
      >
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="txt-caption shrink-0 rounded-xs px-2.5 py-1.5 transition-colors"
          :class="
            isActive(item.to)
              ? 'bg-neutral-fill-subtle text-neutral-text'
              : 'text-neutral-text-subtle'
          "
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
    </header>
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>
