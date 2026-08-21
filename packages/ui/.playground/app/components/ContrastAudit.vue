<script setup lang="ts">
import { contrastRatio, gradeRatio, resolveToken } from '../utils/contrast'

/**
 * Live WCAG audit of the role tokens, measured from the rendered theme.
 *
 * The floors mirror `packages/ui/test/tokens/contrast.test.ts`, so this page and the
 * test suite cannot disagree: if a value regresses, both go red.
 */

const props = withDefaults(defineProps<{ family?: string }>(), { family: 'primary' })

const ROWS: { background: string; floor: number; foreground: string; label: string }[] = [
  { background: 'bg', floor: 7, foreground: 'text', label: 'Body text' },
  { background: 'bg', floor: 4.5, foreground: 'text-subtle', label: 'Secondary text' },
  { background: 'bg', floor: 4.5, foreground: 'text-muted', label: 'Placeholder / meta' },
  { background: 'surface', floor: 7, foreground: 'text', label: 'Body on surface' },
  { background: 'surface', floor: 4.5, foreground: 'text-muted', label: 'Meta on surface' },
  { background: 'bg', floor: 3, foreground: 'border', label: 'Control border' },
  { background: 'bg', floor: 3, foreground: 'icon-subtle', label: 'Subtle icon' },
  { background: 'fill', floor: 4.5, foreground: 'on-fill', label: 'Text on fill' },
  {
    background: 'fill-subtle',
    floor: 4.5,
    foreground: 'on-fill-subtle',
    label: 'Text on subtle fill',
  },
]

const results = ref<
  { grade: string; label: string; pair: string; passes: boolean; ratio: number; floor: number }[]
>([])

function measure() {
  results.value = ROWS.flatMap((row) => {
    const fgToken = `--color-${props.family}-${row.foreground}`
    const bgToken = `--color-${props.family}-${row.background}`
    const fg = resolveToken(fgToken)
    const bg = resolveToken(bgToken)
    if (!fg || !bg) return []

    const ratio = contrastRatio(fg, bg)
    return [
      {
        floor: row.floor,
        grade: gradeRatio(ratio),
        label: row.label,
        pair: `${row.foreground} on ${row.background}`,
        passes: ratio >= row.floor,
        ratio,
      },
    ]
  })
}

// Re-measure when the theme class flips so the numbers always match what is on screen.
onMounted(() => {
  measure()
  const observer = new MutationObserver(measure)
  observer.observe(document.documentElement, { attributeFilter: ['class'], attributes: true })
  onUnmounted(() => observer.disconnect())
})

watch(() => props.family, measure)

const failing = computed(() => results.value.filter((row) => !row.passes).length)
</script>

<template>
  <div class="border border-neutral-border-subtle">
    <div
      class="flex items-center justify-between gap-4 border-b border-neutral-border-subtle bg-neutral-surface px-4 py-2.5"
    >
      <span class="txt-overline text-neutral-text-subtle"
        >Contraste mesuré · {{ props.family }}</span
      >
      <UIBadge
        :intent="failing === 0 ? 'success' : 'error'"
        size="sm"
        :label="failing === 0 ? 'Tous les seuils respectés' : `${failing} échec(s)`"
      />
    </div>

    <table class="w-full">
      <thead>
        <tr>
          <th class="txt-overline px-4 py-2 text-left text-neutral-text-muted">Paire</th>
          <th class="txt-overline px-4 py-2 text-left text-neutral-text-muted">Tokens</th>
          <th class="txt-overline px-4 py-2 text-right text-neutral-text-muted">Ratio</th>
          <th class="txt-overline px-4 py-2 text-right text-neutral-text-muted">Seuil</th>
          <th class="txt-overline px-4 py-2 text-right text-neutral-text-muted">Note</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in results" :key="row.pair" class="border-t border-neutral-border-subtle">
          <td class="txt-label px-4 py-2.5 text-neutral-text">{{ row.label }}</td>
          <td class="txt-mono-caption px-4 py-2.5 text-neutral-text-muted">{{ row.pair }}</td>
          <td class="txt-numeric txt-caption px-4 py-2.5 text-right text-neutral-text">
            {{ row.ratio.toFixed(2) }}:1
          </td>
          <td class="txt-numeric txt-caption px-4 py-2.5 text-right text-neutral-text-muted">
            {{ row.floor.toFixed(1) }}
          </td>
          <td class="px-4 py-2.5 text-right">
            <UIBadge
              :intent="row.passes ? 'success' : 'error'"
              size="sm"
              variant="subtle"
              :label="row.passes ? row.grade : 'fail'"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
