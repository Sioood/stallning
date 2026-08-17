import { createI18nForStorybook, createPreview } from '@stallning/storybook/preview'

import essentialsFr from '../../../packages/nuxt-essentials/i18n/locales/fr-FR/translations.yaml'
import { applyZodLocaleFromI18n } from '../../../packages/ui/app/utils/zod-locale'
import uiPwaFr from '../../../packages/ui/i18n/locales/fr-FR/pwa.yaml'
import uiFr from '../../../packages/ui/i18n/locales/fr-FR/translations.yaml'
import webEn from '../../web/i18n/locales/en-US/translations.yaml'
import webFr from '../../web/i18n/locales/fr-FR/translations.yaml'

import '../../../packages/ui/app/assets/css/main.css'
import '../../web/app/assets/css/main.css'

function deepMerge(...sources: Array<Record<string, unknown>>): Record<string, unknown> {
  const merged: Record<string, unknown> = {}
  for (const source of sources) {
    for (const [key, value] of Object.entries(source)) {
      const existing = merged[key]
      if (
        existing &&
        typeof existing === 'object' &&
        existing !== null &&
        !Array.isArray(existing) &&
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        merged[key] = deepMerge(
          existing as Record<string, unknown>,
          value as Record<string, unknown>,
        )
        continue
      }
      merged[key] = value
    }
  }
  return merged
}

function prefixKeys(prefix: string, obj: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [`${prefix}:${key}`, value]))
}

const frMessages = {
  ...deepMerge(
    essentialsFr as Record<string, unknown>,
    uiFr as Record<string, unknown>,
    webFr as Record<string, unknown>,
  ),
  ...prefixKeys('pwa', uiPwaFr as Record<string, unknown>),
}

const enMessages = {
  ...deepMerge(
    essentialsFr as Record<string, unknown>,
    uiFr as Record<string, unknown>,
    webEn as Record<string, unknown>,
  ),
  ...prefixKeys('pwa', uiPwaFr as Record<string, unknown>),
}

const i18n = createI18nForStorybook({
  defaultLocale: 'fr-FR',
  messagesByLocale: {
    'en-US': enMessages,
    'fr-FR': frMessages,
  },
})

applyZodLocaleFromI18n('fr-FR')

export default createPreview({
  defaultLocale: 'fr-FR',
  i18n,
  onLocaleChange: applyZodLocaleFromI18n,
})
