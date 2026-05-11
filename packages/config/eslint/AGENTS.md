# @stallning/eslint

Shared **ESLint flat config** for the monorepo (`eslint()` factory).

Parent context, conventions, and how the three config packages fit together: [../AGENTS.md](../AGENTS.md).

## This package only

- **Entry:** `index.ts` (consumed as `@stallning/eslint`)
- **Local config:** `eslint.config.ts` — used when linting this package’s own sources
- **Changes:** Prefer mirroring new rules in `@stallning/oxlint` first; use `eslint-plugin-oxlint` to avoid duplicate reports
