// ! Share MindMap Object

import type { MindMapNode } from '@/@types'
import type MindMap from 'simple-mind-map'
import { ref, shallowRef } from 'vue'

// ! Not in store cause it containe DOM Element
// ! Shared
const mindMap = ref<MindMap>()
const activeNodes = shallowRef<MindMapNode[]>([])
const activeNode = shallowRef<MindMapNode>()

export function useMindMap() {
  return { mindMap, activeNodes, activeNode }
}
