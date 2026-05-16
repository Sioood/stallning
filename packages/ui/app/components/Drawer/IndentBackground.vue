<script setup lang="ts">
import { Drawer as ArkDrawer } from '@ark-ui/vue/drawer'

import type { ClassValue } from 'vue'

export interface UIDrawerIndentBackgroundSlots {
  root?: ClassValue
}

interface DrawerIndentBackgroundProps {
  ui?: Partial<UIDrawerIndentBackgroundSlots>
}

const props = withDefaults(defineProps<DrawerIndentBackgroundProps>(), {
  ui: undefined,
})
</script>

<template>
  <ArkDrawer.IndentBackground :class="cn('drawer-indent-bg', props.ui?.root)" />
</template>

<style scoped>
.drawer-indent-bg {
  position: fixed;
  inset: 0;
  z-index: 9998;
  pointer-events: none;
  background: black;
  opacity: 0;
  transition: opacity 300ms;

  &[data-active] {
    opacity: calc(0.1 * (1 - var(--drawer-swipe-progress, 0)));
  }
}
</style>
