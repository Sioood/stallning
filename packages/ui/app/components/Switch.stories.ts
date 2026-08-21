import { expect, userEvent } from 'storybook/test'

import { createGalleryStory } from '~/utils/storybook'

import SwitchDemo from './Switch.demo.vue'
import Component from './Switch.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  args: {
    disabled: false,
    intent: 'primary',
    size: 'md',
  },
  component: Component,
  tags: ['autodocs'],
  title: 'UI/Switch',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** Controllable canvas story — use Controls to tweak props. */
export const Playground: Story = {}

/** Multi-section showcase (former Compodium example). */
export const Gallery = createGalleryStory(SwitchDemo)

/** Ark renders the visible track as `Switch.Control`, which carries `data-state`. */
function control(canvasElement: HTMLElement): HTMLElement {
  const el = canvasElement.querySelector<HTMLElement>('[data-scope="switch"][data-part="control"]')
  if (!el) throw new Error('Switch control not found')
  return el
}

/**
 * Interaction test: clicking the track flips Ark's `data-state`.
 *
 * Runs under `pnpm --filter @stallning/storybook-app test:storybook` (Vitest browser mode
 * + Playwright). Without a `play` function that harness only smoke-renders the story.
 */
export const TogglesOnClick: Story = {
  play: async ({ canvasElement }) => {
    const track = control(canvasElement)

    await expect(track).toHaveAttribute('data-state', 'unchecked')
    await userEvent.click(track)
    await expect(track).toHaveAttribute('data-state', 'checked')
    await userEvent.click(track)
    await expect(track).toHaveAttribute('data-state', 'unchecked')
  },
}

/** A disabled switch must not respond to clicks. */
export const DisabledIgnoresClick: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    const track = control(canvasElement)

    await userEvent.click(track, { pointerEventsCheck: 0 })
    await expect(track).toHaveAttribute('data-state', 'unchecked')
  },
}
