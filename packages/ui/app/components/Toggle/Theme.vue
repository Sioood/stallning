<script setup lang="ts">
import type { BasicColorSchema } from '@vueuse/core'

const mode = useColorMode({
  emitAuto: true,
  initialValue: 'auto',
})

const modes = ['light', 'dark', 'auto'] as const satisfies readonly BasicColorSchema[]

const { state, next } = useCycleList(modes, {
  initialValue: modes.includes(mode.value as BasicColorSchema)
    ? (mode.value as BasicColorSchema)
    : 'auto',
})

watchEffect(() => {
  mode.value = state.value
})

const iconName = computed(() => {
  switch (state.value) {
    case 'dark':
      return 'tabler:moon'
    case 'auto':
      return 'tabler:device-desktop'
    case 'light':
    default:
      return 'tabler:sun'
  }
})

const ariaLabel = computed(() => {
  switch (state.value) {
    case 'dark':
      return 'Thème sombre (cliquer pour système)'
    case 'auto':
      return 'Thème système (cliquer pour clair)'
    case 'light':
    default:
      return 'Thème clair (cliquer pour sombre)'
  }
})
</script>

<template>
  <ClientOnly>
    <UIButton
      variant="ghost"
      intent="neutral"
      size="sm"
      :aria-label="ariaLabel"
      :title="ariaLabel"
      :on-click="() => next()"
    >
      <Icon :name="iconName" class="size-4" />
    </UIButton>
    <template #fallback>
      <UIButton
        variant="ghost"
        intent="neutral"
        size="sm"
        aria-label="Thème système (cliquer pour clair)"
        title="Thème système (cliquer pour clair)"
        disabled
      >
        <Icon name="tabler:device-desktop" class="size-4" />
      </UIButton>
    </template>
  </ClientOnly>
</template>
