<script setup lang="ts">
/** Radius, elevation, motion and the paper decorations. */

const radius = [
  { className: 'rounded-xs', label: 'xs', note: '1px' },
  { className: 'rounded-sm', label: 'sm', note: '1px' },
  { className: 'rounded-md', label: 'md', note: '2px' },
  { className: 'rounded-lg', label: 'lg', note: '2px' },
  { className: 'rounded-xl', label: 'xl', note: '3px' },
  { className: 'rounded-full', label: 'full', note: 'pilules' },
] as const

const elevation = [
  { className: 'shadow-xs', label: 'xs' },
  { className: 'shadow-sm', label: 'sm' },
  { className: 'shadow-md', label: 'md' },
  { className: 'shadow-lg', label: 'lg' },
  { className: 'shadow-xl', label: 'xl' },
] as const

const motion = [
  { label: 'instant', token: '--duration-instant', value: '80ms' },
  { label: 'fast', token: '--duration-fast', value: '120ms' },
  { label: 'base', token: '--duration-base', value: '180ms' },
  { label: 'slow', token: '--duration-slow', value: '280ms' },
] as const

const animate = ref(false)
</script>

<template>
  <div class="flex flex-col gap-12 p-6">
    <section class="flex flex-col gap-4">
      <div>
        <p class="txt-overline mb-1 text-neutral-text-muted">Radius</p>
        <h3 class="txt-h5 text-neutral-text">Quasi nul, uniforme</h3>
        <p class="txt-caption mt-1 text-neutral-text-subtle">
          Les contrôles se lisent comme des panneaux techniques.
          <code class="txt-mono-caption">rounded-full</code> reste réservé aux contrôles ronds.
        </p>
      </div>
      <div class="flex flex-wrap gap-6">
        <div v-for="item in radius" :key="item.label" class="flex w-28 flex-col items-center gap-3">
          <div
            class="size-20 border border-neutral-border bg-neutral-surface"
            :class="item.className"
          />
          <div class="text-center">
            <p class="txt-label text-neutral-text">{{ item.label }}</p>
            <p class="txt-mono-caption text-neutral-text-muted">{{ item.note }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <div>
        <p class="txt-overline mb-1 text-neutral-text-muted">Élévation</p>
        <h3 class="txt-h5 text-neutral-text">Plate par choix</h3>
        <p class="txt-caption mt-1 text-neutral-text-subtle">
          Le filet porte le contour, l'ombre ne fait qu'asseoir la couche.
        </p>
      </div>
      <div class="flex flex-wrap gap-6">
        <div
          v-for="item in elevation"
          :key="item.label"
          class="flex w-28 flex-col items-center gap-3"
        >
          <div
            class="size-20 rounded-xs border border-neutral-border-subtle bg-neutral-bg-subtle"
            :class="item.className"
          />
          <p class="txt-mono-caption text-neutral-text-muted">{{ item.label }}</p>
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <div>
        <p class="txt-overline mb-1 text-neutral-text-muted">Mouvement</p>
        <h3 class="txt-h5 text-neutral-text">Durées partagées</h3>
      </div>
      <UIButton
        size="sm"
        intent="neutral"
        variant="subtle"
        :text="animate ? 'Réinitialiser' : 'Lancer'"
        class="w-fit"
        @click="animate = !animate"
      />
      <div class="flex flex-col gap-3">
        <div v-for="item in motion" :key="item.label" class="flex items-center gap-4">
          <span class="txt-mono-caption w-20 shrink-0 text-neutral-text-muted">
            {{ item.label }}
          </span>
          <span class="txt-numeric txt-small w-14 shrink-0 text-neutral-text-muted">
            {{ item.value }}
          </span>
          <div class="relative h-6 flex-1 border border-neutral-border-subtle bg-neutral-surface">
            <div
              class="absolute inset-y-0 w-6 bg-primary-fill"
              :style="{
                left: animate ? 'calc(100% - 1.5rem)' : '0px',
                transition: `left var(${item.token}) var(--ease-out)`,
              }"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <div>
        <p class="txt-overline mb-1 text-neutral-text-muted">Décors</p>
        <h3 class="txt-h5 text-neutral-text">Papier</h3>
      </div>
      <div class="grid gap-6 sm:grid-cols-2">
        <div class="h-28 border border-neutral-border-subtle stripe-hatch" />
        <div
          class="flex h-28 flex-col justify-center gap-4 border border-neutral-border-subtle px-6"
        >
          <div class="divider-dashed" />
          <span class="txt-mono-caption text-neutral-text-muted">divider-dashed</span>
          <div class="divider-dashed" />
        </div>
      </div>
    </section>
  </div>
</template>
