export * from './node'
export * from './data'
export * from './listener'

export type MindMapMode = 'edit' | 'readonly'

export type MindMapOptions = {
  el: string | HTMLElement
  readonly: boolean;
  layout: string;
  fishboneDeg: number;
  theme: string;
  themeConfig: {};
  scaleRatio: number;
  mouseScaleCenterUseMousePosition: boolean;
  maxTag: number;
  expandBtnSize: number;
  imgTextMargin: number;
  textContentMargin: number;
  selectTranslateStep: number;
  selectTranslateLimit: number;
  customNoteContentShow: any;
  enableFreeDrag: boolean;
  watermarkConfig: {
    onlyExport: boolean;
    text: string;
    lineSpacing: number;
    textSpacing: number;
    angle: number;
    textStyle: {
      color: string;
      opacity: number;
      fontSize: number;
    };
  };
  textAutoWrapWidth: number;
  customHandleMousewheel: any;
  mousewheelAction: string;
  mousewheelMoveStep: number;
  mousewheelZoomActionReverse: boolean;
  defaultInsertSecondLevelNodeText: string;
  defaultInsertBelowSecondLevelNodeText: string;
  expandBtnStyle: {
    color: string;
    fill: string;
    fontSize: number;
    strokeColor: string;
  };
  expandBtnIcon: {
    open: string;
    close: string;
  };
  expandBtnNumHandler: (num: any) => any;
  isShowExpandNum: boolean;
  enableShortcutOnlyWhenMouseInSvg: boolean;
  initRootNodePosition: any;
  exportPaddingX: number;
  exportPaddingY: number;
  nodeTextEditZIndex: number;
  nodeNoteTooltipZIndex: number;
  isEndNodeTextEditOnClickOuter: boolean;
  maxHistoryCount: number;
  alwaysShowExpandBtn: boolean;
  iconList: any[];
  maxNodeCacheCount: number;
  defaultAssociativeLineText: string;
  fitPadding: number;
  enableCtrlKeyNodeSelection: boolean;
  useLeftKeySelectionRightKeyDrag: boolean;
  beforeTextEdit: any;
  isUseCustomNodeContent: boolean;
  customCreateNodeContent: any;
  customInnerElsAppendTo: any;
  nodeDragPlaceholderMaxSize: number;
  enableAutoEnterTextEditWhenKeydown: boolean;
  richTextEditFakeInPlace: boolean;
  customHandleClipboardText: any;
  disableMouseWheelZoom: boolean;
  disableTouchZoom: boolean;
  errorHandler: (code: any, error: any) => void;
  resetCss: string;
  enableDblclickBackToRootNode: boolean;
  minExportImgCanvasScale: number;
  hoverRectColor: string;
  hoverRectPadding: number;
  selectTextOnEnterEditText: boolean;
  deleteNodeActive: boolean;
  autoMoveWhenMouseInEdgeOnDrag: boolean;
  fit: boolean;
  dragMultiNodeRectConfig: {
    width: number;
    height: number;
    fill: string;
  };
  dragPlaceholderRectFill: string;
  dragOpacityConfig: {
    cloneNodeOpacity: number;
    beingDragNodeOpacity: number;
  };
  tagsColorMap: {};
  cooperateStyle: {
    avatarSize: number;
    fontSize: number;
  };
  associativeLineIsAlwaysAboveNode: boolean;
  defaultGeneralizationText: string;
  handleIsSplitByWrapOnPasteCreateNewNode: any;
  addHistoryTime: number;
  isDisableDrag: boolean;
  highlightNodeBoxStyle: {
    stroke: string;
    fill: string;
  };
  createNewNodeBehavior: string;
  defaultNodeImage: string;
  isLimitMindMapInCanvas: boolean;
  isLimitMindMapInCanvasWhenHasScrollbar: boolean;
  handleNodePasteImg: any;
  associativeLineInitPointsPosition: {
    from: string;
    to: string;
  };
  enableAdjustAssociativeLinePoints: boolean;
  customCreateNodePath: any;
  customCreateNodePolygon: any;
  customTransformNodeLinePath: any;
}
