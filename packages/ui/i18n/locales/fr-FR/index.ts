import { getMessagesWithNamespace } from '~nuxt-essentials/i18n/utils/namespace'

import pwa from './pwa.yaml'
import localTranslations from './translations.yaml'

export default defineI18nLocale(async () => {
  const localMessages = await getMessagesWithNamespace({
    translations: async () => localTranslations,
    pwa: async () => pwa,
  })

  return Object.assign({}, localMessages)
})
