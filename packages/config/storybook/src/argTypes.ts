import type { InputType } from 'storybook/internal/types'

/**
 * Widest DS token lists, used **only** as a fallback by `argTypesEnhancer` when a prop's type
 * could not be resolved. Per-component options come from the SFC's own types — see `docgen.ts`.
 */
export const intentOptions = [
  'neutral',
  'primary',
  'secondary',
  'accent',
  'info',
  'success',
  'warning',
  'error',
] as const

export const sizeOptions = ['sm', 'md', 'lg'] as const

export const variantOptions = ['default', 'subtle', 'ghost', 'strong', 'inverse'] as const

export const orientationOptions = ['horizontal', 'vertical'] as const

/**
 * Controls must be declared in object form: a bare `control: 'select'` overwrites the object
 * `inferControls` produced, and nothing can read `control.type` off a string — the Controls panel
 * and the Autodocs table then render the row as a dead `-`.
 */
function selectArgType(options: readonly string[]) {
  return {
    control: { type: 'select' },
    options: [...options],
  } satisfies InputType & { options: string[] }
}

export const intentArgType = selectArgType(intentOptions)
export const sizeArgType = selectArgType(sizeOptions)
export const variantArgType = selectArgType(variantOptions)
export const orientationArgType = selectArgType(orientationOptions)
