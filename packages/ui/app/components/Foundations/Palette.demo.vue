<script setup lang="ts">
/**
 * Role tokens per family, rendered as they resolve in the active theme.
 *
 * Every family is solved against one shared contrast ladder, so a given stop carries the
 * same contrast in every family. Switch the Storybook theme toolbar to see both mappings —
 * the dark theme deliberately re-pitches text and border roles rather than mirroring light.
 *
 * Class strings are written out in full: Tailwind cannot see interpolated names.
 */

const surfaces = [
  { label: 'bg', token: 'bg-primary-bg' },
  { label: 'bg-subtle', token: 'bg-primary-bg-subtle' },
  { label: 'surface', token: 'bg-primary-surface' },
  { label: 'surface-subtle', token: 'bg-primary-surface-subtle' },
] as const

const roles = [
  {
    fill: 'bg-primary-fill',
    fillSubtle: 'bg-primary-fill-subtle',
    label: 'primary',
    onFill: 'bg-primary-fill text-primary-on-fill',
    onFillSubtle: 'bg-primary-fill-subtle text-primary-on-fill-subtle',
    outline: 'border-primary-border text-primary-text',
    surface: 'bg-primary-surface',
  },
  {
    fill: 'bg-secondary-fill',
    fillSubtle: 'bg-secondary-fill-subtle',
    label: 'secondary',
    onFill: 'bg-secondary-fill text-secondary-on-fill',
    onFillSubtle: 'bg-secondary-fill-subtle text-secondary-on-fill-subtle',
    outline: 'border-secondary-border text-secondary-text',
    surface: 'bg-secondary-surface',
  },
  {
    fill: 'bg-accent-fill',
    fillSubtle: 'bg-accent-fill-subtle',
    label: 'accent',
    onFill: 'bg-accent-fill text-accent-on-fill',
    onFillSubtle: 'bg-accent-fill-subtle text-accent-on-fill-subtle',
    outline: 'border-accent-border text-accent-text',
    surface: 'bg-accent-surface',
  },
  {
    fill: 'bg-neutral-fill',
    fillSubtle: 'bg-neutral-fill-subtle',
    label: 'neutral',
    onFill: 'bg-neutral-fill text-neutral-on-fill',
    onFillSubtle: 'bg-neutral-fill-subtle text-neutral-on-fill-subtle',
    outline: 'border-neutral-border text-neutral-text',
    surface: 'bg-neutral-surface',
  },
  {
    fill: 'bg-info-fill',
    fillSubtle: 'bg-info-fill-subtle',
    label: 'info',
    onFill: 'bg-info-fill text-info-on-fill',
    onFillSubtle: 'bg-info-fill-subtle text-info-on-fill-subtle',
    outline: 'border-info-border text-info-text',
    surface: 'bg-info-surface',
  },
  {
    fill: 'bg-success-fill',
    fillSubtle: 'bg-success-fill-subtle',
    label: 'success',
    onFill: 'bg-success-fill text-success-on-fill',
    onFillSubtle: 'bg-success-fill-subtle text-success-on-fill-subtle',
    outline: 'border-success-border text-success-text',
    surface: 'bg-success-surface',
  },
  {
    fill: 'bg-warning-fill',
    fillSubtle: 'bg-warning-fill-subtle',
    label: 'warning',
    onFill: 'bg-warning-fill text-warning-on-fill',
    onFillSubtle: 'bg-warning-fill-subtle text-warning-on-fill-subtle',
    outline: 'border-warning-border text-warning-text',
    surface: 'bg-warning-surface',
  },
  {
    fill: 'bg-error-fill',
    fillSubtle: 'bg-error-fill-subtle',
    label: 'error',
    onFill: 'bg-error-fill text-error-on-fill',
    onFillSubtle: 'bg-error-fill-subtle text-error-on-fill-subtle',
    outline: 'border-error-border text-error-text',
    surface: 'bg-error-surface',
  },
] as const

const scales = [
  {
    label: 'primary',
    stops: [
      'bg-primary-50',
      'bg-primary-100',
      'bg-primary-200',
      'bg-primary-300',
      'bg-primary-400',
      'bg-primary-500',
      'bg-primary-600',
      'bg-primary-700',
      'bg-primary-800',
      'bg-primary-900',
      'bg-primary-950',
    ],
  },
  {
    label: 'secondary',
    stops: [
      'bg-secondary-50',
      'bg-secondary-100',
      'bg-secondary-200',
      'bg-secondary-300',
      'bg-secondary-400',
      'bg-secondary-500',
      'bg-secondary-600',
      'bg-secondary-700',
      'bg-secondary-800',
      'bg-secondary-900',
      'bg-secondary-950',
    ],
  },
  {
    label: 'accent',
    stops: [
      'bg-accent-50',
      'bg-accent-100',
      'bg-accent-200',
      'bg-accent-300',
      'bg-accent-400',
      'bg-accent-500',
      'bg-accent-600',
      'bg-accent-700',
      'bg-accent-800',
      'bg-accent-900',
      'bg-accent-950',
    ],
  },
  {
    label: 'neutral',
    stops: [
      'bg-neutral-50',
      'bg-neutral-100',
      'bg-neutral-200',
      'bg-neutral-300',
      'bg-neutral-400',
      'bg-neutral-500',
      'bg-neutral-600',
      'bg-neutral-700',
      'bg-neutral-800',
      'bg-neutral-900',
      'bg-neutral-950',
    ],
  },
  {
    label: 'info',
    stops: [
      'bg-info-50',
      'bg-info-100',
      'bg-info-200',
      'bg-info-300',
      'bg-info-400',
      'bg-info-500',
      'bg-info-600',
      'bg-info-700',
      'bg-info-800',
      'bg-info-900',
      'bg-info-950',
    ],
  },
  {
    label: 'success',
    stops: [
      'bg-success-50',
      'bg-success-100',
      'bg-success-200',
      'bg-success-300',
      'bg-success-400',
      'bg-success-500',
      'bg-success-600',
      'bg-success-700',
      'bg-success-800',
      'bg-success-900',
      'bg-success-950',
    ],
  },
  {
    label: 'warning',
    stops: [
      'bg-warning-50',
      'bg-warning-100',
      'bg-warning-200',
      'bg-warning-300',
      'bg-warning-400',
      'bg-warning-500',
      'bg-warning-600',
      'bg-warning-700',
      'bg-warning-800',
      'bg-warning-900',
      'bg-warning-950',
    ],
  },
  {
    label: 'error',
    stops: [
      'bg-error-50',
      'bg-error-100',
      'bg-error-200',
      'bg-error-300',
      'bg-error-400',
      'bg-error-500',
      'bg-error-600',
      'bg-error-700',
      'bg-error-800',
      'bg-error-900',
      'bg-error-950',
    ],
  },
] as const

const stopLabels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const
</script>

<template>
  <div class="flex flex-col gap-12 p-6">
    <section class="flex flex-col gap-4">
      <div>
        <p class="txt-overline mb-1 text-neutral-text-muted">Surfaces</p>
        <h3 class="txt-h5 text-neutral-text">Papier &amp; encre</h3>
      </div>
      <div class="grid gap-3 sm:grid-cols-4">
        <div
          v-for="surface in surfaces"
          :key="surface.label"
          class="flex flex-col gap-2 border border-neutral-border-subtle p-4"
          :class="surface.token"
        >
          <span class="txt-mono-caption text-neutral-text-muted">{{ surface.label }}</span>
          <span class="txt-label text-neutral-text">Texte principal</span>
          <span class="txt-caption text-neutral-text-subtle">Texte secondaire</span>
          <span class="txt-caption text-neutral-text-muted">Placeholder</span>
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <div>
        <p class="txt-overline mb-1 text-neutral-text-muted">Rôles</p>
        <h3 class="txt-h5 text-neutral-text">Par famille</h3>
      </div>
      <div class="flex flex-col gap-5">
        <div v-for="role in roles" :key="role.label" class="flex flex-col gap-2">
          <span class="txt-mono-caption text-neutral-text-muted">{{ role.label }}</span>
          <div class="flex flex-wrap items-stretch gap-2">
            <div class="flex min-w-28 flex-col border border-neutral-border-subtle">
              <div class="h-8" :class="role.fill" />
              <span class="txt-mono-small px-2 py-1 text-neutral-text-muted">fill</span>
            </div>
            <div class="flex min-w-28 flex-col border border-neutral-border-subtle">
              <div class="h-8" :class="role.fillSubtle" />
              <span class="txt-mono-small px-2 py-1 text-neutral-text-muted">fill-subtle</span>
            </div>
            <div class="flex min-w-28 flex-col border border-neutral-border-subtle">
              <div class="h-8" :class="role.surface" />
              <span class="txt-mono-small px-2 py-1 text-neutral-text-muted">surface</span>
            </div>
            <div class="flex min-w-32 items-center justify-center px-3" :class="role.onFill">
              <span class="txt-label">on-fill</span>
            </div>
            <div class="flex min-w-32 items-center justify-center px-3" :class="role.onFillSubtle">
              <span class="txt-label">on-fill-subtle</span>
            </div>
            <div class="flex min-w-32 items-center gap-2 border px-3" :class="role.outline">
              <span class="txt-mono-small">border</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <div>
        <p class="txt-overline mb-1 text-neutral-text-muted">Échelle</p>
        <h3 class="txt-h5 text-neutral-text">Paliers bruts</h3>
        <p class="txt-caption mt-1 text-neutral-text-subtle">
          Un même palier porte le même contraste dans toutes les familles.
        </p>
      </div>
      <div class="flex flex-col gap-1.5">
        <div v-for="scale in scales" :key="scale.label" class="flex items-center gap-3">
          <span class="txt-mono-caption w-20 shrink-0 text-neutral-text-muted">
            {{ scale.label }}
          </span>
          <div class="flex flex-1 overflow-hidden border border-neutral-border-subtle">
            <div v-for="token in scale.stops" :key="token" class="h-8 flex-1" :class="token" />
          </div>
        </div>
        <div class="mt-1 flex items-center gap-3">
          <span class="w-20 shrink-0" />
          <div class="flex flex-1">
            <span
              v-for="stop in stopLabels"
              :key="stop"
              class="txt-mono-small flex-1 text-center text-neutral-text-muted"
            >
              {{ stop }}
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
