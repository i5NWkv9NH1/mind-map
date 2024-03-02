import type { MindMapNode } from './node'

// ? listener
export interface OnNodeActive {
  node: MindMapNode
  activeNodes: MindMapNode[]
}
