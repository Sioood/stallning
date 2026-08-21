/** Resolves `tokens.config.ts` into concrete HSL values. Shared by the generator and tests. */

import { mixHueCapped, solveLightness, type HslColor as ResolvedHslColor } from './color.ts'
import {
  ALIASES,
  CANVAS,
  HUE_DRIFT,
  LADDER,
  MAX_HUE_DRIFT_DEG,
  PAPER_HUE,
  PALETTES,
  PINNED_LIGHTNESS,
  PRIMARY_OVERRIDES,
  ROLE_FAMILIES,
  ROLE_MAP,
  STOPS,
  YELLOW_OVERRIDES,
  type PaletteName,
  type RoleOverrides,
  type Stop,
  type Theme,
} from './tokens.config.ts'

type ResolvedPalette = Record<Stop, ResolvedHslColor>
type ResolvedPalettes = Record<PaletteName, ResolvedPalette>

interface ResolvedRole {
  palette: string
  stop: Stop
  value: ResolvedHslColor
}

type ResolvedRoles = Record<string, Record<string, ResolvedRole>>

export function resolvePalettes(): ResolvedPalettes {
  const out = {} as ResolvedPalettes
  for (const [name, spec] of Object.entries(PALETTES) as Array<
    [PaletteName, (typeof PALETTES)[PaletteName]]
  >) {
    out[name] = {} as ResolvedPalette
    for (const stop of STOPS) {
      const sat = spec.sat[stop]
      const hue = mixHueCapped(spec.hue, PAPER_HUE, {
        maxDegrees: MAX_HUE_DRIFT_DEG,
        weight: HUE_DRIFT[stop],
      })
      const lightness =
        PINNED_LIGHTNESS[stop as keyof typeof PINNED_LIGHTNESS] ??
        solveLightness({ hue, reference: CANVAS, sat, target: LADDER[stop] })
      out[name][stop] = { hue, lightness, sat }
    }
  }
  return out
}

/** Alias name → palette name, including the Layer 2 aliases that role families point at. */
function paletteOf(family: string): PaletteName {
  const alias = ALIASES.find((entry) => entry.name === family)
  if (alias) return alias.palette
  if (family in PALETTES) return family as PaletteName
  throw new Error(`Unknown colour family: ${family}`)
}

export function roleOverrides(name: string, theme: Theme): RoleOverrides | undefined {
  if (name === 'primary') return PRIMARY_OVERRIDES[theme]
  if (name === 'accent' || name === 'yellow') return YELLOW_OVERRIDES[theme]
  return undefined
}

/** Resolves every Layer 3 role token for one theme. */
export function resolveRoles(theme: Theme): ResolvedRoles {
  const palettes = resolvePalettes()
  const base = ROLE_MAP[theme]
  const out: ResolvedRoles = {}
  for (const { name, palette } of ROLE_FAMILIES) {
    const overrides = roleOverrides(name, theme) ?? {}
    const map = { ...base, ...overrides }
    const resolved = paletteOf(palette)
    out[name] = {}
    for (const [role, stop] of Object.entries(map) as Array<[string, Stop]>) {
      out[name]![role] = { palette, stop, value: palettes[resolved][stop] }
    }
  }
  return out
}

export { ROLE_FAMILIES }
