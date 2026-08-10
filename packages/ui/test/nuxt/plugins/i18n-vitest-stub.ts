import { createI18n } from 'vue-i18n'
import essentialsTranslations from '~nuxt-essentials/i18n/locales/fr-FR/translations.yaml'

import uiTranslations from '../../../i18n/locales/fr-FR/translations.yaml'

interface MessageTree {
  [key: string]: string | MessageTree
}

function mergeMessages(...sources: MessageTree[]): MessageTree {
  const merged: MessageTree = {}
  for (const source of sources) {
    for (const [key, value] of Object.entries(source)) {
      const existing = merged[key]
      if (
        existing &&
        typeof existing === 'object' &&
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        merged[key] = mergeMessages(existing as MessageTree, value as MessageTree)
        continue
      }
      merged[key] = value
    }
  }
  return merged
}

function resolveMessage(messages: MessageTree, key: string): string | undefined {
  const value = key.split('.').reduce<MessageTree | string | undefined>((current, part) => {
    if (typeof current !== 'object' || current === null) {
      return undefined
    }
    return current[part]
  }, messages)
  return typeof value === 'string' ? value : undefined
}

function createTranslator(messages: MessageTree) {
  const t = (key: string, params?: Record<string, string | number>) => {
    const template = resolveMessage(messages, key) ?? key
    if (!params) {
      return template
    }
    return Object.entries(params).reduce(
      (result, [name, value]) => result.replaceAll(`{${name}}`, String(value)),
      template,
    )
  }
  const te = (key: string) => resolveMessage(messages, key) !== undefined
  return { t, te }
}

const messages = mergeMessages(essentialsTranslations as MessageTree, uiTranslations as MessageTree)

/** Loads fr-FR YAML messages when `@nuxtjs/i18n` is omitted in Vitest (jiti + vue-router/unplugin). */
export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    fallbackLocale: 'fr-FR',
    legacy: false,
    locale: 'fr-FR',
    messages: {
      'fr-FR': messages,
    },
  })

  nuxtApp.vueApp.use(i18n)

  const { t, te } = createTranslator(messages)

  nuxtApp.vueApp.config.globalProperties.$t = t
  nuxtApp.vueApp.config.globalProperties.$te = te
  nuxtApp.provide('i18n', { t, te })
})
