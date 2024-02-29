import { MindMapNode } from "./node"

// ? data
export type MindMapData = {
  // ? root
  children: MindMapNode[]
  data: {
    expand: boolean
    isActive: boolean
    uid: string
    text: String
  }
}

