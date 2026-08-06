#!/usr/bin/env node
/// <reference types="node" />

import { Command } from 'commander'
import consola from 'consola'

import { runBackport, runMerge, runPaths, runPick, runStatus } from './actions.ts'
import { runWizard } from './interactive.ts'
import { parseFilter, type PickOptions, type SyncGlobalOptions } from './options.ts'

function baseOptions(command: Command): SyncGlobalOptions {
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
    sourceBranch: opts.sourceBranch,
    sourceRemote: opts.sourceRemote ?? 'origin',
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
    .option('-r, --source-remote <remote>', 'Source remote name', 'origin')
    .option('-s, --source-branch <branch>', 'Source branch name')
    .option('-t, --target <branch>', 'Target local branch name')
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
    .description('Show classified commit delta between source and target')
    .action((_opts: unknown, command: Command) => {
      runStatus(baseOptions(command))
    })

  addGlobalOptions(program.command('merge'))
    .description('Merge source branch into target (baseline sync)')
    .action((_opts: unknown, command: Command) => {
      runMerge(baseOptions(command))
    })

  addGlobalOptions(program.command('pick'))
    .description('Cherry-pick commits from source into target')
    .option('-c, --commit <sha>', 'Single commit SHA')
    .option('--range <range>', 'Commit range (start..end)')
    .option('--filter <filter>', 'Commit class filter: all|shared|shared-and-mixed', 'all')
    .option('--continue', 'Resume after a conflict using sync state', false)
    .action((_opts: unknown, command: Command) => {
      runPick(pickOptions(command))
    })

  addGlobalOptions(program.command('backport'))
    .description('Backport shared/mixed commits from a template into minimal')
    .option('-c, --commit <sha>', 'Single commit SHA')
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

  await program.parseAsync(process.argv)
}

try {
  await main()
} catch (error) {
  consola.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
}
