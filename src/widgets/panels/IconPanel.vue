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
      <p>图标</p>
      <VBtn
        color="surface"
        variant="flat"
        @click="togglePanel(null)"
        icon
      >
        <VIcon>mdi-close-circle</VIcon>
      </VBtn>
    </template>
    <template #content>
      <VSheet class="px-2">
      </VSheet>
    </template>
  </PanelContainer>
</template>
