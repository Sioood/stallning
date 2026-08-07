<script setup lang="ts">
const baseColors = ['primary', 'secondary', 'accent'] as const
const semanticColors = ['neutral', 'info', 'success', 'warning', 'error'] as const
const primaryColors = [
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'pink',
] as const

const typographyScale = [
  { className: 'txt-supertitle', label: 'Supertitle', sample: 'Aa' },
  { className: 'txt-title', label: 'Title', sample: 'Aa' },
  { className: 'txt-h1', label: 'H1', sample: 'Heading' },
  { className: 'txt-h2', label: 'H2', sample: 'Heading' },
  { className: 'txt-h3', label: 'H3', sample: 'Heading' },
  { className: 'txt-h4', label: 'H4', sample: 'Heading' },
  { className: 'txt-h5', label: 'H5', sample: 'Heading' },
  { className: 'txt-h6', label: 'H6', sample: 'Heading' },
  { className: 'txt-label', label: 'Label', sample: 'Interface label' },
  { className: 'txt-base', label: 'Base', sample: 'Corps de texte principal' },
  { className: 'txt-caption', label: 'Caption', sample: 'Texte secondaire / meta' },
  { className: 'txt-small', label: 'Small', sample: 'Microcopy' },
] as const

const radiusSamples = [
  { className: 'rounded-xs', label: 'xs', note: '0.125rem — défaut DS' },
  { className: 'rounded-sm', label: 'sm', note: '0.25rem' },
  { className: 'rounded-md', label: 'md', note: '0.375rem' },
  { className: 'rounded-lg', label: 'lg', note: '0.5rem' },
] as const

const spacingSamples = [1, 2, 3, 4, 5, 6, 8, 10, 12] as const
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
    <header class="mb-12 max-w-2xl">
      <p class="txt-caption mb-3 text-neutral-text-subtle">Foundation</p>
      <h1 class="txt-h3 mb-3 text-neutral-text">Design tokens</h1>
      <p class="txt-base text-neutral-text-subtle">
        Palette papier / cozy, radius très léger, typographie Inter. Les couleurs du design system
        restent inchangées — explorez les échelles et rôles sémantiques.
      </p>
    </header>

    <section class="mb-16">
      <h2 class="txt-h5 mb-2 text-neutral-text">Couleurs de base</h2>
      <p class="txt-caption mb-6 text-neutral-text-subtle">
        Semantic aliases · primary, secondary, accent
      </p>
      <div class="flex flex-wrap gap-6 overflow-x-auto pb-2">
        <div v-for="color in baseColors" :key="color" class="flex flex-col gap-2">
          <p class="txt-caption font-mono text-neutral-text-subtle">{{ color }}</p>
          <ColorSwatch :color="color" type="base" />
        </div>
      </div>
    </section>

    <section class="mb-16">
      <h2 class="txt-h5 mb-2 text-neutral-text">Couleurs sémantiques</h2>
      <p class="txt-caption mb-6 text-neutral-text-subtle">
        Feedback · neutral, info, success, warning, error
      </p>
      <div class="flex flex-wrap gap-6 overflow-x-auto pb-2">
        <div v-for="color in semanticColors" :key="color" class="flex flex-col gap-2">
          <p class="txt-caption font-mono text-neutral-text-subtle">{{ color }}</p>
          <ColorSwatch :color="color" type="semantic" />
        </div>
      </div>
    </section>

    <section class="mb-16">
      <h2 class="txt-h5 mb-2 text-neutral-text">Échelles primaires</h2>
      <p class="txt-caption mb-6 text-neutral-text-subtle">
        Raw chromatic circle · Paper-White (Rybitten)
      </p>
      <div class="flex flex-wrap gap-6 overflow-x-auto pb-2">
        <div v-for="color in primaryColors" :key="color" class="flex flex-col gap-2">
          <p class="txt-caption font-mono text-neutral-text-subtle">{{ color }}</p>
          <ColorSwatch :color="color" type="primaries" />
        </div>
      </div>
    </section>

    <section class="mb-16">
      <h2 class="txt-h5 mb-2 text-neutral-text">Radius</h2>
      <p class="txt-caption mb-6 text-neutral-text-subtle">
        Le design system privilégie <code class="font-mono">rounded-xs</code> (0.125rem) pour un
        look sharp et précis.
      </p>
      <div class="flex flex-wrap gap-6">
        <div
          v-for="sample in radiusSamples"
          :key="sample.label"
          class="flex w-36 flex-col items-center gap-3"
        >
          <div
            :class="[sample.className, 'size-20 border border-neutral-border bg-neutral-surface']"
          />
          <div class="text-center">
            <p class="txt-label text-neutral-text">{{ sample.label }}</p>
            <p class="txt-caption text-neutral-text-subtle">{{ sample.note }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-16">
      <h2 class="txt-h5 mb-2 text-neutral-text">Typographie</h2>
      <p class="txt-caption mb-6 text-neutral-text-subtle">
        Échelle <code class="font-mono">txt-*</code> · Inter
      </p>
      <div
        class="flex flex-col gap-4 rounded-xs border border-neutral-border-subtle bg-neutral-surface p-6"
      >
        <div
          v-for="item in typographyScale"
          :key="item.label"
          class="flex flex-col gap-1 border-b border-neutral-border-subtle pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-8"
        >
          <span class="txt-caption w-28 shrink-0 font-mono text-neutral-text-subtle">
            {{ item.label }}
          </span>
          <span :class="[item.className, 'text-neutral-text']">{{ item.sample }}</span>
        </div>
      </div>
    </section>

    <section>
      <h2 class="txt-h5 mb-2 text-neutral-text">Spacing</h2>
      <p class="txt-caption mb-6 text-neutral-text-subtle">
        Base <code class="font-mono">--spacing: 4px</code> · unités Tailwind
      </p>
      <div class="flex flex-wrap items-end gap-4">
        <div v-for="n in spacingSamples" :key="n" class="flex flex-col items-center gap-2">
          <div class="bg-primary-fill" :style="{ width: `${n * 4}px`, height: `${n * 4}px` }" />
          <span class="txt-caption font-mono text-neutral-text-subtle">{{ n }}</span>
        </div>
      </div>
    </section>
  </div>
</template>
