# @stallning/config

Shared tooling configurations for the monorepo: TypeScript, ESLint, and Oxlint.

## Packages

### `@stallning/typescript`

Base TypeScript configuration preset.

```jsonc
// tsconfig.json
{ "extends": ["@stallning/typescript/base.json"] }
```

Key settings: strict mode, ESNext target, DOM lib, JSON modules, skip lib check.

### `@stallning/eslint`

Composable ESLint flat config factory.

```ts
// eslint.config.ts
import eslint from '@stallning/eslint'

export default eslint({
  typescript: true,
  vue: true,
  oxlint: resolve(__dirname, '.oxlintrc.json'),
  tsconfigRootDir: __dirname,
})
```

Includes: TypeScript rules, import-x, JSONC, Markdown, YAML, Vue, oxlint bridge.

### `@stallning/oxlint`

Shared Oxlint configuration.

```jsonc
// .oxlintrc.json
{ "extends": ["../../packages/config/oxlint/.oxlintrc.json"] }
```

Plugins: typescript, unicorn, oxc.  
Key rules: `no-unused-vars` (with `_` ignore), `eqeqeq`, `no-explicit-any`, `no-array-for-each`.

## Adding Rules

1. Check if oxlint supports it (faster, native) → add to `@stallning/oxlint/.oxlintrc.json`
2. If ESLint-only, add to `@stallning/eslint/src/configs/<category>.ts`
3. Always ensure `eslint-plugin-oxlint` bridge prevents duplicate reports
