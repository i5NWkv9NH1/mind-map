<script setup lang="tsx">
import { ref } from 'vue'

const expand = ref([''])
</script>

<template>
  <VList v-model:opened="expand">
    <v-list-item
      prepend-icon="mdi-home"
      title="Home"
    />
  </VList>
</template>
