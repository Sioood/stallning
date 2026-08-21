<script setup lang="ts">
/** Rating plus signature pad — the two inputs that need pointer interaction. */

const score = ref(4)
const signature = ref<string[]>([])
const sent = ref(false)

const label = computed(
  () => ['—', 'Décevant', 'Passable', 'Correct', 'Très bien', 'Excellent'][score.value] ?? '—',
)
</script>

<template>
  <div class="flex flex-col gap-5">
    <div class="flex flex-col gap-2">
      <UIFormRating v-model="score" label="Votre satisfaction" :count="5" />
      <span class="txt-mono-caption text-neutral-text-muted">{{ label }}</span>
    </div>

    <UIFormSignaturePad
      v-model="signature"
      label="Signature"
      helper-text="Dessinez avec la souris ou le doigt."
    />

    <UIButton
      intent="primary"
      text="Envoyer l'avis"
      class="w-full"
      :disabled="!signature.length"
      @click="sent = true"
    />

    <UIAlert
      v-if="sent"
      type="success"
      title="Merci"
      :description="`Note ${score}/5 enregistrée.`"
      closable
    />
  </div>
</template>
