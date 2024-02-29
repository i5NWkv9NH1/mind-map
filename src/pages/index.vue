<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
// ! plugins
import MindMap from 'simple-mind-map'
import Select from 'simple-mind-map/src/plugins/Select.js'
import RichText from 'simple-mind-map/src/plugins/RichText.js'
import AssociativeLine from 'simple-mind-map/src/plugins/AssociativeLine.js'
import Drag from 'simple-mind-map/src/plugins/Drag.js'
import KeyboardNavigation from 'simple-mind-map/src/plugins/KeyboardNavigation.js'
import Export from 'simple-mind-map/src/plugins/Export.js'
import MiniMap from 'simple-mind-map/src/plugins/MiniMap.js'
import Watermark from 'simple-mind-map/src/plugins/Watermark.js'
import TouchEvent from 'simple-mind-map/src/plugins/TouchEvent.js'
import NodeImgAdjust from 'simple-mind-map/src/plugins/NodeImgAdjust.js'
import Search from 'simple-mind-map/src/plugins/Search.js'
import Painter from 'simple-mind-map/src/plugins/Painter.js'
import Scrollbar from 'simple-mind-map/src/plugins/Scrollbar.js'
import Formula from 'simple-mind-map/src/plugins/Formula.js'
import * as xmind from 'simple-mind-map/src/parse/xmind.js'
import * as markdown from 'simple-mind-map/src/parse/markdown.js'
import { SimplePlugin } from '@/plugins/mindmap'

// # types
import { MindMapNode } from '@/@types';
// # constants
import { ON_BAKC_FORWARD, ON_NODE_ACTIVE } from '@/helpers';
// # store
import { useAppStore } from '@/store/app';
// # comps
import { Toolbar } from '@/widgets'


const mindMapEl = ref<HTMLElement>()
const { initMindMap, } = useAppStore()
const { mindMap, mindMapData, activeNodes, isStart, isEnd } = storeToRefs(useAppStore())

onMounted(() => {
  if (mindMapEl.value) {
    // # 初始化
    initMindMap({
      el: mindMapEl.value, data: mindMapData.value
    })
    // # plugins
    MindMap.usePlugin(RichText)
    MindMap.usePlugin(AssociativeLine)
    MindMap.usePlugin(Select)
    MindMap.usePlugin(Drag)
    MindMap.usePlugin(KeyboardNavigation)
    MindMap.usePlugin(Export)
    MindMap.usePlugin(MiniMap)
    MindMap.usePlugin(Watermark)
    MindMap.usePlugin(TouchEvent)
    MindMap.usePlugin(NodeImgAdjust)
    MindMap.usePlugin(Search)
    MindMap.usePlugin(Painter)
    MindMap.usePlugin(Scrollbar)
    MindMap.usePlugin(Formula)
    MindMap.usePlugin(SimplePlugin)

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
