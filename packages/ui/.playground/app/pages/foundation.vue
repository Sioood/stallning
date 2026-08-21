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

const auditFamily = ref<'accent' | 'error' | 'neutral' | 'primary'>('primary')
const auditFamilies = ['primary', 'neutral', 'accent', 'error'] as const

const typographyScale = [
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
  {
    className: 'txt-caption',
    label: 'caption',
    sample: 'Texte secondaire / meta',
    size: '0.75rem',
  },
  { className: 'txt-small', label: 'small', sample: 'Microcopy', size: '0.6875rem' },
] as const

const monoScale = [
  { className: 'txt-overline', label: 'txt-overline', sample: 'Section eyebrow' },
  { className: 'txt-mono-label', label: 'txt-mono-label', sample: 'req_8fa21c' },
  { className: 'txt-mono-caption', label: 'txt-mono-caption', sample: 'trace/observation' },
  { className: 'txt-mono-small', label: 'txt-mono-small', sample: '2026-08-21T15:04Z' },
  { className: 'txt-numeric', label: 'txt-numeric', sample: '1 284 · 99.97% · 12.4ms' },
] as const

const radiusSamples = [
  { className: 'rounded-xs', label: 'xs', note: '1px' },
  { className: 'rounded-sm', label: 'sm', note: '1px' },
  { className: 'rounded-md', label: 'md', note: '2px' },
  { className: 'rounded-lg', label: 'lg', note: '2px' },
  { className: 'rounded-xl', label: 'xl', note: '3px' },
  { className: 'rounded-full', label: 'full', note: 'pilules uniquement' },
] as const

const elevationSamples = [
  { className: 'shadow-xs', label: 'xs' },
  { className: 'shadow-sm', label: 'sm' },
  { className: 'shadow-md', label: 'md' },
  { className: 'shadow-lg', label: 'lg' },
  { className: 'shadow-xl', label: 'xl' },
] as const

const motionSamples = [
  { label: 'instant', token: '--duration-instant', value: '80ms' },
  { label: 'fast', token: '--duration-fast', value: '120ms' },
  { label: 'base', token: '--duration-base', value: '180ms' },
  { label: 'slow', token: '--duration-slow', value: '280ms' },
] as const

const spacingSamples = [1, 2, 3, 4, 5, 6, 8, 10, 12] as const

const animate = ref(false)
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
    <header class="mb-14 max-w-2xl">
      <p class="txt-overline mb-3 text-neutral-text-muted">Foundation</p>
      <h1 class="txt-h3 mb-4 text-neutral-text">Design tokens</h1>
      <p class="txt-base text-neutral-text-subtle">
        Palette papier chaud / noir doux, radius quasi nul, Pretendard pour l'interface et Spline
        Sans Mono pour les détails techniques. Chaque famille est résolue contre une même échelle de
        contraste : un palier donné porte le même ratio dans toutes les familles.
      </p>
    </header>

    <section class="mb-16">
      <h2 class="txt-h5 mb-2 text-neutral-text">Accessibilité</h2>
      <p class="txt-caption mb-6 text-neutral-text-subtle">
        Mesuré en direct sur le thème affiché — bascule le thème pour voir les deux.
      </p>
      <div class="mb-4 flex flex-wrap gap-2">
        <UIButton
          v-for="family in auditFamilies"
          :key="family"
          size="sm"
          :intent="auditFamily === family ? 'primary' : 'neutral'"
          :variant="auditFamily === family ? 'default' : 'subtle'"
          :text="family"
          @click="auditFamily = family"
        />
      </div>
      <ContrastAudit :family="auditFamily" />
    </section>

    <section class="mb-16">
      <h2 class="txt-h5 mb-2 text-neutral-text">Couleurs de base</h2>
      <p class="txt-caption mb-6 text-neutral-text-subtle">
        Semantic aliases · primary (encre), secondary, accent (acide)
      </p>
      <div class="flex flex-wrap gap-6 overflow-x-auto pb-2">
        <div v-for="color in baseColors" :key="color" class="flex flex-col gap-2">
          <p class="txt-mono-caption text-neutral-text-subtle">{{ color }}</p>
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
          <p class="txt-mono-caption text-neutral-text-subtle">{{ color }}</p>
          <ColorSwatch :color="color" type="semantic" />
        </div>
      </div>
    </section>

    <section class="mb-16">
      <h2 class="txt-h5 mb-2 text-neutral-text">Échelles brutes</h2>
      <p class="txt-caption mb-6 text-neutral-text-subtle">
        Générées par <code class="txt-mono-caption">scripts/gen-tokens.ts</code> — les paliers
        clairs dérivent vers la teinte papier, les paliers moyens et foncés restent sur la teinte de
        la famille.
      </p>
      <div class="flex flex-wrap gap-6 overflow-x-auto pb-2">
        <div v-for="color in primaryColors" :key="color" class="flex flex-col gap-2">
          <p class="txt-mono-caption text-neutral-text-subtle">{{ color }}</p>
          <ColorSwatch :color="color" type="primaries" />
        </div>
      </div>
    </section>

    <section class="mb-16">
      <h2 class="txt-h5 mb-2 text-neutral-text">Radius</h2>
      <p class="txt-caption mb-6 text-neutral-text-subtle">
        Quasi nul et uniforme : les contrôles se lisent comme des panneaux techniques.
        <code class="txt-mono-caption">rounded-full</code> reste réservé aux contrôles réellement
        ronds (avatar, radio, pouce d'interrupteur).
      </p>
      <div class="flex flex-wrap gap-6">
        <div
          v-for="sample in radiusSamples"
          :key="sample.label"
          class="flex w-32 flex-col items-center gap-3"
        >
          <div
            :class="[sample.className, 'size-20 border border-neutral-border bg-neutral-surface']"
          />
          <div class="text-center">
            <p class="txt-label text-neutral-text">{{ sample.label }}</p>
            <p class="txt-mono-caption text-neutral-text-muted">{{ sample.note }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-16">
      <h2 class="txt-h5 mb-2 text-neutral-text">Typographie</h2>
      <p class="txt-caption mb-6 text-neutral-text-subtle">
        Pretendard · <code class="txt-mono-caption">label</code> est la taille des contrôles,
        <code class="txt-mono-caption">base</code> celle de la prose.
      </p>
      <div class="flex flex-col gap-4 border border-neutral-border-subtle bg-neutral-surface p-6">
        <div
          v-for="item in typographyScale"
          :key="item.label"
          class="flex flex-col gap-1 border-b border-neutral-border-subtle pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-6"
        >
          <span class="txt-mono-caption w-28 shrink-0 text-neutral-text-muted">
            {{ item.label }}
          </span>
          <span class="txt-numeric txt-small w-20 shrink-0 text-neutral-text-muted">
            {{ item.size }}
          </span>
          <span :class="[item.className, 'min-w-0 truncate text-neutral-text']">
            {{ item.sample }}
          </span>
        </div>
      </div>
    </section>

    <section class="mb-16">
      <h2 class="txt-h5 mb-2 text-neutral-text">Registre monospace</h2>
      <p class="txt-caption mb-6 text-neutral-text-subtle">
        Spline Sans Mono porte les identifiants, mesures et libellés de colonne — le détail «
        instrument » du système.
      </p>
      <div class="flex flex-col gap-4 border border-neutral-border-subtle bg-neutral-surface p-6">
        <div
          v-for="item in monoScale"
          :key="item.label"
          class="flex flex-col gap-1 border-b border-neutral-border-subtle pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-6"
        >
          <span class="txt-mono-caption w-40 shrink-0 text-neutral-text-muted">
            {{ item.label }}
          </span>
          <span :class="[item.className, 'text-neutral-text']">{{ item.sample }}</span>
        </div>
        <div class="flex items-center gap-2 pt-2">
          <span class="txt-mono-caption w-40 shrink-0 text-neutral-text-muted">kbd</span>
          <span class="flex items-center gap-1.5">
            <kbd class="kbd">⌘</kbd>
            <kbd class="kbd">K</kbd>
            <span class="txt-caption ml-2 text-neutral-text-subtle">pour ouvrir la palette</span>
          </span>
        </div>
      </div>
    </section>

    <section class="mb-16">
      <h2 class="txt-h5 mb-2 text-neutral-text">Élévation</h2>
      <p class="txt-caption mb-6 text-neutral-text-subtle">
        Volontairement plate : le filet porte le contour, l'ombre ne fait qu'asseoir la couche.
        Teintée avec la teinte d'encre.
      </p>
      <div class="flex flex-wrap gap-6">
        <div
          v-for="sample in elevationSamples"
          :key="sample.label"
          class="flex w-28 flex-col items-center gap-3"
        >
          <div
            :class="[
              sample.className,
              'size-20 rounded-xs border border-neutral-border-subtle bg-neutral-bg-subtle',
            ]"
          />
          <p class="txt-mono-caption text-neutral-text-muted">{{ sample.label }}</p>
        </div>
      </div>
    </section>

    <section class="mb-16">
      <h2 class="txt-h5 mb-2 text-neutral-text">Mouvement</h2>
      <p class="txt-caption mb-6 text-neutral-text-subtle">
        Durées et courbes partagées — auparavant des littéraux dispersés dans les composants.
      </p>
      <UIButton
        size="sm"
        intent="neutral"
        variant="subtle"
        :text="animate ? 'Réinitialiser' : 'Lancer'"
        class="mb-6"
        @click="animate = !animate"
      />
      <div class="flex flex-col gap-3">
        <div v-for="sample in motionSamples" :key="sample.label" class="flex items-center gap-4">
          <span class="txt-mono-caption w-20 shrink-0 text-neutral-text-muted">
            {{ sample.label }}
          </span>
          <span class="txt-numeric txt-small w-14 shrink-0 text-neutral-text-muted">
            {{ sample.value }}
          </span>
          <div class="relative h-6 flex-1 border border-neutral-border-subtle bg-neutral-surface">
            <div
              class="absolute inset-y-0 w-6 bg-primary-fill"
              :style="{
                left: animate ? 'calc(100% - 1.5rem)' : '0px',
                transition: `left var(${sample.token}) var(--ease-out)`,
              }"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="mb-16">
      <h2 class="txt-h5 mb-2 text-neutral-text">Décors papier</h2>
      <p class="txt-caption mb-6 text-neutral-text-subtle">
        Hachure et filet pointillé, tous deux sensibles au thème.
      </p>
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

    <section>
      <h2 class="txt-h5 mb-2 text-neutral-text">Spacing</h2>
      <p class="txt-caption mb-6 text-neutral-text-subtle">
        Base <code class="txt-mono-caption">--spacing: 4px</code>
      </p>
      <div class="flex flex-wrap items-end gap-4">
        <div v-for="n in spacingSamples" :key="n" class="flex flex-col items-center gap-2">
          <div class="bg-primary-fill" :style="{ height: `${n * 4}px`, width: `${n * 4}px` }" />
          <span class="txt-numeric txt-small text-neutral-text-muted">{{ n }}</span>
        </div>
      </div>
    </section>
  </div>
</template>
