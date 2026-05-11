import { watch } from 'vue'

import { applyZodLocaleFromI18n } from '~ui/app/utils/zod-locale'

import type { Composer } from 'vue-i18n'

export default defineNuxtPlugin({
  name: 'zod-sync-locale',
  dependsOn: ['i18n:plugin:route-locale-detect'],
  enforce: 'post',
  setup(nuxtApp) {
    const { locale } = nuxtApp.$i18n as Composer

    function sync(code: string) {
      applyZodLocaleFromI18n(code)
    }

    sync(locale.value)
    watch(locale, sync)
    nuxtApp.hook('i18n:localeSwitched', ({ newLocale }) => {
      sync(newLocale)
    })
  },
})
