<template>
  <NuxtPwaAssets />
  <div>
    <h1>{{ $t('hell') }}</h1>
    <p class="font-mono">{{ $t('namespace:hell') }}</p>
  </div>
  <UIToast />
  <UIPwaNotifier />
</template>
