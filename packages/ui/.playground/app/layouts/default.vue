<script setup lang="ts">
const route = useRoute()

const navOptions = [
  { value: '/', label: 'Dashboard', icon: 'tabler:layout-grid', to: '/' },
  { value: '/training', label: 'Training', icon: 'tabler:barbell', to: '/training' },
  { value: '/goals', label: 'Goals', icon: 'tabler:target', to: '/goals' },
  { value: '/social', label: 'Social', icon: 'tabler:users', to: '/social' },
  { value: '/profile', label: 'Profile', icon: 'tabler:user', to: '/profile' },
] as const
</script>

<template>
  <div class="flex min-h-svh flex-col">
    <main class="flex-1">
      <slot />
    </main>
    <nav class="sticky bottom-0 bg-primary-surface-default">
      <UITabs
        v-model="route.path"
        :options="[...navOptions]"
        trigger-layout="stacked"
        :render-content="false"
        :ui="{ root: 'w-full', list: 'w-full', trigger: 'flex-1' }"
      />
    </nav>
  </div>
</template>
