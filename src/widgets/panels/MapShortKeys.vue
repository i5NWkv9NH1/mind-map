<script
  setup
  lang="ts"
>
import { v4 as uuid } from 'uuid'
import { ref } from 'vue'
import { useAppStore } from '@/store'
import PanelContainer from '@/components/PanelContainer.vue'

const { togglePanel } = useAppStore()
const keys = ref([
  {
    id: uuid(),
    title: '节点操作',
    items: [
      { id: uuid(), name: '插入下级节点', icon: 'mdi-vector-polyline', key: 'Tab' },
      { id: uuid(), name: '插入同级节点', icon: 'mdi-tune', key: 'Enter' },
      { id: uuid(), name: '插入父节点', icon: 'mdi-vector-point-plus', key: 'Shift + Tab' },
      { id: uuid(), name: '上移节点', icon: 'mdi-arrow-up-thick', key: 'Ctrl + ↑' },
      { id: uuid(), name: '下移节点', icon: 'mdi-arrow-down-thick', key: 'Ctrl + ↓' },
      { id: uuid(), name: '插入概要', icon: 'mdi-widgets-outline', key: 'Ctrl + G' },
      { id: uuid(), name: '展开/收起节点', icon: 'mdi-arrow-expand-vertical', key: '/' },
      { id: uuid(), name: '删除节点', icon: 'mdi-trash-can-outline', key: 'Delete | Backspace' },
      { id: uuid(), name: '仅删除当前节点', icon: 'mdi-vector-square-remove', key: 'Shift + Backspace' },
      { id: uuid(), name: '复制节点', icon: 'mdi-content-copy', key: 'Ctrl + C' },
      { id: uuid(), name: '剪切节点', icon: 'mdi-content-cut', key: 'Ctrl + X' },
      { id: uuid(), name: '粘贴节点', icon: 'mdi-content-paste', key: 'Ctrl + V' },
      { id: uuid(), name: '编辑节点', icon: 'mdi-content-save-edit-outline', key: 'F2' },
      { id: uuid(), name: '文本换行', icon: 'mdi-wrap', key: 'Shift + Enter' },
      { id: uuid(), name: '回退', icon: 'mdi-arrow-u-left-top', key: 'Ctrl + Z' },
      { id: uuid(), name: '前进', icon: 'mdi-arrow-u-right-top', key: 'Ctrl + Y' },
      { id: uuid(), name: '全选', icon: 'mdi-select-all', key: 'Ctrl + A' },
      { id: uuid(), name: '多选', icon: 'mdi-select-multiple', key: '右键 / Ctrl + 左键' },
      { id: uuid(), name: '一键整理布局', icon: 'mdi-grid-large', key: 'Ctrl + L' },
      { id: uuid(), name: '搜索和替换', icon: 'mdi-magnify', key: 'Ctrl + F' },
    ],
  },
  {
    id: uuid(),
    title: '画布操作',
    items: [
      { id: uuid(), name: '放大', icon: 'mdi-plus-thick', key: 'Ctrl + +' },
      { id: uuid(), name: '放大', icon: 'mdi-minus-thick', key: 'Ctrl + -' },
      { id: uuid(), name: '放大/缩小', icon: 'mdi-loupe', key: 'Ctrl + 鼠标滚动' },
      { id: uuid(), name: '回到根节点', icon: 'mdi-crosshairs-gps', key: 'Ctrl + Enter' },
      { id: uuid(), name: '适应画布', icon: 'mdi-image-size-select-small', key: 'Ctrl + i' },
    ],
  },
  {
    id: uuid(),
    title: '大纲操作',
    items: [
      { id: uuid(), name: '文本换行', icon: 'mdi-wrap', key: 'Shift + Enter' },
      { id: uuid(), name: '删除节点', icon: 'mdi-trash-can-outline', key: 'Delete' },
      { id: uuid(), name: '插入下级节点', icon: 'mdi-vector-polyline', key: 'Tab' },
      { id: uuid(), name: '插入同级节点', icon: 'mdi-tune', key: 'Enter' },
      { id: uuid(), name: '上移一个层级', icon: 'mdi-arrow-up-thick', key: 'Shift + Tab' },
    ],
  },
])
</script>

<template>
  <PanelContainer>
    <template #title>
      <p>快捷键</p>
      <VBtn
        color="surface"
        variant="flat"
        icon
        @click="togglePanel(null)"
      >
        <VIcon>mdi-close</VIcon>
      </VBtn>
    </template>

    <template #content>
      <VList
        v-for="item in keys"
        :key="item.id"
        density="compact"
        class="px-0"
        slim
        nav
      >
        <div class="text-body-1 mb-3">
          {{ item.title }}
        </div>
        <VListItem
          v-for="shortKey in item.items"
          :key="shortKey.id"
          :prepend-icon="shortKey.icon"
          :title="shortKey.name"
        >
          <template #append>
            <!-- <VListItemSubtitle>{{ key.key }}</VListItemSubtitle> -->
            <VCode>{{ shortKey.key }}</VCode>
          </template>
        </VListItem>
      </VList>
    </template>
  </PanelContainer>
</template>
