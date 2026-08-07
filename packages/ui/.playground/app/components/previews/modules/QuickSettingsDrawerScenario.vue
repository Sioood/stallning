<script setup lang="ts">
const quietHours = ref(true)
const digest = ref(false)
</script>

<template>
  <div class="flex flex-col gap-4">
    <p class="txt-caption text-neutral-text-subtle">
      Bottom sheet pour régler les préférences rapidement.
    </p>
    <UIDrawer
      title="Réglages rapides"
      description="Ajustez les options sans quitter la page."
      swipe-direction="down"
    >
      <template #trigger>
        <UIButton variant="subtle" intent="neutral" text="Ouvrir le panneau" class="w-full" />
      </template>
      <div class="flex w-full flex-col gap-4">
        <UISwitch
          v-model="quietHours"
          label="Mode silence (22h–7h)"
          :ui="{ root: 'w-full flex-row-reverse justify-between' }"
        />
        <UISwitch
          v-model="digest"
          label="Digest hebdomadaire"
          :ui="{ root: 'w-full flex-row-reverse justify-between' }"
        />
        <UIAlert
          type="info"
          title="Astuce"
          description="Ces préférences s’appliquent immédiatement à votre compte."
        />
        <UIButton intent="primary" text="Enregistrer" class="w-full" />
      </div>
    </UIDrawer>
  </div>
</template>
