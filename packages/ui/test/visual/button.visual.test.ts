import { page } from '@vitest/browser/context'
import { test, afterEach } from 'vitest'

import { mountForVisual } from './mount'
import { expectPngSnapshot } from './png-snapshot'

import Button from '~ui/app/components/Button.vue'

const specFolder = 'button.visual.test.ts'
const screenshotDir = `./__screenshots__/${specFolder}`

let cleanup: (() => void) | undefined

afterEach(() => {
  cleanup?.()
  cleanup = undefined
})

test('Button default/neutral renders correctly', async () => {
  const { el, unmount } = mountForVisual(Button, {
    text: 'Click me',
    variant: 'default',
    intent: 'neutral',
    size: 'md',
  })
  cleanup = unmount

  await expectPngSnapshot(
    el.querySelector('button')!,
    specFolder,
    `${screenshotDir}/button-default-neutral.png`,
    'button-default-neutral.png',
  )
})

test('Button default/primary renders correctly', async () => {
  const { el, unmount } = mountForVisual(Button, {
    text: 'Primary',
    variant: 'default',
    intent: 'primary',
    size: 'md',
  })
  cleanup = unmount

  await expectPngSnapshot(
    el.querySelector('button')!,
    specFolder,
    `${screenshotDir}/button-default-primary.png`,
    'button-default-primary.png',
  )
})

test('Button default/primary (defaults) hover shows hover styles', async () => {
  const { el, unmount } = mountForVisual(Button, {
    text: 'Hover me',
  })
  cleanup = unmount

  const btn = el.querySelector('button')!
  const locator = page.elementLocator(btn)
  await locator.hover()
  try {
    await expectPngSnapshot(
      btn,
      specFolder,
      `${screenshotDir}/button-default-primary-hover.png`,
      'button-default-primary-hover.png',
    )
  } finally {
    await locator.unhover()
  }
})

test('Button subtle/secondary renders correctly', async () => {
  const { el, unmount } = mountForVisual(Button, {
    text: 'Secondary',
    variant: 'subtle',
    intent: 'secondary',
    size: 'md',
  })
  cleanup = unmount

  await expectPngSnapshot(
    el.querySelector('button')!,
    specFolder,
    `${screenshotDir}/button-subtle-secondary.png`,
    'button-subtle-secondary.png',
  )
})

test('Button ghost/accent renders correctly', async () => {
  const { el, unmount } = mountForVisual(Button, {
    text: 'Ghost',
    variant: 'ghost',
    intent: 'accent',
    size: 'md',
  })
  cleanup = unmount

  await expectPngSnapshot(
    el.querySelector('button')!,
    specFolder,
    `${screenshotDir}/button-ghost-accent.png`,
    'button-ghost-accent.png',
  )
})

test('Button small size renders correctly', async () => {
  const { el, unmount } = mountForVisual(Button, {
    text: 'Small',
    variant: 'default',
    intent: 'primary',
    size: 'sm',
  })
  cleanup = unmount

  await expectPngSnapshot(
    el.querySelector('button')!,
    specFolder,
    `${screenshotDir}/button-size-sm.png`,
    'button-size-sm.png',
  )
})

test('Button large size renders correctly', async () => {
  const { el, unmount } = mountForVisual(Button, {
    text: 'Large',
    variant: 'default',
    intent: 'primary',
    size: 'lg',
  })
  cleanup = unmount

  await expectPngSnapshot(
    el.querySelector('button')!,
    specFolder,
    `${screenshotDir}/button-size-lg.png`,
    'button-size-lg.png',
  )
})

test('Button disabled state renders correctly', async () => {
  const { el, unmount } = mountForVisual(Button, {
    text: 'Disabled',
    variant: 'default',
    intent: 'primary',
    size: 'md',
    disabled: true,
  })
  cleanup = unmount

  await expectPngSnapshot(
    el.querySelector('button')!,
    specFolder,
    `${screenshotDir}/button-disabled.png`,
    'button-disabled.png',
  )
})
