/**
 * Contrast floors for the generated colour system.
 *
 * These assertions are the reason the palette can be re-tuned safely: any value or
 * role-mapping edit that pushes a text/surface pair below its WCAG floor fails here
 * instead of shipping. The previous palette violated two of them — `text-muted` sat at
 * 3.45:1 on the light canvas (placeholders) and `border` at 1.48:1.
 */

import { describe, expect, it } from 'vitest'

import { contrastRatio } from '../../scripts/color.ts'
import { resolveRoles, ROLE_FAMILIES } from '../../scripts/palette.ts'

const THEMES = ['light', 'dark'] as const

/** Every surface a component may place text on, per theme. */
const SURFACE_ROLES = ['bg', 'bg-subtle', 'surface', 'surface-subtle'] as const

/**
 * WCAG floors. 4.5 = AA body text, 3.0 = AA non-text UI (1.4.11), 7.0 = AAA.
 *
 * `border-subtle` is deliberately absent: it is the decorative hairline that separates
 * panels and menu items (Langfuse's equivalent sits near 1.3:1), not a boundary needed
 * to identify a control. Components that need an identifiable control edge use `border`,
 * which is held to 3.0 here.
 */
const TEXT_FLOORS = {
  text: 7,
  'text-subtle': 4.5,
  'text-muted': 4.5,
  icon: 3,
  'icon-subtle': 3,
  border: 3,
} as const

/** Foreground/background pairs that must hold regardless of the surface underneath. */
const PAIR_FLOORS = [
  { background: 'bg', floor: 1.14, foreground: 'border-subtle' },
  { background: 'fill', floor: 4.5, foreground: 'on-fill' },
  { background: 'fill-subtle', floor: 4.5, foreground: 'on-fill-subtle' },
  { background: 'surface-inverse', floor: 4.5, foreground: 'text-inverse' },
] as const

const families = ROLE_FAMILIES.map((entry) => entry.name)

describe.each(THEMES)('%s theme', (theme) => {
  const roles = resolveRoles(theme)

  describe.each(families)('%s', (family) => {
    it.each(Object.entries(TEXT_FLOORS))('%s clears its floor on every surface', (role, floor) => {
      for (const surface of SURFACE_ROLES) {
        const ratio = contrastRatio(roles[family]![role]!.value, roles[family]![surface]!.value)
        expect(
          ratio,
          `${family}-${role} (stop ${roles[family]![role]!.stop}) on ${family}-${surface} (stop ${roles[family]![surface]!.stop}) = ${ratio.toFixed(2)}:1`,
        ).toBeGreaterThanOrEqual(floor)
      }
    })

    it.each(PAIR_FLOORS)(
      '$foreground on $background clears $floor',
      ({ background, floor, foreground }) => {
        const ratio = contrastRatio(
          roles[family]![foreground]!.value,
          roles[family]![background]!.value,
        )
        expect(
          ratio,
          `${family}-${foreground} on ${family}-${background} = ${ratio.toFixed(2)}:1`,
        ).toBeGreaterThanOrEqual(floor)
      },
    )
  })
})
