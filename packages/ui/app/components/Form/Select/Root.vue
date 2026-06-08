<script setup lang="ts">
import {
  Select as ArkSelect,
  type SelectRootBaseProps,
  type SelectRootProviderBaseProps,
  type UseSelectReturn,
} from '@ark-ui/vue/select'

import {
  selectChromeKey,
  type SelectIntent,
  type SelectItem,
  type SelectSize,
  type UISelectSlots,
} from '~/utils/Components/Form/Select/context'
import { selectRootCVA } from '~/utils/Components/Form/Select/variants'

import type { ClassValue } from 'vue'

defineOptions({ inheritAttrs: false })

export interface UIFormSelectRootSlots {
  root?: ClassValue
}

export interface SelectRootProps
  extends
    Omit<SelectRootBaseProps<SelectItem>, 'modelValue' | 'open'>,
    Omit<SelectRootProviderBaseProps, 'value'> {
  value?: UseSelectReturn
  intent?: SelectIntent
  size?: SelectSize
  ui?: Partial<UIFormSelectRootSlots & UISelectSlots>
}

const props = withDefaults(defineProps<SelectRootProps>(), {
  intent: 'primary',
  size: 'md',
  ui: undefined,
  value: undefined,
})

const modelValue = defineModel<string[]>()
const open = defineModel<boolean>('open')

const attrs = useAttrs()

provide(selectChromeKey, {
  intent: toRef(props, 'intent'),
  size: toRef(props, 'size'),
})

const isProvider = computed(() => props.value !== undefined)

const rootComponent = computed(() => (isProvider.value ? ArkSelect.RootProvider : ArkSelect.Root))

const rootProps = computed(() => {
  if (isProvider.value) {
    return pick(props, ['asChild', 'lazyMount', 'unmountOnExit', 'value'])
  }
  return pick(props, [
    'asChild',
    'autoComplete',
    'closeOnSelect',
    'collection',
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
    'multiple',
    'name',
    'positioning',
    'readOnly',
    'required',
    'scrollToIndexFn',
    'unmountOnExit',
  ])
})

const arkAttrs = computed(() => splitArkAttrs(attrs))

const rootBindings = computed(() => {
  const base: Record<string, unknown> = {
    ...rootProps.value,
    ...arkAttrs.value,
    class: cn(selectRootCVA(), arkAttrs.value.class as ClassValue, props.ui?.root),
  }

  if (!isProvider.value) {
    if (open.value !== undefined) {
      base.open = open.value
      base['onUpdate:open'] = (next: boolean) => {
        open.value = next
      }
    }
    base.modelValue = modelValue.value ?? []
    base['onUpdate:modelValue'] = (next: string[]) => {
      modelValue.value = next
    }
  }

  return base
})

function onValueChange(details: { value: string[] }) {
  if (modelValue.value !== undefined) {
    modelValue.value = details.value
  }
}

extendCompodiumMeta<typeof props & { modelValue?: string[] }>({
  defaultProps: {
    intent: 'primary',
    size: 'md',
  },
})
</script>

<template>
  <component :is="rootComponent" v-bind="rootBindings" @value-change="onValueChange">
    <slot />
  </component>
</template>
