<script
  setup
  lang="ts"
>
import { storeToRefs } from 'pinia'
import { v4 as uuid } from 'uuid'
import { ref } from 'vue'
import type { MapAction, NodeAction } from '@/@types'
import { useAppStore } from '@/store'

const { undo, redo, insertNode, insertChildNode, removeNode, toggleImageDialog, toggleLinkDialog, toggleNoteDialog, toggleTagDialog, togglePanel, createSummary, createcreateAssociativeLine,  toggleOutlineDialog} = useAppStore()
const { isActiveNode, canUndo, canRedo, mindMapMode, hasGeneralization, hasRoot, mindMapOutlineDialog } = storeToRefs(useAppStore())

// # 撤销重做
// # 节点编辑
const nodeActions = ref<NodeAction[]>([
  { id: uuid(), name: '撤销', icon: 'mdi-arrow-u-left-top', disabled: () => canUndo.value || mindMapMode.value === 'readonly', action: undo },
  { id: uuid(), name: '重做', icon: 'mdi-arrow-u-right-top', disabled: () => canRedo.value || mindMapMode.value === 'readonly', action: redo },
  // { uid: uuid(), name: '格式刷', icon: 'mdi-brush-variant', disabled: () => canUndo.value, action: () => { } },
  { id: uuid(), name: '同级节点', icon: 'mdi-tune', disabled: () => !isActiveNode.value || hasRoot.value || hasGeneralization.value, action: insertNode },
  { id: uuid(), name: '子节点', icon: 'mdi-vector-polyline', disabled: () => !isActiveNode.value || hasGeneralization.value, action: insertChildNode },
  { id: uuid(), name: '删除节点', icon: 'mdi-trash-can-outline', disabled: () => !isActiveNode.value, action: removeNode },
  { id: uuid(), name: '图片', icon: 'mdi-image-plus-outline', disabled: () => !isActiveNode.value, action: toggleImageDialog },
  { id: uuid(), name: '图标', icon: 'mdi-emoticon-lol-outline', disabled: () => !isActiveNode.value, action: () => togglePanel() },
  { id: uuid(), name: '超链接', icon: 'mdi-link-variant-plus', disabled: () => !isActiveNode.value, action: toggleLinkDialog },
  { id: uuid(), name: '备注', icon: 'mdi-note-plus-outline', disabled: () => !isActiveNode.value, action: toggleNoteDialog },
  { id: uuid(), name: '标签', icon: 'mdi-tag-plus-outline', disabled: () => !isActiveNode.value, action: toggleTagDialog },
  { id: uuid(), name: '概要', icon: 'mdi-widgets-outline', disabled: () => !isActiveNode.value || hasRoot.value || hasGeneralization.value, action: createSummary },
  { id: uuid(), name: '关联线', icon: 'mdi-vector-radius', disabled: () => !isActiveNode.value || hasGeneralization.value, action: createcreateAssociativeLine },
  { id: uuid(), name: '公式', icon: 'mdi-sigma', disabled: () => !isActiveNode.value || hasGeneralization.value, action: () => togglePanel(8) },
])
// # 导图操作
const mindMapActions = ref<MapAction[]>([
  { id: uuid(), name: '大纲', icon: 'mdi-card-text-outline', action: toggleOutlineDialog},
  { id: uuid(), name: '目录', icon: 'mdi-folder-outline', action: () => { } },
  { id: uuid(), name: '新建', icon: 'mdi-file-plus-outline', action: () => { } },
  { id: uuid(), name: '打开', icon: 'mdi-file-upload-outline', action: () => { } },
  { id: uuid(), name: '另存为', icon: 'mdi-content-save-outline', action: () => { } },
  { id: uuid(), name: '导入', icon: 'mdi-file-import-outline', action: () => { } },
  { id: uuid(), name: '导出', icon: 'mdi-file-export-outline', action: () => { } },
])
</script>

<template>
  <VToolbar
    id="toolbar"
    elevation="8"
    extension-height="64"
  >
    <VBtn
      v-for="item in nodeActions"
      :key="item.id"
      :disabled="item.disabled()"
      stacked
      @click="item.action()"
    >
      <VIcon v-if="item.icon">
        {{ item.icon }}
      </VIcon>
      <span>{{ item.name }}</span>
    </VBtn>
    <template #extension>
      <VBtn
        v-for="item in mindMapActions"
        :key="item.id"
        stacked
        @click="item.action"
      >
        <VIcon v-if="item.icon">
          {{ item.icon }}
        </VIcon>
        <span>{{ item.name }}</span>
      </VBtn>
    </template>
  </VToolbar>
</template>

<style
  scoped
  lang="scss"
>
#toolbar {
  z-index: 999;
}
</style>
