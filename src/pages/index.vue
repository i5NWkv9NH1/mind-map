<script
  setup
  lang="ts"
>
import { BottomBar, MindMapContainer, MindMapContextMenu, NodeContextMenu, NodeIconContextMenu, NodeImagePreview, NodeRichTextMenu, TopBar } from '@/widgets'
</script>

<template>
  <MindMapContainer />
  <!-- # Action bar -->
  <TopBar />
  <BottomBar />
  <!-- # Menus -->
  <NodeContextMenu />
  <MindMapContextMenu />
  <NodeRichTextMenu />
  <NodeIconContextMenu />
  <!-- # Dialog -->
  <NodeImagePreview />
</template>
