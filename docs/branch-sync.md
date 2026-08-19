# Branch Sync Runbook

This runbook defines how to keep specialized template branches synced with the shared boilerplate branch, and how forks pull updates from Stallning.

## Model

- `minimal` is the shared JS/TS boilerplate branch.
- Template branches (for example `nuxt`) build on top of `minimal`.
- Sync strategy is hybrid:
  - merges (`sync merge`)
  - selective cherry-picks (`sync pick`)
  - path-filtered backports from templates to `minimal` (`sync backport`)

### Golden rule

Shared changes (config packages, root tooling, husky, verify, LICENSE, CI helpers) land on **`minimal` first**, then sync into templates.

UI / framework work stays on the template branch. Use `sync backport` only when shared fixes were accidentally committed on a template.

## Fork setup

In a forked project, configure remotes once:

```sh
git remote -v
git remote add upstream https://github.com/Sioood/stallning.git
git fetch upstream
```

- `origin`: your fork.
- `upstream`: source template repository.

### Project files (`.stallning/`)

`create-stallning` wipes `.git` and writes a fresh root commit, so there is **no shared ancestry** with Stallning. The baseline commit is what `sync status` / `sync pick` use instead of git merge-base.

| File                     | Role                                                      |
| ------------------------ | --------------------------------------------------------- |
| `.stallning/config.yaml` | Project settings (`template`, `remote`, and later extras) |
| `.stallning/sync.yaml`   | Baseline Stallning commit this project has applied        |

Example `config.yaml`:

```yaml
template: nuxt
remote: upstream
```

Example `sync.yaml`:

```yaml
baseline: c7ada39b009155ef6a2b1627a91f4ace0e7f44e2
createdAt: 2026-08-07T13:25:02.439Z
updatedAt: 2026-08-07T13:25:02.442Z
```

When `sync.yaml` exists, the “on source” delta is `baseline..source` instead of `target..source`.

The legacy key=value file `.stallning/sync-baseline` is still read and migrated on the next write.

```sh
pnpm sync config show
pnpm sync config set --template nuxt --remote upstream

pnpm sync baseline show
pnpm sync baseline set <commit> --template nuxt --remote upstream   # existing forks
pnpm sync baseline set                 # pick a commit from recent source history
pnpm sync baseline bump -r upstream -s nuxt   # mark fully synced to tip
```

After a successful `sync merge`, `baseline` becomes the source tip. After a successful `sync pick`, it becomes the last applied commit.

## CLI

```sh
pnpm sync                 # interactive wizard
pnpm sync status          # classified delta (read-only, newest first)
pnpm sync merge [flags]
pnpm sync pick [flags]
pnpm sync backport [flags]
pnpm sync paths <paths...> [flags]
pnpm sync baseline show|set|bump
pnpm sync config show|set
```

Compat aliases:

```sh
pnpm sync:merge ...
pnpm sync:pick ...
pnpm sync:status ...
pnpm sync:backport ...
```

### Global flags

| Flag                  | Description                                                    |
| --------------------- | -------------------------------------------------------------- |
| `-r, --source-remote` | Source remote (default: `config.yaml` `remote`, else `origin`) |
| `-s, --source-branch` | Source branch (default: `config.yaml` `template`)              |
| `-t, --target`        | Target **local** branch (default: current branch)              |
| `-n, --dry-run`       | Print the execution plan without mutating git                  |
| `--verify`            | Run `pnpm verify` after a successful apply                     |
| `-y, --yes`           | Non-interactive when flags are complete                        |

**Dry-run is supported on every mutating command** (`merge`, `pick`, `backport`, `paths`) and is offered first in the wizard.

Commit lists (status, plan, wizard) are **newest first**, like `git log`. Cherry-picks still apply oldest → newest.

### Status

```sh
pnpm sync status -r origin -s minimal -t nuxt
```

Lists commits on each side of the delta (newest first) and classifies them as `shared`, `template-only`, or `mixed`.

### Merge

```sh
pnpm sync merge -r upstream -s minimal -t nuxt --dry-run
pnpm sync merge -r upstream -s minimal -t nuxt
```

### Selective pick

```sh
pnpm sync pick -r origin -s minimal -t nuxt --dry-run
pnpm sync pick -r origin -s minimal -t nuxt -c <commit>
pnpm sync pick -r origin -s minimal -t nuxt --range <start>..<end>
pnpm sync pick -r origin -s minimal -t nuxt --filter shared
```

### Backport (template → minimal)

```sh
pnpm sync backport -r origin -s nuxt -t minimal --dry-run
pnpm sync backport -r origin -s nuxt -t minimal --filter shared-and-mixed
```

- `template-only` commits are skipped.
- `mixed` commits path-checkout shared files only (then create a sync commit).
- `shared` commits are cherry-picked.

### Paths

```sh
pnpm sync paths -r origin -s minimal -t nuxt --dry-run -- packages/config scripts/verify.sh
```

## Conflict recovery

Merge conflicts:

```sh
git status
git add <resolved_files>
git merge --continue
# or
git merge --abort
```

Cherry-pick conflicts:

```sh
git status
git add <resolved_files>
git cherry-pick --continue
pnpm sync pick --continue
```

Skip / abort:

```sh
git cherry-pick --skip
git cherry-pick --abort
```

Resume state is stored in `.git/stallning-sync-state.json`.

## Validation checklist

Run after every apply (skipped automatically in dry-run):

```sh
make verify
# or, including security audit (pre-push equivalent):
make check
```

## Commit and PR conventions

- Keep sync commits separate from feature work.
- Recommended titles:
  - `chore(sync): merge minimal into nuxt`
  - `chore(sync): cherry-pick minimal commits into nuxt`
  - `chore(sync): backport shared paths from <commit>`
  - `chore(sync): set baseline to <short>`
- Open a dedicated PR per sync wave when possible.
