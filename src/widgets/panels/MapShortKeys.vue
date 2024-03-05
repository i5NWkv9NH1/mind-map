<script
  setup
  lang="ts"
>
import { mdiArrowDownThick, mdiArrowExpandVertical, mdiArrowRightTop, mdiArrowULeftTop, mdiArrowUpThick, mdiCloseCircle, mdiContentCopy, mdiContentPaste, mdiContentSaveEditOutline, mdiCrosshairsGps, mdiGridLarge, mdiImageSizeSelectLarge, mdiLoupe, mdiMagnify, mdiMinusThick, mdiPlusThick, mdiSelectAll, mdiSelectMultiple, mdiTrashCanOutline, mdiTune, mdiVectorPolyline, mdiVectorPolylinePlus, mdiVectorSquareRemove, mdiWidgetsOutline, mdiWrap } from '@mdi/js'
import { v4 as uuid } from 'uuid'
import { ref } from 'vue'
import PanelContainer from '@/components/PanelContainer.vue'

function togglePanel(_: any) { }
const keys = ref([
  {
    id: uuid(),
    title: '节点操作',
    items: [
      { id: uuid(), name: '插入下级节点', icon: mdiVectorPolyline, key: 'Tab' },
      { id: uuid(), name: '插入同级节点', icon: mdiTune, key: 'Enter' },
      { id: uuid(), name: '插入父节点', icon: mdiVectorPolylinePlus, key: 'Shift + Tab' },
      { id: uuid(), name: '上移节点', icon: mdiArrowUpThick, key: 'Ctrl + ↑' },
      { id: uuid(), name: '下移节点', icon: mdiArrowDownThick, key: 'Ctrl + ↓' },
      { id: uuid(), name: '插入概要', icon: mdiWidgetsOutline, key: 'Ctrl + G' },
      { id: uuid(), name: '展开/收起节点', icon: mdiArrowExpandVertical, key: '/' },
      { id: uuid(), name: '删除节点', icon: mdiTrashCanOutline, key: 'Delete | Backspace' },
      { id: uuid(), name: '仅删除当前节点', icon: mdiVectorSquareRemove, key: 'Shift + Backspace' },
      { id: uuid(), name: '复制节点', icon: mdiContentCopy, key: 'Ctrl + C' },
      { id: uuid(), name: '剪切节点', icon: mdiContentCopy, key: 'Ctrl + X' },
      { id: uuid(), name: '粘贴节点', icon: mdiContentPaste, key: 'Ctrl + V' },
      { id: uuid(), name: '编辑节点', icon: mdiContentSaveEditOutline, key: 'F2' },
      { id: uuid(), name: '文本换行', icon: mdiWrap, key: 'Shift + Enter' },
      { id: uuid(), name: '回退', icon: mdiArrowULeftTop, key: 'Ctrl + Z' },
      { id: uuid(), name: '前进', icon: mdiArrowRightTop, key: 'Ctrl + Y' },
      { id: uuid(), name: '全选', icon: mdiSelectAll, key: 'Ctrl + A' },
      { id: uuid(), name: '多选', icon: mdiSelectMultiple, key: '右键 / Ctrl + 左键' },
      { id: uuid(), name: '一键整理布局', icon: mdiGridLarge, key: 'Ctrl + L' },
      { id: uuid(), name: '搜索和替换', icon: mdiMagnify, key: 'Ctrl + F' },
    ],
  },
  {
    id: uuid(),
    title: '画布操作',
    items: [
      { id: uuid(), name: '放大', icon: mdiPlusThick, key: 'Ctrl + +' },
      { id: uuid(), name: '放大', icon: mdiMinusThick, key: 'Ctrl + -' },
      { id: uuid(), name: '放大/缩小', icon: mdiLoupe, key: 'Ctrl + 鼠标滚动' },
      { id: uuid(), name: '回到根节点', icon: mdiCrosshairsGps, key: 'Ctrl + Enter' },
      { id: uuid(), name: '适应画布', icon: mdiImageSizeSelectLarge, key: 'Ctrl + i' },
    ],
  },
  {
    id: uuid(),
    title: '大纲操作',
    items: [
      { id: uuid(), name: '文本换行', icon: mdiWrap, key: 'Shift + Enter' },
      { id: uuid(), name: '删除节点', icon: mdiTrashCanOutline, key: 'Delete' },
      { id: uuid(), name: '插入下级节点', icon: mdiVectorPolyline, key: 'Tab' },
      { id: uuid(), name: '插入同级节点', icon: mdiTune, key: 'Enter' },
      { id: uuid(), name: '上移一个层级', icon: mdiArrowUpThick, key: 'Shift + Tab' },
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
        <VIcon>{{ mdiCloseCircle }}</VIcon>
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
