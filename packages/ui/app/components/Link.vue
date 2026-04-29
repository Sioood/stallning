<script setup lang="ts">
import type { NuxtLinkProps } from '#app'

const props = defineProps<NuxtLinkProps>()
const config = useRuntimeConfig()

const isExternal = computed(() => {
  if (props.external) return true
  const url = props.to?.toString()
  const siteUrl = config.public.siteUrl
  if (url?.startsWith(siteUrl)) return false
  return url?.startsWith('http')
})

const target = computed(() => props.target || (isExternal.value ? '_blank' : undefined))
const rel = computed(() => props.rel || (isExternal.value ? 'noopener noreferrer' : undefined))
</script>

<template>
  <nuxt-link v-if="!custom" v-bind="{ ...props, target, rel }">
    <slot />
  </nuxt-link>
  <slot v-else v-bind="{ ...props, target, rel }" />
</template>
