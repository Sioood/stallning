# @stallning/storybook-app

Application Package that hosts Storybook for `@stallning/ui` (design system) **and** `@stallning/web` app components.

- UI stories: `packages/ui/app/components/**/*.stories.ts`
- Web stories: `apps/web/app/**/*.stories.ts` (e.g. `Web/Navbar`)
- Shared config: `@stallning/storybook`
- `pnpm --filter @stallning/storybook-app dev` → http://localhost:6006
- Web-only host (same stories, port 6007): `pnpm storybook:web`
