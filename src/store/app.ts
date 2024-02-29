// Utilities
import { MindMapMode, MindMapNode, MindMapOptions } from '@/@types'
import { COMMAND_ADD_GENERALIZATION, COMMAND_BACK, COMMAND_FORWARD, COMMAND_INSERT_CHILD_NODE, COMMAND_INSERT_NODE, COMMAND_REMOVE_NODE } from '@/helpers'
import { booleanLiteral, react } from '@babel/types'
import { isEmpty } from 'lodash'
import { defineStore } from 'pinia'
import MindMap from 'simple-mind-map'
import { reactive } from 'vue'
import { computed } from 'vue'
import { shallowRef, watch } from 'vue'
import { ref } from 'vue'

export type Dialog = {
  status: boolean
}

export type UploadImageDialog = Dialog & {
  src: string;
  file: File | undefined | null
}
export type LinkDialog = Dialog & {}
export type NoteDialog = Dialog & {}
export type TagDialog = Dialog & {}
export type Panel = {
  current: number | null
}

export const useAppStore = defineStore('app', () => {
  // # state
  // # mind map
  const mindMap = ref<MindMap>()
  const activeNodes = shallowRef<MindMapNode[]>()
  const mindMapMode = ref<MindMapMode>('edit')
  const isStart = ref(true)
  const isEnd = ref(true)
  // # dialogs
  const uploadImageDialog = reactive<UploadImageDialog>({
    status: false,
    src: '',
    file: null,
  })
  const linkDialog = reactive<LinkDialog>({
    status: false
  })
  const noteDialog = reactive<NoteDialog>({
    status: false
  })
  const tagDialog = reactive<TagDialog>({
    status: false
  })
  // # sidebar panels
  const panel = reactive<Panel>({
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
    uploadImageDialog.status = value
  }
  function toggleLinkDialog(value = true) {
    linkDialog.status = value
  }
  function toggleNoteDialog(value = true) {
    noteDialog.status = value
  }
  function toggleTagDialog(value = true) {
    tagDialog.status = value
  }
  // # panels
  function togglePanel(value: number | null = null) {
    panel.current = value
  }

  return {
    // # state
    mindMap, activeNodes, isStart, isEnd, mindMapMode,
    uploadImageDialog, tagDialog, linkDialog, noteDialog, panel,
    // # actions
    initMindMap, undo, redo, setMode, insertNode, insertChildNode, removeNode, createSummary, createcreateAssociativeLine,
    toggleImageDialog, toggleLinkDialog, toggleNoteDialog, toggleTagDialog, togglePanel,
    // # getters
    hasRoot, hasGeneralization, isActiveNode, canUndo, canRedo
  }
})
