<script setup lang="ts">
import { ThemeSwitch } from '@/widgets'
import { ref, } from 'vue'
import MindMap from 'simple-mind-map'
import { onMounted } from 'vue'

const mindMapEl = ref<HTMLElement>()
const mindMap = ref<MindMap>()

onMounted(() => {
  mindMap.value = new MindMap({
    // el: document.querySelector('#node-map'),
    el: mindMapEl.value,
    data: {
      "data": {
        "text": "根节点"
      },
      "children": []
    }
  })
})
</script>

<template>
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
}</style>
