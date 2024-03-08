<script
  setup
  lang="ts"
>
import { mdiCloseCircle } from '@mdi/js'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { PanelContainer } from '@/components'
import { useMindMap, usePresets } from '@/composables'
import { useSettingsStore } from '@/store/settings'
import { useAppStore } from '@/store/app'

const { mindMap } = useMindMap()
const { mindMapLayout } = storeToRefs(useAppStore())
const { LayoutStructureItems } = usePresets()
const { togglePanel } = useSettingsStore()

function onSwitchLayout(layout: string) {
  mindMapLayout.value = layout
  mindMap.value?.setLayout(mindMapLayout.value)
  // * update to store
}

onMounted(() => {
  mindMapLayout.value = mindMap.value?.getLayout() || 'logicalStructure'
})
</script>

<template>
  <PanelContainer>
    <template #title>
      <p>结构</p>
      <VBtn
        color="surface"
        variant="flat"
        icon
        @click="() => togglePanel(null)"
      >
        <VIcon>{{ mdiCloseCircle }}</VIcon>
      </VBtn>
    </template>

    <template #content>
      <VSheet class="px-2">
        <VCard
          v-for="item in LayoutStructureItems"
          :key="item.id"
          :color="item.value === mindMapLayout ? 'primary' : 'default'"
          class="my-4"
          @click="onSwitchLayout(item.value)"
        >
          <VCardText class="text-center">
            <VImg
              :src="`/img/structures/${item.value}.png`"
              width="100%"
              height="200"
            />
            <p>{{ item.name }}</p>
          </VCardText>
        </VCard>
      </VSheet>
    </template>
  </PanelContainer>
</template>
