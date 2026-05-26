import { describe, expect, it } from 'vitest'
import { ref } from 'vue'

import {
  applyDefaultRowModels,
  resolveRowModelFeatures,
} from '~ui/app/utils/Components/Table/row-models'
import { createStateBridge } from '~ui/app/utils/Components/Table/state-bridge'
import { createColumnsFromData } from '~ui/app/utils/Components/Table/types'

describe('Table row-models', () => {
  it('enables filtering row model when column filters state is present', () => {
    const features = resolveRowModelFeatures({
      state: { columnFilters: [] },
    })

    expect(features.enableFiltering).toBe(true)
  })

  it('applies filtered and sorted row models when features are enabled', () => {
    const options = applyDefaultRowModels({
      state: { sorting: [], columnFilters: [] },
    })

    expect(options.getCoreRowModel).toBeDefined()
    expect(options.getFilteredRowModel).toBeDefined()
    expect(options.getSortedRowModel).toBeDefined()
  })

  it('skips client pagination row model in manual pagination mode', () => {
    const options = applyDefaultRowModels({
      manualPagination: true,
      state: { pagination: { pageIndex: 0, pageSize: 10 } },
    })

    expect(options.getPaginationRowModel).toBeUndefined()
  })
})

describe('Table state bridge', () => {
  it('updates ref when bridge onChange is called', () => {
    const sorting = ref([{ id: 'name', desc: false }])
    const bridge = createStateBridge(sorting, undefined, undefined)

    bridge.onChange?.([{ id: 'email', desc: true }])

    expect(sorting.value).toEqual([{ id: 'email', desc: true }])
  })
})

describe('createColumnsFromData', () => {
  it('derives accessor columns from first row keys', () => {
    const columns = createColumnsFromData([
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
    ])

    expect(columns).toEqual([
      { accessorKey: 'id', header: 'id' },
      { accessorKey: 'name', header: 'name' },
    ])
  })
})
