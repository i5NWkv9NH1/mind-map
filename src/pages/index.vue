<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { MindMapNode } from '@/@types';
import { ON_BAKC_FORWARD, ON_NODE_ACTIVE } from '@/helpers';
import { useAppStore } from '@/store/app';
import { Toolbar } from '@/widgets'
import { VCapolLog } from '@/directives'

const mindMapEl = ref<HTMLElement>()
const initMindMapData = ref({
  "data": {
    "text": "根节点"
  },
  "children": []
})
const { initMindMap } = useAppStore()
const { mindMap, activeNodes, isStart, isEnd } = storeToRefs(useAppStore())

onMounted(() => {
  if (mindMapEl.value) {
    // # 初始化
    initMindMap({
      el: mindMapEl.value, data: initMindMapData.value
    })
    // # 监听事件
    mindMap.value?.on(ON_NODE_ACTIVE, (node: MindMapNode, activeNodeList: MindMapNode[]) => {
      activeNodes.value = activeNodeList
    })
    mindMap.value?.on(ON_BAKC_FORWARD, (index: number, len: number) => {
      isStart.value = index <= 0
      isEnd.value = index >= len - 1
    })
  }
})

</script>

<template>
  <Toolbar />
  <div id="mind-map-container">
    <div
      id="mind-map"
      ref="mindMapEl"
    />
  </div>
</template>

<style scoped lang="scss">
#mind-map-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  #mind-map {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
