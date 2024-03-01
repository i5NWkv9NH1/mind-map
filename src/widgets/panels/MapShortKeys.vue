<script setup lang="ts">
import PanelContainer from '@/components/PanelContainer.vue';
import { useAppStore } from '@/store';
import { over } from 'lodash';
import { v4 as uuid } from 'uuid'
import { ref, computed, watch } from 'vue'

const { togglePanel, isDark } = useAppStore()

</script>

<template>
  <PanelContainer>
    <template #title>
      <p>快捷键</p>
      <VBtn
        color="surface"
        variant="flat"
        @click="togglePanel(null)"
        icon
      >
        <VIcon>mdi-close</VIcon>
      </VBtn>
    </template>
    <template #content>
      <VSheet>Short keys</VSheet>
    </template>
  </PanelContainer>
</template>
