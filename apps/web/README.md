# @stallning/web

The main Nuxt 4 web application. A thin shell that extends `@stallning/ui` (which transitively includes `@stallning/nuxt-essentials`).

## Getting Started

```bash
# From monorepo root
pnpm dev

# Or just this app
cd apps/web && pnpm dev
```

## Scripts

| Script             | Description                              |
| ------------------ | ---------------------------------------- |
| `pnpm dev`         | Start dev server (http://localhost:3000) |
| `pnpm build`       | Build for production                     |
| `pnpm preview`     | Preview production build                 |
| `pnpm test:e2e`    | Run Playwright E2E tests                 |
| `pnpm test:e2e:ui` | E2E with Playwright UI mode              |

## Layer Inheritance

This app inherits everything from `@stallning/ui` and `@stallning/nuxt-essentials`:

| From `nuxt-essentials` | From `ui`             |
| ---------------------- | --------------------- |
| i18n, SEO, PWA         | All `UI*` components  |
| Pinia, VueUse          | Tailwind theme, fonts |
| Security headers       | Icons (Tabler)        |
| Error boundary         | Image optimization    |

## Configuration

### Adding Locales

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  i18n: {
    locales: [
      { code: 'fr-FR', language: 'fr-FR', name: 'Français', file: 'fr-FR/index.ts' },
      { code: 'en-US', language: 'en-US', name: 'English', file: 'en-US/index.ts' },
    ],
  },
})
```

Then create `i18n/locales/{locale}/index.ts` with your translations.

### Runtime Config

```ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      siteUrl: 'https://myapp.com', // Override NUXT_PUBLIC_SITE_URL env var
    },
  },
})
```

### Security Overrides

```ts
// Allow additional CSP sources for your API/CDN
export default defineNuxtConfig({
  security: {
    headers: {
      contentSecurityPolicy: {
        'connect-src': ["'self'", 'https://api.myapp.com'],
      },
    },
  },
})
```

## E2E Testing

Tests live in `e2e/` and run against a built preview server:

```bash
# Run all E2E tests
pnpm test:e2e

# Interactive mode
pnpm test:e2e:ui

# Run specific test
pnpm exec playwright test e2e/my-flow.spec.ts
```

Write tests using Playwright:

```ts
import { expect, test } from '@playwright/test'

test('homepage loads', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('body')).toBeVisible()
})
```

## API Calls

> **Note:** The API layer is not yet implemented. It will be added later using [Tuyau](https://tuyau.julr.dev/) to connect to an AdonisJS backend. A shared fetch composable (`useFetchServerData`) will be provided in `packages/nuxt-essentials` at that time.
