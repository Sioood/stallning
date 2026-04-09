import namespace from "./namespace.json";
import translations from "./translations.yaml";

import { getMessagesWithNamespace } from "~nuxt-essentials/i18n/utils/namespace";

export default defineI18nLocale(async () => {
  return await getMessagesWithNamespace({
    translations: async () => translations,
    namespace: async () => namespace,
  });
});
