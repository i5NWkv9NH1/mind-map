<script setup lang="tsx">
import { defineComponent, ref } from 'vue';

const expand = ref([''])
</script>

<template>
  <VList v-model:opened="expand">
    <v-list-item
      prepend-icon="mdi-home"
      title="Home"
    ></v-list-item>
  </VList>
</template>

