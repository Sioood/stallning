import { functionalUpdate, type TableOptions, type Updater } from '@tanstack/vue-table'
import { computed, unref } from 'vue'

import type { MaybeRef, Ref } from 'vue'

export type MaybeRefOrGetter<T> = MaybeRef<T> | (() => T)

export function toValue<T>(source: MaybeRefOrGetter<T>): T {
  if (typeof source === 'function') return (source as () => T)()
  return unref(source)
}

export function createStateBridge<T>(
  model: Ref<T | undefined> | undefined,
  prop: T | undefined,
  onChange: ((updater: Updater<T>) => void) | undefined,
): { state: T | undefined; onChange: ((updater: Updater<T>) => void) | undefined } {
  if (model !== undefined) {
    return {
      state: model.value,
      onChange: (updater) => {
        model.value = functionalUpdate(updater, model.value as T)
        onChange?.(updater)
      },
    }
  }

  if (prop !== undefined) {
    return {
      state: prop,
      onChange,
    }
  }

  return {
    state: undefined,
    onChange,
  }
}

export function mergeTableState<TData>(
  options: Partial<TableOptions<TData>>,
  bridges: Partial<
    Record<keyof NonNullable<TableOptions<TData>['state']>, ReturnType<typeof createStateBridge>>
  >,
): Partial<TableOptions<TData>> {
  const state = { ...options.state }

  for (const [key, bridge] of Object.entries(bridges)) {
    if (bridge?.state !== undefined) {
      Object.assign(state, { [key]: bridge.state })
    }
  }

  const next: Partial<TableOptions<TData>> = {
    ...options,
    state,
  }

  for (const [key, bridge] of Object.entries(bridges)) {
    if (bridge?.onChange) {
      const handlerKey =
        `on${key.charAt(0).toUpperCase()}${key.slice(1)}Change` as keyof TableOptions<TData>
      const existing = next[handlerKey] as ((updater: Updater<unknown>) => void) | undefined
      next[handlerKey] = ((updater: Updater<unknown>) => {
        bridge.onChange?.(updater)
        existing?.(updater)
      }) as TableOptions<TData>[typeof handlerKey]
    }
  }

  return next
}

export function useReactiveTableOptions<TData>(
  getOptions: () => Partial<TableOptions<TData>>,
): Ref<Partial<TableOptions<TData>>> {
  return computed(getOptions)
}
