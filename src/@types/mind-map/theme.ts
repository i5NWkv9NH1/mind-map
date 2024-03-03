export interface ThemeDefinition {
  backgroundColor: string
  // 连线的颜色
  lineColor: string
  lineWidth: number
  // 概要连线的粗细
  generalizationLineWidth: number
  // 概要连线的颜色
  generalizationLineColor: string
  // 关联线默认状态的颜色
  associativeLineColor: string
  // 关联线文字颜色
  associativeLineTextColor: string
  // 根节点样式
  root: {
    fillColor: string
    color: string
    borderColor: string
    borderWidth: number
    fontSize: number
    shape: string
  },
  // 二级节点样式
  second: {
    fillColor: string
    color: string
    borderColor: string
    borderWidth: number
    fontSize: number
    shape: string
  },
  // 三级及以下节点样式
  node: {
    fontSize: number
    color: string
  },
  // 概要节点样式
  generalization: {
    fontSize: number
    fillColor: string
    borderColor: string
    borderWidth: number
    color: string
  }
}
export type MindMapTheme = { name: string; value: string; dark: boolean; theme?: ThemeDefinition; }
