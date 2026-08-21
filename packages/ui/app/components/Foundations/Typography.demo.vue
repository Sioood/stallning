<script setup lang="ts">
/**
 * The `txt-*` ramp and the monospace register.
 *
 * `label` is the UI-control size and `base` is body prose. They were both 1rem with a
 * leading of 1 before, which flattened several component size ramps and set body copy solid.
 */

const scale = [
  { className: 'txt-supertitle', label: 'supertitle', sample: 'Aa', size: '5.25rem' },
  { className: 'txt-title', label: 'title', sample: 'Aa', size: '4.5rem' },
  { className: 'txt-h1', label: 'h1', sample: 'Heading', size: '3.75rem' },
  { className: 'txt-h2', label: 'h2', sample: 'Heading', size: '3rem' },
  { className: 'txt-h3', label: 'h3', sample: 'Heading', size: '2.5rem' },
  { className: 'txt-h4', label: 'h4', sample: 'Heading', size: '2rem' },
  { className: 'txt-h5', label: 'h5', sample: 'Heading', size: '1.5rem' },
  { className: 'txt-h6', label: 'h6', sample: 'Heading', size: '1.25rem' },
  { className: 'txt-base', label: 'base', sample: 'Corps de texte — prose', size: '1rem' },
  { className: 'txt-label', label: 'label', sample: 'Libellé de contrôle', size: '0.875rem' },
  { className: 'txt-caption', label: 'caption', sample: 'Texte secondaire', size: '0.75rem' },
  { className: 'txt-small', label: 'small', sample: 'Microcopy', size: '0.6875rem' },
] as const

const mono = [
  { className: 'txt-overline', label: 'txt-overline', sample: 'Section eyebrow' },
  { className: 'txt-mono-label', label: 'txt-mono-label', sample: 'req_8fa21c' },
  { className: 'txt-mono-caption', label: 'txt-mono-caption', sample: 'trace/observation' },
  { className: 'txt-mono-small', label: 'txt-mono-small', sample: '2026-08-21T15:04Z' },
  { className: 'txt-numeric', label: 'txt-numeric', sample: '1 284 · 99.97% · 12.4ms' },
] as const
</script>

<template>
  <div class="flex flex-col gap-12 p-6">
    <section class="flex flex-col gap-4">
      <div>
        <p class="txt-overline mb-1 text-neutral-text-muted">Pretendard</p>
        <h3 class="txt-h5 text-neutral-text">Échelle typographique</h3>
      </div>
      <div class="flex flex-col gap-4 border border-neutral-border-subtle bg-neutral-surface p-6">
        <div
          v-for="item in scale"
          :key="item.label"
          class="flex flex-col gap-1 border-b border-neutral-border-subtle pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-6"
        >
          <span class="txt-mono-caption w-28 shrink-0 text-neutral-text-muted">
            {{ item.label }}
          </span>
          <span class="txt-numeric txt-small w-20 shrink-0 text-neutral-text-muted">
            {{ item.size }}
          </span>
          <span :class="item.className" class="min-w-0 truncate text-neutral-text">
            {{ item.sample }}
          </span>
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <div>
        <p class="txt-overline mb-1 text-neutral-text-muted">Spline Sans Mono</p>
        <h3 class="txt-h5 text-neutral-text">Registre monospace</h3>
        <p class="txt-caption mt-1 text-neutral-text-subtle">
          Identifiants, mesures et libellés de colonne — le détail « instrument » du système.
        </p>
      </div>
      <div class="flex flex-col gap-4 border border-neutral-border-subtle bg-neutral-surface p-6">
        <div
          v-for="item in mono"
          :key="item.label"
          class="flex flex-col gap-1 border-b border-neutral-border-subtle pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-6"
        >
          <span class="txt-mono-caption w-40 shrink-0 text-neutral-text-muted">
            {{ item.label }}
          </span>
          <span :class="item.className" class="text-neutral-text">{{ item.sample }}</span>
        </div>
        <div class="flex items-center gap-2 pt-2">
          <span class="txt-mono-caption w-40 shrink-0 text-neutral-text-muted">kbd</span>
          <span class="flex items-center gap-1.5">
            <kbd class="kbd">⌘</kbd>
            <kbd class="kbd">K</kbd>
            <span class="txt-caption ml-2 text-neutral-text-subtle">ouvrir la palette</span>
          </span>
        </div>
      </div>
    </section>
  </div>
</template>
