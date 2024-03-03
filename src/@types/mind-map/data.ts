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
    richText?: boolean
    root?: boolean
  }
  [key: string]: any
}
// # 节点数据中非样式的字段
export type GetNodeDataNoStyleField = 'text' |
  'image' |
  'imageTitle' |
  'imageSize' |
  'icon' |
  'tag' |
  'hyperlink' |
  'hyperlinkTitle' |
  'note' |
  'expand' |
  'isActive' |
  'generalization' |
  'richText' |
  'resetRichText' |
  'uid' |
  'activeStyle' |
  'associativeLineTargets' |
  'associativeLineTargetControlOffsets' |
  'associativeLinePoint' |
  'associativeLineText'
