<script
  setup
  lang="ts"
>
import { ref } from 'vue'
import { useAppStore } from '@/store'
import PanelContainer from '@/components/PanelContainer.vue'
import { storeToRefs } from 'pinia';
import { usePresets } from '@/composables';

const { togglePanel } = useAppStore()
const { LayoutStructureItems } = usePresets()
const selectLayoutStructure = ref('logicalStructure')
</script>

<template>
  <PanelContainer>
    <template #title>
      <p>结构</p>
      <VBtn
        color="surface"
        variant="flat"
        icon
        @click="togglePanel(null)"
      >
        <VIcon>mdi-close</VIcon>
      </VBtn>
    </template>

    <template #content>
      <VSheet class="px-2">
        <VCard
          v-for="item in LayoutStructureItems"
          :key="item.id"
          :color="item.value === selectLayoutStructure ? 'primary' : 'default'"
          class="my-4"
          @click="selectLayoutStructure = item.value"
        >
          <VCardText class="text-center">
            <VImg
              :src="`/img/structures/${item.value}.png`"
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
