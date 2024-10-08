<script
  setup
  lang="ts"
>
import { mdiCloseCircle } from '@mdi/js'
import { v4 as uuid } from 'uuid'
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { MindMapTheme } from '@/@types/mind-map'
import { PanelContainer } from '@/components'
import { useMindMap, usePresets } from '@/composables'
import { useSettingsStore } from '@/store/settings'
import { useAppStore } from '@/store/app'
import { resolveAssets } from '@/helpers'

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

const themes = computed<MindMapTheme[]>(() => {
  switch (current.value) {
    case 0: return getClassicThemes.value
    case 1: return getDarkThemes.value
    case 2: return getSimpleThemes.value
    default: return getClassicThemes.value
  }
})

async function onSwitchTheme(theme: string) {
  mindMapTheme.value = theme
  // ? 将原先主题的配置清空
  // * 因为有一些主题的配置可能没有一些特定的字段值，比如 background Color
  // * 所以为了防止样式混乱，特先清空
  // mindMap.value?.setThemeConfig({}, false)
  // TODO: 设置主题后并未更新对应的配置
  await mindMap.value?.setThemeConfig({}, false)
  await mindMap.value?.setTheme(mindMapTheme.value)
  const target = mindMapThemes.value.find(item => item.value === mindMapTheme.value)
  isDark.value = target.dark
  mindMapThemeConfig.value = await mindMap.value?.getThemeConfig()
  // TODO: 添加自定义配置 覆盖 / 保留
  // TODO: 先直接覆盖掉主题配置
  // TODO: 判断本地是否有自定义配置
  // # 获取更新主题后的主题配置
  // # 更新
  // mindMapThemeConfig.value = config
  // const customConfig = mindMap.value?.getCustomThemeConfig()
  // updateThemeConfig(config)
}

// function onSwitchTheme(theme: string) {
//   if (theme === mindMapTheme.value)
//     return
//   mindMapTheme.value = theme
//   const customThemeConfig = mindMap.value?.getCustomThemeConfig()
//   // # 是否存在配置
//   if (!isEmpty(customThemeConfig)) {
//     confirmDialog.value = true
//   }
//   else {
//     mindMap.value?.setThemeConfig({}, true)
//     mindMapThemeConfig.value = mindMap.value?.getThemeConfig()
//   }
// }
// function onNotSaveThemeConfig() {
//   mindMap.value?.setThemeConfig({}, true)
//   mindMapThemeConfig.value = mindMap.value?.getThemeConfig()
//   confirmDialog.value = false
// }
// function onOverWriteTheme() {
//   mindMap.value?.setTheme(mindMapTheme.value)
//   // TODO: 设置主题后替换原来保存的自定义配置
//   // TODO: 目前自定义设置的对象数据中还包括原来主题的...
//   mindMap.value?.setThemeConfig(mindMapThemeConfig.value, true)
//   confirmDialog.value = false
// }
</script>

<template>
  <!-- <VDialog
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
            <VCardSubtitle>你当前自定义过基础样式，是否保留自定义配置</VCardSubtitle>
            <VCardText />
            <VCardActions>
              <VBtn
                @click="() => {
                  onNotSaveThemeConfig()
                }"
              >
                <VIcon start>
                  {{ mdiCloseCircleOutline }}
                </VIcon>
                <span>不保留</span>
              </VBtn>
              <VBtn
                color="warning"
                @click="() => {
                  onOverWriteTheme()
                }"
              >
                <VIcon start>
                  {{ mdiContentSaveOutline }}
                </VIcon>
                <span>保留</span>
              </VBtn>
            </VCardActions>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>
  </VDialog> -->
  <PanelContainer>
    <template #title>
      <p>
        主题
      </p>

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
            @click="() => {
          onSwitchTheme(theme.value)
        }"
          >
            <VCardText class="text-center">
              <VImg
                :src="resolveAssets('img/themes', theme.value, 'jpg')"
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
