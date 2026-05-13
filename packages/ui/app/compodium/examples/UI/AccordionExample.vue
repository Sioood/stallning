<script setup lang="ts">
const controlled = ref<string[]>([])

const faqItems = [
  {
    value: 'what',
    trigger: 'What is this UI library?',
    content:
      'A high-performance, accessible component library built on top of Ark UI and Tailwind CSS, specifically designed for Nuxt 4.',
  },
  {
    value: 'why',
    trigger: 'Why choose this over others?',
    content:
      'It focuses on extreme type safety, modularity via Nuxt layers, and providing a cohesive design system that is easy to extend.',
  },
  {
    value: 'how',
    trigger: 'How do I get started?',
    content:
      'Simply install the package, add it to your nuxt.config.ts layers, and start using the prefixed UI components.',
  },
]
</script>

<template>
  <div class="mx-auto flex max-w-3xl flex-col gap-12 p-6">
    <section class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <h2 class="text-xl font-bold">Standard FAQ</h2>
        <p class="text-sm text-neutral-text-subtle">
          Clean, neutral accordion for documentation and FAQs.
        </p>
      </div>
      <UIAccordion collapsible :default-value="['what']">
        <UIAccordionItem v-for="item in faqItems" :key="item.value" :value="item.value">
          <UIAccordionItemTrigger>
            <span class="font-medium">{{ item.trigger }}</span>
            <UIAccordionItemIndicator />
          </UIAccordionItemTrigger>
          <UIAccordionItemContent>
            {{ item.content }}
          </UIAccordionItemContent>
        </UIAccordionItem>
      </UIAccordion>
    </section>

    <div class="grid grid-cols-1 gap-12 md:grid-cols-2">
      <section class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <h2 class="text-xl font-bold">Colored Variants</h2>
          <p class="text-sm text-neutral-text-subtle">Primary and Accent intents.</p>
        </div>
        <UIAccordion intent="primary" collapsible class="flex flex-col gap-2">
          <UIAccordionItem value="p1" class="rounded-md border border-primary-border-subtle">
            <UIAccordionItemTrigger class="px-3 py-2">
              System Health
              <UIAccordionItemIndicator />
            </UIAccordionItemTrigger>
            <UIAccordionItemContent class="p-3 text-sm">
              All systems operational. 99.9% uptime reported.
            </UIAccordionItemContent>
          </UIAccordionItem>
          <UIAccordionItem value="p2" class="rounded-md border border-primary-border-subtle">
            <UIAccordionItemTrigger class="px-3 py-2">
              Security Audit
              <UIAccordionItemIndicator />
            </UIAccordionItemTrigger>
            <UIAccordionItemContent class="p-3 text-sm">
              Last audit performed 2 days ago. No vulnerabilities found.
            </UIAccordionItemContent>
          </UIAccordionItem>
        </UIAccordion>
      </section>

      <section class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <h2 class="text-xl font-bold">Horizontal</h2>
          <p class="text-sm text-neutral-text-subtle">For side-by-side content switching.</p>
        </div>
        <UIAccordion
          orientation="horizontal"
          collapsible
          intent="accent"
          class="h-40 overflow-hidden rounded-lg border border-accent-border-subtle"
        >
          <UIAccordionItem value="h1" class="border-r border-accent-border-subtle">
            <UIAccordionItemTrigger class="flex h-full items-center justify-center px-4">
              <span class="vertical-text">Profile</span>
              <UIAccordionItemIndicator class="mt-2 rotate-90 data-[state=open]:-rotate-90" />
            </UIAccordionItemTrigger>
            <UIAccordionItemContent class="min-w-[200px] p-4">
              User settings and preferences.
            </UIAccordionItemContent>
          </UIAccordionItem>
          <UIAccordionItem value="h2">
            <UIAccordionItemTrigger class="flex h-full items-center justify-center px-4">
              <span class="vertical-text">Stats</span>
              <UIAccordionItemIndicator class="mt-2 rotate-90 data-[state=open]:-rotate-90" />
            </UIAccordionItemTrigger>
            <UIAccordionItemContent class="min-w-[200px] p-4">
              Usage statistics and analytics.
            </UIAccordionItemContent>
          </UIAccordionItem>
        </UIAccordion>
      </section>
    </div>

    <section class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <h2 class="text-xl font-bold">Controlled State</h2>
        <p class="text-sm text-neutral-text-subtle">Manage expansion from outside the component.</p>
      </div>
      <div class="mb-2 flex gap-2">
        <UIButton size="sm" variant="subtle" @click="controlled = ['c1']">Open 1</UIButton>
        <UIButton size="sm" variant="subtle" @click="controlled = ['c1', 'c2']">Open All</UIButton>
        <UIButton size="sm" variant="subtle" @click="controlled = []">Close All</UIButton>
      </div>
      <UIAccordion v-model="controlled" multiple collapsible intent="secondary">
        <UIAccordionItem value="c1">
          <UIAccordionItemTrigger>Panel One <UIAccordionItemIndicator /></UIAccordionItemTrigger>
          <UIAccordionItemContent>Dynamic content for panel one.</UIAccordionItemContent>
        </UIAccordionItem>
        <UIAccordionItem value="c2">
          <UIAccordionItemTrigger>Panel Two <UIAccordionItemIndicator /></UIAccordionItemTrigger>
          <UIAccordionItemContent>Dynamic content for panel two.</UIAccordionItemContent>
        </UIAccordionItem>
      </UIAccordion>
    </section>
  </div>
</template>

<style scoped>
.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}
</style>
