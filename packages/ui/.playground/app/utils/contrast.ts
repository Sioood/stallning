/**
 * Reads design-system colour tokens as they actually render and scores them against
 * WCAG contrast floors.
 *
 * Values are resolved from the live computed style rather than from the token source,
 * so the numbers shown in the playground reflect the current theme (including the
 * `.dark` class and `prefers-color-scheme`) exactly as a user sees it.
 */

export interface ContrastVerdict {
  /** Measured WCAG 2.x contrast ratio, rounded to 2dp. */
  ratio: number
  /** `AAA` ≥ 7, `AA` ≥ 4.5, `AA-large` ≥ 3, otherwise `fail`. */
  grade: 'AA' | 'AA-large' | 'AAA' | 'fail'
  background: string
  foreground: string
}

/** Resolves a CSS custom property to an `rgb()` triple via the browser. */
export function resolveToken(token: string, root?: HTMLElement): [number, number, number] | null {
  if (typeof window === 'undefined') return null

  const probe = document.createElement('span')
  probe.style.color = `var(${token})`
  probe.style.display = 'none'
  ;(root ?? document.body).append(probe)
  const resolved = getComputedStyle(probe).color
  probe.remove()

  return parseRgb(resolved)
}

function parseRgb(value: string): [number, number, number] | null {
  const numbers = value.match(/[\d.]+/g)
  if (!numbers || numbers.length < 3) return null
  return [Number(numbers[0]), Number(numbers[1]), Number(numbers[2])]
}

function channelLuminance(channel: number): number {
  const c = channel / 255
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

/** WCAG 2.x relative luminance. */
export function relativeLuminance([r, g, b]: [number, number, number]): number {
  return 0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b)
}

export function contrastRatio(a: [number, number, number], b: [number, number, number]): number {
  const [hi, lo] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x)
  return Math.round(((hi! + 0.05) / (lo! + 0.05)) * 100) / 100
}

export function gradeRatio(ratio: number): ContrastVerdict['grade'] {
  if (ratio >= 7) return 'AAA'
  if (ratio >= 4.5) return 'AA'
  if (ratio >= 3) return 'AA-large'
  return 'fail'
}

/** Scores one foreground/background token pair. Returns `null` if either fails to resolve. */
export function scorePair(foreground: string, background: string): ContrastVerdict | null {
  const fg = resolveToken(foreground)
  const bg = resolveToken(background)
  if (!fg || !bg) return null

  const ratio = contrastRatio(fg, bg)
  return { background, foreground, grade: gradeRatio(ratio), ratio }
}
