<template>
  <NuxtPwaAssets />
  <div>
    <h1>{{ $t('hell') }}</h1>
    <p class="font-mono">{{ $t('namespace:hell') }}</p>
    <UIButton text="Open Storybook for component demos" intent="primary" />
  </div>
  <UIToast />
  <UIPwaNotifier />
</template>
