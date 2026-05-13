<script setup lang="ts">
import {
  Select as ArkSelect,
  createListCollection,
  type SelectRootBaseProps as ArkSelectRootProps,
} from '@ark-ui/vue/select'

import { buttonVariants } from '~ui/app/utils/button-variants'

import {
  selectContentCVA,
  selectIconSizeCVA,
  selectLabelCVA,
  selectPositionerCVA,
} from './variants'

import type { SelectIntent, SelectSize, SelectItem, UISelectSlots } from './context'

export interface SelectProps extends Omit<ArkSelectRootProps<SelectItem[]>, 'collection'> {
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
  items: () => [],
  placeholder: 'select.select',
  label: undefined,
  multiple: false,
  maxSelection: undefined,
  allowSelectAll: false,
  loading: false,
  loadingText: 'select.loading',
  emptyText: 'select.noOptions',
  readOnly: false,
  portalled: true,
  teleportTo: 'body',
  intent: 'neutral',
  size: 'md',
  showClear: true,
  ui: undefined,
})

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
      items: processed,
      groupBy: (item: SelectItem) => item.group ?? '',
    })
  }

  return createListCollection({ items: processed })
})

const isGrouped = computed(() => rawItems.value.some((item) => item.group))

function handleValueChange(details: { value: string[] }) {
  if (props.maxSelection !== undefined && details.value.length > props.maxSelection) return
  modelValue.value = details.value
}

const iconClass = computed(() => cn(selectIconSizeCVA({ size: props.size })))

const rootProps = computed(() => ({
  ...pick(props, [
    'asChild',
    'autoComplete',
    'closeOnSelect',
    'composite',
    'defaultHighlightedValue',
    'defaultOpen',
    'defaultValue',
    'deselectable',
    'disabled',
    'form',
    'highlightedValue',
    'id',
    'ids',
    'invalid',
    'lazyMount',
    'loopFocus',
    'modelValue',
    'multiple',
    'name',
    'positioning',
    'readOnly',
    'required',
    'scrollToIndexFn',
    'unmountOnExit',
  ]),
  collection: collection.value,
}))
</script>

<template>
  <ArkSelect.Root
    v-model:open="open"
    v-bind="rootProps"
    :class="cn('w-full', ui?.root)"
    @value-change="handleValueChange"
  >
    <ArkSelect.Label v-if="label" :class="cn(selectLabelCVA({ intent, size }), ui?.label)">
      {{ $te(label) ? $t(label) : label }}
    </ArkSelect.Label>

    <ArkSelect.Control :class="cn('flex items-center gap-1', ui?.control)">
      <ArkSelect.Trigger
        :class="
          cn(
            buttonVariants({
              variant: 'subtle',
              intent,
              size,
              disabled,
            }),
            'w-full justify-between active:scale-100',
            ui?.trigger,
          )
        "
      >
        <ArkSelect.ValueText
          :placeholder="$te(placeholder) ? $t(placeholder) : placeholder"
          :class="cn('flex-1 truncate text-left', ui?.valueText)"
        />

        <ArkSelect.ClearTrigger
          v-if="showClear && modelValue.length > 0"
          :class="
            cn(
              'cursor-pointer hover:text-error-text-default-hover data-[disabled=true]:cursor-not-allowed',
              ui?.clearTrigger,
            )
          "
          @click.prevent
        >
          <Icon name="tabler:x" :class="iconClass" />
        </ArkSelect.ClearTrigger>

        <ArkSelect.Indicator
          :class="
            cn(
              'inline-flex items-center transition-transform data-[state=open]:rotate-180',
              ui?.indicator,
            )
          "
        >
          <Icon name="tabler:chevron-down" :class="iconClass" />
        </ArkSelect.Indicator>
      </ArkSelect.Trigger>
    </ArkSelect.Control>

    <Teleport :to="teleportTo" :disabled="!portalled">
      <ArkSelect.Positioner :class="cn(selectPositionerCVA(), ui?.positioner)">
        <ArkSelect.Content :class="cn(selectContentCVA({ intent, size }), ui?.content)">
          <slot name="content" :collection :loading :is-grouped>
            <UIFormSelectContent
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
        </ArkSelect.Content>
      </ArkSelect.Positioner>
    </Teleport>
    <ArkSelect.HiddenSelect />
  </ArkSelect.Root>
</template>
