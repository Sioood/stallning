<script setup lang="ts">
import { Combobox as ArkCombobox } from '@ark-ui/vue/combobox'

import { comboboxPositionerCVA } from '~/utils/Components/Form/Combobox/variants'

import type { ClassValue } from 'vue'

defineOptions({ inheritAttrs: false })

export interface ComboboxPositionerProps {
  ui?: ClassValue
}

withDefaults(defineProps<ComboboxPositionerProps>(), {
  ui: undefined,
})

const attrs = useAttrs()

const positionerAttrs = computed(() => {
  const { ui: _ui, ...rest } = attrs as Record<string, unknown> & { ui?: ClassValue }
  return rest
})
</script>

<template>
  <ArkCombobox.Positioner
    v-bind="positionerAttrs"
    :class="cn(comboboxPositionerCVA(), positionerAttrs.class as ClassValue, ui)"
  >
    <slot />
  </ArkCombobox.Positioner>
</template>
