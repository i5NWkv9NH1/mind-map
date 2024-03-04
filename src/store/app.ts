import type { MindMapData, MindMapNode } from "@/@types";
import { isEmpty } from "lodash";
import { defineStore } from "pinia";
import MindMap from "simple-mind-map";
import { computed, onMounted, ref } from "vue";

export const useAppStore = defineStore('app', () => {
  // ! cannot persist store
  const mindMap = ref<MindMap>()
  const mindMapData = ref<MindMapData>({
    root: {},
    layout: {},
    theme: {},
    view: {},
    config: {}
  })
  const isZenMode = ref(false)
  const openNodeRichText = ref(false)
  const useLeftKeySelectionRightKeyDrag = ref(false)
  const isShowScrollbar = ref(false)
  // const isUseHandDrawnLikeStyle = ref(false)
  const mindMapMode = ref<'edit' | 'readonly'>('edit')
  const isMindMapReadonly = computed(() => mindMapMode.value === 'readonly')

  const getRoot = computed(() => mindMapData.value.root)
  const getLayout = computed(() => mindMapData.value.layout)
  const getTheme = computed(() => mindMapData.value.theme)
  const getView = computed(() => mindMapData.value.view)
  const getConfig = computed(() => mindMapData.value.config)

  const activeNode = ref<MindMapNode>()
  const activeNodes = ref<MindMapNode[]>()
  const isActiveNode = computed(() => !isEmpty(activeNodes.value))
  const hasRoot = computed(() => activeNodes.value?.findIndex(node => node.isRoot) !== -1)
  const hasGeneralization = computed(() => activeNodes.value?.findIndex(node => node.isGeneralization) !== -1)
  const canUnod = ref(true)
  const canRedo = ref(true)

  const isShowNodeContextMenu = ref(false)



  onMounted(() => {

  })

  return {
    mindMapData, mindMap, activeNodes, activeNode, isActiveNode,
    mindMapMode, isMindMapReadonly,
    getRoot, getLayout, getTheme, getView, getConfig,
    hasRoot, hasGeneralization, canUnod, canRedo,
    isZenMode, openNodeRichText, useLeftKeySelectionRightKeyDrag, isShowScrollbar,
    isShowNodeContextMenu,
  }
})
// }, { persist: { enabled: true } })

