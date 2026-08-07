<script setup lang="ts">
const toaster = useToast()

function notify(type: 'info' | 'success' | 'warning' | 'error') {
  const titles = {
    error: 'Erreur',
    info: 'Information',
    success: 'Succès',
    warning: 'Attention',
  } as const

  toaster.value?.[type]({
    closable: true,
    description: 'Notification de démonstration dans le playground.',
    title: titles[type],
  })
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <p class="txt-caption text-neutral-text-subtle">Centre de notifications — toasts empilés</p>
    <div class="flex flex-wrap gap-2.5">
      <UIButton size="sm" variant="subtle" intent="info" text="Info" @click="notify('info')" />
      <UIButton
        size="sm"
        variant="subtle"
        intent="success"
        text="Succès"
        @click="notify('success')"
      />
      <UIButton
        size="sm"
        variant="subtle"
        intent="warning"
        text="Warning"
        @click="notify('warning')"
      />
      <UIButton size="sm" variant="subtle" intent="error" text="Erreur" @click="notify('error')" />
    </div>
  </div>
</template>
