import localTranslations from "./translations.yaml";

import baseNamespace from "~nuxt-essentials/i18n/locales/fr-FR/namespace.json";
import baseTranslations from "~nuxt-essentials/i18n/locales/fr-FR/translations.yaml";
import { getMessagesWithNamespace } from "~nuxt-essentials/i18n/utils/namespace";

export default defineI18nLocale(async () => {
  const [baseMessages, localMessages] = await Promise.all([
    getMessagesWithNamespace({
      translations: async () => baseTranslations,
      namespace: async () => baseNamespace,
    }),
    getMessagesWithNamespace({
      translations: async () => localTranslations,
    }),
  ]);

  return Object.assign({}, baseMessages, localMessages);
});
