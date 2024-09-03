<script setup lang="ts">
import { BottomBar, MindMapContainer, MindMapContextMenu, NodeContextMenu, NodeIconContextMenu, NodeImagePreview, NodeRichTextMenu, SideBar, TopBar }
  from '@/widgets'
</script>

<template>
  <MindMapContainer />
  <!-- # Action bar -->
  <TopBar />
  <BottomBar />
  <SideBar />
  <!-- # Menus -->
  <NodeContextMenu />
  <MindMapContextMenu />
  <NodeRichTextMenu />
  <NodeIconContextMenu />
  <!-- # Dialog -->
  <NodeImagePreview />
</template>
