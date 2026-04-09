# @stallning/typescript

Shared TypeScript config presets for the monorepo.

## Available presets

- `base.json`: strict defaults for Node + browser-aware projects.

## Usage

`tsconfig.json`:

```json
{
  "extends": ["@stallning/typescript/base.json"]
}
```

## Scripts

- `pnpm format`: formats JSON config files with `oxfmt`.
- `pnpm format:check`: validates formatting with `oxfmt`.
