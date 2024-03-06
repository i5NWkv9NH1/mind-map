// ? data
import type { ThemeDefinition } from '../'
import type { MindMapNode } from './node'

// TODO: remove
export interface MindMapData {
  /** 根节点和所有子节点的数据 */
  root: {
    data: {
      text: string
      [index: string]: any
    }
    children: MindMapNode[] | []
  }
  layout: string
  /** 主题设置 */
  theme: {
    /** 已在 mindMap 中注册的主题名称 */
    template: string
    /** 主题的基础样式 */
    config: Record<string, any>
  }
  /** 画布移动偏移量 */
  view: any
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

export interface NodeIcon {
  /** 图标的名称 */
  name: string
  /** url / base64 / svg */
  icon: string
}

export interface NodeIconGroup {
  /** 图标分组的名称 */
  name: string
  /** 图标分组的值 */
  type: string
  /** 分组下的图标列表，数组的每一项为一个对象 */
  list: NodeIcon[]
}

export interface NodeSticker {
  url: string
  width: number
  height: number
}

export interface NodeStickerGroup {
  name: string
  list: NodeSticker[]
}
export interface MindMapTheme { name: string, value: string, dark: boolean, theme?: ThemeDefinition }
