import { getMessagesWithNamespace } from '../../utils/namespace'
export default defineI18nLocale(async () => {
  const translations = import.meta.glob('./*.{yaml,json}', { eager: false })
  return getMessagesWithNamespace(translations)
})
