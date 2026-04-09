# @stallning/oxfmt

Shared formatter package for the monorepo based on `oxfmt`.

## Why this package

- Provides a stable workspace location for formatter tooling.
- Avoids environment-dependent hook failures due to missing binaries in PATH.

## Scripts

- `pnpm format`: runs `oxfmt --write .`
- `pnpm format:check`: runs `oxfmt --check .`
