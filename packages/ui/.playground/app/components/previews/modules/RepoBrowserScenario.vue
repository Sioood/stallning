<script setup lang="ts">
import type { TreeViewItem } from '~ui/app/utils/Components/TreeView/context'

/** Selection tree — expanded state and selection driven from outside. */

const items: TreeViewItem[] = [
  {
    children: [
      { id: 'app/app.vue', label: 'app.vue' },
      { id: 'app/error.vue', label: 'error.vue' },
      {
        children: [
          { id: 'app/components/Button.vue', label: 'Button.vue' },
          { id: 'app/components/Badge.vue', label: 'Badge.vue' },
        ],
        id: 'app/components',
        label: 'components',
      },
    ],
    id: 'app',
    label: 'app',
  },
  {
    children: [
      { id: 'scripts/gen-tokens.ts', label: 'gen-tokens.ts' },
      { id: 'scripts/tokens.config.ts', label: 'tokens.config.ts' },
    ],
    id: 'scripts',
    label: 'scripts',
  },
]

const selected = ref<string[]>(['scripts/tokens.config.ts'])
</script>

<template>
  <div class="flex flex-col gap-3">
    <UITreeView
      v-model="selected"
      label="Fichiers du paquet"
      :items="items"
      :default-expanded-value="['app', 'scripts']"
    />
    <p class="txt-mono-caption text-neutral-text-muted">
      {{ selected[0] ?? 'aucune sélection' }}
    </p>
  </div>
</template>
