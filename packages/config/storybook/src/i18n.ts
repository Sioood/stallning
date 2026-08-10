import { createI18n, type I18n, type LocaleMessageDictionary, type VueMessageType } from 'vue-i18n'

export type StorybookMessagesByLocale = Record<
  string,
  LocaleMessageDictionary<VueMessageType> | Record<string, unknown>
>

export type CreateI18nForStorybookOptions = {
  messagesByLocale: StorybookMessagesByLocale
  defaultLocale?: string
  fallbackLocale?: string
}

export function createI18nForStorybook(options: CreateI18nForStorybookOptions): I18n {
  const defaultLocale = options.defaultLocale ?? 'fr-FR'
  const fallbackLocale = options.fallbackLocale ?? defaultLocale

  return createI18n({
    fallbackLocale,
    fallbackWarn: false,
    legacy: false,
    locale: defaultLocale,
    messages: options.messagesByLocale as never,
    missingWarn: false,
  })
}

export function setStorybookLocale(i18n: I18n, locale: string): void {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale as never
    return
  }
  ;(i18n.global.locale as { value: string }).value = locale
}
