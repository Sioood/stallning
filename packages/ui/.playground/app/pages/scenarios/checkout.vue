<script setup lang="ts">
definePageMeta({ layout: 'scenario' })

const step = ref(0)

const cartItems = [
  { name: 'Casque Studio Pro', price: '129,00 €', qty: 1 },
  { name: 'Câble USB-C', price: '19,00 €', qty: 1 },
]

const address = ref({
  city: 'Paris',
  line: '12 rue de la Paix',
  zip: '75002',
})

const cardLast4 = ref('4242')

const progressValue = computed(() =>
  step.value >= 3 ? 100 : Math.round(((step.value + 1) / 3) * 100),
)
</script>

<template>
  <div class="min-h-[calc(100svh-3.25rem)]">
    <div class="mx-auto w-full max-w-3xl px-4 py-10 md:px-8">
      <header class="mb-8">
        <h1 class="txt-h4 text-neutral-text">Parcours commande</h1>
        <p class="txt-caption mt-1 text-neutral-text-subtle">
          Panier, livraison et paiement — stepper interactif.
        </p>
      </header>

      <UICardBase variant="subtle" intent="neutral" size="lg" class="flex w-full flex-col gap-8">
        <UISteps
          v-model:step="step"
          :items="['Panier', 'Livraison', 'Paiement']"
          intent="primary"
          size="md"
          :show-progress="false"
          :show-triggers="false"
          class="w-full"
        >
          <UIStepsContent :index="0">
            <div class="flex flex-col gap-3 pt-4">
              <div
                v-for="item in cartItems"
                :key="item.name"
                class="flex items-center justify-between gap-4 rounded-xs border border-neutral-border-subtle px-4 py-3"
              >
                <div>
                  <p class="txt-label text-neutral-text">{{ item.name }}</p>
                  <p class="txt-caption text-neutral-text-subtle">Qté {{ item.qty }}</p>
                </div>
                <p class="txt-label text-neutral-text tabular-nums">{{ item.price }}</p>
              </div>
              <div class="flex justify-between border-t border-neutral-border-subtle pt-3">
                <span class="txt-caption text-neutral-text-subtle">Total</span>
                <span class="txt-label text-neutral-text">148,00 €</span>
              </div>
            </div>
          </UIStepsContent>

          <UIStepsContent :index="1">
            <div class="flex flex-col gap-4 pt-4">
              <UIFormInput v-model="address.line" label="Adresse" />
              <div class="grid gap-4 sm:grid-cols-2">
                <UIFormInput v-model="address.zip" label="Code postal" />
                <UIFormInput v-model="address.city" label="Ville" />
              </div>
            </div>
          </UIStepsContent>

          <UIStepsContent :index="2">
            <div class="flex flex-col gap-4 pt-4">
              <UIAlert
                type="info"
                title="Carte enregistrée"
                :description="`Paiement avec la carte se terminant par ${cardLast4}.`"
              />
              <UIFormInput v-model="cardLast4" label="4 derniers chiffres (démo)" />
            </div>
          </UIStepsContent>

          <UIStepsCompletedContent>
            <div class="pt-4">
              <UIAlert
                type="success"
                title="Commande confirmée"
                description="Un e-mail de confirmation vient d’être envoyé."
              />
            </div>
          </UIStepsCompletedContent>
        </UISteps>

        <div class="flex w-full flex-col gap-5 border-t border-neutral-border-subtle pt-6">
          <UIProgress :model-value="progressValue" label="Progression" intent="primary" size="md" />

          <div class="flex w-full items-center justify-between gap-3">
            <UIButton
              variant="subtle"
              intent="neutral"
              text="Précédent"
              leading-icon="tabler:chevron-left"
              :disabled="step === 0"
              :on-click="() => (step = Math.max(0, step - 1))"
            />
            <UIButton
              v-if="step < 3"
              intent="primary"
              :text="step === 2 ? 'Payer 148,00 €' : 'Suivant'"
              :trailing-icon="step === 2 ? undefined : 'tabler:chevron-right'"
              :on-click="() => (step = Math.min(3, step + 1))"
            />
          </div>
        </div>
      </UICardBase>
    </div>
  </div>
</template>
