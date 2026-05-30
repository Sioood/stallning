# Stallning Monorepo

## Context

Stallning is a **pnpm workspace monorepo** orchestrated with **Turborepo**.

## Architecture

```
packages/config/* -> shared eslint, oxlint, typescript configs
```

### Dependency Graph

- All packages use `@stallning/eslint`, `@stallning/oxlint`, `@stallning/typescript` for tooling

### Key Technologies

- **Tooling:** pnpm 10.33+, Turborepo, ESLint (flat config), oxlint, oxfmt
- **CI/CD:** GitHub Actions, Changesets for versioning
- **Node:** >= 25.8.0

## Conventions

### Package Management

- All shared dependency versions live in `pnpm-workspace.yaml` catalog — use `"catalog:"` in package.json
- Use `workspace:*` for internal runtime deps, `workspace:^` for internal dev deps
- Never add a dependency without checking if it already exists in the catalog
- `.npmrc` uses **targeted hoisting** (`public-hoist-pattern`) — NOT `shamefully-hoist`
- `minimumReleaseAge: 1440` blocks packages published less than 24h ago (supply chain protection)

### Code Style

- **Formatter:** oxfmt (NOT the Prettier npm package) — configured in `.oxfmtrc.json`. ESLint uses `eslint-config-prettier` only to turn off stylistic rules that overlap with oxfmt
- **Linting:** oxlint + ESLint (flat config via `@stallning/eslint`)
- **TypeScript:** Strict mode, no `any` (use `unknown`), no unused vars (prefix with `_`)

### Type Safety Patterns

- **Discriminated unions:** All variant types use a literal `type` field for exhaustive matching
- **No `any`:** Use `unknown` for untyped boundaries

### Commit Messages

Conventional commits enforced by commitlint:

- Types: `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, `chore`, `ci`, `build`, `style`, `revert`
- Scopes: `global`, `config`, `docs`
- Max header: 100 chars

### File Structure

- Apps live in `apps/`
- Packages live in `packages/` (or `packages/config/` for tooling)

## Dos

- Run `pnpm install` at root after adding dependencies
- Use `turbo` for running tasks across packages (`pnpm lint`, `pnpm build`)
- Use iterative approaches (explicit stack) instead of recursion
- Use optional chaining (`?.`) instead of redundant null checks

## Don'ts

- Don't use `any` — prefer `unknown` if type is unclear
- Don't leave commented-out code or unused variables
- Don't create abstractions unless they reduce duplication
- Don't use Prettier (use oxfmt)
- Don't add deps without catalog entry
- Don't bypass lint-staged/husky hooks without justification
- Don't use `npm` or `yarn` — this is a pnpm-only repo

## Security

- `pnpm audit --audit-level=high` runs on every `git push` (husky pre-push)

## Common Pitfalls

- `.npmrc` uses targeted `public-hoist-pattern` — add new patterns if a dep can't be resolved
