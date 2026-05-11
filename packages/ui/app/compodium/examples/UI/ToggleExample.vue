<template>
  <div class="flex flex-wrap gap-2">
    <UIToggle>
      <template #on>
        <Icon name="tabler:eye-off" class="size-4 shrink-0" />
      </template>
      <template #off>
        <Icon name="tabler:eye" class="size-4 shrink-0" />
      </template>
    </UIToggle>

    <div class="join">
      <UIToggle v-for="i in 3" :key="i" class="join-item" active-background>
        <template #on>
          <Icon name="tabler:eye-off" class="size-4 shrink-0" />
        </template>
        <template #off>
          <Icon name="tabler:eye" class="size-4 shrink-0" />
        </template>
      </UIToggle>
    </div>
  </div>
</template>
