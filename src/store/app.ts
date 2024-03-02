// Utilities
import { MindMapMode, MindMapNode, MindMapOptions } from '@/@types'
import { COMMAND_ADD_GENERALIZATION, COMMAND_BACK, COMMAND_FORWARD, COMMAND_INSERT_CHILD_NODE, COMMAND_INSERT_NODE, COMMAND_REMOVE_NODE } from '@/helpers'
import { booleanLiteral, react } from '@babel/types'
import { useDark } from '@vueuse/core'
import { isEmpty } from 'lodash'
import { defineStore } from 'pinia'
import MindMap from 'simple-mind-map'
import { reactive } from 'vue'
import { computed } from 'vue'
import { shallowRef, watch } from 'vue'
import { ref } from 'vue'
import { useTheme } from 'vuetify/lib/framework.mjs'

export type Dialog = {
  status: boolean
}

export type UploadImageDialog = Dialog & {
  src: string;
  file: File | undefined | null
}
export type LinkDialog = Dialog & {}
export type NoteDialog = Dialog & {}
export type TagDialog = Dialog & {
  items: { id: string; text: string; color: string }[]
}
export type SearchDialog = Dialog & {}
export type EmojiDialog = Dialog & {}
export type MathSheet = Dialog & {}
export type Panel = {
  current: number | null
}

export const useAppStore = defineStore('app', () => {
  // # state
  const isDark = useDark()
  const theme = computed(() => isDark.value ? 'dark' : 'light')
  const vuetify = useTheme()
  watch(isDark, () => {
    vuetify.global.name.value = theme.value
  }, { immediate: true })
  // # mind map
  const mindMap = ref<MindMap>()
  const mindMapData = ref({
    "data": {
      "text": "根节点"
    },
    "children": []
  })
  const activeNodes = shallowRef<MindMapNode[]>()
  const mindMapMode = ref<MindMapMode>('edit')
  const isReadOnly = computed(() => mindMapMode.value === 'readonly')
  const words = computed(() => 2111)
  const nodes = computed(() => 121)
  const isShowMiniMap = ref<boolean>(false)
  const useLeftKeySelectionRightKeyDrag = ref<boolean>(false)
  const isStart = ref(true)
  const isEnd = ref(true)
  // # dialogs
  const uploadImageDialog = ref<UploadImageDialog>({
    status: false,
    src: '',
    file: null,
  })
  const emojiDialog = ref<EmojiDialog>({
    status: false
  })
  const linkDialog = ref<LinkDialog>({
    status: false
  })
  const noteDialog = ref<NoteDialog>({
    status: false
  })
  const tagDialog = ref<TagDialog>({
    status: false,
    items: []
  })
  const mathSheet = ref<MathSheet>({
    status: false
  })
  const searchDialog = ref<SearchDialog>({
    status: false
  })
  // # sidebar panels
  const panel = ref<Panel>({
    current: null
  })

  // # getters
  // # mind map
  const isActiveNode = computed(() => !isEmpty(activeNodes.value))
  const hasRoot = computed(() => {
    return activeNodes.value!.findIndex(node => {
      return node.isRoot
    }) !== -1
  })
  const hasGeneralization = computed(() => {
    return activeNodes.value!.findIndex(node => {
      return node.isGeneralization
    }) !== -1
  })
  const canUndo = computed(() => isStart.value)
  const canRedo = computed(() => isEnd.value)
  // # actions
  // # mind map
  function initMindMap(options: any) {
    mindMap.value = new MindMap(options)
  }
  function undo() {
    mindMap.value?.execCommand(COMMAND_BACK)
  }
  function redo() {
    mindMap.value?.execCommand(COMMAND_FORWARD)
  }
  function setMode(mode: MindMapMode) {
    mindMap.value?.setMode(mode)
  }
  function insertNode() {
    mindMap.value?.execCommand(COMMAND_INSERT_NODE)
  }
  function insertChildNode() {
    mindMap.value?.execCommand(COMMAND_INSERT_CHILD_NODE)
  }
  function removeNode() {
    mindMap.value?.execCommand(COMMAND_REMOVE_NODE)
  }
  function createSummary() {
    mindMap.value?.execCommand(COMMAND_ADD_GENERALIZATION)
  }
  function createcreateAssociativeLine() {
    // @ts-ignore
    mindMap.value?.associativeLine.createLineFromActiveNode()
  }
  // # dialogs
  function toggleImageDialog(value = true) {
    uploadImageDialog.value.status = value
  }
  function toggleLinkDialog(value = true) {
    linkDialog.value.status = value
  }
  function toggleNoteDialog(value = true) {
    noteDialog.value.status = value
  }
  function toggleEmojiDialog(value = true) {
    emojiDialog.value.status = value
  }
  function toggleMathSheet(value = true) {
    mathSheet.value.status = value
  }
  function toggleTagDialog(value = true) {
    tagDialog.value.status = value
  }
  // # panels
  function togglePanel(value: number | null = null) {
    panel.value.current = value
  }

  return {
    // # state
    mindMap, mindMapData, activeNodes, isStart, isEnd, mindMapMode, useLeftKeySelectionRightKeyDrag, isShowMiniMap, isReadOnly, words, nodes,
    uploadImageDialog, tagDialog, linkDialog, noteDialog, mathSheet, searchDialog, emojiDialog, panel,
    isDark, theme,
    // # actions
    initMindMap, undo, redo, setMode, insertNode, insertChildNode, removeNode, createSummary, createcreateAssociativeLine,
    toggleImageDialog, toggleLinkDialog, toggleEmojiDialog, toggleNoteDialog, toggleTagDialog, toggleMathSheet, togglePanel,
    // # getters
    hasRoot, hasGeneralization, isActiveNode, canUndo, canRedo
  }
})
