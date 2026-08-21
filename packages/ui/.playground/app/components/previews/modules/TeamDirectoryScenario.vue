<script setup lang="ts">
/** Avatars with initials fallback, filtered by a debounced search input. */

const members = [
  { name: 'Marie Dupont', role: 'Design système' },
  { name: 'Ahmed Benali', role: 'Frontend' },
  { name: 'Clara Nguyen', role: 'Produit' },
  { name: 'Tomás Ferreira', role: 'Plateforme' },
  { name: 'Léa Rousseau', role: 'Accessibilité' },
] as const

const query = ref('')

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return members
  return members.filter((m) => m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q))
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <UIFormSearchInput v-model="query" placeholder="Filtrer l'équipe…" :debounce="200" />

    <div class="flex items-center gap-1">
      <UIAvatar
        v-for="member in members"
        :key="member.name"
        :name="member.name"
        letters-only
        size="sm"
        class="-mr-2 ring-2 ring-neutral-bg-subtle last:mr-0"
      />
      <span class="txt-mono-caption ml-4 text-neutral-text-muted">
        {{ members.length }} membres
      </span>
    </div>

    <ul class="flex flex-col">
      <li
        v-for="member in filtered"
        :key="member.name"
        class="flex items-center gap-3 border-b border-neutral-border-subtle py-2 last:border-0"
      >
        <UIAvatar :name="member.name" letters-only size="sm" />
        <span class="txt-label min-w-0 flex-1 truncate text-neutral-text">{{ member.name }}</span>
        <span class="txt-mono-caption text-neutral-text-muted">{{ member.role }}</span>
      </li>
      <li v-if="!filtered.length" class="txt-caption py-3 text-neutral-text-muted">
        Aucun résultat.
      </li>
    </ul>
  </div>
</template>
