#!/usr/bin/env node
/// <reference types="node" />

import { Command } from 'commander'
import consola from 'consola'

import {
  runBackport,
  runConfigSet,
  runConfigShow,
  runLastCommitBump,
  runLastCommitSet,
  runLastCommitShow,
  runMerge,
  runPaths,
  runPick,
  runStatus,
} from './actions.ts'
import { SYNC_PATH } from './baseline.ts'
import { ensureRemoteBranchExists, fetchRemote } from './git.ts'
import { promptLastSyncedCommit, runWizard } from './interactive.ts'
import { parseFilter, type PickOptions, type SyncGlobalOptions } from './options.ts'
import { CONFIG_PATH, readStallningConfig } from './project.ts'

function baseOptions(command: Command): SyncGlobalOptions {
  const config = readStallningConfig()
  const opts = command.optsWithGlobals() as {
    sourceRemote?: string
    sourceBranch?: string
    target?: string
    dryRun?: boolean
    verify?: boolean
    yes?: boolean
  }
  return {
    dryRun: Boolean(opts.dryRun),
    sourceBranch: opts.sourceBranch ?? config.template,
    sourceRemote: opts.sourceRemote ?? config.remote ?? 'origin',
    target: opts.target,
    verify: Boolean(opts.verify),
    yes: Boolean(opts.yes),
  }
}

function pickOptions(command: Command): PickOptions {
  const opts = command.optsWithGlobals() as {
    commit?: string
    range?: string
    filter?: string
    continue?: boolean
  }
  return {
    ...baseOptions(command),
    commit: opts.commit,
    continue: Boolean(opts.continue),
    filter: parseFilter(opts.filter),
    range: opts.range,
  }
}

function addGlobalOptions(command: Command): Command {
  return command
    .option('-r, --source-remote <remote>', 'Source remote name')
    .option('-s, --source-branch <branch>', 'Source branch name')
    .option('-t, --target <branch>', 'Target local branch (default: current branch)')
    .option('-n, --dry-run', 'Print the plan without mutating the repository', false)
    .option('--verify', 'Run pnpm verify after a successful apply', false)
    .option('-y, --yes', 'Skip interactive confirmations when flags are complete', false)
}

async function main(): Promise<void> {
  const program = new Command()

  program
    .name('sync')
    .description('Bidirectional branch sync for Stallning templates')
    .action(async () => {
      await runWizard()
    })

  addGlobalOptions(program.command('status'))
    .description('Show classified commit delta between source and target (newest first)')
    .action((_opts: unknown, command: Command) => {
      runStatus(baseOptions(command))
    })

  addGlobalOptions(program.command('merge'))
    .description('Merge source branch into target')
    .action((_opts: unknown, command: Command) => {
      runMerge(baseOptions(command))
    })

  addGlobalOptions(program.command('pick'))
    .description('Cherry-pick commits from source into target')
    .option('-c, --commit <commit>', 'Single commit')
    .option('--range <range>', 'Commit range (start..end)')
    .option('--filter <filter>', 'Commit class filter: all|shared|shared-and-mixed', 'all')
    .option('--continue', 'Resume after a conflict using sync state', false)
    .action((_opts: unknown, command: Command) => {
      runPick(pickOptions(command))
    })

  addGlobalOptions(program.command('backport'))
    .description('Backport shared/mixed commits from a template into minimal')
    .option('-c, --commit <commit>', 'Single commit')
    .option('--range <range>', 'Commit range (start..end)')
    .option(
      '--filter <filter>',
      'Commit class filter: all|shared|shared-and-mixed',
      'shared-and-mixed',
    )
    .option('--continue', 'Resume after a conflict using sync state', false)
    .action((_opts: unknown, command: Command) => {
      runBackport(pickOptions(command))
    })

  addGlobalOptions(program.command('paths'))
    .description('Checkout specific paths from source ref onto target')
    .argument('<paths...>', 'File or directory paths')
    .option('--ref <ref>', 'Override source ref (default: <remote>/<branch>)')
    .action((paths: string[], _opts: unknown, command: Command) => {
      const opts = command.optsWithGlobals() as { ref?: string }
      const cleaned = paths.filter((entry) => entry !== '--')
      runPaths({ ...baseOptions(command), paths: cleaned, ref: opts.ref })
    })

  const baseline = program
    .command('baseline')
    .description(`Manage the last Stallning commit this project has applied (${SYNC_PATH})`)

  baseline
    .command('show')
    .description('Show the current sync baseline')
    .action(() => {
      runLastCommitShow()
    })

  addGlobalOptions(
    baseline
      .command('set')
      .description('Override the baseline commit (without applying changes)')
      .argument('[commit]', 'Commit hash or ref. Omit to pick from recent source history.')
      .option('--template <branch>', 'Write template into .stallning/config.yaml')
      .option('--remote <remote>', 'Write remote into .stallning/config.yaml'),
  ).action(
    async (
      commit: string | undefined,
      opts: { template?: string; remote?: string },
      command: Command,
    ) => {
      const base = baseOptions(command)
      let resolved = commit
      if (!resolved) {
        if (!base.sourceBranch) {
          throw new Error(
            'Pass a commit, or provide -s / template in .stallning/config.yaml to pick from history.',
          )
        }
        fetchRemote(base.sourceRemote)
        ensureRemoteBranchExists(base.sourceRemote, base.sourceBranch)
        resolved = await promptLastSyncedCommit(`${base.sourceRemote}/${base.sourceBranch}`)
      }
      runLastCommitSet(resolved, {
        remote: opts.remote ?? base.sourceRemote,
        template: opts.template ?? base.sourceBranch,
      })
    },
  )

  addGlobalOptions(baseline.command('bump'))
    .description('Mark the current source tip as fully synced')
    .action((_opts: unknown, command: Command) => {
      runLastCommitBump(baseOptions(command))
    })

  const configCmd = program.command('config').description(`Project settings (${CONFIG_PATH})`)

  configCmd
    .command('show')
    .description('Show .stallning/config.yaml')
    .action(() => {
      runConfigShow()
    })

  configCmd
    .command('set')
    .description('Set template and/or remote in .stallning/config.yaml')
    .option('--template <branch>', 'Stallning branch this project was created from')
    .option('--remote <remote>', 'Git remote pointing at the Stallning repository')
    .action((opts: { template?: string; remote?: string }) => {
      runConfigSet(opts)
    })

  await program.parseAsync(process.argv)
}

try {
  await main()
} catch (error) {
  consola.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
}
