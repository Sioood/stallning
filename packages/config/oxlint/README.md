# @stallning/oxlint

Shared Oxlint config for the monorepo.

## What it enforces

- General correctness and consistency rules.
- TypeScript safety baseline (`typescript/no-explicit-any`).
- Unicorn quality rules where low-noise.

## Usage

Root `.oxlintrc.json`:

```json
{
  "extends": ["./node_modules/@stallning/oxlint/.oxlintrc.json"]
}
```

## Scripts

- `pnpm lint`: runs `oxlint`.
- `pnpm format`: formats files with `oxfmt`.
- `pnpm format:check`: validates formatting with `oxfmt`.
