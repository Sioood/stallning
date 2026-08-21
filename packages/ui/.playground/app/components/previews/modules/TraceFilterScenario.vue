<script setup lang="ts">
import type { FilterSchema, FilterValues } from '~ui/app/utils/Components/Filter/schema'

/**
 * Schema-driven filter bar: fuzzy search, a select and a toggle group, with the filtering
 * itself delegated to the bar's exposed `filter()`.
 */

interface Trace {
  id: string
  name: string
  model: string
  status: 'error' | 'ok' | 'pending'
  latency: number
}

const traces: Trace[] = Array.from({ length: 18 }, (_, i) => ({
  id: `tr_${(9481 + i).toString(16)}`,
  latency: 120 + ((i * 37) % 900),
  model: ['opus', 'sonnet', 'haiku'][i % 3] ?? 'opus',
  name: ['résumé document', 'extraction entités', 'classification ticket', 'génération réponse'][
    i % 4
  ]!,
  status: (['ok', 'ok', 'pending', 'error'] as const)[i % 4]!,
}))

const values = ref<FilterValues>({ model: [], search: '', status: [] })

const barRef = ref<{ filter: (items: readonly Trace[]) => Trace[] } | null>(null)

const schema = {
  model: {
    defaultValue: [] as string[],
    getValue: (item: Trace) => item.model,
    props: {
      options: [
        { title: 'Opus', value: 'opus' },
        { title: 'Sonnet', value: 'sonnet' },
        { title: 'Haiku', value: 'haiku' },
      ],
    },
    type: 'toggle-group',
  },
  search: {
    defaultValue: '',
    fuse: {
      fuseOptions: { keys: ['name', 'id'], threshold: 0.35, useTokenSearch: true },
      matchAllWhenSearchEmpty: true,
    },
    label: 'Rechercher',
    placeholder: 'Nom ou identifiant…',
    type: 'search',
  },
  status: {
    defaultValue: [] as string[],
    getValue: (item: Trace) => item.status,
    label: 'Statut',
    props: {
      items: [
        { label: 'OK', value: 'ok' },
        { label: 'En cours', value: 'pending' },
        { label: 'Erreur', value: 'error' },
      ],
      placeholder: 'Tous',
    },
    type: 'select',
  },
} satisfies FilterSchema<Trace>

const filtered = computed(() => barRef.value?.filter(traces) ?? traces)

const intentFor = (status: Trace['status']) =>
  status === 'error' ? 'error' : status === 'pending' ? 'warning' : 'success'
</script>

<template>
  <div class="flex flex-col gap-4">
    <UIFilterBar
      ref="barRef"
      v-model="values"
      :schema="schema"
      :layout="['search', ['status', 'model']]"
      size="sm"
      show-search-pending
    />

    <div class="flex items-baseline justify-between">
      <span class="txt-overline text-neutral-text-muted">Traces</span>
      <span class="txt-numeric txt-caption text-neutral-text-muted">
        {{ filtered.length }} / {{ traces.length }}
      </span>
    </div>

    <ul class="flex max-h-56 flex-col overflow-y-auto">
      <li
        v-for="trace in filtered"
        :key="trace.id"
        class="flex items-center gap-3 border-b border-neutral-border-subtle py-2 last:border-0"
      >
        <UIBadge
          :intent="intentFor(trace.status)"
          size="sm"
          variant="subtle"
          :label="trace.model"
        />
        <span class="txt-label min-w-0 flex-1 truncate text-neutral-text">{{ trace.name }}</span>
        <span class="txt-numeric txt-small text-neutral-text-muted">{{ trace.latency }}ms</span>
        <span class="txt-mono-small text-neutral-text-muted">{{ trace.id }}</span>
      </li>
      <li v-if="!filtered.length" class="txt-caption py-3 text-neutral-text-muted">
        Aucune trace ne correspond.
      </li>
    </ul>
  </div>
</template>
