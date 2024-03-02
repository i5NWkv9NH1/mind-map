<script setup lang="ts">
import { ContentAction, NodeAction, MapAction } from '@/@types';
import { COMMAND_BACK, COMMAND_FORWARD } from '@/helpers';
import { useAppStore } from '@/store';
import { storeToRefs } from 'pinia';
import { v4 as uuid } from 'uuid'
import { watch } from 'vue';
import { ref } from 'vue';
import { ThemeSwitch } from './ThemeSwitch';
import Scale from './Scale.vue';
import { SearchDialog } from './dialogs';
import { MouseBehavior } from './MouseBehavior';
import Stat from './Stat.vue';

const { undo, redo, insertNode, insertChildNode, removeNode, toggleImageDialog, toggleLinkDialog, toggleNoteDialog, toggleTagDialog, togglePanel, createSummary, createcreateAssociativeLine, } = useAppStore()
const { mindMap, isActiveNode, isStart, isEnd, canUndo, canRedo, mindMapMode, hasGeneralization, hasRoot, isShowMiniMap, isReadOnly, searchDialog } = storeToRefs(useAppStore())

// # 撤销重做
// # 节点编辑
// # 导图操作
</script>

<template>
  <VToolbar
    id="bottombar"
    tag="footer"
    elevation="8"
    absolute
    extension-height="64"
  >
    <!-- # 定位-->
    <VTooltip
      transition="slide-y-transition"
      offset="10"
      open-delay="100"
      location="top"
    >
      <template #activator="{ isActive, props }">
        <VBtn
          v-bind="props"
          :active="isActive"
          class="mr-2"
          icon
        >
          <VIcon>mdi-crosshairs-gps</VIcon>
        </VBtn>
      </template>
      <p>回到根节点</p>
    </VTooltip>
    <ThemeSwitch />
    <Scale />
    <VTooltip
      transition="slide-y-transition"
      offset="10"
      open-delay="100"
      location="top"
    >
      <template #activator="{ isActive, props }">
        <VBtn
          v-bind="props"
          :active="searchDialog.status"
          :color="searchDialog.status ? 'primary' : 'default'"
          @click="searchDialog.status = !searchDialog.status"
          icon
        >
          <VIcon>mdi-magnify</VIcon>
        </VBtn>
      </template>
      <p>搜索节点</p>
    </VTooltip>
    <VTooltip
      transition="slide-y-transition"
      offset="10"
      open-delay="100"
      location="top"
    >
      <template #activator="{ isActive, props }">
        <VBtn
          v-bind="props"
          :active="isActive"
          class="mr-2"
          @click="isShowMiniMap = !isShowMiniMap"
          icon
        >
          <VIcon> {{ isShowMiniMap ? 'mdi-map-marker-off-outline' : 'mdi-map-marker-outline' }}</VIcon>
        </VBtn>
      </template>
      <p>
        {{ isShowMiniMap ? '关闭小地图' : '开启小地图' }}
      </p>
    </VTooltip>
    <VTooltip
      transition="slide-y-transition"
      offset="10"
      open-delay="100"
      location="top"
    >
      <template #activator="{ isActive, props }">
        <VBtn
          v-bind="props"
          :active="isActive"
          class="mr-2"
          @click="() => {
            if (isReadOnly) mindMapMode = 'edit'
            else mindMapMode = 'readonly'
          }"
          icon
        >
          <VIcon> {{ isReadOnly ? 'mdi-eye-outline' : 'mdi-note-edit-outline' }}</VIcon>
        </VBtn>
      </template>
      <p>
        {{ isReadOnly ? '切换为编辑模式' : '切换为只读模式' }}
      </p>
    </VTooltip>
    <VTooltip
      transition="slide-y-transition"
      offset="10"
      open-delay="100"
      location="top"
    >
      <template #activator="{ isActive, props }">
        <VBtn
          v-bind="props"
          :active="isActive"
          class="mr-2"
          icon
        >
          <VIcon>mdi-fullscreen</VIcon>
        </VBtn>
      </template>
      <p>
        全屏查看
      </p>
    </VTooltip>
    <VTooltip
      transition="slide-y-transition"
      offset="10"
      open-delay="100"
      location="top"
    >
      <template #activator="{ isActive, props }">
        <VBtn
          v-bind="props"
          :active="isActive"
          class="mr-2"
          icon
        >
          <VIcon>mdi-vector-square-edit</VIcon>
        </VBtn>
      </template>
      <p>
        全屏编辑
      </p>
    </VTooltip>

    <template #extension>
      <Stat />
      <MouseBehavior />
    </template>
  </VToolbar>
</template>

<style scoped lang="scss">
@use "@/styles/utils/z.scss";

#bottombar {
  z-index: 2;
  bottom: 0;
}
</style>
