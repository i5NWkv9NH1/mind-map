// ! Share MindMap Object

import type MindMap from 'simple-mind-map'
import { ref } from 'vue'

// ! Not in store cause it containe DOM Element
const mindMap = ref<MindMap>()

export function useMindMap() {
  return { mindMap }
}
