/**
 * @description May be replaced by api
 */
import { v4 as uuid } from "uuid"
import { ref } from "vue"

export type UsedColor = string
export type FontFamily = { id: string; name: string; value: number | string }
export type TextUnderlineStyle = { id: string; name: string; value: number | string }
export type BorderStyle = { id: string; name: string; value: string | number }
export type BorderWidth = { id: string; name: string; value: string | number }
export type BorderRedius = { id: string; name: string; value: string | number }
export type Shape = { id: string; name: string; value: string | number }
export type LineStyle = { id: string; name: string; value: string | number }
export type LineWidth = { id: string; name: string; value: string | number }
export type LineArrowPosition = { id: string; name: string; value: string | number }
export type MouseBehavior = { id: string; name: string; value: string | number }
export type MouseScrollScale = { id: string; name: string; value: string | number }
export type CreateNodeBehavior = { id: string; name: string; value: string | number }

export function usePresets() {
  const usedColorItems = ref<UsedColor[]>([
    //#region // # color expand
    '#4D4D4D',
    '#999999',
    '#FFFFFF',
    '#F44E3B',
    '#FE9200',
    '#FCDC00',
    '#DBDF00',
    '#A4DD00',
    '#68CCCA',
    '#73D8FF',
    '#AEA1FF',
    '#FDA1FF',
    '#333333',
    '#808080',
    '#cccccc',
    '#D33115',
    '#E27300',
    '#FCC400',
    '#B0BC00',
    '#68BC00',
    '#16A5A5',
    '#009CE0',
    '#7B64FF',
    '#FA28FF',
    '#000000',
    '#666666',
    '#B3B3B3',
    '#9F0500',
    '#C45100',
    '#FB9E00',
    '#808900',
    '#194D33',
    '#0C797D',
    '#0062B1',
    '#653294',
    '#AB149E',
    'transparent'
    //#endregion
  ])
  const fontFamilyItems = ref<FontFamily[]>([
    { id: uuid(), "name": "宋体", "value": "宋体, SimSun, Songti SC" },
    { id: uuid(), "name": "微软雅黑", "value": "微软雅黑, Microsoft YaHei" },
    { id: uuid(), "name": "楷体", "value": "楷体, 楷体_GB2312, SimKai, STKaiti" },
    { id: uuid(), "name": "黑体", "value": "黑体, SimHei, Heiti SC" },
    { id: uuid(), "name": "隶书", "value": "隶书, SimLi" },
    { id: uuid(), "name": "Andale Mono", "value": "andale mono" },
    { id: uuid(), "name": "Arial", "value": "arial, helvetica, sans-serif" },
    { id: uuid(), "name": "arialBlack", "value": "arial black, avant garde" },
    { id: uuid(), "name": "Comic Sans Ms", "value": "comic sans ms" },
    { id: uuid(), "name": "Impact", "value": "impact, chicago" },
    { id: uuid(), "name": "Times New Roman", "value": "times new roman" },
    { id: uuid(), "name": "Sans-Serif", "value": "sans-serif" },
    { id: uuid(), "name": "serif", "value": "serif" }
  ])
  const fontSizeItems = ref<number[]>([10, 12, 16, 18, 24, 32, 48])
  const fontLineHeightItems = ref<number[]>([1, 1.5, 2, 2.5, 3])
  const textUnderlineStyleItems = ref<TextUnderlineStyle[]>([
    { id: uuid(), name: '无', value: 0 },
    { id: uuid(), name: '下划线', value: 1 },
    { id: uuid(), name: '中划线', value: 2 },
    { id: uuid(), name: '上划线', value: 3 },
  ])
  const borderStyleItems = ref<BorderStyle[]>([
    { id: uuid(), name: '实线', value: 'none' },
    { id: uuid(), name: '虚线1', value: '5,5' },
    { id: uuid(), name: '虚线2', value: '10,10' },
    { id: uuid(), name: '虚线3', value: '20,10,5,5,5,10' },
    { id: uuid(), name: '虚线4', value: '5, 5, 1, 5' },
    { id: uuid(), name: '虚线5', value: '15, 10, 5, 10, 15' },
    { id: uuid(), name: '虚线6', value: '1, 5' }
  ])
  const shapeItems = ref<Shape[]>([
    { id: uuid(), name: '矩形', value: 'rectangle' },
    { id: uuid(), name: '菱形', value: 'diamond' },
    { id: uuid(), name: '平行四边形', value: 'parallelogram' },
    { id: uuid(), name: '圆角矩形', value: 'roundedRectangle' },
    { id: uuid(), name: '八角矩形', value: 'octagonalRectangle' },
    { id: uuid(), name: '外三角矩形', value: 'outerTriangularRectangle' },
    { id: uuid(), name: '内三角矩形', value: 'innerTriangularRectangle' },
    { id: uuid(), name: '椭圆', value: 'ellipse' },
    { id: uuid(), name: '圆', value: 'circle' }
  ])
  const lineStyleItems = ref<LineStyle[]>([
    { id: uuid(), name: '直线', value: 'straight' },
    { id: uuid(), name: '曲线', value: 'curve' },
    { id: uuid(), name: '直连', value: 'direct' }
  ])
  const lineWidthSizeItems = ref<LineWidth[]>([
    { id: uuid(), name: '0', value: 0 },
    { id: uuid(), name: '1', value: 1 },
    { id: uuid(), name: '2', value: 2 },
    { id: uuid(), name: '3', value: 3 },
    { id: uuid(), name: '4', value: 4 },
    { id: uuid(), name: '5', value: 5 },
    { id: uuid(), name: '6', value: 6 },
    { id: uuid(), name: '7', value: 7 },
    { id: uuid(), name: '8', value: 8 },
    { id: uuid(), name: '9', value: 9 },
    { id: uuid(), name: '10', value: 10 },
  ])
  const radiusSizeItems = ref<LineWidth[]>([
    { id: uuid(), name: '0', value: 0 },
    { id: uuid(), name: '1', value: 1 },
    { id: uuid(), name: '2', value: 2 },
    { id: uuid(), name: '3', value: 3 },
    { id: uuid(), name: '4', value: 4 },
    { id: uuid(), name: '5', value: 5 },
    { id: uuid(), name: '6', value: 6 },
    { id: uuid(), name: '7', value: 7 },
    { id: uuid(), name: '8', value: 8 },
    { id: uuid(), name: '9', value: 9 },
    { id: uuid(), name: '10', value: 10 },
  ])
  const lineArrowPositionItems = ref<LineArrowPosition[]>([
    { id: uuid(), name: '头部', value: 'start' },
    { id: uuid(), name: '尾部', value: 'end' },
  ])
  const mouseBehaviorItems = ref<MouseBehavior[]>([
    { id: uuid(), name: '缩放视图', value: 0 },
    { id: uuid(), name: '上下移动视图', value: 1 }
  ])
  const mouseScrollScaleItems = ref<MouseScrollScale[]>([
    { id: uuid(), name: '向前缩小，向后放大', value: 0 },
    { id: uuid(), name: '向前放大，向后缩小', value: 0 },
  ])
  const createNodeBehaviorItems = ref<CreateNodeBehavior[]>([
    { id: uuid(), name: '激活新节点并进入编辑', value: 0 },
    { id: uuid(), name: '不激活新节点', value: 1 },
    { id: uuid(), name: '只激活新节点，不进入编辑', value: 2 },
  ])

  return {
    // #
    usedColorItems,
    // #
    fontFamilyItems,
    fontSizeItems,
    fontLineHeightItems,
    textUnderlineStyleItems,
    // #
    borderStyleItems,
    radiusSizeItems,
    lineWidthSizeItems,
    // #
    shapeItems,
    // #
    lineStyleItems,
    lineArrowPositionItems,
    // #
    mouseBehaviorItems,
    mouseScrollScaleItems,
    createNodeBehaviorItems,
    // #
  }
}
