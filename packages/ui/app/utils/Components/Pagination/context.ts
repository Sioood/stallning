import type { InjectionKey, Ref } from 'vue'
import type { ButtonVariants } from '~/utils/Components/Button/variants'

export type PaginationIntent = NonNullable<
  Exclude<ButtonVariants['intent'], 'info' | 'success' | 'warning' | 'error'>
>
export type PaginationSize = NonNullable<ButtonVariants['size']>
export type PaginationVariant = NonNullable<ButtonVariants['variant']>

export interface PaginationChromeContext {
  intent: Ref<PaginationIntent>
  size: Ref<PaginationSize>
  variant: Ref<PaginationVariant>
}

export const paginationChromeKey: InjectionKey<PaginationChromeContext> = Symbol.for(
  'stallning.ui.pagination.chrome',
)
