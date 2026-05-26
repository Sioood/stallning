<script setup lang="ts">
import { useAvatar, type AvatarStatusChangeDetails } from '@ark-ui/vue/avatar'

const names = ['Ada Lovelace', 'Grace Hopper', 'Alan Turing'] as const
const intents = ['neutral', 'primary', 'secondary', 'accent'] as const
const sizes = ['sm', 'md', 'lg'] as const

const externalAvatar = useAvatar({ ids: { root: 'ext-avatar-root' } })
</script>

<template>
  <div class="mx-auto flex max-w-3xl flex-col gap-6 p-6">
    <section class="flex flex-col gap-4">
      <h3 class="text-xl font-bold">Basic</h3>
      <div class="flex flex-wrap items-center gap-4">
        <UIAvatar
          v-for="name in names"
          :key="name"
          :name="name"
          @status-change="(d: AvatarStatusChangeDetails) => console.log('statusChange', name, d)"
        />
        <UIAvatar />
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h3 class="text-xl font-bold">Intents</h3>
      <div class="flex flex-wrap gap-4">
        <UIAvatar v-for="intent in intents" :key="intent" :intent name="Intent demo" />
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h3 class="text-xl font-bold">Sizes</h3>
      <div class="flex flex-wrap items-end gap-4">
        <UIAvatar v-for="size in sizes" :key="size" :size name="Size demo" />
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h3 class="text-xl font-bold">Letters only</h3>
      <UIAvatar name="Jane Doe" letters-only />
      <UIAvatar letters-only />
    </section>

    <section class="flex flex-col gap-4">
      <h3 class="text-xl font-bold">Custom src</h3>
      <UIAvatar name="Broken" src="https://example.invalid/not-found.png" />
    </section>

    <section class="flex flex-col gap-4">
      <h3 class="text-xl font-bold">Context</h3>
      <UIAvatar name="Context user">
        <!-- <UIAvatarContext v-slot="ctx">
          <p class="mt-2 text-xs text-neutral-text-subtle">status: {{ ctx.loaded }}</p>
        </UIAvatarContext> -->
      </UIAvatar>
    </section>

    <section class="flex flex-col gap-4">
      <h3 class="text-xl font-bold">RootProvider</h3>
      <UIAvatar :value="externalAvatar" name="Provider mode" />
    </section>
  </div>
</template>
