<script setup lang="ts">
import {
  createListCollection,
  type SelectRootBaseProps as ArkSelectRootProps,
  type SelectRootProviderBaseProps as ArkSelectRootProviderBaseProps,
  type UseSelectReturn,
} from '@ark-ui/vue/select'

import type {
  SelectIntent,
  SelectSize,
  SelectItem,
  UISelectSlots,
} from '~/utils/Components/Form/Select/context'

defineOptions({ inheritAttrs: false })

export type { SelectItem } from '~/utils/Components/Form/Select/context'

export interface SelectProps
  extends
    Omit<ArkSelectRootProps<SelectItem[]>, 'collection'>,
    Omit<ArkSelectRootProviderBaseProps, 'value'> {
  /**
   * Pass the return value of `useSelect()` to enable **RootProvider** mode —
   * the component will be controlled entirely from outside via the Ark API object.
   * Omit (or leave `undefined`) to use the default **Root** mode with `v-model`.
   */
  value?: UseSelectReturn
  /** Items to display. Pass `null` to indicate items have not been loaded yet (async). */
  items?: SelectItem[] | null
  placeholder?: string
  label?: string
  /** Allow multiple selection */
  multiple?: boolean
  /** Maximum number of items that can be selected (requires `multiple`) */
  maxSelection?: number
  /** Show a "Select All" button at the top of the dropdown (requires `multiple`) */
  allowSelectAll?: boolean
  /** Show a spinner inside the dropdown */
  loading?: boolean
  loadingText?: string
  emptyText?: string
  readOnly?: boolean
  /** Teleport dropdown to DOM (default: true) */
  portalled?: boolean
  teleportTo?: string
  intent?: SelectIntent
  size?: SelectSize
  /** Show a clear button when a value is selected */
  showClear?: boolean
  ui?: Partial<UISelectSlots>
}

const modelValue = defineModel<string[]>({ default: () => [] })
const open = defineModel<boolean>('open', { default: false })

const props = withDefaults(defineProps<SelectProps>(), {
  allowSelectAll: false,
  emptyText: 'select.noOptions',
  intent: 'primary',
  items: () => [],
  label: undefined,
  loading: false,
  loadingText: 'select.loading',
  maxSelection: undefined,
  multiple: false,
  placeholder: 'select.select',
  portalled: true,
  readOnly: false,
  showClear: true,
  size: 'md',
  teleportTo: 'body',
  ui: undefined,
  value: undefined,
})

const attrs = useAttrs()

const rawItems = computed(() => props.items ?? [])

const hasMaxReached = computed(
  () =>
    props.multiple &&
    props.maxSelection !== undefined &&
    modelValue.value.length >= props.maxSelection,
)

const collection = computed(() => {
  const processed = rawItems.value.map((item) => ({
    ...item,
    disabled: item.disabled || (hasMaxReached.value && !modelValue.value.includes(item.value)),
  }))

  if (processed.some((item) => item.group)) {
    return createListCollection({
      groupBy: (item: SelectItem) => item.group ?? '',
      items: processed,
    })
  }

  return createListCollection({ items: processed })
})

const isGrouped = computed(() => rawItems.value.some((item) => item.group))

const isProvider = computed(() => props.value !== undefined)

function handleValueChange(details: { value: string[] }) {
  if (props.maxSelection !== undefined && details.value.length > props.maxSelection) return
  modelValue.value = details.value
}

const rootPassthrough = computed(() => {
  const {
    allowSelectAll: _allowSelectAll,
    emptyText: _emptyText,
    items: _items,
    label: _label,
    loading: _loading,
    loadingText: _loadingText,
    maxSelection: _maxSelection,
    placeholder: _placeholder,
    portalled: _portalled,
    showClear: _showClear,
    teleportTo: _teleportTo,
    ui: _ui,
    ...rest
  } = props
  return rest
})

extendCompodiumMeta({
  defaultProps: {
    intent: 'primary',
    label: 'Framework',
    placeholder: 'select.select',
    size: 'md',
  },
})
</script>

<template>
  <UIFormSelectRoot
    v-bind="{ ...rootPassthrough, ...attrs }"
    v-model="modelValue"
    v-model:open="open"
    :collection="isProvider ? undefined : collection"
    :intent
    :size
    :ui="{ root: ui?.root }"
    @value-change="handleValueChange"
  >
    <UIFormSelectLabel v-if="label" :ui="ui?.label">
      {{ $te(label) ? $t(label) : label }}
    </UIFormSelectLabel>

    <UIFormSelectControl :ui="ui?.control">
      <UIFormSelectTrigger :disabled :ui="ui?.trigger">
        <UIFormSelectValueText
          :placeholder="$te(placeholder) ? $t(placeholder) : placeholder"
          :ui="ui?.valueText"
        />
        <UIFormSelectClearTrigger
          v-if="showClear && modelValue.length > 0"
          :ui="ui?.clearTrigger"
        />
        <UIFormSelectIndicator :ui="ui?.indicator" />
      </UIFormSelectTrigger>
    </UIFormSelectControl>

    <Teleport :to="teleportTo" :disabled="!portalled">
      <UIFormSelectPositioner :ui="ui?.positioner">
        <UIFormSelectContent :ui="ui?.content">
          <slot name="content" :collection :loading :is-grouped>
            <UIFormSelectListContent
              :collection
              :intent
              :size
              :loading
              :loading-text="$te(loadingText) ? $t(loadingText) : loadingText"
              :empty-text="$te(emptyText) ? $t(emptyText) : emptyText"
              :allow-select-all="allowSelectAll && multiple"
              :is-grouped
              :ui
            />
          </slot>
        </UIFormSelectContent>
      </UIFormSelectPositioner>
    </Teleport>

    <UIFormSelectHiddenInput />

    <slot />
  </UIFormSelectRoot>
</template>
