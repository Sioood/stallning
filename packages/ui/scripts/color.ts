/** Colour maths shared by the token generator and the contrast test. */

interface HslColor {
  hue: number
  lightness: number
  sat: number
}

/** @returns sRGB channels in 0..255 */
function hslToRgb(hue: number, sat: number, lightness: number): [number, number, number] {
  const h = ((hue % 360) + 360) % 360
  const s = sat / 100
  const l = lightness / 100
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  const sector = Math.floor(h / 60) % 6
  const table: Array<[number, number, number]> = [
    [c, x, 0],
    [x, c, 0],
    [0, c, x],
    [0, x, c],
    [x, 0, c],
    [c, 0, x],
  ]
  const [r, g, b] = table[sector]!
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255]
}

function channelLuminance(channel: number): number {
  const c = channel / 255
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

/** WCAG 2.x relative luminance. */
function relativeLuminance(hue: number, sat: number, lightness: number): number {
  const [r, g, b] = hslToRgb(hue, sat, lightness).map(channelLuminance)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** WCAG 2.x contrast ratio between two HSL triples. */
export function contrastRatio(a: HslColor, b: HslColor): number {
  const la = relativeLuminance(a.hue, a.sat, a.lightness)
  const lb = relativeLuminance(b.hue, b.sat, b.lightness)
  const [hi, lo] = la > lb ? [la, lb] : [lb, la]
  return (hi + 0.05) / (lo + 0.05)
}

/**
 * Binary-search the lightness at which `{hue, sat}` hits `target` contrast
 * against `reference`. Searches only below the reference's lightness, so the
 * result is always the darker of the two solutions.
 */
export function solveLightness({
  hue,
  reference,
  sat,
  target,
}: {
  hue: number
  reference: HslColor
  sat: number
  target: number
}): number {
  let lo = 0
  let hi = reference.lightness
  for (let i = 0; i < 60; i += 1) {
    const mid = (lo + hi) / 2
    if (contrastRatio({ hue, lightness: mid, sat }, reference) < target) hi = mid
    else lo = mid
  }
  return Math.round(((lo + hi) / 2) * 10) / 10
}

/**
 * Hue interpolation capped to `maxDegrees` of movement.
 *
 * An uncapped drift toward the paper hue corrupts far hues — blue (216°) and
 * purple (262°) pass through green and magenta on the way to 48°. Capping keeps
 * the warm bias readable as a bias rather than a different colour.
 */
export function mixHueCapped(
  from: number,
  to: number,
  { maxDegrees, weight }: { maxDegrees: number; weight: number },
): number {
  const shortest = ((to - from + 540) % 360) - 180
  const desired = shortest * weight
  const clamped = Math.max(-maxDegrees, Math.min(maxDegrees, desired))
  return (((from + clamped) % 360) + 360) % 360
}
