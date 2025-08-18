import * as Sentry from '@sentry/nuxt'
import { useRuntimeConfig } from '#imports'
import release from '~nuxt-essentials/utils/release'

console.log('useRuntimeConfig().public.SENTRY_DSN:', useRuntimeConfig())
Sentry.init({
  environment: process.env.NODE_ENV,
  dsn: useRuntimeConfig().public.sentry.dsn,
  release,
  integrations: [],
  tracesSampleRate: 0,
})
