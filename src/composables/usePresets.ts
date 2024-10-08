/**
 * @description May be replaced by api
 */
import { themeList } from 'simple-mind-map/src/constants/constant'
import { v4 as uuid } from 'uuid'
import { computed, reactive, ref } from 'vue'

// @ts-ignore
import simpleMapExampleData from 'simple-mind-map/example/exampleData'

// @ts-ignore
import { nodeIconList } from 'simple-mind-map/src/svg/icons'
import { cactus, classic5, classic6, classic7, dark3, dark4, darkNightLceBlade, lemonBubbles, morandi, neonLamp, oreo, rose, seaBlueLine, shallowSea } from '../helpers/themes'
import stickers from './images'

// @ts-ignore
import { extendedIconGroups } from './icons'
import type { MindMapTheme, NodeIconGroup, NodeStickerGroup } from '@/@types'

export type ShapeMap = 'rectangle' | 'diamond' | 'parallelogram' | 'roundedRectangle' | 'octagonalRectangle' | 'outerTriangularRectangle' | 'innerTriangularRectangle' | 'ellipse' | 'circle'
export interface DefaultArrayType<T = number | string> { id: string, name: string, value: T }
export type UsedColor = string
export type FontFamily = DefaultArrayType<string>
export type TextUnderlineStyle = DefaultArrayType<string>
export type BorderStyle = DefaultArrayType<string>
export type BorderWidth = DefaultArrayType
export type BorderRedius = DefaultArrayType
export type Shape = DefaultArrayType<ShapeMap>
export type LineStyle = DefaultArrayType<string>
export type LineWidth = DefaultArrayType<number>
export type LineArrowPosition = DefaultArrayType
export type MouseBehavior = DefaultArrayType<'zoom' | 'move'>
export type MouseScrollScale = DefaultArrayType<boolean>
export type CreateNodeBehavior = DefaultArrayType
export type BackgroundPosition = DefaultArrayType
export type BackgroundRepeat = DefaultArrayType
export type BackgroundSize = DefaultArrayType<string>
export type LayoutStructure = DefaultArrayType<string>

export function usePresets() {
  const usedColorItems = ref<UsedColor[]>([
    // #region // # color expand
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
    'transparent',
    // #endregion
  ])
  const fontFamilyItems = ref<FontFamily[]>([
    { id: uuid(), name: '宋体', value: '宋体, SimSun, Songti SC' },
    { id: uuid(), name: '微软雅黑', value: '微软雅黑, Microsoft YaHei' },
    { id: uuid(), name: '楷体', value: '楷体, 楷体_GB2312, SimKai, STKaiti' },
    { id: uuid(), name: '黑体', value: '黑体, SimHei, Heiti SC' },
    { id: uuid(), name: '隶书', value: '隶书, SimLi' },
    { id: uuid(), name: 'Andale Mono', value: 'andale mono' },
    { id: uuid(), name: 'Arial', value: 'arial, helvetica, sans-serif' },
    { id: uuid(), name: 'arialBlack', value: 'arial black, avant garde' },
    { id: uuid(), name: 'Comic Sans Ms', value: 'comic sans ms' },
    { id: uuid(), name: 'Impact', value: 'impact, chicago' },
    { id: uuid(), name: 'Times New Roman', value: 'times new roman' },
    { id: uuid(), name: 'Sans-Serif', value: 'sans-serif' },
    { id: uuid(), name: 'serif', value: 'serif' },
  ])
  const fontSizeItems = ref<number[]>([10, 12, 14, 16, 18, 24, 32, 48])
  const fontLineHeightItems = ref<number[]>([1, 1.5, 2, 2.5, 3])
  const textUnderlineStyleItems = ref<TextUnderlineStyle[]>([
    { id: uuid(), name: '无', value: 'none' },
    { id: uuid(), name: '下划线', value: 'underline' },
    { id: uuid(), name: '中划线', value: 'line-through' },
    { id: uuid(), name: '上划线', value: 'overline' },
  ])
  const borderStyleItems = ref<BorderStyle[]>([
    { id: uuid(), name: '实线', value: 'none' },
    { id: uuid(), name: '虚线1', value: '5,5' },
    { id: uuid(), name: '虚线2', value: '10,10' },
    { id: uuid(), name: '虚线3', value: '20,10,5,5,5,10' },
    { id: uuid(), name: '虚线4', value: '5, 5, 1, 5' },
    { id: uuid(), name: '虚线5', value: '15, 10, 5, 10, 15' },
    { id: uuid(), name: '虚线6', value: '1, 5' },
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
    { id: uuid(), name: '圆', value: 'circle' },
  ])
  const shapeMapItems = ref<Record<any, any>>({
    rectangle: 'M 4 12 L 4 3 L 56 3 L 56 21 L 4 21 L 4 12 Z',
    diamond: 'M 4 12 L 30 3 L 56 12 L 30 21 L 4 12 Z',
    parallelogram: 'M 10 3 L 56 3 L 50 21 L 4 21 L 10 3 Z',
    roundedRectangle:
      'M 13 3 L 47 3 A 9 9 0, 0 1 47 21 L 13 21 A 9 9 0, 0 1 13 3 Z',
    octagonalRectangle:
      'M 4 12 L 4 9 L 10 3 L 50 3 L 56 9 L 56 15 L 50 21 L 10 21 L 4 15 L 4 12 Z',
    outerTriangularRectangle:
      'M 4 12 L 10 3 L 50 3 L 56 12 L 50 21 L 10 21 L 4 12 Z',
    innerTriangularRectangle:
      'M 10 12 L 4 3 L 56 3 L 50 12 L 56 21 L 4 21 L 10 12 Z',
    ellipse: 'M 4 12 A 26 9 0, 1, 0 30 3 A 26 9 0, 0, 0 4 12 Z',
    circle: 'M 21 12 A 9 9 0, 1, 0 30 3 A 9 9 0, 0, 0 21 12 Z',
  })
  const lineStyleItems = ref<LineStyle[]>([
    { id: uuid(), name: '直线', value: 'straight' },
    { id: uuid(), name: '曲线', value: 'curve' },
    { id: uuid(), name: '直连', value: 'direct' },
  ])
  const lineStyleMap = reactive<Record<'straight' | 'curve' | 'direct', string>>({
    straight: `<path d="M18,14L30,14L30,5L42,5" fill="none" stroke="#000" stroke-width="2"></path><path d="M18,14L30,14L30,23L42,23" fill="none" stroke="#000" stroke-width="2"></path>`,
    curve: `<path d="M18,14L30,14A12,-9 0 0 1 42,5" fill="none" stroke="#000" stroke-width="2"></path><path d="M18,14L30,14A12,9 0 0 0 42,23" fill="none" stroke="#000" stroke-width="2"></path>`,
    direct: `<path d="M18,14L30,14L42,5" fill="none" stroke="#000" stroke-width="2"></path><path d="M18,14L30,14L42,23" fill="none" stroke="#000" stroke-width="2"></path>`,
  })
  const lineRadiusItems = ref<DefaultArrayType<number>[]>([
    { id: uuid(), name: '0', value: 0 },
    { id: uuid(), name: '2', value: 2 },
    { id: uuid(), name: '5', value: 5 },
    { id: uuid(), name: '7', value: 7 },
    { id: uuid(), name: '10', value: 10 },
    { id: uuid(), name: '12', value: 12 },
    { id: uuid(), name: '15', value: 15 },
  ])
  // if linestyle === 'curve'
  const rootLineStyleItems = ref<DefaultArrayType<boolean>[]>([
    { id: uuid(), name: '括号', value: false },
    { id: uuid(), name: '大括号', value: true },
  ])
  // if linestyle === 'curve'
  const rootLineStartPositionItems = ref<DefaultArrayType<boolean>[]>([
    { id: uuid(), name: '中心', value: false },
    { id: uuid(), name: '右侧', value: true },
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
    { id: uuid(), name: '缩放视图', value: 'zoom' },
    { id: uuid(), name: '上下移动视图', value: 'move' },
  ])
  const mouseScrollScaleItems = ref<MouseScrollScale[]>([
    { id: uuid(), name: '向前缩小，向后放大', value: false },
    { id: uuid(), name: '向前放大，向后缩小', value: true },
  ])
  const createNodeBehaviorItems = ref<CreateNodeBehavior[]>([
    { id: uuid(), name: '激活新节点并进入编辑', value: 'default' },
    { id: uuid(), name: '不激活新节点', value: 'notActive' },
    { id: uuid(), name: '只激活新节点，不进入编辑', value: 'activeOnly' },
  ])
  const backgroundRepeatItems = ref<BackgroundPosition[]>([
    { id: uuid(), name: '不重复', value: 'no-repeat' },
    { id: uuid(), name: '重复', value: 'repeat' },
    { id: uuid(), name: '水平方向重复', value: 'repeat-x' },
    { id: uuid(), name: '垂直方向重复', value: 'repeat-y' },
  ])

  const backgroundPositionItems = ref<BackgroundRepeat[]>([
    { id: uuid(), name: '默认', value: '0% 0%' },
    { id: uuid(), name: '左上', value: 'left top' },
    { id: uuid(), name: '左中', value: 'left center' },
    { id: uuid(), name: '左下', value: 'left bottom' },
    { id: uuid(), name: '右上', value: 'right top' },
    { id: uuid(), name: '右中', value: 'right center' },
    { id: uuid(), name: '右下', value: 'right bottom' },
    { id: uuid(), name: '中上', value: 'center top' },
    { id: uuid(), name: '居中', value: 'center center' },
    { id: uuid(), name: '中下', value: 'center bottom' },
  ])
  const backgroundSizeItems = ref<BackgroundSize[]>([
    { id: uuid(), name: '自动', value: 'auto' },
    { id: uuid(), name: '覆盖', value: 'cover' },
    { id: uuid(), name: '保持', value: 'contain' },
  ])
  const customThemes = ref<MindMapTheme[]>([
    // #region // # expand
    {
      name: '奥利奥',
      value: 'oreo',
      theme: oreo,
      dark: false,
    },
    {
      name: '浅海',
      value: 'shallowSea',
      theme: shallowSea,
      dark: false,
    },
    {
      name: '柠檬气泡',
      value: 'lemonBubbles',
      theme: lemonBubbles,
      dark: false,
    },
    {
      name: '玫瑰',
      value: 'rose',
      theme: rose,
      dark: false,
    },
    {
      name: '海蓝线',
      value: 'seaBlueLine',
      theme: seaBlueLine,
      dark: false,
    },
    {
      name: '霓虹灯',
      value: 'neonLamp',
      theme: neonLamp,
      dark: true,
    },
    {
      name: '暗夜冰刃',
      value: 'darkNightLceBlade',
      theme: darkNightLceBlade,
      dark: true,
    },
    {
      name: '莫兰迪',
      value: 'morandi',
      theme: morandi,
      dark: false,
    },
    {
      name: '脑图经典5',
      value: 'classic5',
      theme: classic5,
      dark: false,
    },
    {
      name: '暗色3',
      value: 'dark3',
      theme: dark3,
      dark: true,
    },
    {
      name: '暗色4',
      value: 'dark4',
      theme: dark4,
      dark: true,
    },
    {
      name: '仙人掌',
      value: 'cactus',
      theme: cactus,
      dark: false,
    },
    {
      name: '脑图经典6',
      value: 'classic6',
      theme: classic6,
      dark: false,
    },
    {
      name: '脑图经典7',
      value: 'classic7',
      theme: classic7,
      dark: false,
    },
    // #endregion
  ])
  const internalThemes = ref<any[]>(themeList)
  const mindMapThemes = computed(() => [...customThemes.value, ...internalThemes.value])
  const baiduThemes = [
    'default',
    'skyGreen',
    'classic2',
    'classic3',
    'classicGreen',
    'classicBlue',
    'blueSky',
    'brainImpairedPink',
    'earthYellow',
    'freshGreen',
    'freshRed',
    'romanticPurple',
    'pinkGrape',
    'mint',
  ]
  const getClassicThemes = computed(() => mindMapThemes.value.filter(theme => !theme.dark))
  const getDarkThemes = computed(() => mindMapThemes.value.filter(theme => theme.dark))
  const getSimpleThemes = computed(() => {
    const items: MindMapTheme[] = []
    mindMapThemes.value.forEach((theme) => {
      if (baiduThemes.includes(theme.value))
        items.push(theme)
    })
    return items
  })

  // # 逻辑结构图
  const LayoutStructureItems = ref<LayoutStructure[]>([
    // #region // # expand
    {
      id: uuid(),
      name: '逻辑结构图',
      value: 'logicalStructure',
    },
    {
      id: uuid(),
      name: '思维导图',
      value: 'mindMap',
    },
    {
      id: uuid(),
      name: '组织结构图',
      value: 'organizationStructure',
    },
    {
      id: uuid(),
      name: '目录组织图',
      value: 'catalogOrganization',
    },
    {
      id: uuid(),
      name: '时间轴',
      value: 'timeline',
    },
    {
      id: uuid(),
      name: '时间轴2',
      value: 'timeline2',
    },
    {
      id: uuid(),
      name: '竖向时间轴',
      value: 'verticalTimeline',
    },
    {
      id: uuid(),
      name: '鱼骨图',
      value: 'fishbone',
    },
    // #endregion
  ])
  const mathItems = ref<string[]>([
    'a^2',
    'a_2',
    'a^{2+2}',
    'a_{i,j}',
    'x_2^3',
    '\\overbrace{1+2+\\cdots+100}',
    '\\sum_{k=1}^N k^2',
    '\\lim_{n \\to \\infty}x_n',
    '\\int_{-N}^{N} e^x\\, dx',
    '\\sqrt{3}',
    '\\sqrt[n]{3}',
    '\\sin\\theta',
    '\\log X',
    '\\log_{10}',
    '\\log_\\alpha X',
    '\\lim_{t\\to n}T',
    '\\frac{1}{2}=0.5',
    '\\binom{n}{k}',
    '\\begin{matrix}x & y \\\\z & v\\end{matrix}',
    '\\begin{cases}3x + 5y +  z \\\\7x - 2y + 4z \\\\-6x + 3y + 2z\\end{cases}',
  ])

  const exampleData = ref<any>(simpleMapExampleData)
  const internalIconGroupItems = ref<NodeIconGroup[]>(nodeIconList)
  const extendedIconGroupsItems = ref<NodeIconGroup[]>(extendedIconGroups)
  const iconGroupItems = computed<NodeIconGroup[]>(() => [...internalIconGroupItems.value, ...extendedIconGroupsItems.value])
  const stickerGroupItems = ref<NodeStickerGroup[]>(stickers)
  const usedFormluaItems = ref<string[]>([
    'a^2',
    'a_2',
    'a^{2+2}',
    'a_{i,j}',
    'x_2^3',
    '\\overbrace{1+2+\\cdots+100}',
    '\\sum_{k=1}^N k^2',
    '\\lim_{n \\to \\infty}x_n',
    '\\int_{-N}^{N} e^x\\, dx',
    '\\sqrt{3}',
    '\\sqrt[n]{3}',
    '\\sin\\theta',
    '\\log X',
    '\\log_{10}',
    '\\log_\\alpha X',
    '\\lim_{t\\to n}T',
    '\\frac{1}{2}=0.5',
    '\\binom{n}{k}',
    '\\begin{matrix}x & y \\\\z & v\\end{matrix}',
    '\\begin{cases}3x + 5y +  z \\\\7x - 2y + 4z \\\\-6x + 3y + 2z\\end{cases}',
  ])

  return {
    usedColorItems,
    fontFamilyItems,
    fontSizeItems,
    fontLineHeightItems,
    textUnderlineStyleItems,
    borderStyleItems,
    radiusSizeItems,
    lineWidthSizeItems,
    shapeItems,
    shapeMapItems,
    lineStyleItems,
    rootLineStyleItems,
    rootLineStartPositionItems,
    lineRadiusItems,
    lineStyleMap,
    lineArrowPositionItems,
    mouseBehaviorItems,
    mouseScrollScaleItems,
    createNodeBehaviorItems,
    backgroundPositionItems,
    backgroundRepeatItems,
    backgroundSizeItems,
    customThemes,
    internalThemes,
    mindMapThemes,
    getClassicThemes,
    getDarkThemes,
    getSimpleThemes,
    LayoutStructureItems,
    mathItems,
    exampleData,
    internalIconGroupItems,
    extendedIconGroupsItems,
    iconGroupItems,
    stickerGroupItems,
    usedFormluaItems,
  }
}
