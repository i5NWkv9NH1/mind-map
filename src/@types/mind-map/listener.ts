import { MindMapNode } from "./node"

// ? listener
export type OnNodeActive = {
  node: MindMapNode
  activeNodes: MindMapNode[]
}
