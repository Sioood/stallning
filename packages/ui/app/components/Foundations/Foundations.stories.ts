import { createGalleryStory } from '~/utils/storybook'

import PaletteDemo from './Palette.demo.vue'
import SurfaceDemo from './Surface.demo.vue'
import TypographyDemo from './Typography.demo.vue'

import type { Meta } from '@storybook/vue3'

/**
 * Browsable reference for the design tokens.
 *
 * Values come from `scripts/tokens.config.ts` via `scripts/gen-tokens.ts`; the contrast
 * floors these palettes satisfy are asserted in `test/tokens/contrast.test.ts`. Use the
 * theme toolbar to compare light and dark — the dark role mapping is not a mirror.
 */
const meta = {
  component: PaletteDemo,
  parameters: {
    controls: { disable: true },
  },
  tags: ['autodocs'],
  title: 'Foundations/Tokens',
} satisfies Meta<typeof PaletteDemo>

export default meta

/** Surfaces, role tokens per family, and the raw stop scale. */
export const Palette = createGalleryStory<typeof meta>(PaletteDemo)

/** The `txt-*` ramp plus the monospace register. */
export const Typography = createGalleryStory<typeof meta>(TypographyDemo)

/** Radius, elevation, motion and the paper decorations. */
export const Surfaces = createGalleryStory<typeof meta>(SurfaceDemo)
