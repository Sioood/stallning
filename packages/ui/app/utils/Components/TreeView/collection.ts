import { createTreeCollection, type TreeCollection } from '@ark-ui/vue/tree-view'

import type { TreeViewItem } from './context'

const ROOT_NODE_ID = 'ROOT'

export function createTreeViewCollection(items: TreeViewItem[]): TreeCollection<TreeViewItem> {
  return createTreeCollection<TreeViewItem>({
    nodeToValue: (node) => node.id,
    nodeToString: (node) => node.label,
    rootNode: {
      id: ROOT_NODE_ID,
      label: '',
      children: items,
    },
  })
}

export function getTreeViewRootChildren(collection: TreeCollection<TreeViewItem>): TreeViewItem[] {
  return collection.rootNode.children ?? []
}
