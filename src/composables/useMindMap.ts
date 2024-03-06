// ! Share MindMap Object

import type MindMap from 'simple-mind-map'
import { ref, shallowRef } from 'vue'
import type { MindMapNode } from '@/@types'

// ! Not in store cause it containe DOM Element
const mindMap = ref<MindMap>()
const activeNodes = shallowRef<MindMapNode[]>([])
const activeNode = shallowRef<MindMapNode>()

export function useMindMap() {
  return { mindMap, activeNodes, activeNode }
}
