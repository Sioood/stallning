<script setup lang="ts">
type Category = 'all' | 'auth' | 'forms' | 'feedback' | 'data' | 'navigation'

const activeCategory = ref<Category>('all')

const categories: { label: string; value: Category }[] = [
  { label: 'Tous', value: 'all' },
  { label: 'Auth', value: 'auth' },
  { label: 'Forms', value: 'forms' },
  { label: 'Feedback', value: 'feedback' },
  { label: 'Data', value: 'data' },
  { label: 'Navigation', value: 'navigation' },
]

function show(category: Category) {
  return activeCategory.value === 'all' || activeCategory.value === category
}
</script>

<template>
  <div class="min-h-screen px-5 py-10 md:px-12 md:py-14">
    <header class="mx-auto mb-10 max-w-7xl">
      <div class="mb-8 flex flex-wrap items-start justify-between gap-5">
        <div class="max-w-xl">
          <p class="txt-caption mb-2 text-neutral-text-subtle">Compositions</p>
          <h1 class="txt-h4 mb-3 text-neutral-text">Component Bento</h1>
          <p class="txt-caption text-neutral-text-subtle">
            Mini-scénarios interactifs pour se projeter dans l’utilisation des composants — filtrez
            par catégorie pour explorer.
          </p>
        </div>
        <UILink to="/scenarios" class="txt-caption shrink-0">Voir les pages produit →</UILink>
      </div>

      <div class="flex flex-wrap gap-2.5">
        <UIButton
          v-for="cat in categories"
          :key="cat.value"
          size="sm"
          :intent="activeCategory === cat.value ? 'primary' : 'neutral'"
          :variant="activeCategory === cat.value ? 'default' : 'subtle'"
          :text="cat.label"
          @click="activeCategory = cat.value"
        />
      </div>
    </header>

    <PreviewBentoGrid :key="activeCategory">
      <PreviewModuleShell
        v-if="show('auth')"
        title="Connexion"
        category="Auth"
        description="Email, mot de passe et mémorisation de session."
      >
        <LoginScenario />
      </PreviewModuleShell>

      <PreviewModuleShell
        v-if="show('forms')"
        title="Préférences notifications"
        category="Forms"
        description="Switches pour canaux e-mail, push et marketing."
      >
        <NotificationPrefsScenario />
      </PreviewModuleShell>

      <PreviewModuleShell
        v-if="show('data')"
        title="Objectif d'épargne"
        category="Data"
        description="Jauge circulaire, badges de statut et objectif."
      >
        <SavingsGoalScenario />
      </PreviewModuleShell>

      <PreviewModuleShell
        v-if="show('forms')"
        title="Réglages volume"
        category="Forms"
        description="Slider de volume et interrupteur muet."
      >
        <VolumeSettingsScenario />
      </PreviewModuleShell>

      <PreviewModuleShell
        v-if="show('auth')"
        title="Code de vérification"
        category="Auth"
        description="Saisie PIN à 4 chiffres avec alerte info."
      >
        <VerificationCodeScenario />
      </PreviewModuleShell>

      <PreviewModuleShell
        v-if="show('feedback')"
        title="Suppression"
        category="Feedback"
        description="Zone de danger et dialogue de confirmation."
      >
        <DeleteConfirmScenario />
      </PreviewModuleShell>

      <PreviewModuleShell
        v-if="show('forms')"
        title="Profil utilisateur"
        category="Forms"
        description="Profil public avec badge d’enregistrement."
      >
        <ProfileScenario />
      </PreviewModuleShell>

      <PreviewModuleShell
        v-if="show('forms')"
        title="Téléversement document"
        category="Forms"
        description="Zone de dépôt avec progression de téléversement."
      >
        <FileUploadScenario />
      </PreviewModuleShell>

      <PreviewModuleShell
        v-if="show('navigation')"
        title="Parcours commande"
        category="Navigation"
        description="Stepper panier → livraison → paiement."
      >
        <CheckoutStepsScenario />
      </PreviewModuleShell>

      <PreviewModuleShell
        v-if="show('navigation')"
        title="Centre d'aide"
        category="Navigation"
        description="FAQ en accordéon avec liens utiles."
      >
        <FaqScenario />
      </PreviewModuleShell>

      <PreviewModuleShell
        v-if="show('feedback')"
        title="Partage d'accès"
        category="Feedback"
        description="QR code et partage d’accès sécurisé."
      >
        <ShareAccessScenario />
      </PreviewModuleShell>

      <PreviewModuleShell
        v-if="show('navigation')"
        title="Actions document"
        category="Navigation"
        description="Menu contextuel, tooltip et collapsible."
      >
        <DocumentMenuScenario />
      </PreviewModuleShell>

      <PreviewModuleShell
        v-if="show('data')"
        title="Liste paginée"
        category="Data"
        description="Liste, chips, segments et pagination."
      >
        <ListPaginationScenario />
      </PreviewModuleShell>

      <PreviewModuleShell
        v-if="show('forms')"
        title="Recherche et filtres"
        category="Forms"
        description="Recherche, popover filtres et chips actifs."
      >
        <SearchFiltersScenario />
      </PreviewModuleShell>

      <PreviewModuleShell
        v-if="show('navigation')"
        title="Tableau de bord"
        category="Navigation"
        description="Onglets tableau de bord et résumé d’activité."
      >
        <DashboardTabsScenario />
      </PreviewModuleShell>

      <PreviewModuleShell
        v-if="show('data')"
        title="Commandes récentes"
        category="Data"
        description="Table commandes avec badges de statut."
      >
        <OrdersTableScenario />
      </PreviewModuleShell>

      <PreviewModuleShell
        v-if="show('navigation')"
        title="Réglages drawer"
        category="Navigation"
        description="Bottom sheet pour réglages rapides."
      >
        <QuickSettingsDrawerScenario />
      </PreviewModuleShell>

      <PreviewModuleShell
        v-if="show('feedback')"
        title="Centre notifications"
        category="Feedback"
        description="Toasts info / succès / warning / erreur."
      >
        <ToastCenterScenario />
      </PreviewModuleShell>
    </PreviewBentoGrid>
  </div>
</template>
