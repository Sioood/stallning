import type { Meta, StoryObj } from '@storybook/vue3'
import type { Component } from 'vue'

/**
 * Shared Storybook CSF helpers for `@stallning/ui`.
 *
 * Convention:
 * - **Docs** (`autodocs`) aggregates all named stories + the documented `component`
 * - **Playground** — controllable canvas story (`args` / Controls)
 * - **Gallery** — multi-section `*.demo.vue` showcase (no Controls)
 *
 * Do **not** hand-write `intent` / `size` / `variant` option lists in a story: each component
 * narrows those unions differently, so a copied list ends up offering values the component's
 * CVA has no branch for and the story renders unstyled. `@stallning/storybook` derives the
 * options from the SFC's own types (`docgen.ts` + `argTypesEnhancer.ts`).
 */

export const galleryStoryParameters = {
  controls: { disable: true },
} as const

/** Mount a co-located `*.demo.vue` as a Gallery story (Controls off). */
export function createGalleryStory<TMeta extends Meta>(demo: Component): StoryObj<TMeta> {
  return {
    parameters: galleryStoryParameters,
    render: () => ({
      components: { StorybookGalleryDemo: demo },
      template: '<StorybookGalleryDemo />',
    }),
  }
}

export type CreateUIMetaOptions<TComponent extends Component> = {
  title: string
  component: TComponent
  args?: Meta<TComponent>['args']
  argTypes?: Meta<TComponent>['argTypes']
}

/** Standard meta: real UI SFC + autodocs. */
export function createUIMeta<TComponent extends Component>(
  options: CreateUIMetaOptions<TComponent>,
): Meta<TComponent> {
  return {
    component: options.component,
    tags: ['autodocs'],
    title: options.title,
    ...(options.args ? { args: options.args } : {}),
    ...(options.argTypes ? { argTypes: options.argTypes } : {}),
  }
}
