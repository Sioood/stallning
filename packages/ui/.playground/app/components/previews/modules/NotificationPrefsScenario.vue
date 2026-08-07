<script setup lang="ts">
const emailNotifs = ref(true)
const pushNotifs = ref(true)
const marketingNotifs = ref(false)

const allDisabled = computed(
  () => !emailNotifs.value && !pushNotifs.value && !marketingNotifs.value,
)
</script>

<template>
  <div class="flex flex-col gap-4">
    <UISwitch
      v-model="emailNotifs"
      label="Notifications e-mail"
      :ui="{ root: 'w-full flex-row-reverse justify-between' }"
    />
    <UISwitch
      v-model="pushNotifs"
      label="Notifications push"
      :ui="{ root: 'w-full flex-row-reverse justify-between' }"
    />
    <UISwitch
      v-model="marketingNotifs"
      label="Offres marketing"
      :ui="{ root: 'w-full flex-row-reverse justify-between' }"
    />
    <UIAlert
      v-if="allDisabled"
      type="info"
      title="Aucune alerte active"
      description="Vous ne recevrez plus de notifications."
    />
  </div>
</template>
