<script setup lang="ts">
import PanelContainer from '@/components/PanelContainer.vue';
import { useAppStore } from '@/store';
import { over } from 'lodash';
import { v4 as uuid } from 'uuid'
import { ref, computed, watch } from 'vue'

const { togglePanel, isDark } = useAppStore()

const structures = ref([1, 2, 3, 4, 5])
const selected = ref(1)
</script>

<template>
  <PanelContainer>
    <template #title>
      <p>结构</p>
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
      <VSheet class="px-2">
        <VCard
          v-for="item in structures"
          :key="item"
          :color="item === selected ? 'primary' : 'default'"
          class="my-4"
          @click="selected = item"
        >

          <VCardText class="text-center">
            <VImg
              src="https://wanglin2.github.io/mind-map/dist/img/logicalStructure.png"
              width="100%"
              height="200"
            />
            <p>逻辑结构图</p>
          </VCardText>
        </VCard>
      </VSheet>
    </template>
  </PanelContainer>
</template>
