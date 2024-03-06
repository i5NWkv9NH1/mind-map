import type { NodeIconGroup } from './data'
import type { MindMapNode } from './node'

export * from './node'
export * from './data'

export interface MindMapOptions {
  el: string | HTMLElement
  readonly: boolean
  layout: string
  fishboneDeg: number
  theme: string
  themeConfig: Record<string, any>
  scaleRatio: number
  mouseScaleCenterUseMousePosition: boolean
  maxTag: number
  expandBtnSize: number
  imgTextMargin: number
  textContentMargin: number
  selectTranslateStep: number
  selectTranslateLimit: number
  customNoteContentShow: any
  enableFreeDrag: boolean
  watermarkConfig: {
    onlyExport: boolean
    text: string
    lineSpacing: number
    textSpacing: number
    angle: number
    textStyle: {
      color: string
      opacity: number
      fontSize: number
    }
  }
  textAutoWrapWidth: number
  customHandleMousewheel: any
  mousewheelAction: string
  mousewheelMoveStep: number
  mousewheelZoomActionReverse: boolean
  defaultInsertSecondLevelNodeText: string
  defaultInsertBelowSecondLevelNodeText: string
  expandBtnStyle: {
    color: string
    fill: string
    fontSize: number
    strokeColor: string
  }
  expandBtnIcon: {
    open: string
    close: string
  }
  expandBtnNumHandler: (num: any) => any
  isShowExpandNum: boolean
  enableShortcutOnlyWhenMouseInSvg: boolean
  initRootNodePosition: any
  exportPaddingX: number
  exportPaddingY: number
  nodeTextEditZIndex: number
  nodeNoteTooltipZIndex: number
  isEndNodeTextEditOnClickOuter: boolean
  maxHistoryCount: number
  alwaysShowExpandBtn: boolean
  iconList: any[]
  maxNodeCacheCount: number
  defaultAssociativeLineText: string
  fitPadding: number
  enableCtrlKeyNodeSelection: boolean
  useLeftKeySelectionRightKeyDrag: boolean
  beforeTextEdit: any
  isUseCustomNodeContent: boolean
  customCreateNodeContent: any
  customInnerElsAppendTo: any
  nodeDragPlaceholderMaxSize: number
  enableAutoEnterTextEditWhenKeydown: boolean
  richTextEditFakeInPlace: boolean
  customHandleClipboardText: any
  disableMouseWheelZoom: boolean
  disableTouchZoom: boolean
  errorHandler: (code: any, error: any) => void
  resetCss: string
  enableDblclickBackToRootNode: boolean
  minExportImgCanvasScale: number
  hoverRectColor: string
  hoverRectPadding: number
  selectTextOnEnterEditText: boolean
  deleteNodeActive: boolean
  autoMoveWhenMouseInEdgeOnDrag: boolean
  fit: boolean
  dragMultiNodeRectConfig: {
    width: number
    height: number
    fill: string
  }
  dragPlaceholderRectFill: string
  dragOpacityConfig: {
    cloneNodeOpacity: number
    beingDragNodeOpacity: number
  }
  tagsColorMap: Record<string, any>
  cooperateStyle: {
    avatarSize: number
    fontSize: number
  }
  associativeLineIsAlwaysAboveNode: boolean
  defaultGeneralizationText: string
  handleIsSplitByWrapOnPasteCreateNewNode: any
  addHistoryTime: number
  isDisableDrag: boolean
  highlightNodeBoxStyle: {
    stroke: string
    fill: string
  }
  createNewNodeBehavior: string
  defaultNodeImage: string
  isLimitMindMapInCanvas: boolean
  isLimitMindMapInCanvasWhenHasScrollbar: boolean
  handleNodePasteImg: any
  associativeLineInitPointsPosition: {
    from: string
    to: string
  }
  enableAdjustAssociativeLinePoints: boolean
  customCreateNodePath: any
  customCreateNodePolygon: any
  customTransformNodeLinePath: any
}
export interface MindMapRoot {
  data: {
    text: string
  }
  children: MindMapNode[]
  [index: string]: any
}
export interface MindMapThemeConfig extends ThemeDefinition { }
// # 实例化传给 MindMap
// ! 除 data, theme, layout, themeConfig, view 之外的数据
// ! 不包括插件数据
// #region
export interface MindMapConfig {
  /**
   * @description 聚焦模式
   * @default false
   */
  isZenMode: boolean
  // /**
  //  * @description 画布模式
  //  * @default edit
  //  */
  // mode: MindMapMode
  /**
   * @description 设置鱼骨结构图的斜线角度
   * @default 45
   */
  fishboneDeg?: number
  /**
   * @description 放大缩小的增量比例
   * @default 0.1
   */
  scaleRatio?: number
  /**
   * @description 节点里最多显示的标签数量，多余的会被丢弃
   * @default 5
   */
  maxTag: number
  /**
   * @description 	导出图片时的内边距
   * @default 20
   */
  exportPadding?: number
  /**
   * @description 节点里图片和文字的间距
   * @default 5
   */
  imgTextMargin?: number
  /**
   * @description 节点里各种文字信息的间距，如图标和文字的间距
   * @default 2
   */
  textContentMargin?: number
  /**
   * @description 多选节点时鼠标移动到边缘时的画布移动偏移量
   * @default 3
   */
  selectTranslateStep?: number
  /**
   * @description 多选节点时鼠标移动距边缘多少距离时开始偏移
   * @default 20
   */
  selectTranslateLimit?: number
  /**
   * @description 自定义节点备注内容显示，Object类型，结构为：{show: (noteContent, left, top, node) => {// 你的显示节点备注逻辑
   * @description node为v0.8.1+版本新增的回参，代表节点实例 }, hide: () => {// 你的隐藏节点备注逻辑 }}
   * @default null
   */
  customNoteContentShow?: object | null
  /**
   * @description 	是否是只读模式
   * @default false
   */
  readonly?: boolean
  /**
   * @description 是否开启节点自由拖拽（自由拖拽即可以把节点拖拽到画布的任意位置，注意不是拖拽节点成为其他节点的子节点兄弟节点的功能，自由拖拽的连线会存在一定问题，所以该特性最好不要使用）
   * @default false
   */
  enableFreeDrag?: boolean
  // /**
  //  * @description 水印配置
  //  * @type {MindMapWaterConfig}
  //  */
  // watermarkConfig: MindMapWaterConfig
  /**
   * @description 节点内每行文本达到该宽度后自动换行
   * @default 500
   */
  textAutoWrapWidth?: number
  /**
   * @description 自定义鼠标滚轮事件处理，可以传一个函数，回调参数为事件对象
   * @default null
   */
  customHandleMousewheel?: Function | null
  /**
   * @description 鼠标滚轮的行为，zoom（放大缩小）、move（上下移动）
   * @description 如果 customHandleMousewheel 传了自定义函数，这个属性不生效
   * @default "move"
   */
  mousewheelAction?: 'move' | 'zoom'
  /**
   * @description 当 mousewheelAction 设为 move 时，可以通过该属性控制鼠标滚动一下视图移动的步长，单位px
   * @default 100
   */
  mousewheelMoveStep?: number
  /**
   * @description 当 mousewheelAction 设为 zoom 时，或者按住 Ctrl 键时，默认向前滚动是缩小，向后滚动是放大，如果该属性设为true，那么会反过来
   * @default true
   */
  mousewheelZoomActionReverse?: boolean
  /**
   * @todo: i18n
   * @description 默认插入的二级节点的文字
   * @default 二级节点
   */
  defaultInsertSecondLevelNodeText?: string
  /**
   * @description	默认插入的二级以下节点的文字
   * @default	分支主题
   */
  defaultInsertBelowSecondLevelNodeText?: string
  /**
   * @description 展开收起按钮的颜色
   * @default { color: '#808080', fill: '#fff', fontSize: 13, strokeColor: '#333333' }
   */
  expandBtnStyle?: ExpandButtonStyle
  /**
   * @description 自定义展开收起按钮的图标，可以传图标的svg字符串
   * @default { open: '', close: '' }
   */
  expandBtnIcon?: ExpandButtonIcon
  /**
   * @description 用于自定义收起时显示节点数量的内容，接收一个参数，代表收起的节点实例
   * @default null
   * @type {MindMapNode}
   * @returns {string | number} 一个数字或字符串，代表最终显示的内容，比如你可以当数量大于99时，显示99+
   */
  expandBtnNumHandler?: null | Function
  /**
   * @description 节点收起时是否显示收起的数量
   * @default true
   */
  isShowExpandNum?: boolean
  /**
   * @description 是否只有当鼠标在画布内才响应快捷键事件
   * @default true
   */
  enableShortcutOnlyWhenMouseInSvg?: boolean
  /**
   * @description 初始根节点的位置，可传一个数组
   *  代表根节点处于画布中心位置，除了center，
   *  关键词还可以设置left、top、right、bottom
   *  除了可以传关键词，数组的每项还可以传递一个数字，代表具体的像素
   *  可以传递一个百分比字符串，比如['40%', '60%']，代表水平位置在画布宽度的40%的位置，垂直位置在画布高度的60%的位置
   * @default ['center', 'center']
   */
  initRootNodePosition?: string[]
  /**
   * @description 导出png、svg、pdf时的图形水平内边距
   * @default 10
   */
  exportPaddingX?: number
  /**
   * @description 导出png、svg、pdf时的图形垂直内边距
   * @default 10
   */
  exportPaddingY?: number
  /**
   * @description 节点文本编辑框元素的z-index
   * @default 	3000
   */
  nodeTextEditZIndex?: number
  /**
   * @description 节点备注浮层元素的z-index
   * @default 	3000
   */
  nodeNoteTooltipZIndex?: number
  /**
   * @description 是否在点击了画布外的区域时结束节点文本的编辑状态
   * @default true
   */
  isEndNodeTextEditOnClickOuter?: boolean
  /**
   * @description 最大历史记录数
   * @default 500
   */
  maxHistoryCount?: number
  /**
   * @description 是否一直显示节点的展开收起按钮，默认为鼠标移上去和激活时才显示
   * @default false
   */
  alwaysShowExpandBtn?: boolean
  /**
   * @description 扩展节点可插入的图标，数组的每一项为一个对象，对象详细结构请参考下方【图标配置】表格
   * @type {Array<NodeIconGroup>}
   * @default []
   */
  iconList?: NodeIconGroup[]
  /**
   * @description 节点最大缓存数量。为了优化性能，内部会维护一个节点缓存池，用来复用节点，通过该属性可以指定池的最大缓存数量
   * @default 1000
   */
  maxNodeCacheCount?: number
  /**
   * @todo i18n
   * @description 关联线默认文字
   * @default 关联
   */
  defaultAssociativeLineText?: string
  /**
   * @description 思维导图适应画布大小时的内边距，单位：px
   * @default 50
   */
  fitPadding?: number
  /**
   * @description 是否开启按住ctrl键多选节点的功能
   * @default true
   */
  enableCtrlKeyNodeSelection?: boolean
  /**
   * @description 设置为左键多选节点，右键拖动画布
   * @default false
   */
  useLeftKeySelectionRightKeyDrag?: boolean
  /**
   * @description 节点即将进入编辑前的回调方法，如果该方法返回true以外的值，那么将取消编辑，函数可以返回一个值，或一个Promise，回调参数为节点实例
   * @default false
   */
  beforeTextEdit?: (node: MindMapNode) => boolean | MindMapNode | Promise<any>
  /**
   * @description 是否自定义节点内容
   * @default false
   */
  isUseCustomNodeContent?: boolean
  /**
   * @description 如果isUseCustomNodeContent设为true，那么需要使用该选项传入一个方法，接收节点实例node为参数（如果要获取该节点的数据，可以通过node.nodeData.data），需要返回自定义节点内容元素，也就是DOM节点，如果某个节点不需要自定义，那么返回null即可
   * @default null
   */
  customCreateNodeContent?: (node: MindMapNode) => void | null
  /**
   * @description 鼠标缩放是否以鼠标当前位置为中心点，否则以画布中心点
   * @default true
   */
  mouseScaleCenterUseMousePosition?: boolean
  /**
   * @description 指定内部一些元素（节点文本编辑元素、节点备注显示元素、关联线文本编辑元素、节点图片调整按钮元素）添加到的位置，默认添加到document.body下
   * @default true
   */
  customInnerElsAppendTo?: HTMLElement | null
  /**
   * @description 拖拽元素时，指示元素新位置的块的最大高度
   * @default 20
   */
  nodeDragPlaceholderMaxSize?: number
  /**
   * @description 	是否在存在一个激活节点时，当按下中文、英文、数字按键时自动进入文本编辑模式
   * @default true
   */
  enableAutoEnterTextEditWhenKeydown?: boolean
  /**
   * @description 	设置富文本节点编辑框和节点大小一致，形成伪原地编辑的效果，需要注意的是，只有当节点内只有文本、且形状是矩形才会有比较好的效果
   * @default false
   */
  richTextEditFakeInPlace?: boolean
  /**
   * @description 自定义对剪贴板文本的处理。当按ctrl+v粘贴时会读取用户剪贴板中的文本和图片，默认只会判断文本是否是普通文本和simple-mind-map格式的节点数据，如果你想处理其他思维导图的数据，比如processon、zhixi等，那么可以传递一个函数，接受当前剪贴板中的文本为参数，返回处理后的数据，可以返回两种类型：1.返回一个纯文本，那么会直接以该文本创建一个子节点；2.返回一个节点对象，格式如下：{ simpleMindMap: true, data: { data: { text: '' }, children: [] } }，代表是simple-mind-map格式的数据，节点数据同simple-mind-map节点数据格式，如果你的处理逻辑存在异步逻辑，也可以返回一个promise
   * @default true
   */
  customHandleClipboardText?: (text?: string) => MindMapNode | null | Promise<MindMapNode | void>
  /**
   * @description 自定义错误处理函数，目前只会抛出一些异步逻辑出错的情况。可以传递一个函数，会接收两个参数，第一个为错误的类型，第二个为错误对象
   * @default () => void
   */
  errorHandler?: (type: any, error: any) => void
  /**
   * @description 禁止鼠标滚轮缩放，你仍旧可以使用api进行缩放
   * @default false
   */
  disableMouseWheelZoom?: boolean
  /**
   * @description 设置导出图片和svg时，针对富文本节点内容，也就是嵌入到svg中的html节点的默认样式覆盖，如果不覆盖，节点内容会发生偏移
   * @default "* { margin: 0; padding: 0; box-sizing: border-box; }"
   */
  resetCss?: string
  /**
   * @description 是否在鼠标双击时回到根节点，也就是让根节点居中显示
   * @default false
   */
  enableDblclickBackToRootNode?: boolean
  /**
   * @description 导出图片和pdf时canvas的缩放倍数，该配置会和window.devicePixelRatio值取最大值，用于提升图片清晰度
   * @default 2
   */
  minExportImgCanvasScale?: number
  /**
   * @description 节点鼠标hover和激活时显示的矩形边框颜色，hover时会添加0.6的透明度
   * @default "rgb(94, 200, 248)"
   */
  hoverRectColor?: string
  /**
   * @description 节点鼠标hover和激活时显示的矩形边框距节点内容的距离
   * @default 2
   */
  hoverRectPadding?: number
  /**
   * @description 双击节点进入节点文本编辑时是否默认选中文本，默认只在创建新节点时会选中
   * @default true
   */
  selectTextOnEnterEditText?: boolean
  /**
   * @description 是否开启删除节点后自动激活节点相邻节点或父节点的功能
   * @default true
   */
  deleteNodeActive?: boolean
  /**
   * @description 拖拽节点时鼠标移动到画布边缘是否开启画布自动移动
   * @default true
   */
  autoMoveWhenMouseInEdgeOnDrag?: boolean
  /**
   * @description 首次渲染时是否缩放至适应画布大小
   * @default false
   */
  fit?: boolean
  /**
   * @description 拖拽多个节点时随鼠标移动的示意矩形的样式配置，传递一个对象，字段含义分别为矩形的宽、高、填充色
   * @default { width: 40, height: 20, fill: '' }
   */
  dragMultiNodeRectConfig?: DragMultiNodeRectConfig
  /** 节点拖拽时新位置的示意矩形的填充颜色，如果不传默认使用连线的颜色 */
  dragPlaceholderRectFill?: string
  /**
   * @description 节点拖拽时的透明度配置，传递一个对象，字段含义分别为：跟随鼠标移动的克隆节点或矩形的透明度、被拖拽节点的透明度
   * @type {DragOpacityConfig}
   */
  dragOpacityConfig?: DragOpacityConfig
  /**
   * @description 自定义节点标签的颜色，可传一个对象，key为要指定颜色的标签内容，value为该标签内容的颜色，如果不传内部会根据标签内容生成对应的颜色
   * @default {}
   */
  tagsColorMap?: Record<string, string> | object
  /**
   * @description 节点协作编辑时的人员头像样式配置，字段含义分别为：头像大小、如果是文字头像，那么文字的大小
   * @default { avatarSize: 22, fontSize: 12 }
   */
  cooperateStyle?: CooperateStyle
  /**
   * @description 关联线是否始终显示在节点上层，如果设为false，那么创建关联线和激活关联线时处于最顶层，其他情况下处于节点下方
   * @default true
   */
  associativeLineIsAlwaysAboveNode?: boolean
  /**
   * @todo: i18n
   * @description 插入概要的默认文本
   * @default 概要
   */
  defaultGeneralizationText?: string
  /**
   * @description 粘贴文本的方式创建新节点时，控制是否按换行自动分割节点，即如果存在换行，那么会根据换行创建多个节点，否则只会创建一个节点，可以传递一个函数，返回promise，resolve代表根据换行分割，reject代表忽略换行
   * @default null
   */
  handleIsSplitByWrapOnPasteCreateNewNode?: (cb: Function) => Promise<Function> | null
  /**
   * @description 指定时间内只允许添加一次历史记录，避免添加没有必要的中间状态，单位：ms
   * @default 100
   */
  addHistoryTime?: number
  /**
   * @description 是否禁止拖动画布
   * @default false
   */
  isDisableDrag?: boolean
  /**
   * @description 止双指缩放，你仍旧可以使用api进行缩放，对TouchEvent插件生效
   * @default false
   */
  disableTouchZoom?: boolean
  /**
   * @description 鼠标移入概要高亮所属节点时的高亮框样式
   * @default { stroke: 'rgb(94, 200, 248)', fill: 'transparent' }
   */
  highlightNodeBoxStyle?: HighlightNodeBoxStyle
  /**
   * @description 创建新节点时的行为。
   * default（默认会激活新创建的节点，并且进入编辑模式。如果同时创建了多个新节点，那么只会激活而不会进入编辑模式）、
   * notActive（不激活新创建的节点）
   * activeOnly（只激活新创建的节点，不进入编辑模式）
   * @default "default"
   * @type {CreateNewNodeBehavior}
   */
  createNewNodeBehavior?: CreateNewNodeBehavior
  /**
   * @description 图片地址，当节点图片加载失败时显示的默认图片
   */
  defaultNodeImage?: string
  /**
   * @description 在节点上粘贴剪贴板中的图片的处理方法，默认是转换为data:url数据插入到节点中，你可以通过该方法来将图片数据上传到服务器，实现保存图片的url。可以传递一个异步方法，接收Blob类型的图片数据，需要返回指定结构：{ url, size: {width, height} }
   */
  handleNodePasteImg?: (url?: string) => { url: number, size: { width: number, height: number } | string } | null
  /**
   * @description 是否将思维导图限制在画布内。比如向右拖动时，思维导图图形的最左侧到达画布中心时将无法继续向右拖动，其他同理
   * @default false
   */
  isLimitMindMapInCanvas?: boolean
  /**
   * @description 当注册了滚动条插件（Scrollbar）时，是否将思维导图限制在画布内，isLimitMindMapInCanvas配置不再起作用
   * @default true
   */
  isLimitMindMapInCanvasWhenHasScrollbar?: boolean
  /**
   * @description 默认情况下，新创建的关联线两个端点的位置是根据两个节点中心点的相对位置来计算的
   * 如果你想固定位置，可以通过这个选项来配置。from和to都不传，则都自动计算，如果只传一个，另一个则会自动计算。from和to可选值：left、top、bottom、right
   * @default { from: '', to: '' }
   */
  associativeLineInitPointsPosition?: null | AssociativeLineInitPointsPosition
  /**
   * @description 是否允许调整关联线两个端点的位置
   * @default true
   */
  enableAdjustAssociativeLinePoints?: boolean
}
// #endregion
export interface MindMapView {
  state: {
    scale: number
    x: number
    y: number
    sx: number
    sy: number
  }
  transform: {
    scaleX: number
    scaleY: number
    shear: number
    rotate: number
    translateX: number
    translateY: number
    originX: number
    originY: number
    a: number
    b: number
    c: number
    d: number
    e: number
    f: number
  }
}

/**
 * # Mind Map Plugins
 */
export interface MindMapWaterConfig {
  /** 水印文字，如果为空字符串则不显示水印 */
  text: string
  /** 水印每行之间的间距 */
  lineSpacing: number
  /** 同一行水印之间的间距 */
  textSpacing: number
  /** 水印的倾斜角度，范围：[0, 90] */
  angle: number
  /** 水印文字样式 */
  textStyle: {
    color: string
    opacity: number
    fontSize: number
  }
  /** 是否仅在导出时添加水印 */
  onlyExport: boolean
}
export interface RichTextSelectionChange {
  hasRange: boolean
  rectInfo: {
    left: number
    top: number
    right: number
    bottom: number
    width: number
  }
  formatInfo: {
    size: string
    font: string
    color: string
  }
}
export interface NodeDragEnd {
  overlapNodeUid: string
  prevNodeUid: string
  nextNodeUid: string
}

/**
 * # Mind Map options
 */
export type MindMapMode = 'edit' | 'readonly'
export type CreateNewNodeBehavior = 'default' | 'notActive' | 'activeOnly' | ''
export type AssociativeLineInitPointsPositionValue = 'left' | 'top' | 'bottom' | 'right' | ''
export interface AssociativeLineInitPointsPosition {
  from: AssociativeLineInitPointsPositionValue
  to: AssociativeLineInitPointsPositionValue
}
export interface HighlightNodeBoxStyle {
  stroke: string
  fill: string
}
export interface CooperateStyle {
  /**
   * @description 头像大小、如果是文字头像，那么文字的大小
   * @default 22
   */
  avatarSize: number
  /**
   * @description 头像大小、如果是文字头像，那么文字的大小
   * @default 12
   */
  fontSize: number
}
export interface DragOpacityConfig {
  /**
   * @description 跟随鼠标移动的克隆节点或矩形的透明度
   * @default 0.5
   */
  cloneNodeOpacity: number
  /**
   * @description 被拖拽节点的透明度
   * @default 0.3
   */
  beingDragNodeOpacity: number
}
export interface DragMultiNodeRectConfig {
  width: number
  height: number
  fill: string
}
export interface ExpandButtonStyle {
  color: string
  fill: string
  fontSize: number
  strokeColor: string
}
export interface ExpandButtonIcon {
  open: string
  close: string
}
export interface ThemeDefinition extends Partial<{
  // 节点内边距
  paddingX: number
  paddingY: number
  // 图片显示的最大宽度
  imgMaxWidth: number
  // 图片显示的最大高度
  imgMaxHeight: number
  // icon的大小
  iconSize: number
  // 连线的粗细
  lineWidth: number
  // 连线的颜色
  lineColor: string
  // 连线样式
  lineDasharray: string
  // 连线风格
  lineStyle: string // 曲线（curve）【仅支持logicalStructure、mindMap、verticalTimeline三种结构】、直线（straight）、直连（direct）【仅支持logicalStructure、mindMap、organizationStructure、verticalTimeline四种结构】
  // 曲线连接时，根节点和其他节点的连接线样式保持统一，默认根节点为 ( 型，其他节点为 { 型，设为true后，都为 { 型。仅支持logicalStructure、mindMap两种结构
  rootLineKeepSameInCurve: boolean
  // 曲线连接时，根节点和其他节点的连线起始位置保持统一，默认根节点的连线起始位置在节点中心，其他节点在节点右侧，如果该配置设为true，那么根节点的连线起始位置也会在节点右侧
  rootLineStartPositionKeepSameInCurve: boolean
  // 直线连接(straight)时，连线的圆角大小，设置为0代表没有圆角，仅支持logicalStructure、mindMap、verticalTimeline三种结构
  lineRadius: number
  // 连线是否显示标记，目前只支持箭头
  showLineMarker: boolean
  // 概要连线的粗细
  generalizationLineWidth: number
  // 概要连线的颜色
  generalizationLineColor: string
  // 概要曲线距节点的距离
  generalizationLineMargin: number
  // 概要节点距节点的距离
  generalizationNodeMargin: number
  // 关联线默认状态的粗细
  associativeLineWidth: number
  // 关联线默认状态的颜色
  associativeLineColor: string
  // 关联线激活状态的粗细
  associativeLineActiveWidth: number
  // 关联线激活状态的颜色
  associativeLineActiveColor: string
  // 关联线文字颜色
  associativeLineTextColor: string
  // 关联线文字大小
  associativeLineTextFontSize: number
  // 关联线文字行高
  associativeLineTextLineHeight: number
  // 关联线文字字体
  associativeLineTextFontFamily: string
  // 背景颜色
  backgroundColor: string
  // 背景图片
  backgroundImage: string
  // 背景重复
  backgroundRepeat: string
  // 设置背景图像的起始位置
  backgroundPosition: string
  // 设置背景图片大小
  backgroundSize: string
  // 节点使用只有底边横线的样式，仅支持logicalStructure、mindMap、catalogOrganization、organizationStructure四种结构
  nodeUseLineStyle: false
  // 根节点样式
  root: {
    shape: string
    fillColor: string
    fontFamily: string
    color: string
    fontSize: number
    fontWeight: string
    fontStyle: string
    lineHeight: number
    borderColor: string
    borderWidth: number
    borderDasharray: string
    borderRadius: number
    textDecoration: string
    gradientStyle: false
    startColor: string
    endColor: string
    // 连线标记的位置，start（头部）、end（尾部），该配置在showLineMarker配置为true时生效
    lineMarkerDir: string
  }
  // 二级节点样式
  second: {
    shape: string
    marginX: number
    marginY: number
    fillColor: string
    fontFamily: string
    color: string
    fontSize: number
    fontWeight: string
    fontStyle: string
    lineHeight: number
    borderColor: string
    borderWidth: number
    borderDasharray: string
    borderRadius: number
    textDecoration: string
    gradientStyle: false
    startColor: string
    endColor: string
    lineMarkerDir: string
  }
  // 三级及以下节点样式
  node: {
    shape: string
    marginX: number
    marginY: number
    fillColor: string
    fontFamily: string
    color: string
    fontSize: number
    fontWeight: string
    fontStyle: string
    lineHeight: number
    borderColor: string
    borderWidth: number
    borderRadius: number
    borderDasharray: string
    textDecoration: string
    gradientStyle: boolean
    startColor: string
    endColor: string
    lineMarkerDir: string
  }
  // 概要节点样式
  generalization: {
    shape: string
    marginX: number
    marginY: number
    fillColor: string
    fontFamily: string
    color: string
    fontSize: number
    fontWeight: string
    fontStyle: string
    lineHeight: number
    borderColor: string
    borderWidth: number
    borderDasharray: string
    borderRadius: number
    textDecoration: string
    gradientStyle: false
    startColor: string
    endColor: string
  }
}> { }
