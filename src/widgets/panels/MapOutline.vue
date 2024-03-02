<script
  setup
  lang="tsx"
>
import { VList } from 'vuetify/components'
import { ref, watch } from 'vue'
import { PanelContainer } from '@/components'
import { useAppStore } from '@/store'

const { togglePanel } = useAppStore()

const activeNode = ref<any>()

// eslint-disable-next-line no-console
watch(activeNode, () => console.log(activeNode.value))

function TreeView() {
  return (
    <VList>
    </VList>
  )
}
</script>

<template>
  <PanelContainer>
    <template #title>
      <p>大纲</p>
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
      <VSheet>
        <TreeView />
      </VSheet>
    </template>
  </PanelContainer>
</template>
