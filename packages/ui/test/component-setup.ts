/**
 * GSAP ScrollTrigger (via v-gsap-nuxt) can schedule callbacks that run after the
 * Nuxt/happy-dom environment is torn down. In that phase, `requestAnimationFrame`
 * might no longer exist on the active global object, causing unhandled errors.
 *
 * Apply a resilient shim to all reachable globals used in tests.
 */
type RafHost = {
  requestAnimationFrame?: (cb: FrameRequestCallback) => number
  cancelAnimationFrame?: (id: number) => void
}

const raf = (cb: FrameRequestCallback): number =>
  setTimeout(() => {
    cb(Date.now())
  }, 0) as unknown as number

const caf = (id: number): void => {
  clearTimeout(id as unknown as ReturnType<typeof setTimeout>)
}

const hosts: RafHost[] = []
hosts.push(globalThis as unknown as RafHost)

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

for (const host of hosts) {
  if (typeof host.requestAnimationFrame !== 'function') host.requestAnimationFrame = raf
  if (typeof host.cancelAnimationFrame !== 'function') host.cancelAnimationFrame = caf
}
