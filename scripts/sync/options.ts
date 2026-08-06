export type SyncGlobalOptions = {
  sourceRemote: string
  sourceBranch?: string
  target?: string
  dryRun: boolean
  verify: boolean
  yes: boolean
}

export type PickOptions = SyncGlobalOptions & {
  commit?: string
  commits?: string[]
  range?: string
  filter: 'all' | 'shared' | 'shared-and-mixed'
  continue: boolean
}

export function parseFilter(value: string | undefined): PickOptions['filter'] {
  if (!value || value === 'all') return 'all'
  if (value === 'shared') return 'shared'
  if (value === 'shared-and-mixed' || value === 'mixed') return 'shared-and-mixed'
  throw new Error(`Invalid --filter '${value}'. Use all|shared|shared-and-mixed.`)
}
