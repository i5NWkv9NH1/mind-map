<script
  setup
  lang="ts"
>
import { mdiCloseCircle, mdiCloseCircleOutline, mdiContentSaveOutline } from '@mdi/js'
import { v4 as uuid } from 'uuid'
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { isEmpty } from 'lodash'
import type { MindMapTheme } from '@/@types/mind-map'
import { PanelContainer } from '@/components'
import { useMindMap, usePresets } from '@/composables'
import { useSettingsStore } from '@/store/settings'
import { useAppStore } from '@/store/app'

const { mindMap } = useMindMap()
const { getClassicThemes, getDarkThemes, getSimpleThemes, mindMapThemes } = usePresets()
const { isDark } = storeToRefs(useSettingsStore())
const { mindMapTheme, mindMapThemeConfig } = storeToRefs(useAppStore())
const { togglePanel } = useSettingsStore()

const current = ref(0)
const themeStyles = ref([
  { id: uuid(), name: '经典', value: 0 },
  { id: uuid(), name: '深色', value: 1 },
  { id: uuid(), name: '朴素', value: 2 },
])

const confirmDialog = ref(false)
const themes = computed<MindMapTheme[]>(() => {
  switch (current.value) {
    case 0: return getClassicThemes.value
    case 1: return getDarkThemes.value
    case 2: return getSimpleThemes.value
    default: return getClassicThemes.value
  }
})

watch(mindMapTheme, () => {
  // * is Dark
  const target = mindMapThemes.value.find(item => item.value === mindMapTheme.value)
  isDark.value = target.dark
})

function onViewThemeChange() {
  mindMapTheme.value = mindMap.value?.getTheme()
}

function onSwitchTheme(theme: string) {
  if (theme === mindMapTheme.value)
    return
  // # 先进行更改, 再进行合并自定义设置到 mindMap
  mindMapTheme.value = theme
  const customThemeConfig = mindMap.value?.getCustomThemeConfig()
  // # 是否存在配置
  if (!isEmpty(customThemeConfig)) {
    confirmDialog.value = true
    mindMapThemeConfig.value = customThemeConfig
    // ? -> confirm dialog
  }
  else {
    // # 不存在自定义配置, 直接设置主题
    mindMap.value?.setTheme(mindMapTheme.value)
    // TODO: 保存到 store
    mindMapThemeConfig.value = customThemeConfig
  }
}
// # 不保留自定义配置
function onNotSaveThemeConfig() {
  mindMap.value?.setTheme(mindMapTheme.value)
  confirmDialog.value = false
  mindMapThemeConfig.value = {}
  // TODO: 保存到 store
  // store.updateThemeCofig({
  //   template: selectedTheme.value,
  //   config: themeConfig.value
  // })
}
// # 保留自定义配置，覆盖主题
function onOverWriteTheme() {
  mindMap.value?.setThemeConfig({}, true)
  mindMap.value?.setTheme(mindMapTheme.value)
  confirmDialog.value = false
  // TODO: 保存到 store
  // store.updateThemeCofig({
  //   template: selectedTheme.value,
  //   config: themeConfig.value
  // })
}

onMounted(() => {
  mindMapTheme.value = mindMap.value?.getTheme() || 'default'
  mindMap.value?.on('view_theme_change', onViewThemeChange)
})
</script>

<template>
  <VDialog
    v-model="confirmDialog"
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
              你当前自定义过基础样式，是否保留自定义配置
            </VCardText>
            <VCardActions>
              <VBtn @click="onNotSaveThemeConfig">
                <VIcon start>
                  {{ mdiCloseCircleOutline }}
                </VIcon>
                <span>不保留，直接设置主题</span>
              </VBtn>
              <VBtn
                color="warn"
                @click="onOverWriteTheme"
              >
                <VIcon start>
                  {{ mdiContentSaveOutline }}
                </VIcon>
                <span>保留，使用自定义配置覆盖主题</span>
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
        <VIcon>{{ mdiCloseCircle }}</VIcon>
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
            :color="theme.value === mindMapTheme ? 'primary' : 'default'"
            elevation="4"
            class="my-4"
            @click="onSwitchTheme(theme.value)"
          >
            <VCardText class="text-center">
              <VImg
                :src="`/img/themes/${theme.value}.jpg`"
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
