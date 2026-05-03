/**
 * GSAP ScrollTrigger (via v-gsap-nuxt) schedules `requestAnimationFrame` during teardown;
 * Node has no rAF, which surfaces as unhandled errors after component tests finish.
 */
const g = globalThis as typeof globalThis & {
  requestAnimationFrame?: typeof globalThis.requestAnimationFrame
  cancelAnimationFrame?: typeof globalThis.cancelAnimationFrame
}

if (typeof g.requestAnimationFrame !== 'function') {
  g.requestAnimationFrame = (cb: FrameRequestCallback): number =>
    setTimeout(() => {
      cb(Date.now())
    }, 0) as unknown as number
  g.cancelAnimationFrame = (id: number): void => {
    clearTimeout(id as unknown as ReturnType<typeof setTimeout>)
  }
}
