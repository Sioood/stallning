<script setup lang="ts">
import type { TreeViewItem } from '~ui/app/utils/Components/TreeView/context'

/** The checkbox flavour of the tree — parents reflect an indeterminate child state. */

const items: TreeViewItem[] = [
  {
    children: [
      { id: 'read', label: 'Lecture' },
      { id: 'write', label: 'Écriture' },
      { id: 'delete', label: 'Suppression' },
    ],
    id: 'content',
    label: 'Contenu',
  },
  {
    children: [
      { id: 'members', label: 'Membres' },
      { id: 'billing', label: 'Facturation' },
    ],
    id: 'admin',
    label: 'Administration',
  },
]

const checked = ref({ checked: ['read'], indeterminate: [] as string[] })
</script>

<template>
  <div class="flex flex-col gap-3">
    <UIFormTreeView
      v-model="checked"
      label="Permissions du rôle"
      :items="items"
      :default-expanded-value="['content', 'admin']"
    />
    <p class="txt-mono-caption text-neutral-text-muted">
      {{ checked.checked.length }} permission(s) accordée(s)
    </p>
  </div>
</template>
