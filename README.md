<div align="center">
  <h1><b>Ställning</b></h1>
  <span><i>[ˈstɛlː.nɪŋ]</i>: meaning "scaffold" in swedish</span>

  <img alt="image" src="https://github.com/user-attachments/assets/8331cc84-2fcc-48f4-93ce-a35b7dead2ea" style="width: 100%" />
</div>

## About the Project

A production-ready pnpm workspace monorepo boilerplate with best-in-class DX, testing, security, and code quality tooling. Use it as a foundation for building scalable applications.

## Monorepo Structure

```
.
├── apps/
├── packages/
│   └── config/                 # Shared configs (eslint, oxlint, typescript)
├── .github/
│   ├── workflows/ci.yaml        # CI pipeline
│   ├── workflows/release.yaml  # Changesets release
│   └── pull_request_template.md
├── turbo.json                  # Turborepo task config
├── pnpm-workspace.yaml         # Workspace + dependency catalog
└── .npmrc                      # Targeted hoisting (no shamefully-hoist)
```

## Prerequisites

| Tool    | Version   |
| ------- | --------- |
| Node.js | >= 25.8.0 |
| pnpm    | 10.33.0   |
| Git     | Latest    |

```bash
# Install pnpm
npm install -g pnpm

# Clone and install
git clone <repo-url>
cd stallning
pnpm install
```

## Available Scripts

### Root (Turborepo orchestrated)

| Script              | Description                   |
| ------------------- | ----------------------------- |
| `pnpm dev`          | Start all dev servers         |
| `pnpm build`        | Build all packages            |
| `pnpm lint`         | ESLint + Oxlint all packages  |
| `pnpm format`       | Format with oxfmt             |
| `pnpm format:check` | Check formatting              |
| `pnpm check-types`  | TypeScript type checking      |
| `pnpm verify`       | Run full CI check job locally |
| `pnpm knip`         | Detect dead code/unused deps  |
| `pnpm changeset`    | Create a changeset            |

### Makefile

Run `make help` to list all targets. Common shortcuts:

| Target        | Description                                      |
| ------------- | ------------------------------------------------ |
| `make verify` | CI check job locally (types, lint, format, etc.) |
| `make check`  | `verify` + security audit (pre-push equivalent)  |
| `make fix`    | Auto-fix lint and formatting issues              |

---

## Code Quality

### Git Hooks (Husky)

| Hook       | Action                                                        |
| ---------- | ------------------------------------------------------------- |
| pre-commit | lint-staged (oxlint + eslint + oxfmt)                         |
| pre-push   | `git fetch` + `pnpm verify` + `pnpm audit --audit-level=high` |
| commit-msg | commitlint (conventional commits)                             |

### Commit Convention

```
<type>(<scope>): <description>

# Types: build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test
# Scopes: global, config, docs, nuxt-essentials, ui, web
```

### Dead Code Detection (Knip)

```bash
pnpm knip        # Report unused exports, files, deps
pnpm knip:fix    # Auto-remove fixable dead code
```

---

## Dependency Management

### pnpm Catalog

All shared dependency versions are centralized in `pnpm-workspace.yaml`:

```yaml
catalog:
  vue: ^3.5.32
  nuxt: ^4.4.2
  vitest: ^3.2.4
  zod: ^4.3.6
  # ... etc
```

Use `catalog:` in individual `package.json` files:

```json
{
  "dependencies": {
    "vue": "catalog:",
    "zod": "catalog:"
  }
}
```

### Updating Dependencies

```bash
pnpm deps:check:minor   # Check for minor updates
pnpm deps:check:major   # Check for major updates
```

---

## CI/CD Pipeline

### GitHub Actions (ci.yaml)

```
check job:
  ├── pnpm install --frozen-lockfile
  └── scripts/verify.sh (types → lint → format:check → knip → build)
```

### Releases (Changesets)

```bash
pnpm changeset                  # Create a changeset
# Merge PR to main → release workflow auto-tags
```

---

## PR Workflow

Every PR uses the template at `.github/pull_request_template.md` with:

- Summary section
- Type of change checkboxes
- Breaking changes section

---

## Recommended Extensions

Install from `.vscode/.code-workspace` — search `@recommended` in the Extensions tab.

---

## Evolution

This boilerplate evolves continuously. Open an issue for feedback or suggestions.
