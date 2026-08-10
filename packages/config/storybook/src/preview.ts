import { withThemeByClassName } from '@storybook/addon-themes'
import { setup, type Preview } from '@storybook/vue3'
import { themes } from 'storybook/theming'

import { enhanceStorybookArgTypes } from './argTypesEnhancer.ts'
import { setStorybookLocale } from './i18n.ts'
import { ClientOnly, Icon, NuxtImg, NuxtLink } from './stubs/nuxt-components.ts'

import type { I18n } from 'vue-i18n'

import './preview.css'

type HtmlFocus = typeof HTMLElement.prototype.focus

/**
 * Storybook 10.5 replaces `HTMLElement.prototype.focus` with an accessor that throws
 * `Illegal invocation` when Zag/Ark reads it off the prototype (`trackFocusVisible`).
 * Capture the real method (via iframe if already patched) and restore until #35528 ships.
 */
function getNativeHtmlElementFocus(): HtmlFocus | undefined {
  if (typeof HTMLElement === 'undefined') return undefined

  const current = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'focus')
  if (typeof current?.value === 'function') {
    return current.value as HtmlFocus
  }

  if (typeof document === 'undefined') return undefined

  const iframe = document.createElement('iframe')
  iframe.setAttribute('aria-hidden', 'true')
  iframe.style.cssText = 'position:absolute;width:0;height:0;border:0;visibility:hidden'
  document.documentElement.appendChild(iframe)
  try {
    // `Window`'s lib type omits the global constructors the iframe realm actually exposes.
    const frameWindow = iframe.contentWindow as (Window & typeof globalThis) | null
    const focus = frameWindow?.HTMLElement.prototype.focus
    return typeof focus === 'function' ? focus : undefined
  } finally {
    iframe.remove()
  }
}

const nativeHtmlElementFocus = getNativeHtmlElementFocus()

function restoreNativeHtmlElementFocus(): void {
  if (!nativeHtmlElementFocus) return
  Object.defineProperty(HTMLElement.prototype, 'focus', {
    configurable: true,
    value: nativeHtmlElementFocus,
    writable: true,
  })
}

restoreNativeHtmlElementFocus()

export type CreatePreviewOptions = {
  i18n: I18n
  locales?: Array<{ value: string; title: string }>
  defaultLocale?: string
  /** Optional hook when the Storybook locale toolbar changes (e.g. Zod locale sync). */
  onLocaleChange?: (locale: string) => void
}

/**
 * Shared Storybook preview: registers Nuxt stubs, theme toggle, and i18n toolbar.
 * Hosts should import UI CSS before calling this, then `export default createPreview(...)`.
 *
 * Theme classes must be `light` / `dark` (not an empty light class): the DS uses
 * `prefers-color-scheme` + `:root:not(.light)`, matching VueUse `useColorMode`.
 */
export function createPreview(options: CreatePreviewOptions): Preview {
  const {
    i18n,
    defaultLocale = 'fr-FR',
    locales = [
      { title: 'Français', value: 'fr-FR' },
      { title: 'English', value: 'en-US' },
    ],
    onLocaleChange,
  } = options

  setup((app) => {
    app.use(i18n)
    app.component('ClientOnly', ClientOnly)
    app.component('Icon', Icon)
    app.component('NuxtLink', NuxtLink)
    app.component('NuxtImg', NuxtImg)
  })

  return {
    argTypesEnhancers: [enhanceStorybookArgTypes],
    beforeEach: () => {
      restoreNativeHtmlElementFocus()
    },
    decorators: [
      withThemeByClassName({
        defaultTheme: 'light',
        parentSelector: 'html',
        themes: {
          dark: 'dark',
          light: 'light',
        },
      }),
      (story, context) => {
        const locale = String(context.globals.locale ?? defaultLocale)
        setStorybookLocale(i18n, locale)
        onLocaleChange?.(locale)

        // Keep Autodocs chrome (headings, prose) in sync with the toolbar theme.
        const isDark = context.globals.theme === 'dark'
        context.parameters.docs = {
          ...context.parameters.docs,
          theme: isDark ? themes.dark : themes.light,
        }

        return story()
      },
    ],
    globalTypes: {
      locale: {
        description: 'Internationalization locale',
        toolbar: {
          dynamicTitle: true,
          icon: 'globe',
          items: locales,
        },
      },
    },
    initialGlobals: {
      locale: defaultLocale,
      theme: 'light',
    },
    parameters: {
      backgrounds: {
        disabled: true,
      },
      controls: {
        matchers: {
          color: /(background|color)$/iu,
          date: /Date$/iu,
        },
      },
      docs: {
        theme: themes.light,
      },
      layout: 'padded',
    },
  }
}
