// ? node
export interface MindMapNode<T = any> {
  uid: string
  nodeData: T
  text: string
  layerIndex: number
  width: number
  height: number
  left: number
  top: number
  parent: MindMapNode
  children: MindMapNode[]
  group: SVGElement
  isGeneralization: boolean
  isRoot: boolean
  isDrag: boolean
  setImage: (args: SetImage | null) => void
  setIcon: (args: SetIcon) => void
  setHyperlink: (url: string, name: string) => void
  setNote: (content: string) => void
  setTag: (tags: string[]) => void
  /**
   * @param name 样式名称 - fontFamily...
   * @param value  样式值 - 11
   * @param isActive
   */
  setStyle: (name: StyleName, value: string | number | any, isActive?: boolean) => void
  getData: (type: GetDataType) => any
  getRect: () => Rect
  getStyle: (key: string, noRerender?: boolean) => string | number | boolean | object | any
}

export interface SetImage { url: string | ArrayBuffer, title?: string, width: number, height: number }
export type SetIcon = string[]
export type GetDataType = 'image' | 'imageTitle' | 'icon' | 'hyperlink' | 'hyperlinkTitle' | 'note' | 'tag'
export type StyleName = `shape` | string
export type NodeShape = 'circle' | 'rectangle' | 'diamond' | 'parallelogram' | 'roundedRectangle' | 'octagonalRectangle' | 'outerTriangularRectangle' | 'innerTriangularRectangle' | 'ellipse' | 'circle'
export type StyleValue = NodeShape | string | number
export interface Rect {
  x: number
  y: number
  width: number
  height: number
  [index: string]: any
}
