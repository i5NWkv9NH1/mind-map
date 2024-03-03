<script
  setup
  lang="ts"
>
import { storeToRefs } from 'pinia'
import { v4 as uuid } from 'uuid'
import { computed, ref } from 'vue'
import { BaseStyles, IconPanel, MapShortKeys, MapStructures, MapThemes, MathPanel, NodeStyles } from './panels'
import { useAppStore } from '@/store'

const { togglePanel } = useAppStore()
const { panel } = storeToRefs(useAppStore())
const items = ref([
  { id: uuid(), name: '节点样式', color: 'primary', icon: 'mdi-star-shooting-outline', value: 1 },
  // { id: uuid(), name: '基础样式', color: 'primary', icon: 'mdi-palette-outline', value: 2 },
  { id: uuid(), name: '基础样式', color: 'primary', icon: 'mdi-auto-fix', value: 2 },
  { id: uuid(), name: '主题', color: 'primary', icon: 'mdi-tshirt-crew-outline', value: 3 },
  { id: uuid(), name: '结构', color: 'primary', icon: 'mdi-sitemap-outline', value: 4 },
  // { id: uuid(), name: '大纲', color: 'primary', icon: 'mdi-card-text-outline', value: 5 },
  { id: uuid(), name: '快捷键', color: 'primary', icon: 'mdi-keyboard-outline', value: 5 },
])
const component = computed(() => {
  switch (panel.value.current) {
    case 1: return NodeStyles
    case 2: return BaseStyles
    case 3: return MapThemes
    case 4: return MapStructures
    case 5: return MapShortKeys
    case 6: return IconPanel
    case 7: return MathPanel
    default: return NodeStyles
  }
})

// onMounted(() => {
//   document.addEventListener('keydown', e => {
//     if (e.key === 'Escape') {
//       togglePanel()
//       e.stopImmediatePropagation()
//       e.stopPropagation()
//     }
//   })
// })
</script>

<template>
  <VSlideXTransition>
    <VSheet
      id="sidebar"
      rounded="lg"
      :style="{ right: panel.current ? '20rem' : 0 }"
      elevation="8"
    >
      <VTabs
        v-model="panel.current"
        :mandatory="false"
        direction="vertical"
        hide-slider
      >
        <VBtn
          v-for="item in items"
          :key="item.id"
          :prepend-icon="item.icon"
          :text="item.name"
          :active="panel.current === item.value"
          :color="panel.current === item.value ? 'primary' : 'default'"
          variant="text"
          size="small"
          rounded="0"
          stacked
          @click="togglePanel(item.value)"
        />
        <!-- <VTab
          v-for="item in items"
          :key="item.id"
          :prepend-icon="item.icon"
          :text="item.name"
          :value="item.value"
          :color="item.color"
          variant="flat"
          rounded="lg"
        /> -->
      </VTabs>
    </VSheet>
  </VSlideXTransition>
  <VExpandXTransition>
    <VWindow
      v-if="panel.current"
      id="sidebar-window"
      v-model="panel.current"
      :mandatory="false"
    >
      <VWindowItem
        v-for="item in items"
        :key="item.id"
        :value="item.value"
      >
        <!-- <NodeStyles /> -->
        <component :is="component" />
      </VWindowItem>
    </VWindow>
  </VExpandXTransition>
</template>

<style
  scoped
  lang="scss"
>
#sidebar,
#sidebar-window {
  position: fixed;
  z-index: 999;
}

#sidebar {
  // width: 3.75rem;
  width: max-content;
  // top: 50%;
  bottom: calc(64px + 64px + 1rem);
  margin-right: .5rem;
}

#sidebar-window {
  width: 20rem;
  right: 0;
  bottom: 0;
  top: 140px;
}
</style>
