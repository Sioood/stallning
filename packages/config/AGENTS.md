# @stallning/config

## Context

This directory contains **three workspace packages** that provide shared tooling configuration for the entire monorepo. They are consumed as dev dependencies by all other packages. Each subfolder has its own short `AGENTS.md` for package-local notes; this file is the umbrella overview.

## Packages

### `@stallning/typescript` (`packages/config/typescript/`)

Shared TypeScript configuration preset.

- **Entry:** `base.json`
- **Config:** Strict mode, ESNext target, DOM lib, JSON modules, skip lib check
- **Usage:** `{ "extends": ["@stallning/typescript/base.json"] }` in `tsconfig.json`

### `@stallning/oxlint` (`packages/config/oxlint/`)

Shared oxlint rules configuration.

- **Entry:** `.oxlintrc.json`
- **Plugins:** typescript, unicorn, oxc
- **Key rules:** no-unused-vars (with `_` ignore pattern), eqeqeq, no-explicit-any, no-array-for-each
- **Usage:** Extended by `@stallning/eslint` and referenced in package-level `.oxlintrc.json`

### `@stallning/eslint` (`packages/config/eslint/`)

Shared ESLint flat config factory.

- **Entry:** `index.ts` → exports `eslint()` factory function
- **Architecture:** Composable config builder using `eslint-flat-config-utils`
- **Configs included:** TypeScript, imports (import-x), JSONC, Markdown, YAML, Vue (optional), oxlint parity
- **Usage:**

```ts
import eslint from '@stallning/eslint'

export default eslint({
  typescript: true,
  vue: true,
  oxlint: resolve(__dirname, '.oxlintrc.json'),
  tsconfigRootDir: __dirname,
})
```

## Conventions

### Adding ESLint Rules

1. Check if oxlint covers it first (faster, native) → add to `@stallning/oxlint/.oxlintrc.json`
2. If ESLint-only, add to the appropriate config in `@stallning/eslint/src/configs/`
3. Use `eslint-plugin-oxlint` to avoid duplicate reports

### TypeScript Config

- Don't add `paths` to `base.json` — those are project-specific
- Keep `strict: true` always
- Target `esnext` for maximum feature support (Node 25+)

### Rule Enforcement

All rules must align with the codebase philosophy:

- No `any` (enforced by oxlint `no-explicit-any`)
- No unused variables (prefix with `_` to suppress)
- Strict equality (`eqeqeq`)
- No `Array.forEach` (use `for...of` for performance)

## Dos

- Keep configs minimal and opinionated
- Version these packages with changesets (they have CHANGELOGs)
- Test ESLint config changes by running `pnpm lint` at root
- Ensure oxlint and ESLint rules don't overlap (use `eslint-plugin-oxlint` bridge)

## Don'ts

- Don't add runtime code to config packages
- Don't add project-specific rules here — use per-package `eslint.config.ts` overrides
- Don't change the oxlint config without checking `eslint-plugin-oxlint` parity
- Don't disable `strict: true` in TypeScript config

## Key Files

- `eslint/src/index.ts` — Main factory function
- `eslint/src/configs/*.ts` — Individual config modules
- `eslint/src/globs.ts` — File glob patterns and exclusions
- `oxlint/base.oxlintrc.json`, `vue.oxlintrc.json`, `tailwind.oxlintrc.json` — layered Oxlint presets (consumed via `@stallning/oxlint`)
- `typescript/base.json` — Base tsconfig preset
