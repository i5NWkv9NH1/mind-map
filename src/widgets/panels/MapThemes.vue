<script
  setup
  lang="ts"
>
import { computed, ref } from 'vue'
import { useAppStore } from '@/store'
import { PanelContainer } from '@/components'
import { v4 as uuid } from 'uuid'
import { storeToRefs } from 'pinia';
import { usePresets } from '@/composables';
import type { MindMapTheme } from '@/@types/mind-map/theme';

const { togglePanel } = useAppStore()
const { } = storeToRefs(useAppStore())
const { getClassicThemes, getDarkThemes, getSimpleThemes, } = usePresets()
const current = ref(0)
const themeStyles = ref([
  { id: uuid(), name: '经典', value: 0 },
  { id: uuid(), name: '深色', value: 1 },
  { id: uuid(), name: '朴素', value: 2 },
])
const confirmDialog = ref({
  status: false,
})
const selected = ref('default')
const isHasModify = ref(false)
const themes = computed<MindMapTheme[]>(() => {
  switch (current.value) {
    case 0: return getClassicThemes.value
    case 1: return getDarkThemes.value
    case 2: return getSimpleThemes.value
    default: return getClassicThemes.value
  }
})

function handleChange(themeName: string) {
  if (isHasModify.value) {
    confirmDialog.value.status = true
    return
  }
  selected.value = themeName
}
function reserve() {
  confirmDialog.value.status = false
}
function overwrite() {
  confirmDialog.value.status = false
}
</script>

<template>
  <VDialog
    v-model="confirmDialog.status"
    persistent
  >
    <VContainer class="fill-height">
      <VRow justify="center">
        <VCol
          cols="12"
          lg="4"
          md="6"
          sm="8"
        >
          <VCard>
            <VCardTitle>
              提示
            </VCardTitle>
            <VCardText>
              你当前自定义过基础样式，是否覆盖？
            </VCardText>
            <VCardActions>
              <VSpacer />
              <VBtn @click="reserve">
                保留
              </VBtn>
              <VBtn
                variant="elevated"
                color="primary"
                @click="overwrite"
              >
                覆盖
              </VBtn>
            </VCardActions>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>
  </VDialog>
  <PanelContainer>
    <template #title>
      <p>主题</p>
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
      <VTabs
        v-model="current"
        density="compact"
      >
        <VTab
          v-for="tab in themeStyles"
          :key="tab.id"
          :value="tab.value"
          :text="tab.name"
        />
      </VTabs>
      <VWindow
        v-model="current"
        class="px-2"
      >
        <VWindowItem
          v-for="tab in themeStyles"
          :key="tab.id"
          :value="tab.value"
        >
          <VCard
            v-for="theme in themes"
            :key="theme.name"
            :color="theme.value === selected ? 'primary' : 'default'"
            elevation="4"
            class="my-4"
            @click="handleChange(theme.value)"
          >
            <VCardText class="text-center">
              <VImg
                :src="'/img/themes/' + theme.value + '.jpg'"
                width="100%"
                height="120"
              />
              {{ theme.name }}
            </VCardText>
          </VCard>
        </VWindowItem>
      </VWindow>
    </template>
  </PanelContainer>
</template>
