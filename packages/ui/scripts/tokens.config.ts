/**
 * Single source of truth for the `@stallning/ui` colour system.
 *
 * Every family is solved against ONE contrast ladder, so a given stop carries the
 * same contrast in every family — that is what makes the palette read as one
 * system rather than as eight unrelated ramps. `gen-tokens.ts` consumes this and
 * writes the `@generated` regions of `app/assets/css/main.css`.
 */

export interface HslColor {
  hue: number
  lightness: number
  sat: number
}

/** Paper hue. Light stops drift toward it so tints read as tinted paper, not washed-out colour. */
export const PAPER_HUE = 48

/** The light canvas: `--color-gray-100`, i.e. `primary-bg`. Everything is solved against it. */
export const CANVAS = { hue: PAPER_HUE, lightness: 95, sat: 24 } as const satisfies HslColor

/**
 * Target contrast ratio of each stop against `CANVAS`.
 *
 * Floors that drive these numbers (see `test/tokens/contrast.test.ts`):
 *   500 → light `text-muted` / placeholders   ≥ 4.5  (WCAG 1.4.3 AA)
 *   600 → light `text-subtle`                 ≥ 4.5, aiming AAA
 *   700 → light `border` / `icon`              ≥ 3.0  (WCAG 1.4.11)
 *   900 → light `text`                        ≥ 7.0  (AAA)
 *   400 → dark `text-muted` / `border`         ≥ 4.5 / 3.0
 *
 * Stops are pitched above their floor so they also clear it against the *raised*
 * surface, not just the canvas. Stop 800 is pitched dark enough to keep the dark
 * theme's three surface tiers (950 page → 900 raised → 800 elevated) distinct.
 */
export const LADDER = {
  200: 1.1,
  300: 1.45,
  400: 2.8,
  500: 5.05,
  600: 7.0,
  700: 9.5,
  800: 13.0,
  900: 15.0,
  950: 17.5,
} as const

/** Stops above the canvas cannot be solved by contrast; they are pinned. */
export const PINNED_LIGHTNESS = { 50: 97.5, 100: 95 } as const

/**
 * Hard cap on hue movement, in degrees. Without it, drifting blue (216°) or purple
 * (262°) toward the paper hue passes through green and magenta.
 */
export const MAX_HUE_DRIFT_DEG = 10

/** How strongly each stop pulls toward `PAPER_HUE` (0 = family hue, 1 = paper hue). */
export const HUE_DRIFT = {
  50: 0.85,
  100: 0.7,
  200: 0.5,
  300: 0.28,
  400: 0,
  500: 0,
  600: 0,
  700: 0,
  800: 0.02,
  900: 0.04,
  950: 0.06,
} as const

export const STOPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

/**
 * Raw palettes. `hue` is the family's true hue at mid stops; `sat` is per stop.
 * Names kept from the previous palette so the comments stay meaningful.
 */
export const PALETTES = {
  blue: {
    hue: 216,
    label: 'heavenlysky',
    sat: {
      50: 44,
      100: 45,
      200: 46,
      300: 48,
      400: 44,
      500: 40,
      600: 44,
      700: 44,
      800: 40,
      900: 34,
      950: 26,
    },
  },
  gray: {
    hue: PAPER_HUE,
    label: 'paper → ink',
    sat: {
      50: 30,
      100: 24,
      200: 17,
      300: 13,
      400: 10,
      500: 8,
      600: 9,
      700: 10,
      800: 10,
      900: 11,
      950: 12,
    },
  },
  green: {
    hue: 128,
    label: 'mosslands',
    sat: {
      50: 36,
      100: 37,
      200: 38,
      300: 40,
      400: 36,
      500: 34,
      600: 36,
      700: 36,
      800: 34,
      900: 30,
      950: 24,
    },
  },
  orange: {
    hue: 28,
    label: 'cinnamon',
    sat: {
      50: 66,
      100: 68,
      200: 70,
      300: 74,
      400: 70,
      500: 72,
      600: 78,
      700: 76,
      800: 66,
      900: 54,
      950: 40,
    },
  },
  pink: {
    hue: 334,
    label: 'firstlove',
    sat: {
      50: 50,
      100: 52,
      200: 54,
      300: 58,
      400: 54,
      500: 50,
      600: 52,
      700: 50,
      800: 44,
      900: 36,
      950: 28,
    },
  },
  purple: {
    hue: 262,
    label: 'aster',
    sat: {
      50: 44,
      100: 45,
      200: 46,
      300: 50,
      400: 46,
      500: 42,
      600: 44,
      700: 44,
      800: 40,
      900: 34,
      950: 26,
    },
  },
  red: {
    hue: 8,
    label: 'firebug',
    sat: {
      50: 60,
      100: 60,
      200: 62,
      300: 66,
      400: 62,
      500: 60,
      600: 62,
      700: 60,
      800: 52,
      900: 44,
      950: 34,
    },
  },
  yellow: {
    // Golden yellow (not chartreuse): hue 62 read as olive once the contrast solver
    // darkens luminous yellows; slightly lower sat at 300 keeps tints aligned with other families.
    hue: 50,
    label: 'sun',
    sat: {
      50: 72,
      100: 76,
      200: 82,
      300: 68,
      400: 78,
      500: 72,
      600: 74,
      700: 76,
      800: 72,
      900: 66,
      950: 58,
    },
  },
} as const

/** Layer 2 · semantic alias → palette. Order drives emission order. */
export const ALIASES = [
  { group: 'BASE', name: 'primary', note: 'primary = neutral (gray)', palette: 'gray' },
  { name: 'secondary', note: 'secondary = purple', palette: 'purple' },
  { name: 'accent', note: 'accent = yellow (sun)', palette: 'yellow' },
  { group: 'FEEDBACK', name: 'error', note: 'error = red', palette: 'red' },
  { name: 'warning', note: 'warning = orange', palette: 'orange' },
  { name: 'info', note: 'info = blue', palette: 'blue' },
  { name: 'success', note: 'success = green', palette: 'green' },
  { group: 'NEUTRAL', name: 'neutral', note: 'neutral = gray', palette: 'gray' },
] as const

/** Families that receive Layer 3 role tokens, in emission (alphabetical) order. */
export const ROLE_FAMILIES = [
  { name: 'accent', palette: 'yellow' },
  { name: 'blue', palette: 'blue' },
  { name: 'error', palette: 'red' },
  { name: 'gray', palette: 'gray' },
  { name: 'green', palette: 'green' },
  { name: 'info', palette: 'blue' },
  { name: 'neutral', palette: 'neutral' },
  { name: 'orange', palette: 'orange' },
  { name: 'pink', palette: 'pink' },
  { name: 'primary', palette: 'neutral' },
  { name: 'purple', palette: 'purple' },
  { name: 'red', palette: 'red' },
  { name: 'secondary', palette: 'purple' },
  { name: 'success', palette: 'green' },
  { name: 'warning', palette: 'orange' },
  { name: 'yellow', palette: 'yellow' },
] as const

/**
 * Layer 3 · role → stop.
 *
 * `dark` is NOT a mirror of `light`. Reusing the light mapping inverted is exactly
 * why `text-muted` failed AA in dark mode, so text/border roles are re-pitched:
 * text 100→50, text-subtle 400→300, text-muted 500→400, border/icon-subtle 500→400.
 *
 * Moving dark `border` off 500 is what decouples the two themes: light `text-muted`
 * pulls stop 500 darker while dark `border` pulls it lighter, and one stop cannot
 * satisfy both.
 */
export const ROLE_MAP = {
  dark: {
    bg: 900,
    'bg-inverse': 100,
    'bg-subtle': 950,
    border: 400,
    'border-active': 600,
    'border-hover': 700,
    'border-inverse': 500,
    'border-strong': 400,
    'border-strong-active': 200,
    'border-strong-hover': 300,
    'border-subtle': 800,
    'border-subtle-active': 500,
    'border-subtle-hover': 600,
    fill: 600,
    'fill-active': 400,
    'fill-hover': 500,
    'fill-inverse': 400,
    'fill-subtle': 700,
    'fill-subtle-active': 500,
    'fill-subtle-hover': 600,
    icon: 300,
    'icon-disabled': 700,
    'icon-inverse': 800,
    'icon-subtle': 400,
    'on-fill': 100,
    'on-fill-subtle': 100,
    surface: 800,
    'surface-inverse': 200,
    'surface-subtle': 900,
    text: 50,
    'text-disabled': 700,
    'text-inverse': 900,
    'text-muted': 400,
    'text-subtle': 300,
  },
  light: {
    bg: 100,
    'bg-inverse': 900,
    'bg-subtle': 50,
    border: 700,
    'border-active': 600,
    'border-hover': 500,
    'border-inverse': 300,
    'border-strong': 800,
    'border-strong-active': 950,
    'border-strong-hover': 900,
    'border-subtle': 400,
    'border-subtle-active': 500,
    'border-subtle-hover': 400,
    fill: 600,
    'fill-active': 800,
    'fill-hover': 700,
    'fill-inverse': 400,
    'fill-subtle': 300,
    'fill-subtle-active': 500,
    'fill-subtle-hover': 400,
    icon: 700,
    'icon-disabled': 300,
    'icon-inverse': 200,
    'icon-subtle': 500,
    'on-fill': 100,
    'on-fill-subtle': 900,
    surface: 200,
    'surface-inverse': 800,
    'surface-subtle': 100,
    text: 900,
    'text-disabled': 300,
    'text-inverse': 100,
    'text-muted': 500,
    'text-subtle': 600,
  },
} as const

/**
 * `primary` is the ink-first intent: its fill is near-black on paper and
 * near-white on false-black, rather than the family's mid stop.
 */
export const PRIMARY_OVERRIDES = {
  dark: {
    border: 50,
    'border-active': 200,
    'border-hover': 100,
    fill: 50,
    'fill-active': 300,
    'fill-hover': 200,
    'on-fill': 950,
  },
  light: {
    border: 950,
    'border-active': 800,
    'border-hover': 900,
    fill: 900,
    'fill-active': 700,
    'fill-hover': 800,
  },
} as const

/**
 * Yellow is more luminous than other hues at the same HSL lightness, so the shared
 * ladder pins `fill-subtle` darker than it reads for orange/purple. Stop 600 keeps
 * dark chips visibly golden while `on-fill-subtle` still clears its WCAG floor.
 */
export const YELLOW_OVERRIDES = {
  dark: {
    'fill-subtle': 600,
  },
} as const

export type Stop = (typeof STOPS)[number]
export type Theme = keyof typeof ROLE_MAP
export type PaletteName = keyof typeof PALETTES
type RoleName = keyof (typeof ROLE_MAP)['dark']
export type RoleOverrides = Partial<Record<RoleName, Stop>>
