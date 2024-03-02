import type { MindMapNode } from './node'

// ? data
export interface MindMapData {
  // ? root
  children: MindMapNode[]
  data: {
    expand: boolean
    isActive: boolean
    uid: string
    text: string
  }
}
