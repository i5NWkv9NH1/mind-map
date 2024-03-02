<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store'

const { words, nodes } = storeToRefs(useAppStore())
</script>

<template>
  <div class="px-4 d-flex align-center stat">
    <div>
      <span>字数：</span>
      <span>{{ words }}</span>
    </div>
    <div>
      <span>节点数：</span>
      <span>{{ nodes }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.stat {
  gap: 1rem;
}
</style>
