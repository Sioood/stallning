# @stallning/config

Shared tooling packages consumed as workspace devDependencies.

| Package                 | Entry                   | Role                        |
| ----------------------- | ----------------------- | --------------------------- |
| `@stallning/typescript` | `base.json`             | Strict TS preset            |
| `@stallning/oxlint`     | `.oxlintrc.json`        | Shared oxlint rules         |
| `@stallning/eslint`     | `index.ts` → `eslint()` | ESLint flat config factory  |
| `@stallning/storybook`  | `src/index.ts`          | Shared Storybook Vue config |

Prefer oxlint for new rules; use ESLint only when needed. Keep `strict: true`. No runtime code or app-specific rules here — override per package.
