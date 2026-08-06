# Stallning Monorepo

pnpm workspace + Turborepo. Shared tooling lives in `packages/config/*`.

**Node:** >= 25.8.0 · **pnpm only**

## Principles

- Prefer the simplest implementation that fully meets current requirements. Avoid speculative abstractions, config, and indirection.
- Grow in layers: ship the smallest end-to-end version first; add capabilities on a working product. Never trade a working product for unfinished complexity.
- Keep components modular and concerns separated.
- Prefer established libraries when they reduce complexity or improve reliability. Do not reimplement common functionality without a clear reason.
- Prefer existing project dependencies before new packages or custom code. Check docs and types before assuming a gap.
- Make long-term architectural choices. Do not accept stopgaps meant to be replaced later.

## Tooling

- Catalog versions in `pnpm-workspace.yaml` (`"catalog:"`); internal deps: `workspace:*` / `workspace:^`
- Format: oxfmt · Lint: oxlint + ESLint (`@stallning/eslint`) · TS: strict, no `any` (use `unknown`)
- Commits: conventional (`feat`/`fix`/…) · scopes: `global`, `config`, `docs` · header ≤ 100 chars
- Before push: `pnpm verify` (or `make verify`); pre-push also runs `pnpm audit --audit-level=high`

## Layout

- `apps/` · `packages/` · `packages/config/` (eslint, oxlint, typescript)

## Rules

- No `any`; unused vars prefix `_`; prefer `?.`; iterative over recursive
- No Prettier package; no npm/yarn; no deps outside the catalog; no unused/commented-out code
- Abstractions only when it clearly reduces duplication
- Do not bypass husky/lint-staged without justification
