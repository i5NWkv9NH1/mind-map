<script
  setup
  lang="ts"
>
import { ref } from 'vue'

const scale = ref(100)
</script>

<template>
  <div class="d-flex align-center">
    <VTooltip
      transition="slide-y-transition"
      offset="10"
      open-delay="100"
      location="top"
    >
      <template #activator="{ props }">
        <VBtn
          v-bind="props"
          class="mr-1"
          icon
        >
          <VIcon>mdi-minus</VIcon>
        </VBtn>
      </template>
      <p>缩小</p>
    </VTooltip>
    <span>{{ scale }} %</span>
    <VTooltip
      transition="slide-y-transition"
      offset="10"
      open-delay="100"
      location="top"
    >
      <template #activator="{ isActive, props }">
        <VBtn
          v-bind="props"
          :active="isActive"
          class="ml-1 mr-2"
          icon
        >
          <VIcon>mdi-plus</VIcon>
        </VBtn>
      </template>
      <p>放大</p>
    </VTooltip>
  </div>
</template>
