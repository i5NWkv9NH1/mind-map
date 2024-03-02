<script
  setup
  lang="ts"
>
import { TreeView } from '@/components'
import PanelContainer from '@/components/PanelContainer.vue'
import { useAppStore } from '@/store'

const { togglePanel } = useAppStore()
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
