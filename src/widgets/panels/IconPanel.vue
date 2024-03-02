<script
  setup
  lang="ts"
>
import { useAppStore } from '@/store'
import PanelContainer from '@/components/PanelContainer.vue'

const { togglePanel } = useAppStore()
</script>

<template>
  <PanelContainer>
    <template #title>
      <p>图标</p>
      <VBtn
        color="surface"
        variant="flat"
        icon
        @click="togglePanel(null)"
      >
        <VIcon>mdi-close-circle</VIcon>
      </VBtn>
    </template>

    <template #content>
      <VSheet class="px-2" />
    </template>
  </PanelContainer>
</template>
