<script setup lang="ts">
const pages = [
  {
    title: 'Previews',
    to: '/previews',
  },
]

throw createError({
  statusCode: 404,
  statusMessage: 'Page not found es',
})
</script>

<template>
  <main class="flex flex-col gap-4 p-12">
    <ul class="flex flex-col gap-2">
      <li v-for="page in pages" :key="page.title">
        <UILink :to="page.to">{{ page.title }}</UILink>
      </li>
    </ul>
  </main>
</template>
