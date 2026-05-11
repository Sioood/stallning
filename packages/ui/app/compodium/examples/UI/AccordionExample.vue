<script setup lang="ts">
import { useAccordion } from '@ark-ui/vue/accordion'

const programmatic = useAccordion({
  multiple: true,
  collapsible: true,
  defaultValue: ['pg-a'],
})

const controlled = ref<string[]>([])
</script>

<template>
  <div class="flex flex-col gap-10 p-4">
    <section class="flex flex-col gap-2">
      <p class="txt-label text-neutral-text-subtle">Default · neutral · vertical</p>
      <UIAccordion collapsible :default-value="['faq-1']" intent="neutral" size="md">
        <UIAccordionItem value="faq-1">
          <UIAccordionItemTrigger>
            What is Stallning?
            <UIAccordionItemIndicator />
          </UIAccordionItemTrigger>
          <UIAccordionItemContent>
            A Nuxt 4 monorepo template with layered UI and shared tooling.
          </UIAccordionItemContent>
        </UIAccordionItem>
        <UIAccordionItem value="faq-2">
          <UIAccordionItemTrigger>
            Where do components live?
            <UIAccordionItemIndicator />
          </UIAccordionItemTrigger>
          <UIAccordionItemContent>
            In <code class="txt-caption">packages/ui</code> as a Nuxt layer.
          </UIAccordionItemContent>
        </UIAccordionItem>
      </UIAccordion>
    </section>

    <section class="flex flex-col gap-2">
      <p class="txt-label text-neutral-text-subtle">Multiple · primary · lazy mount</p>
      <UIAccordion collapsible intent="primary" lazy-mount multiple :default-value="['m-1']">
        <UIAccordionItem value="m-1">
          <UIAccordionItemTrigger>
            First
            <UIAccordionItemIndicator />
          </UIAccordionItemTrigger>
          <UIAccordionItemContent>Content for the first panel.</UIAccordionItemContent>
        </UIAccordionItem>
        <UIAccordionItem value="m-2">
          <UIAccordionItemTrigger>
            Second
            <UIAccordionItemIndicator />
          </UIAccordionItemTrigger>
          <UIAccordionItemContent>Content for the second panel.</UIAccordionItemContent>
        </UIAccordionItem>
      </UIAccordion>
    </section>

    <section class="flex flex-col gap-2">
      <p class="txt-label text-neutral-text-subtle">Horizontal orientation · accent</p>
      <UIAccordion
        class="max-w-full"
        collapsible
        intent="accent"
        orientation="horizontal"
        size="md"
      >
        <UIAccordionItem value="h-1">
          <UIAccordionItemTrigger>
            A
            <UIAccordionItemIndicator />
          </UIAccordionItemTrigger>
          <UIAccordionItemContent>Panel A body.</UIAccordionItemContent>
        </UIAccordionItem>
        <UIAccordionItem value="h-2">
          <UIAccordionItemTrigger>
            B
            <UIAccordionItemIndicator />
          </UIAccordionItemTrigger>
          <UIAccordionItemContent>Panel B body.</UIAccordionItemContent>
        </UIAccordionItem>
      </UIAccordion>
    </section>

    <section class="flex flex-col gap-2">
      <p class="txt-label text-neutral-text-subtle">Disabled root</p>
      <UIAccordion disabled intent="secondary" :default-value="['d-1']">
        <UIAccordionItem value="d-1">
          <UIAccordionItemTrigger>
            Locked
            <UIAccordionItemIndicator />
          </UIAccordionItemTrigger>
          <UIAccordionItemContent
            >Not interactive when the root is disabled.</UIAccordionItemContent
          >
        </UIAccordionItem>
      </UIAccordion>
    </section>

    <section class="flex flex-col gap-2">
      <p class="txt-label text-neutral-text-subtle">Item disabled · ItemContext slot</p>
      <UIAccordion collapsible intent="neutral" size="md">
        <UIAccordionItem value="ok">
          <UIAccordionItemTrigger>
            Available
            <UIAccordionItemIndicator />
          </UIAccordionItemTrigger>
          <UIAccordionItemContent>Open me anytime.</UIAccordionItemContent>
        </UIAccordionItem>
        <UIAccordionItem disabled value="blocked">
          <UIAccordionItemContext v-slot="{ expanded, disabled }">
            <UIAccordionItemTrigger>
              <span class="flex flex-1 items-center justify-between gap-2">
                <span
                  >Unavailable ({{ expanded ? 'open' : 'closed' }}, disabled: {{ disabled }})</span
                >
                <UIAccordionItemIndicator />
              </span>
            </UIAccordionItemTrigger>
          </UIAccordionItemContext>
          <UIAccordionItemContent>Should not receive focus.</UIAccordionItemContent>
        </UIAccordionItem>
      </UIAccordion>
    </section>

    <section class="flex flex-col gap-2">
      <p class="txt-label text-neutral-text-subtle">Controlled · v-model</p>
      <UIAccordion v-model="controlled" collapsible multiple>
        <UIAccordionItem value="c-1">
          <UIAccordionItemTrigger>
            One
            <UIAccordionItemIndicator />
          </UIAccordionItemTrigger>
          <UIAccordionItemContent>Controlled panel one.</UIAccordionItemContent>
        </UIAccordionItem>
        <UIAccordionItem value="c-2">
          <UIAccordionItemTrigger>
            Two
            <UIAccordionItemIndicator />
          </UIAccordionItemTrigger>
          <UIAccordionItemContent>Controlled panel two.</UIAccordionItemContent>
        </UIAccordionItem>
      </UIAccordion>
      <p class="txt-caption text-neutral-text-subtle">
        model: {{ controlled.join(', ') || '(empty)' }}
      </p>
      <div class="flex gap-2">
        <UIButton
          size="sm"
          text="Open both"
          variant="subtle"
          @click="controlled = ['c-1', 'c-2']"
        />
        <UIButton size="sm" text="Clear" variant="subtle" @click="controlled = []" />
      </div>
    </section>

    <section class="flex flex-col gap-2">
      <p class="txt-label text-neutral-text-subtle">useAccordion + UIAccordionRootProvider</p>
      <UIAccordionRootProvider
        :value="programmatic"
        class="max-w-lg"
        collapsible
        intent="neutral"
        lazy-mount
        multiple
        unmount-on-exit
      >
        <UIAccordionItem value="pg-a">
          <UIAccordionItemTrigger>
            Programmatic A
            <UIAccordionItemIndicator />
          </UIAccordionItemTrigger>
          <UIAccordionItemContent>Mounted via RootProvider.</UIAccordionItemContent>
        </UIAccordionItem>
        <UIAccordionItem value="pg-b">
          <UIAccordionItemTrigger>
            Programmatic B
            <UIAccordionItemIndicator />
          </UIAccordionItemTrigger>
          <UIAccordionItemContent
            >Shares the same chrome tokens as UIAccordion.</UIAccordionItemContent
          >
        </UIAccordionItem>
      </UIAccordionRootProvider>
    </section>

    <section class="flex flex-col gap-2">
      <p class="txt-label text-neutral-text-subtle">Custom indicator (slot) · ui overrides</p>
      <UIAccordion collapsible intent="primary">
        <UIAccordionItem value="x-1" :ui="{ root: 'ring-1 ring-primary-border-subtle' }">
          <UIAccordionItemTrigger :ui="{ root: 'justify-start gap-3' }">
            Custom chevron
            <UIAccordionItemIndicator>
              <Icon class="size-full" name="tabler:plus" />
            </UIAccordionItemIndicator>
          </UIAccordionItemTrigger>
          <UIAccordionItemContent>Slot replaces the default Tabler chevron.</UIAccordionItemContent>
        </UIAccordionItem>
      </UIAccordion>
    </section>

    <section class="txt-caption text-neutral-text-subtle">
      <p>
        Raw Ark primitives (<code>Accordion.Root</code>, <code>Accordion.Item</code>, …) are
        available from
        <code>@ark-ui/vue/accordion</code>
        for fully custom markup.
      </p>
    </section>
  </div>
</template>
