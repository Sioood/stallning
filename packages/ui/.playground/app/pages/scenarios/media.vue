<script setup lang="ts">
definePageMeta({ layout: 'scenario' })

const upvotePressed = ref(false)
const downvotePressed = ref(false)
const bookmarkPressed = ref(false)
const crewOpen = ref(false)
const awardsOpen = ref(true)
const activeNav = ref('accueil')

const movie = {
  awards: [
    "Nomination à l'Oscar de la meilleure actrice (Ellen Burstyn)",
    '37 récompenses et 68 nominations internationales',
  ],
  casting: [
    'Ellen Burstyn',
    'Jared Leto',
    'Jennifer Connelly',
    'Marlon Wayans',
    'Christopher McDonald',
    'Mark Margolis',
  ],
  classification: 'Interdit -12',
  country: 'États-Unis',
  director: 'Darren Aronofsky',
  festival: 'Cannes 2000 (hors compétition)',
  genre: 'Drame',
  imdb: '8.3',
  imdbUrl: 'https://www.imdb.com/fr/title/tt0180093/',
  language: 'VFF, VO',
  metascore: '71',
  music: 'Clint Mansell',
  originalTitle: 'Requiem for a Dream',
  posterUrl:
    'https://m.media-amazon.com/images/M/MV5BOTdiNzJlOWUtNWMwNS00NmFlLWI0YTEtZmI3YjIzZWUyY2Y3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX101_CR0,0,101,150_.jpg',
  releaseDate: '6 octobre 2000',
  runtime: '1 h 42 min',
  synopsis:
    "À Coney Island, Sara Goldfarb, veuve recluse accro à la télévision, rêve de participer à son émission favorite. Son fils Harry, sa petite amie Marion et leur ami Tyrone vivent dans l'euphorie de l'héroïne jusqu'à ce que leurs addictions les entraînent dans une spirale d'illusions, de désespoir et d'autodestruction.",
  title: 'Requiem for a Dream',
  tmdbUrl: 'https://www.themoviedb.org/movie/641',
  writers: 'Hubert Selby Jr., Darren Aronofsky',
  year: '2000',
}

const navTabs = [
  { icon: 'tabler:home', label: 'Accueil', value: 'accueil' },
  { icon: 'tabler:search', label: 'Parcourir', value: 'parcourir' },
  { icon: 'tabler:flame', label: 'Top', value: 'top' },
  { icon: 'tabler:heart', label: 'Favoris', value: 'favoris' },
  { icon: 'tabler:history', label: 'Histoire', value: 'histoire' },
  { icon: 'tabler:settings', label: 'Paramètres', value: 'paramètres' },
  { icon: 'tabler:help', label: 'Aide', value: 'aide' },
  { icon: 'tabler:mail', label: 'Contact', value: 'contact' },
  { icon: 'tabler:shield', label: 'Politique', value: 'politique' },
  { icon: 'tabler:file-check', label: 'Conditions', value: 'conditions' },
  { icon: 'tabler:file-text', label: 'Mentions', value: 'mentions' },
] as const

const heroMeta = [
  movie.genre,
  movie.runtime,
  movie.classification,
  movie.year,
  movie.country,
] as const

const scoreCards = [
  { label: 'IMDb', tone: 'accent' as const, value: `${movie.imdb}/10` },
  { label: 'Metascore', tone: 'default' as const, value: movie.metascore },
  { label: 'Durée', tone: 'default' as const, value: movie.runtime },
  { label: 'Année', tone: 'default' as const, value: movie.year },
  { label: 'Classification', tone: 'default' as const, value: movie.classification },
  { label: 'Pays', tone: 'default' as const, value: movie.country },
] as const

const facts = [
  { label: 'Titre original', value: movie.originalTitle },
  { label: 'Réalisateur', value: movie.director },
  { label: 'Scénario', value: movie.writers },
  { label: 'Musique', value: movie.music },
  { label: 'Langue', value: movie.language },
  { label: 'Festival', value: movie.festival },
  { label: 'Sortie', value: movie.releaseDate },
] as const

const scoreValueClass = {
  accent: 'text-accent-text',
  default: 'text-neutral-text',
} as const

const prevMovie = 'American Beauty (1999)'
const nextMovie = 'Memento (2000)'

const collapsibleTriggerUi = {
  indicator: 'sr-only',
  trigger: 'border-0 px-4 py-3',
}
</script>

<template>
  <div
    class="flex min-h-[calc(100svh-3.25rem)] bg-primary-bg text-neutral-text dark:bg-primary-bg-subtle"
  >
    <aside
      class="fixed top-[3.25rem] z-30 flex h-[calc(100svh-3.25rem)] w-56 flex-col border-r border-neutral-border-subtle bg-neutral-surface-subtle md:w-60"
    >
      <div class="border-b border-neutral-border-subtle px-5 py-5">
        <p class="txt-h6 font-mono font-bold tracking-wider text-neutral-text">Ställning TV</p>
        <p class="txt-caption mt-1 text-neutral-text-subtle">Catalogue cinéma</p>
      </div>

      <nav class="flex-1 overflow-y-auto px-2 py-3">
        <UITabs
          v-model="activeNav"
          orientation="vertical"
          variant="pill-subtle"
          intent="neutral"
          size="sm"
          :options="[...navTabs]"
          :render-content="false"
          :ui="{
            root: 'w-full',
            list: 'w-full flex-col border-none bg-transparent p-0',
            trigger: 'w-full justify-start gap-2',
          }"
        />
      </nav>

      <div class="border-t border-neutral-border-subtle px-5 py-4">
        <div class="flex items-center gap-2">
          <span class="size-2 shrink-0 rounded-full bg-success-fill" />
          <span class="txt-caption text-neutral-text-subtle">Service online</span>
        </div>
        <p class="txt-caption mt-1 text-neutral-text-muted">v1.0.0</p>
      </div>
    </aside>

    <main class="ml-56 min-w-0 flex-1 md:ml-60">
      <div class="border-b border-neutral-border-subtle px-6 py-3 md:px-10 lg:px-14">
        <div class="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <UIButton
            variant="ghost"
            intent="neutral"
            size="sm"
            class="max-w-[45%] min-w-0 justify-start gap-2"
          >
            <Icon name="tabler:arrow-left" class="size-4 shrink-0" />
            <span class="truncate text-neutral-text-subtle">{{ prevMovie }}</span>
          </UIButton>
          <UIButton
            variant="ghost"
            intent="neutral"
            size="sm"
            class="max-w-[45%] min-w-0 justify-end gap-2"
          >
            <span class="truncate text-neutral-text-subtle">{{ nextMovie }}</span>
            <Icon name="tabler:arrow-right" class="size-4 shrink-0" />
          </UIButton>
        </div>
      </div>

      <div
        class="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-8 md:gap-8 md:px-10 md:py-10 lg:px-14"
      >
        <UICardBase variant="subtle" intent="neutral" size="lg" class="w-full">
          <div class="flex flex-col gap-8 md:flex-row md:items-start md:gap-8">
            <div class="mx-auto w-44 shrink-0 sm:w-52 md:mx-0 md:w-48">
              <NuxtImg
                :src="movie.posterUrl"
                :alt="`Affiche de ${movie.title}`"
                width="192"
                height="288"
                class="aspect-2/3 w-full rounded-xs border border-neutral-border-subtle object-cover"
              />
            </div>

            <div class="flex min-w-0 flex-1 flex-col gap-5">
              <div class="flex flex-col gap-2">
                <div class="flex flex-wrap items-center gap-2">
                  <UIBadge :label="movie.genre" intent="accent" size="sm" />
                  <span class="txt-caption text-neutral-text-muted">{{ movie.festival }}</span>
                </div>
                <h1 class="txt-h2 text-balance text-neutral-text">
                  {{ movie.title }}
                  <span class="font-normal text-neutral-text-subtle">({{ movie.year }})</span>
                </h1>
                <p class="txt-caption text-neutral-text-subtle">
                  {{ heroMeta.join(' · ') }}
                </p>
              </div>

              <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
                <UICardBase
                  v-for="score in scoreCards"
                  :key="score.label"
                  variant="default"
                  intent="neutral"
                  size="sm"
                  class="flex flex-col gap-1"
                >
                  <span class="txt-caption text-neutral-text-muted">{{ score.label }}</span>
                  <span class="txt-label tabular-nums" :class="scoreValueClass[score.tone]">
                    {{ score.value }}
                  </span>
                </UICardBase>
              </div>

              <div class="flex flex-wrap items-center gap-2">
                <UIButton intent="accent" size="md" leading-icon="tabler:player-play">
                  Voir la bande-annonce
                </UIButton>
                <UIToggle
                  v-model:pressed="bookmarkPressed"
                  variant="subtle"
                  intent="neutral"
                  size="md"
                >
                  <template #on>
                    <Icon name="tabler:bookmark-filled" class="size-4 shrink-0" />
                    <span class="leading-none">Enregistré</span>
                  </template>
                  <template #off>
                    <Icon name="tabler:bookmark" class="size-4 shrink-0" />
                    <span class="leading-none">Marque-page</span>
                  </template>
                </UIToggle>
                <UIToggle
                  v-model:pressed="upvotePressed"
                  size="md"
                  variant="subtle"
                  intent="neutral"
                  aria-label="J'aime"
                >
                  <template #on>
                    <Icon name="tabler:thumb-up-filled" class="size-4 shrink-0" />
                  </template>
                  <template #off>
                    <Icon name="tabler:thumb-up" class="size-4 shrink-0" />
                  </template>
                </UIToggle>
                <UIToggle
                  v-model:pressed="downvotePressed"
                  size="md"
                  variant="subtle"
                  intent="neutral"
                  aria-label="Je n'aime pas"
                >
                  <template #on>
                    <Icon name="tabler:thumb-down-filled" class="size-4 shrink-0" />
                  </template>
                  <template #off>
                    <Icon name="tabler:thumb-down" class="size-4 shrink-0" />
                  </template>
                </UIToggle>
              </div>

              <div class="flex flex-wrap items-center gap-2">
                <UIButton
                  variant="subtle"
                  size="sm"
                  intent="accent"
                  leading-icon="tabler:external-link"
                  :to="movie.imdbUrl"
                  target="_blank"
                  text="IMDb"
                />
                <UIButton
                  variant="subtle"
                  size="sm"
                  intent="info"
                  leading-icon="tabler:external-link"
                  :to="movie.tmdbUrl"
                  target="_blank"
                  text="TMDB"
                />
                <UIButton
                  variant="subtle"
                  size="sm"
                  intent="neutral"
                  leading-icon="tabler:share"
                  text="Partager"
                />
              </div>
            </div>
          </div>
        </UICardBase>

        <div class="grid items-stretch gap-4 md:grid-cols-2">
          <UICardBase
            variant="subtle"
            intent="neutral"
            size="lg"
            :ui="{ root: 'h-full' }"
            class="flex h-full flex-col gap-3"
          >
            <h2 class="txt-label text-neutral-text-muted">Synopsis</h2>
            <p class="txt-base flex-1 leading-relaxed text-neutral-text">
              {{ movie.synopsis }}
            </p>
          </UICardBase>

          <UICardBase
            variant="subtle"
            intent="neutral"
            size="lg"
            :ui="{ root: 'h-full' }"
            class="flex h-full flex-col gap-3"
          >
            <h2 class="txt-label text-neutral-text-muted">Distribution</h2>
            <div class="flex flex-1 flex-wrap content-start gap-2">
              <UIBadge
                v-for="actor in movie.casting"
                :key="actor"
                :label="actor"
                intent="neutral"
                size="sm"
              />
            </div>
          </UICardBase>
        </div>

        <UICardBase variant="subtle" intent="neutral" size="lg" class="flex flex-col gap-4">
          <h2 class="txt-label text-neutral-text-muted">Fiche technique</h2>
          <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <UICardBase
              v-for="fact in facts"
              :key="fact.label"
              variant="default"
              intent="neutral"
              size="sm"
              class="flex flex-col gap-1"
            >
              <span class="txt-caption text-neutral-text-muted">{{ fact.label }}</span>
              <span class="txt-caption text-neutral-text">{{ fact.value }}</span>
            </UICardBase>
          </div>
        </UICardBase>

        <UICardBase
          variant="subtle"
          intent="neutral"
          size="lg"
          class="divide-y divide-neutral-border-subtle overflow-hidden p-0"
        >
          <UICollapsible v-model="crewOpen" :ui="collapsibleTriggerUi">
            <template #title>
              <div class="flex items-center gap-2">
                <Icon
                  :name="crewOpen ? 'tabler:chevron-down' : 'tabler:chevron-right'"
                  class="size-4 text-neutral-text-subtle"
                />
                <span class="txt-label text-neutral-text">Équipe artistique</span>
              </div>
            </template>
            <ul class="txt-base space-y-2 px-4 pb-4 text-neutral-text-subtle">
              <li><span class="text-neutral-text">Réalisation —</span> {{ movie.director }}</li>
              <li><span class="text-neutral-text">Scénario —</span> {{ movie.writers }}</li>
              <li><span class="text-neutral-text">Musique —</span> {{ movie.music }}</li>
            </ul>
          </UICollapsible>

          <UICollapsible v-model="awardsOpen" :ui="collapsibleTriggerUi">
            <template #title>
              <div class="flex items-center gap-2">
                <Icon
                  :name="awardsOpen ? 'tabler:chevron-down' : 'tabler:chevron-right'"
                  class="size-4 text-neutral-text-subtle"
                />
                <span class="txt-label text-neutral-text">Distinctions</span>
                <UIBadge :label="String(movie.awards.length)" intent="neutral" size="sm" />
              </div>
            </template>
            <ul class="txt-base list-disc space-y-1.5 px-4 pb-4 pl-8 text-neutral-text">
              <li v-for="award in movie.awards" :key="award">{{ award }}</li>
            </ul>
          </UICollapsible>
        </UICardBase>
      </div>
    </main>
  </div>
</template>
