import { getMessagesWithNamespace } from '~nuxt-essentials/i18n/utils/namespace'

import namespace from './namespace.json'
import translations from './translations.yaml'

export default defineI18nLocale(async () => {
  return await getMessagesWithNamespace({
    translations: async () => translations,
    namespace: async () => namespace,
  })
})
