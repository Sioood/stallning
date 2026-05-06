<script setup lang="ts"></script>

<template>
  <div class="w-fit flex flex-col gap-6">
    <UITooltip content="I'm a tooltip" :open-delay="450" :close-delay="120" interactive>
      <template #trigger>
        <span class="block h-28 w-72 bg-primary-surface-inverse" />
      </template>
    </UITooltip>

    <UITooltip
      content="Following cursor"
      follow-cursor
      :open-delay="0"
      :close-delay="80"
      :positioning="{ placement: 'top-start', gutter: 8 }"
    >
      <template #trigger>
        <span class="block h-28 w-72 bg-neutral-surface-inverse" />
      </template>
    </UITooltip>

    <UITooltip
      content="Shared tooltip across multiple triggers"
      :positioning="{ placement: 'top' }"
    >
      <template #triggers="{ trigger: Trigger, onTriggerPointerMove }">
        <div class="flex join">
          <component
            :is="Trigger"
            v-for="i in [1, 2, 3]"
            :key="i"
            :value="i.toString()"
            class="join-item"
            @pointermove="onTriggerPointerMove($event)"
          >
            <UIToggle active-background>
              <template #on>
                <span>On</span>
              </template>
              <template #off>
                <span>Off</span>
              </template>
            </UIToggle>
          </component>
        </div>
      </template>
      <template #content="{ triggerValue }"> Trigger actif: {{ triggerValue ?? 'none' }} </template>
    </UITooltip>
  </div>
</template>
