<script setup lang="ts">
import { ref } from 'vue'

const label = ref('')
const email = ref('')
const password = ref('')
const search = ref('')
</script>

<template>
  <div class="flex flex-col gap-4 max-w-sm">
    <UIInput v-model="label" label="Label" placeholder="Enter a label" />
    <UIInput v-model="email" label="Email" type="email" placeholder="you@example.com" required helper-text="We'll never share your email" />
    <UIInput v-model="password" label="Password" type="password" invalid>
      <template #error>Password must be at least 8 characters</template>
    </UIInput>
    <UIInput v-model="search" label="Search" placeholder="Type to search..." size="sm" />
  </div>
</template>
