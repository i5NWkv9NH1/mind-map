<script
  setup
  lang="ts"
>
import { mdiCloseCircle } from '@mdi/js'
import { ref } from 'vue'
import { PanelContainer } from '@/components'
import { usePresets } from '@/composables'

const { LayoutStructureItems } = usePresets()
const selectLayoutStructure = ref('logicalStructure')
function togglePanel(_: any) { }
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
        <VIcon>{{ mdiCloseCircle }}</VIcon>
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
