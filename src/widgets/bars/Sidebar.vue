<script
  setup
  lang="ts"
>
import { v4 as uuid } from 'uuid'
import { computed, ref } from 'vue'
import { mdiAutoFix, mdiKeyboardOutline, mdiSitemapOutline, mdiStarShootingOutline, mdiTshirtCrewOutline } from '@mdi/js'
import { storeToRefs } from 'pinia'
import { VSlideXReverseTransition } from 'vuetify/lib/components/index.mjs'
import { BaseStyles, MapShortKeys, MapStructures, MapThemes, NodeStyles } from '../panels'
import { useSettingsStore } from '@/store/settings'

const { togglePanel } = useSettingsStore()
const { panel } = storeToRefs(useSettingsStore())
const items = ref([
  { id: uuid(), name: '节点样式', color: 'primary', icon: mdiStarShootingOutline, value: 1 },
  { id: uuid(), name: '基础样式', color: 'primary', icon: mdiAutoFix, value: 2 },
  { id: uuid(), name: '主题', color: 'primary', icon: mdiTshirtCrewOutline, value: 3 },
  { id: uuid(), name: '结构', color: 'primary', icon: mdiSitemapOutline, value: 4 },
  { id: uuid(), name: '快捷键', color: 'primary', icon: mdiKeyboardOutline, value: 5 },
])
const component = computed(() => {
  switch (panel.value.status) {
    case 1: return NodeStyles
    case 2: return BaseStyles
    case 3: return MapThemes
    case 4: return MapStructures
    case 5: return MapShortKeys
    default: return NodeStyles
  }
})

function onSwitchPanel(value: number) {
  if (panel.value.status === value)
    togglePanel(null)

  else
    togglePanel(value)
}

const styles = computed(() => {
  const right = panel.value.status ? '20rem' : 0
  return { right }
})
</script>

<template>
  <VScrollXReverseTransition>
    <VSheet
      id="sidebar"
      rounded="lg"
      :style="styles"
      elevation="8"
    >
      <VTabs
        v-model="panel.status"
        :mandatory="false"
        direction="vertical"
        hide-slider
      >
        <VBtn
          v-for="item in items"
          :key="item.id"
          :text="item.name"
          :active="panel.status === item.value"
          :color="panel.status === item.value ? 'primary' : 'default'"
          variant="text"
          size="small"
          rounded="0"
          stacked
          @click.stop="onSwitchPanel(item.value)"
        />
      </VTabs>
    </VSheet>
  </VScrollXReverseTransition>
  <VSlideXReverseTransition>
    <VWindow
      v-if="panel.status"
      id="sidebar-window"
      v-model="panel.status"
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
  </VSlideXReverseTransition>
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
