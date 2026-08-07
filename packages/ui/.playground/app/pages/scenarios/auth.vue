<script setup lang="ts">
definePageMeta({ layout: 'scenario' })

type Step = 'login' | 'otp' | 'success'

const step = ref<Step>('login')
const mode = ref('login')
const email = ref('marie.dupont@example.com')
const password = ref('motdepasse')
const fullName = ref('Marie Dupont')
const remember = ref(true)
const otp = ref('')

const modeOptions = [
  { label: 'Connexion', value: 'login' },
  { label: 'Inscription', value: 'signup' },
]

const canLogin = computed(() => email.value.includes('@') && password.value.length >= 8)

function continueFromLogin() {
  if (!canLogin.value) return
  step.value = 'otp'
}

function validateOtp() {
  if (String(otp.value).replace(/\D/g, '').length < 4) return
  step.value = 'success'
}

function reset() {
  step.value = 'login'
  otp.value = ''
}
</script>

<template>
  <div class="flex min-h-[calc(100svh-3.25rem)] items-center justify-center px-4 py-14">
    <div class="w-full max-w-md">
      <div class="mb-10 text-center">
        <p class="txt-caption mb-3 text-neutral-text-subtle">Stallning</p>
        <h1 class="txt-h4 text-neutral-text">
          <template v-if="step === 'login'">Bienvenue</template>
          <template v-else-if="step === 'otp'">Vérification</template>
          <template v-else>Connexion réussie</template>
        </h1>
        <p class="txt-caption mt-3 text-neutral-text-subtle">
          <template v-if="step === 'login'">Accédez à votre espace sécurisé.</template>
          <template v-else-if="step === 'otp'">
            Un code à 4 chiffres a été envoyé à {{ email }}.
          </template>
          <template v-else>Vous êtes prêt à continuer.</template>
        </p>
      </div>

      <UICardBase
        variant="subtle"
        intent="neutral"
        size="lg"
        class="flex w-full flex-col gap-8"
        :ui="{ body: 'p-8 md:p-10' }"
      >
        <template v-if="step === 'login'">
          <UITabs
            v-model="mode"
            :options="modeOptions"
            intent="neutral"
            size="sm"
            :render-content="false"
            :ui="{
              root: 'w-full',
              list: 'w-full',
              trigger: 'flex-1 justify-center',
            }"
          />

          <div class="flex w-full flex-col gap-6">
            <UIFormInput
              v-if="mode === 'signup'"
              v-model="fullName"
              label="Nom complet"
              autocomplete="name"
            />
            <UIFormInput v-model="email" label="Adresse e-mail" type="email" autocomplete="email" />
            <UIFormInput
              v-model="password"
              label="Mot de passe"
              type="password"
              autocomplete="current-password"
            />
          </div>

          <UIFormCheckbox v-if="mode === 'login'" v-model="remember" label="Se souvenir de moi" />

          <div class="flex w-full flex-col gap-5">
            <UIButton
              intent="primary"
              class="w-full"
              :text="mode === 'login' ? 'Continuer' : 'Créer mon compte'"
              :disabled="!canLogin"
              :on-click="continueFromLogin"
            />

            <UIAlert
              type="info"
              title="Démo playground"
              description="Utilisez au moins 8 caractères pour le mot de passe."
            />
          </div>
        </template>

        <template v-else-if="step === 'otp'">
          <div class="flex w-full flex-col gap-6">
            <UIFormPinInput v-model="otp" label="Code de vérification" :count="4" />
            <UIButton
              intent="primary"
              class="w-full"
              text="Valider"
              :disabled="String(otp).replace(/\D/g, '').length < 4"
              :on-click="validateOtp"
            />
            <UIButton
              variant="ghost"
              intent="neutral"
              class="w-full"
              text="Retour"
              :on-click="() => (step = 'login')"
            />
          </div>
        </template>

        <template v-else>
          <div class="flex w-full flex-col gap-6">
            <UIAlert
              type="success"
              title="Session ouverte"
              :description="`Bienvenue${fullName ? `, ${fullName}` : ''}.`"
            />
            <UIButton
              intent="primary"
              class="w-full"
              text="Aller au dashboard"
              to="/scenarios/dashboard"
            />
            <UIButton
              variant="subtle"
              intent="neutral"
              class="w-full"
              text="Recommencer"
              :on-click="reset"
            />
          </div>
        </template>
      </UICardBase>
    </div>
  </div>
</template>
