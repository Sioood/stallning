/**
 * GSAP ScrollTrigger (via v-gsap-nuxt) keeps a `_rafBugFix` loop that calls
 * `requestAnimationFrame(_rafBugFix)` from inside rAF callbacks. Happy-dom can
 * remove the global `requestAnimationFrame` while our setTimeout-based polyfill
 * is still delivering those callbacks — so we re-patch all hosts immediately
 * before invoking any rAF callback (and again around each test).
 */
import { afterEach, beforeEach } from 'vitest'

type RafHost = {
  requestAnimationFrame?: (cb: FrameRequestCallback) => number
  cancelAnimationFrame?: (id: number) => void
}

function collectRafHosts(): RafHost[] {
  const hosts: RafHost[] = [globalThis as unknown as RafHost]

  const globalRef = (globalThis as { global?: unknown }).global
  if (typeof globalRef === 'object' && globalRef !== null) {
    hosts.push(globalRef as RafHost)
  }

  const windowRef = (globalThis as { window?: unknown }).window
  if (typeof windowRef === 'object' && windowRef !== null) {
    hosts.push(windowRef as RafHost)
  }

  const selfRef = (globalThis as { self?: unknown }).self
  if (typeof selfRef === 'object' && selfRef !== null) {
    hosts.push(selfRef as RafHost)
  }

  return hosts
}

function patchRafHosts(): void {
  for (const host of collectRafHosts()) {
    host.requestAnimationFrame = raf
    host.cancelAnimationFrame = caf
  }
}

const raf = (cb: FrameRequestCallback): number =>
  setTimeout(() => {
    patchRafHosts()
    cb(Date.now())
  }, 0) as unknown as number

const caf = (id: number): void => {
  clearTimeout(id as unknown as ReturnType<typeof setTimeout>)
}

patchRafHosts()

beforeEach(() => {
  patchRafHosts()
})

afterEach(() => {
  patchRafHosts()
})
