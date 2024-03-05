<script
  setup
  lang="ts"
>
import { BottomBar, MindMapContainer, MindMapContextMenu, NodeContextMenu, NodeRichTextMenu, TopBar } from '@/widgets'
</script>

<template>
  <MindMapContainer />
  <TopBar />
  <BottomBar />
  <NodeContextMenu />
  <MindMapContextMenu />
  <NodeRichTextMenu />
</template>
