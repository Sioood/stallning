<script setup lang="ts">
import { controlShellCVA } from '~ui/app/utils/Components/Form/variants'

const query = ref('')
const status = ref<string[]>([])
const filtersOpen = ref(false)
const showPremiumOnly = ref(false)

const statusItems = [
  { label: 'Tous', value: 'all' },
  { label: 'Actif', value: 'active' },
  { label: 'Archivé', value: 'archived' },
]

const allProjects = Array.from({ length: 24 }, (_, index) => ({
  id: index + 1,
  name: `Projet ${index + 1}`,
  status: index % 4 === 0 ? 'archived' : 'active',
  premium: index % 5 === 0,
}))

const selectedStatus = computed(() => status.value[0] ?? 'all')

const selectedStatusLabel = computed(
  () => statusItems.find((item) => item.value === selectedStatus.value)?.label ?? 'Tous',
)

const filteredProjects = computed(() => {
  const search = query.value.trim().toLowerCase()

  return allProjects.filter((project) => {
    if (search && !project.name.toLowerCase().includes(search)) return false
    if (selectedStatus.value === 'active' && project.status !== 'active') return false
    if (selectedStatus.value === 'archived' && project.status !== 'archived') return false
    if (showPremiumOnly.value && !project.premium) return false
    return true
  })
})

const activeFilterLabels = computed(() => {
  const labels: string[] = []
  if (selectedStatus.value !== 'all') labels.push(selectedStatusLabel.value)
  if (showPremiumOnly.value) labels.push('Premium')
  return labels
})

const selectUi = {
  positioner: '[--z-index:10050]',
  content: 'z-[10050]',
}

const addonTrailing = cn(
  controlShellCVA({ intent: 'primary', size: 'sm', invalid: false, disabled: false }),
  'txt-label inline-flex w-auto shrink-0 items-stretch rounded-l-none border-0',
)
</script>

<template>
  <div class="flex flex-col gap-3">
    <UIFormInput
      v-model="query"
      label="Rechercher"
      placeholder="Nom du projet…"
      helper-text="Recherche full-text sur les projets"
      size="sm"
    >
      <template #trailing>
        <span :class="addonTrailing">
          <UIPopover
            v-model:open="filtersOpen"
            class="contents"
            :close-on-interact-outside="false"
            :positioning="{ placement: 'bottom-end' }"
          >
            <template #trigger>
              <UIButton variant="subtle" intent="neutral" size="sm" text="Filtres" />
            </template>
            <template #content>
              <div class="flex min-w-48 flex-col gap-3">
                <p class="txt-label text-neutral-text-default">Filtres</p>
                <UIFormSelect
                  v-model="status"
                  label="Statut"
                  :items="statusItems"
                  placeholder="Choisir…"
                  size="sm"
                  :ui="selectUi"
                />
                <UISwitch v-model:checked="showPremiumOnly" label="Premium uniquement" size="sm" />
              </div>
            </template>
          </UIPopover>
        </span>
      </template>
    </UIFormInput>

    <div v-if="activeFilterLabels.length > 0" class="flex flex-wrap gap-1">
      <UIChip
        v-for="label in activeFilterLabels"
        :key="label"
        :label="label"
        size="sm"
        intent="neutral"
        :on-icon-action="false"
      />
    </div>

    <p class="txt-caption text-neutral-text-subtle">
      {{ filteredProjects.length }} résultat{{ filteredProjects.length > 1 ? 's' : '' }}
      <span v-if="selectedStatus !== 'all'"> · {{ selectedStatusLabel }}</span>
    </p>

    <ul v-if="filteredProjects.length > 0" class="flex max-h-40 flex-col gap-1 overflow-y-auto">
      <li
        v-for="project in filteredProjects"
        :key="project.id"
        class="flex items-center justify-between gap-2 border-b border-neutral-border-subtle py-1 txt-caption"
      >
        <span class="min-w-0 truncate text-neutral-text-default">{{ project.name }}</span>
        <div class="flex shrink-0 items-center gap-1">
          <UIBadge v-if="project.premium" intent="accent" label="Premium" size="sm" />
          <UIChip
            :label="project.status === 'active' ? 'Actif' : 'Archivé'"
            size="sm"
            :intent="project.status === 'active' ? 'primary' : 'neutral'"
            :on-icon-action="false"
          />
        </div>
      </li>
    </ul>

    <p v-else class="txt-caption text-neutral-text-subtle">
      Aucun projet ne correspond aux filtres.
    </p>
  </div>
</template>
