<script setup lang="ts">
import { useTour, waitForElement, waitForEvent, type TourStepDetails } from '@ark-ui/vue/tour'
import { ref } from 'vue'

const activeScenario = ref<
  | 'basic'
  | 'progress'
  | 'skip'
  | 'keyboard'
  | 'waitClick'
  | 'waitInput'
  | 'waitElement'
  | 'async'
  | 'events'
  | 'mixed'
>('basic')

// ─── Basic Tour ──────────────────────────────────────────────
const basicSteps: TourStepDetails[] = [
  {
    id: 'welcome',
    type: 'dialog',
    title: 'Bienvenue !',
    description: "Découvrons ensemble les fonctionnalités principales de l'application.",
    actions: [{ label: 'Commencer', action: 'next' }],
  },
  {
    id: 'upload',
    type: 'tooltip',
    title: 'Téléverser des fichiers',
    description: 'Cliquez ici pour ajouter vos fichiers au projet.',
    target: () => document.querySelector<HTMLElement>('#basic-upload'),
    actions: [
      { label: 'Précédent', action: 'prev' },
      { label: 'Suivant', action: 'next' },
    ],
  },
  {
    id: 'save',
    type: 'tooltip',
    title: 'Sauvegarder',
    description: 'Enregistrez vos modifications pour conserver votre progression.',
    target: () => document.querySelector<HTMLElement>('#basic-save'),
    actions: [
      { label: 'Précédent', action: 'prev' },
      { label: 'Suivant', action: 'next' },
    ],
  },
  {
    id: 'complete',
    type: 'dialog',
    title: 'Terminé !',
    description: 'Vous connaissez maintenant les bases. Bonne utilisation !',
    actions: [{ label: 'Fermer', action: 'dismiss' }],
  },
]

const basicTour = useTour({ steps: basicSteps })

// ─── Progress Bar Tour ───────────────────────────────────────
const progressSteps: TourStepDetails[] = [
  {
    id: 'p1',
    type: 'tooltip',
    title: 'Étape 1 sur 4',
    description: 'Observez la barre de progression en bas du panneau.',
    target: () => document.querySelector<HTMLElement>('#progress-1'),
    actions: [{ label: 'Suivant', action: 'next' }],
  },
  {
    id: 'p2',
    type: 'tooltip',
    title: 'Étape 2 sur 4',
    description: 'La barre avance à chaque étape.',
    target: () => document.querySelector<HTMLElement>('#progress-2'),
    actions: [
      { label: 'Précédent', action: 'prev' },
      { label: 'Suivant', action: 'next' },
    ],
  },
  {
    id: 'p3',
    type: 'tooltip',
    title: 'Étape 3 sur 4',
    description: 'Encore un petit effort !',
    target: () => document.querySelector<HTMLElement>('#progress-3'),
    actions: [
      { label: 'Précédent', action: 'prev' },
      { label: 'Suivant', action: 'next' },
    ],
  },
  {
    id: 'p4',
    type: 'tooltip',
    title: 'Étape 4 sur 4',
    description: 'Vous avez complété toutes les étapes.',
    target: () => document.querySelector<HTMLElement>('#progress-4'),
    actions: [
      { label: 'Précédent', action: 'prev' },
      { label: 'Terminer', action: 'dismiss' },
    ],
  },
]

const progressTour = useTour({ steps: progressSteps })

// ─── Skip Tour ───────────────────────────────────────────────
const skipSteps: TourStepDetails[] = [
  {
    id: 's1',
    type: 'tooltip',
    title: 'Première fonctionnalité',
    description: 'Vous pouvez ignorer cette visite à tout moment avec le bouton Ignorer.',
    target: () => document.querySelector<HTMLElement>('#skip-1'),
    actions: [
      { label: 'Ignorer', action: 'dismiss' },
      { label: 'Suivant', action: 'next' },
    ],
  },
  {
    id: 's2',
    type: 'tooltip',
    title: 'Deuxième fonctionnalité',
    description: 'Continuez ou ignorez pour terminer la visite.',
    target: () => document.querySelector<HTMLElement>('#skip-2'),
    actions: [
      { label: 'Ignorer', action: 'dismiss' },
      { label: 'Précédent', action: 'prev' },
      { label: 'Suivant', action: 'next' },
    ],
  },
  {
    id: 's3',
    type: 'tooltip',
    title: 'Dernière étape',
    description: "C'est la dernière étape de la visite.",
    target: () => document.querySelector<HTMLElement>('#skip-3'),
    actions: [
      { label: 'Précédent', action: 'prev' },
      { label: 'Terminer', action: 'dismiss' },
    ],
  },
]

const skipTour = useTour({ steps: skipSteps })

// ─── Keyboard Navigation Tour ────────────────────────────────
const keyboardSteps: TourStepDetails[] = [
  {
    id: 'k1',
    type: 'tooltip',
    title: 'Navigation clavier',
    description: "Appuyez sur la flèche droite pour passer à l'étape suivante.",
    target: () => document.querySelector<HTMLElement>('#key-1'),
    actions: [{ label: 'Suivant', action: 'next' }],
  },
  {
    id: 'k2',
    type: 'tooltip',
    title: 'Revenir en arrière',
    description: "Appuyez sur la flèche gauche pour revenir à l'étape précédente.",
    target: () => document.querySelector<HTMLElement>('#key-2'),
    actions: [
      { label: 'Précédent', action: 'prev' },
      { label: 'Suivant', action: 'next' },
    ],
  },
  {
    id: 'k3',
    type: 'tooltip',
    title: 'Fermer la visite',
    description: 'Appuyez sur Échap pour fermer la visite à tout moment.',
    target: () => document.querySelector<HTMLElement>('#key-3'),
    actions: [
      { label: 'Précédent', action: 'prev' },
      { label: 'Terminer', action: 'dismiss' },
    ],
  },
]

const keyboardTour = useTour({ steps: keyboardSteps, keyboardNavigation: true })

// ─── Wait for Click Tour ─────────────────────────────────────
const waitClickSteps: TourStepDetails[] = [
  {
    id: 'wc-intro',
    type: 'dialog',
    title: 'Tutoriel interactif',
    description:
      'Cette visite vous guidera à travers des actions. Vous devez compléter chaque étape pour continuer.',
    actions: [{ label: 'Commencer', action: 'next' }],
  },
  {
    id: 'wc-add',
    type: 'tooltip',
    title: 'Cliquez sur "Ajouter"',
    description: 'Cliquez sur le bouton "Ajouter un élément" pour continuer.',
    target: () => document.querySelector<HTMLElement>('#wc-add-btn'),
    effect({ next, target, show }) {
      show()
      const [promise, cancel] = waitForEvent(target, 'click')
      promise.then(() => next())
      return cancel
    },
  },
  {
    id: 'wc-edit',
    type: 'tooltip',
    title: 'Cliquez sur "Modifier"',
    description: 'Maintenant, cliquez sur le bouton "Modifier".',
    target: () => document.querySelector<HTMLElement>('#wc-edit-btn'),
    effect({ next, target, show }) {
      show()
      const [promise, cancel] = waitForEvent(target, 'click')
      promise.then(() => next())
      return cancel
    },
  },
  {
    id: 'wc-complete',
    type: 'dialog',
    title: 'Bravo !',
    description: 'Vous avez terminé toutes les étapes interactives.',
    actions: [{ label: 'Terminer', action: 'dismiss' }],
  },
]

const waitClickTour = useTour({ steps: waitClickSteps })

// ─── Wait for Input Tour ─────────────────────────────────────
const waitInputSteps: TourStepDetails[] = [
  {
    id: 'wi-intro',
    type: 'dialog',
    title: 'Tutoriel formulaire',
    description: 'Apprenez à remplir le formulaire en suivant les étapes guidées.',
    actions: [{ label: 'Commencer', action: 'next' }],
  },
  {
    id: 'wi-name',
    type: 'tooltip',
    title: 'Entrez votre nom',
    description: 'Tapez votre nom dans le champ pour continuer (min. 2 caractères).',
    target: () => document.querySelector<HTMLInputElement>('#wi-name-input'),
    effect({ next, target, show }) {
      show()
      const [promise, cancel] = waitForEvent<HTMLInputElement>(target, 'input', {
        predicate: (el) => el.value.trim().length >= 2,
      })
      promise.then(() => next())
      return cancel
    },
  },
  {
    id: 'wi-email',
    type: 'tooltip',
    title: 'Entrez votre email',
    description: 'Maintenant, entrez une adresse email valide.',
    target: () => document.querySelector<HTMLInputElement>('#wi-email-input'),
    effect({ next, target, show }) {
      show()
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const [promise, cancel] = waitForEvent<HTMLInputElement>(target, 'input', {
        predicate: (el) => emailRegex.test(el.value),
      })
      promise.then(() => next())
      return cancel
    },
  },
  {
    id: 'wi-terms',
    type: 'tooltip',
    title: 'Acceptez les conditions',
    description: "Cochez la case pour accepter les conditions d'utilisation.",
    target: () => document.querySelector<HTMLInputElement>('#wi-terms-checkbox'),
    effect({ next, target, show }) {
      show()
      const [promise, cancel] = waitForEvent<HTMLInputElement>(target, 'change', {
        predicate: (el) => el.checked,
      })
      promise.then(() => next())
      return cancel
    },
  },
  {
    id: 'wi-complete',
    type: 'dialog',
    title: 'Formulaire complété !',
    description: 'Vous avez réussi à remplir le formulaire.',
    actions: [{ label: 'Terminer', action: 'dismiss' }],
  },
]

const waitInputTour = useTour({ steps: waitInputSteps })

// ─── Wait for Element Tour ───────────────────────────────────
const waitElementItems = ref<string[]>(['Élément 1', 'Élément 2'])

const waitElementSteps: TourStepDetails[] = [
  {
    id: 'we-intro',
    type: 'dialog',
    title: 'Éléments dynamiques',
    description:
      'Cette visite montre comment attendre des éléments qui apparaissent dynamiquement.',
    actions: [{ label: 'Commencer', action: 'next' }],
  },
  {
    id: 'we-add',
    type: 'tooltip',
    title: 'Ajoutez un élément',
    description: 'Cliquez sur le bouton pour ajouter un nouvel élément à la liste.',
    target: () => document.querySelector<HTMLElement>('#we-add-btn'),
    effect({ next, target, show }) {
      show()
      const [promise, cancel] = waitForEvent(target, 'click')
      promise.then(() => next())
      return cancel
    },
  },
  {
    id: 'we-new',
    type: 'tooltip',
    title: 'Nouvel élément ajouté !',
    description: "La visite a attendu que cet élément apparaisse avant d'afficher cette étape.",
    target: () => document.querySelector<HTMLElement>('[data-item="new"]'),
    effect({ show }) {
      const [promise, cancel] = waitForElement(
        () => document.querySelector<HTMLElement>('[data-item="new"]'),
        {
          timeout: 5000,
        },
      )
      promise.then(() => show())
      return () => cancel()
    },
    actions: [{ label: 'Suivant', action: 'next' }],
  },
  {
    id: 'we-complete',
    type: 'dialog',
    title: 'Visite terminée',
    description: 'Vous avez appris à utiliser waitForElement pour le contenu dynamique.',
    actions: [{ label: 'Terminer', action: 'dismiss' }],
  },
]

const waitElementTour = useTour({ steps: waitElementSteps })

const addWaitElementItem = () => {
  waitElementItems.value = [
    ...waitElementItems.value,
    `Élément ${waitElementItems.value.length + 1}`,
  ]
}

// ─── Async Tour ──────────────────────────────────────────────
const asyncSteps: TourStepDetails[] = [
  {
    id: 'async-intro',
    type: 'dialog',
    title: 'Chargement asynchrone',
    description: "Cette visite charge des données avant d'afficher une étape.",
    actions: [{ label: 'Suivant', action: 'next' }],
  },
  {
    id: 'async-user',
    type: 'tooltip',
    title: 'Chargement...',
    description: 'Récupération des données utilisateur...',
    target: () => document.querySelector<HTMLElement>('#async-user-card'),
    effect({ show, update }) {
      const controller = new AbortController()

      fetch('https://api.github.com/users/segunadebayo', { signal: controller.signal })
        .then((res) => res.json())
        .then((data) => {
          update({
            title: `Bienvenue, ${data.name || data.login} !`,
            description: `${data.public_repos} dépôts publics et ${data.followers} abonnés.`,
          })
          show()
        })
        .catch(() => {
          update({
            title: 'Profil utilisateur',
            description: 'Impossible de charger les données. Veuillez réessayer.',
          })
          show()
        })

      return () => controller.abort()
    },
    actions: [
      { label: 'Précédent', action: 'prev' },
      { label: 'Suivant', action: 'next' },
    ],
  },
  {
    id: 'async-complete',
    type: 'dialog',
    title: 'Visite terminée',
    description: "L'étape asynchrone a chargé les données depuis l'API GitHub.",
    actions: [{ label: 'Terminer', action: 'dismiss' }],
  },
]

const asyncTour = useTour({ steps: asyncSteps })

// ─── Events Tour ─────────────────────────────────────────────
const eventLogs = ref<string[]>([])

const addEventLog = (message: string) => {
  eventLogs.value = [...eventLogs.value, message]
}

const eventSteps: TourStepDetails[] = [
  {
    id: 'e1',
    type: 'tooltip',
    title: 'Première étape',
    description: "Observez le journal d'événements ci-dessous pendant la navigation.",
    target: () => document.querySelector<HTMLElement>('#event-1'),
    actions: [{ label: 'Suivant', action: 'next' }],
  },
  {
    id: 'e2',
    type: 'tooltip',
    title: 'Deuxième étape',
    description: "Chaque changement d'étape déclenche un événement.",
    target: () => document.querySelector<HTMLElement>('#event-2'),
    actions: [
      { label: 'Précédent', action: 'prev' },
      { label: 'Suivant', action: 'next' },
    ],
  },
  {
    id: 'e3',
    type: 'tooltip',
    title: 'Dernière étape',
    description: 'Terminez la visite pour voir le changement de statut.',
    target: () => document.querySelector<HTMLElement>('#event-3'),
    actions: [
      { label: 'Précédent', action: 'prev' },
      { label: 'Terminer', action: 'dismiss' },
    ],
  },
]

const eventTour = useTour({
  steps: eventSteps,
  onStepChange(details) {
    addEventLog(`Étape changée : ${details.stepId}`)
  },
  onStatusChange(details) {
    addEventLog(`Statut : ${details.status}`)
  },
})

// ─── Mixed Types Tour ────────────────────────────────────────
const mixedSteps: TourStepDetails[] = [
  {
    id: 'm-welcome',
    type: 'dialog',
    title: 'Bienvenue !',
    description:
      "Cette visite montre les différents types d'étapes : dialogue, tooltip et flottant.",
    actions: [{ label: 'Commencer', action: 'next' }],
  },
  {
    id: 'm-tooltip',
    type: 'tooltip',
    title: 'Étape Tooltip',
    description: 'Cette étape apparaît comme un tooltip ancré à un élément spécifique.',
    target: () => document.querySelector<HTMLElement>('#mixed-target'),
    actions: [
      { label: 'Précédent', action: 'prev' },
      { label: 'Suivant', action: 'next' },
    ],
  },
  {
    id: 'm-floating',
    type: 'floating',
    placement: 'bottom-end',
    title: 'Étape flottante',
    description:
      "Cette étape flotte à une position fixe sur l'écran, indépendante de tout élément cible.",
    actions: [
      { label: 'Précédent', action: 'prev' },
      { label: 'Suivant', action: 'next' },
    ],
  },
  {
    id: 'm-complete',
    type: 'dialog',
    title: 'Visite terminée !',
    description: "Vous avez vu tous les types d'étapes disponibles.",
    actions: [{ label: 'Terminer', action: 'dismiss' }],
  },
]

const mixedTour = useTour({ steps: mixedSteps })

// ─── Scenario management ─────────────────────────────────────
const scenarios = [
  { id: 'basic' as const, label: 'Basique' },
  { id: 'progress' as const, label: 'Barre de progression' },
  { id: 'skip' as const, label: 'Ignorer' },
  { id: 'keyboard' as const, label: 'Navigation clavier' },
  { id: 'waitClick' as const, label: 'Attendre un clic' },
  { id: 'waitInput' as const, label: 'Attendre une saisie' },
  { id: 'waitElement' as const, label: 'Attendre un élément' },
  { id: 'async' as const, label: 'Asynchrone' },
  { id: 'events' as const, label: 'Événements' },
  { id: 'mixed' as const, label: 'Types mixtes' },
]
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Scenario selector -->
    <div class="flex flex-wrap gap-2">
      <UIButton
        v-for="scenario in scenarios"
        :key="scenario.id"
        :variant="activeScenario === scenario.id ? 'default' : 'subtle'"
        :intent="activeScenario === scenario.id ? 'primary' : 'neutral'"
        size="sm"
        @click="activeScenario = scenario.id"
      >
        {{ scenario.label }}
      </UIButton>
    </div>

    <!-- Scenario content -->
    <div class="flex flex-col gap-4">
      <!-- Basic scenario -->
      <div v-if="activeScenario === 'basic'" class="flex flex-col gap-4">
        <UIButton
          variant="default"
          intent="primary"
          icon="tabler:sparkles"
          @click="basicTour.start()"
        >
          Lancer la visite
        </UIButton>
        <div class="flex gap-3">
          <UICardBase id="basic-upload" class="flex items-center gap-2">
            <Icon name="tabler:upload" class="size-5" />
            <span class="txt-label">Téléverser</span>
          </UICardBase>
          <UICardBase id="basic-save" class="flex items-center gap-2">
            <Icon name="tabler:device-floppy" class="size-5" />
            <span class="txt-label">Sauvegarder</span>
          </UICardBase>
        </div>
        <UITour show-progress-bar :tour="basicTour" intent="neutral" size="md" />
      </div>

      <!-- Progress scenario -->
      <div v-if="activeScenario === 'progress'" class="flex flex-col gap-4">
        <UIButton
          variant="default"
          intent="primary"
          icon="tabler:sparkles"
          @click="progressTour.start()"
        >
          Lancer la visite avec barre de progression
        </UIButton>
        <div class="flex flex-wrap gap-3">
          <UICardBase id="progress-1" class="txt-label">Étape 1</UICardBase>
          <UICardBase id="progress-2" class="txt-label">Étape 2</UICardBase>
          <UICardBase id="progress-3" class="txt-label">Étape 3</UICardBase>
          <UICardBase id="progress-4" class="txt-label">Étape 4</UICardBase>
        </div>
        <UITour :tour="progressTour" intent="neutral" size="md" show-progress-bar />
      </div>

      <!-- Skip scenario -->
      <div v-if="activeScenario === 'skip'" class="flex flex-col gap-4">
        <UIButton
          variant="default"
          intent="primary"
          icon="tabler:sparkles"
          @click="skipTour.start()"
        >
          Lancer la visite avec option ignorer
        </UIButton>
        <div class="flex gap-3">
          <UICardBase id="skip-1" class="txt-label">Élément 1</UICardBase>
          <UICardBase id="skip-2" class="txt-label">Élément 2</UICardBase>
          <UICardBase id="skip-3" class="txt-label">Élément 3</UICardBase>
        </div>
        <UITour :tour="skipTour" intent="neutral" size="md" />
      </div>

      <!-- Keyboard scenario -->
      <div v-if="activeScenario === 'keyboard'" class="flex flex-col gap-4">
        <UIButton
          variant="default"
          intent="primary"
          icon="tabler:sparkles"
          @click="keyboardTour.start()"
        >
          Lancer la visite (flèches + Échap)
        </UIButton>
        <UIAlert
          type="info"
          title="Navigation clavier"
          description="Utilisez les flèches pour naviguer, Échap pour fermer"
        />
        <div class="flex gap-3">
          <UICardBase id="key-1" class="txt-label">Étape 1</UICardBase>
          <UICardBase id="key-2" class="txt-label">Étape 2</UICardBase>
          <UICardBase id="key-3" class="txt-label">Étape 3</UICardBase>
        </div>
        <UITour :tour="keyboardTour" intent="neutral" size="md" />
      </div>

      <!-- Wait for Click scenario -->
      <div v-if="activeScenario === 'waitClick'" class="flex flex-col gap-4">
        <UIButton
          variant="default"
          intent="primary"
          icon="tabler:sparkles"
          @click="waitClickTour.start()"
        >
          Lancer la visite interactive
        </UIButton>
        <div class="flex gap-3">
          <UIButton id="wc-add-btn" variant="default" intent="primary" icon="tabler:plus">
            Ajouter un élément
          </UIButton>
          <UIButton id="wc-edit-btn" variant="subtle" intent="neutral" icon="tabler:pencil">
            Modifier
          </UIButton>
        </div>
        <UITour :tour="waitClickTour" intent="neutral" size="md" />
      </div>

      <!-- Wait for Input scenario -->
      <div v-if="activeScenario === 'waitInput'" class="flex flex-col gap-4">
        <UIButton
          variant="default"
          intent="primary"
          icon="tabler:sparkles"
          @click="waitInputTour.start()"
        >
          Lancer le tutoriel formulaire
        </UIButton>
        <UICardBase class="max-w-sm">
          <div class="flex flex-col gap-4">
            <UIFormInput
              id="wi-name-input"
              label="Nom"
              placeholder="Entrez votre nom"
              icon="tabler:user"
            />
            <UIFormInput
              id="wi-email-input"
              label="Email"
              type="email"
              placeholder="Entrez votre email"
              icon="tabler:mail"
            />
            <div class="flex items-center gap-2">
              <UISwitch id="wi-terms-checkbox" />
              <label for="wi-terms-checkbox" class="txt-caption text-neutral-text-default">
                J'accepte les conditions d'utilisation
              </label>
            </div>
          </div>
        </UICardBase>
        <UITour :tour="waitInputTour" intent="neutral" size="md" />
      </div>

      <!-- Wait for Element scenario -->
      <div v-if="activeScenario === 'waitElement'" class="flex flex-col gap-4">
        <UIButton
          variant="default"
          intent="primary"
          icon="tabler:sparkles"
          @click="waitElementTour.start()"
        >
          Lancer la visite (éléments dynamiques)
        </UIButton>
        <UIButton
          id="we-add-btn"
          variant="subtle"
          intent="neutral"
          icon="tabler:plus"
          @click="addWaitElementItem"
        >
          Ajouter un élément
        </UIButton>
        <UICardBase>
          <div class="flex flex-col gap-2">
            <div
              v-for="(item, index) in waitElementItems"
              :key="item"
              class="flex items-center justify-between"
              :data-item="
                index === waitElementItems.length - 1 && waitElementItems.length > 2
                  ? 'new'
                  : undefined
              "
            >
              <span class="txt-label text-neutral-text-default">{{ item }}</span>
              <UIBadge
                v-if="index === waitElementItems.length - 1 && waitElementItems.length > 2"
                intent="primary"
                label="Nouveau"
              />
            </div>
          </div>
        </UICardBase>
        <UITour :tour="waitElementTour" intent="neutral" size="md" />
      </div>

      <!-- Async scenario -->
      <div v-if="activeScenario === 'async'" class="flex flex-col gap-4">
        <UIButton
          variant="default"
          intent="primary"
          icon="tabler:sparkles"
          @click="asyncTour.start()"
        >
          Lancer la visite asynchrone
        </UIButton>
        <UICardBase id="async-user-card" class="flex items-center gap-3">
          <Icon name="tabler:user-circle" class="size-8 text-neutral-text-subtle" />
          <span class="txt-label text-neutral-text-default">Carte profil utilisateur</span>
        </UICardBase>
        <UITour :tour="asyncTour" intent="neutral" size="md" />
      </div>

      <!-- Events scenario -->
      <div v-if="activeScenario === 'events'" class="flex flex-col gap-4">
        <UIButton
          variant="default"
          intent="primary"
          icon="tabler:sparkles"
          @click="eventTour.start()"
        >
          Lancer la visite avec journal d'événements
        </UIButton>
        <div class="flex gap-3">
          <UICardBase id="event-1" class="txt-label">Étape 1</UICardBase>
          <UICardBase id="event-2" class="txt-label">Étape 2</UICardBase>
          <UICardBase id="event-3" class="txt-label">Étape 3</UICardBase>
        </div>
        <UICardBase class="max-h-32 overflow-y-auto">
          <div class="flex flex-col gap-1">
            <strong class="txt-caption text-neutral-text-default">Journal d'événements :</strong>
            <div v-if="eventLogs.length === 0" class="text-neutral-text-subtle">
              Lancez la visite pour voir les événements
            </div>
            <div v-for="(log, i) in eventLogs" :key="i" class="font-mono text-neutral-text-subtle">
              {{ log }}
            </div>
          </div>
        </UICardBase>
        <UITour :tour="eventTour" intent="neutral" size="md" />
      </div>

      <!-- Mixed Types scenario -->
      <div v-if="activeScenario === 'mixed'" class="flex flex-col gap-4">
        <UIButton
          variant="default"
          intent="primary"
          icon="tabler:sparkles"
          @click="mixedTour.start()"
        >
          Lancer la visite (types mixtes)
        </UIButton>
        <UICardBase id="mixed-target" class="txt-label">Élément cible</UICardBase>
        <UITour :tour="mixedTour" intent="neutral" size="md" />
      </div>
    </div>
  </div>
</template>
