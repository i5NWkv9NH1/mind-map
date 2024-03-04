import type { MindMapNode } from './node'

// ? data

export type ViewDataChange = {
  state: {
    "scale": number
    "x": number
    "y": number
    "sx": number
    "sy": number
  }
  transform: {
    "scaleX": number
    "scaleY": number
    "shear": number
    "rotate": number
    "translateX": number
    "translateY": number
    "originX": number
    "originY": number
    "a": number
    "b": number
    "c": number
    "d": number
    "e": number
    "f": number
  }
}
export type MindMapData = Record<'root' | 'layout' | 'theme' | 'view' | 'config', any>
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
