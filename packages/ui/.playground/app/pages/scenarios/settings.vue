<script setup lang="ts">
definePageMeta({ layout: 'scenario' })

type Section = 'profile' | 'notifications' | 'security'

const section = ref<Section>('profile')
const fullName = ref('Marie Dupont')
const bio = ref('Designer produit chez Stallning.')
const emailNotifs = ref(true)
const pushNotifs = ref(true)
const marketingNotifs = ref(false)
const saved = ref(false)
const confirmOpen = ref(false)
const deleted = ref(false)

const navOptions = [
  { icon: 'tabler:user', label: 'Profil', value: 'profile' },
  { icon: 'tabler:bell', label: 'Notifications', value: 'notifications' },
  { icon: 'tabler:shield-lock', label: 'Sécurité', value: 'security' },
]

function saveProfile() {
  saved.value = true
}

function confirmDelete() {
  deleted.value = true
  confirmOpen.value = false
}

watch([fullName, bio], () => {
  saved.value = false
})
</script>

<template>
  <div class="min-h-[calc(100svh-3.25rem)]">
    <div class="mx-auto w-full max-w-5xl px-4 py-10 md:px-8">
      <header class="mb-8">
        <h1 class="txt-h4 text-neutral-text">Paramètres</h1>
        <p class="txt-caption mt-1 text-neutral-text-subtle">
          Gérez votre profil, vos alertes et la sécurité du compte.
        </p>
      </header>

      <UITabs
        v-model="section"
        orientation="vertical"
        variant="pill-subtle"
        intent="neutral"
        size="md"
        :options="navOptions"
        :ui="{
          root: 'w-full flex-col gap-6 md:flex-row md:gap-8',
          list: 'w-full shrink-0 md:w-52',
          trigger: 'w-full justify-start',
          content: 'min-w-0 flex-1',
        }"
      >
        <template #content-profile>
          <UICardBase
            variant="subtle"
            intent="neutral"
            size="lg"
            class="flex w-full flex-col gap-5"
          >
            <div class="flex items-center justify-between gap-3">
              <h2 class="txt-label text-neutral-text">Profil public</h2>
              <UIBadge
                v-if="saved"
                label="Enregistré"
                intent="success"
                size="sm"
                variant="subtle"
              />
            </div>
            <UIFormInput v-model="fullName" label="Nom complet" />
            <UIFormTextarea v-model="bio" label="Bio" :rows="4" />
            <UIButton
              intent="primary"
              text="Enregistrer"
              class="self-start"
              :on-click="saveProfile"
            />
          </UICardBase>
        </template>

        <template #content-notifications>
          <UICardBase
            variant="subtle"
            intent="neutral"
            size="lg"
            class="flex w-full flex-col gap-5"
          >
            <h2 class="txt-label text-neutral-text">Préférences notifications</h2>
            <UISwitch v-model:checked="emailNotifs" label="Notifications e-mail" />
            <UISwitch v-model:checked="pushNotifs" label="Notifications push" />
            <UISwitch v-model:checked="marketingNotifs" label="Offres marketing" />
            <UIAlert
              v-if="!emailNotifs && !pushNotifs"
              type="info"
              title="Canaux silencieux"
              description="Vous ne recevrez plus d’alertes transactionnelles push ou e-mail."
            />
          </UICardBase>
        </template>

        <template #content-security>
          <div class="flex w-full flex-col gap-6">
            <UICardBase
              variant="subtle"
              intent="neutral"
              size="lg"
              class="flex w-full flex-col gap-4"
            >
              <h2 class="txt-label text-neutral-text">Sécurité</h2>
              <p class="txt-caption text-neutral-text-subtle">
                Authentification à deux facteurs recommandée pour les comptes équipe.
              </p>
              <UIButton
                variant="subtle"
                intent="neutral"
                text="Activer la 2FA"
                leading-icon="tabler:shield-check"
                class="self-start"
              />
            </UICardBase>

            <UICardBase
              variant="subtle"
              intent="neutral"
              size="lg"
              class="flex w-full flex-col gap-4 border-error-border-subtle"
            >
              <h2 class="txt-label text-error-text">Zone de danger</h2>
              <p class="txt-caption text-neutral-text-subtle">
                La suppression du compte est définitive. Exportez vos données avant.
              </p>
              <UIButton
                intent="error"
                variant="subtle"
                text="Supprimer mon compte"
                class="self-start"
                :on-click="() => (confirmOpen = true)"
              />
              <UIAlert
                v-if="deleted"
                type="error"
                title="Compte marqué pour suppression"
                description="Dans une vraie app, un e-mail de confirmation serait envoyé."
              />
            </UICardBase>
          </div>
        </template>
      </UITabs>
    </div>

    <UIDialog
      v-model:open="confirmOpen"
      hide-trigger
      title="Supprimer le compte ?"
      description="Cette action est irréversible. Toutes les données seront perdues."
      size="sm"
    >
      <template #footer>
        <UIButton
          variant="subtle"
          intent="neutral"
          text="Annuler"
          :on-click="() => (confirmOpen = false)"
        />
        <UIButton intent="error" text="Supprimer" :on-click="confirmDelete" />
      </template>
    </UIDialog>
  </div>
</template>
