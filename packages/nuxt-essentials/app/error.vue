<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { t } = useI18n()

const statusCode = computed(() => props.error.statusCode || 500)
const title = computed(() => {
  if (statusCode.value === 404) return t('error.title.notFound')
  if (statusCode.value === 403) return t('error.title.forbidden')
  return t('error.title.default')
})
const description = computed(() => props.error.message || t('error.description'))

const handleClearError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center px-4 text-center">
    <p class="txt-h1 text-neutral-text-subtle">{{ statusCode }}</p>
    <h1 class="txt-h3 mt-4 text-neutral-text-default">{{ title }}</h1>
    <p class="txt-base mt-2 max-w-md text-neutral-text-subtle">{{ description }}</p>
    <button
      class="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-md bg-primary-fill-default px-4 py-2 text-primary-text-inverse transition-colors hover:bg-primary-fill-default-hover"
      @click="handleClearError"
    >
      {{ t('error.backHome') }}
    </button>
  </div>
</template>
