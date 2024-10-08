import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { MindMapConfig, MindMapRoot, MindMapView, MindMapWaterConfig } from '@/@types'
import { useMindMap } from '@/composables'

export const useAppStore = defineStore('app', () => {
  const { activeNodes, activeNode } = useMindMap()

  // ! cannot persist store
  /** #根节点数据和所有子节点数据 */
  const mindMapRoot = ref<MindMapRoot>()
  /** 画布结构 */
  const mindMapLayout = ref<string>('logicalStructure')
  /** #主题配置，包括主题名和基础样式 */
  const mindMapTheme = ref<string>('default')
  const mindMapThemeConfig = ref<Record<string, any>>({
  })
  const mindMapThemeCustomConfig = ref<Record<string, any>>({})
  /** #画布移动偏移量数据 */
  const mindMapView = ref<MindMapView>()
  /**
   * # 其他 mindMap 实例化和可以 updateConfig 的配置
   * # 实例化或者更新时
   */
  const mindMapConfig = ref<MindMapConfig>({
    isZenMode: false,
    useLeftKeySelectionRightKeyDrag: false,
    enableFreeDrag: false,
    enableNodeRichText: true,
    mousewheelAction: 'move',
    mousewheelZoomActionReverse: true,
    createNewNodeBehavior: 'default',
    maxTag: 10,
    readonly: false,
  })
  /**
   * #插件 - 水印配置
   */
  const mindMapWaterConfig = ref<MindMapWaterConfig>({
    text: '水印文字',
    lineSpacing: 100,
    textSpacing: 100,
    angle: 50,
    textStyle: {
      color: '#000',
      opacity: 1,
      fontSize: 20,
    },
    onlyExport: false,
  })

  const isActiveNode = computed(() => {
    if (!activeNodes.value)
      return false
    if (activeNodes.value.length < 0)
      return false
    if (!activeNode.value)
      return false
    return true
  })
  const hasRoot = computed(() => activeNodes.value?.findIndex(node => node.isRoot) !== -1)
  const hasGeneralization = computed(() => activeNodes.value?.findIndex(node => node.isGeneralization) !== -1)
  const canUnod = ref(true)
  const canRedo = ref(true)

  function updateThemeConfig(config: Record<string, any>) {
    mindMapThemeConfig.value = config
  }

  return {
    // # Core
    mindMapRoot,
    mindMapTheme,
    mindMapThemeConfig,
    mindMapThemeCustomConfig,
    mindMapView,
    mindMapConfig,
    mindMapLayout,
    mindMapWaterConfig,
    hasRoot,
    isActiveNode,
    hasGeneralization,
    canUnod,
    canRedo,
    updateThemeConfig,
  }
  // })
}, { persist: { enabled: true } })
