<script setup lang="ts">
const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

const value = ref<string[]>(['react'])
</script>

<template>
  <UIFormCheckboxGroup
    v-model="value"
    helper-text="Choose your preferred frameworks"
    label="Select frameworks"
    name="framework"
    required
    :items="items"
  />
</template>
