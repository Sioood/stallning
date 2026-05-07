<script setup lang="ts">
const toaster = useToast()
const { $pwa } = useNuxtApp()
const { t } = useI18n()

const hasShownOfflineReadyToast = ref(false)
const hasShownUpdateToast = ref(false)

watch(
  () => $pwa?.offlineReady,
  (offlineReady) => {
    if (!offlineReady || hasShownOfflineReadyToast.value) {
      return
    }

    toaster.value?.success({
      title: t('pwa:offlineReady.title'),
      description: t('pwa:offlineReady.description'),
      closable: true,
    })
    hasShownOfflineReadyToast.value = true
  },
)

watch(
  () => $pwa?.needRefresh,
  (needRefresh) => {
    if (!needRefresh) {
      hasShownUpdateToast.value = false
      return
    }

    if (hasShownUpdateToast.value) {
      return
    }

    toaster.value?.create({
      title: t('pwa:updateAvailable.title'),
      description: t('pwa:updateAvailable.description'),
      type: 'info',
      closable: true,
      action: {
        label: t('pwa:updateAvailable.reloadLabel'),
        onClick: () => {
          void $pwa?.updateServiceWorker()
        },
      },
    })

    hasShownUpdateToast.value = true
  },
)
</script>

<template>
  <span class="hidden" aria-hidden="true" />
</template>
