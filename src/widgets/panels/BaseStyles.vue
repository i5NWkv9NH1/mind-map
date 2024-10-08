<!-- @ts-nocheck -->
<script
  setup
  lang="ts"
>
import { mdiCloseCircle } from '@mdi/js'
import { storeToRefs } from 'pinia'
import { v4 as uuid } from 'uuid'

// @ts-nocheck
import { ref } from 'vue'
import { useSettingsStore } from '@/store/settings'
import { useMindMap, usePresets } from '@/composables'
import { ColorPicker, DragUpload, FormSelect, PanelContainer } from '@/components'
import { useAppStore } from '@/store/app'
import type { CreateNewNodeBehavior, MindMapConfig } from '@/@types'

// # background
const { isDark } = storeToRefs(useSettingsStore())
const { mindMapWaterConfig, mindMapConfig, mindMapThemeConfig } = storeToRefs(useAppStore())
const { togglePanel } = useSettingsStore()
const { mindMap } = useMindMap()

// # 数据
const {
  usedColorItems,
  fontFamilyItems,
  fontSizeItems,
  lineStyleItems,
  lineStyleMap,
  lineRadiusItems,
  rootLineStyleItems,
  rootLineStartPositionItems,
  mouseBehaviorItems,
  mouseScrollScaleItems,
  createNodeBehaviorItems,
  lineWidthSizeItems,
  backgroundPositionItems,
  backgroundRepeatItems,
  backgroundSizeItems,
} = usePresets()
const backgroundTab = ref(0)
const backgroundTabItems = ref([
  { id: uuid(), name: '颜色', value: 0 },
  { id: uuid(), name: '图片', value: 1 },
])
const marginTab = ref('')
const marginTabItems = ref([
  { id: uuid(), name: '二级节点', value: 'second' },
  { id: uuid(), name: '三级以下节点', value: 'node' },
])

// * 切换 tab 时获取不同的数据 [root, second, node]
// watch(marginTab, () => {
//   marginTabItems.value.forEach((item) => {
//     const key = item.value
//     mindMapThemeConfig.value[key].marginX = mindMap.value?.getThemeConfig()[marginTab.value].marginX
//     mindMapThemeConfig.value[key].marginY = mindMap.value?.getThemeConfig()[marginTab.value].marginY
//   })
//   // Object.keys(marginTabItems.value).forEach((key: string) => {
//   //   mindMapThemeConfig.value[key] = mindMap.value?.getThemeConfig()[marginTab.value][key]
//   // })
// })
function onUpdateTheme(key: string, value: string | number | any) {
  // TODO: 保存到本地
  mindMapThemeConfig.value[key] = value
  mindMap.value?.setThemeConfig(mindMapThemeConfig.value)
}
function onUpdateMargin(key: string, value: string | number | any) {
  // TODO: 保存到本地
  mindMapThemeConfig.value[marginTab.value][key] = value
  mindMap.value?.setThemeConfig(mindMapThemeConfig.value)
}
function onUpdateConfig(key: keyof MindMapConfig, value: any) {
  // @ts-ignore
  (mindMapConfig.value)[key] = value
  mindMap.value?.updateConfig({ ...mindMapConfig.value })
}
// ! 不要监听整个主题样式，只修改某个值
// ! 避免切换主题的时候把整个原来的主题配置（无UI）一直给替换掉
// watch(mindMapThemeConfig, () => {
//   mindMap.value?.setThemeConfig(mindMapThemeConfig.value)
// }, { deep: true })

// # 水印
const isShowWaterMarker = ref(false)
// watch(mindMapWaterConfig, () => {
//   if (isShowWaterMarker.value) {
//     // @ts-ignore
//     mindMap.value?.watermark.updateWatermark({ ...mindMapWaterConfig.value })
//   }
//   else {
//     mindMapWaterConfig.value.text = ''
//     // @ts-ignore
//     mindMap.value?.watermark.updateWatermark({ ...mindMapWaterConfig.value })
//   }
// }, { deep: true, immediate: true })
// watchEffect(() => {
//   if (!isShowWaterMarker.value)
//     mindMapWaterConfig.value.text = ''
// })
// watch(mindMapConfig, () => {
//   mindMap.value?.updateConfig({ ...mindMapConfig.value })
// }, { deep: true })
</script>

<template>
  <PanelContainer>
    <template #title>
      <p>基础样式</p>
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
      <VSheet class="my-4">
        <div class="text-body-1 mb-3">
          画布背景
        </div>
        <VRow>
          <VCol>
            <VTabs
              v-model="backgroundTab"
              density="compact"
            >
              <VTab
                v-for="tab in backgroundTabItems"
                :key="tab.id"
                :text="tab.name"
                :value="tab.value"
                size="small"
              />
            </VTabs>
            <VWindow
              v-model="backgroundTab"
              class="my-4"
            >
              <VWindowItem value="颜色">
                <ColorPicker
                  :color="mindMapThemeConfig.backgroundColor"
                  :items="usedColorItems"
                  @update:color="(value: string) => {
          onUpdateTheme('backgroundColor', value)
        }"
                >
                  <template #activator="activator">
                    <div class="pa-2">
                      <VBtn
                        v-bind="activator.props"
                        :color="mindMapThemeConfig.backgroundColor"
                        rounded="lg"
                        size="large"
                        class="mr-2"
                      />
                      <span>选择背景颜色</span>
                    </div>
                  </template>
                </ColorPicker>
              </VWindowItem>
              <VWindowItem value="图片">
                <div class="pa-2">
                  <DragUpload
                    :src="mindMapThemeConfig.backgroundImage"
                    name=""
                    @update:src="(value) => {
          onUpdateTheme('backgroundImage', value)
        }"
                  />
                  <VRow>
                    <VCol>
                      <FormSelect
                        :model-value="mindMapThemeConfig.backgroundPosition"
                        :items="backgroundPositionItems"
                        label="图片位置"
                        @update:model-value="(value) => {
          onUpdateTheme('backgroundPosition', value)
        }"
                      />
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol>
                      <FormSelect
                        :model-value="mindMapThemeConfig.backgroundRepeat"
                        label="图片重复"
                        :items="backgroundRepeatItems"
                        @update:model-value="(value) => {
          onUpdateTheme('backgroundRepeat', value)
        }"
                      />
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol>
                      <FormSelect
                        :model-value="mindMapThemeConfig.backgroundSize"
                        label="图片大小"
                        :items="backgroundSizeItems"
                        @update:model-value="(value) => {
          onUpdateTheme('backgroundSize', value)
        }"
                      />
                    </VCol>
                  </VRow>
                </div>
              </VWindowItem>
            </VWindow>
          </VCol>
        </VRow>
      </VSheet>
      <VDivider />
      <VSheet class="my-4">
        <div class="text-body-1 mb-3">
          连线
        </div>
        <VRow>
          <VCol>
            <VLabel class="text-subtitle-2 mb-1">
              颜色
            </VLabel>
            <ColorPicker
              :color="mindMapThemeConfig.lineColor"
              location="left center"
              :items="usedColorItems"
              @update:color="(value: string) => {
          onUpdateTheme('lineColor', value)
        }"
            >
              <template #activator="activator">
                <VBtn
                  v-bind="activator.props"
                  class="d-block"
                  :color="mindMapThemeConfig.lineColor"
                  elevation="4"
                  block
                />
              </template>
            </ColorPicker>
          </VCol>
          <VCol>
            <FormSelect
              :model-value="mindMapThemeConfig.lineWidth"
              :items="lineWidthSizeItems"
              label="粗细"
              @update:model-value="(value) => {
          onUpdateTheme('lineWidth', value)
        }"
            >
              <template #default="{ item }">
                <VListItemTitle>
                  <p>{{ item.title }}</p>
                  <template v-if="!item.value" />
                  <template v-else>
                    <svg
                      width="100"
                      height="20"
                    >
                      <line
                        x1="0"
                        y1="0"
                        x2="100"
                        y2="0"
                        stroke-dasharray="none"
                        :stroke="mindMapThemeConfig.lineWidth === item.value ? '#409eff' : isDark ? '#fff' : '#000'"
                        :stroke-width="item.value"
                      />
                    </svg>
                  </template>
                </VListItemTitle>
              </template>
            </FormSelect>
          </VCol>
        </VRow>
        <VRow align="center">
          <VCol cols="6">
            <FormSelect
              :model-value="mindMapThemeConfig.lineStyle"
              :items="lineStyleItems"
              label="风格"
              @update:model-value="(value) => {
          onUpdateTheme('lineStyle', value)
        }"
            >
              <template #default="{ item }: { item: { value: 'straight' | 'curve' | 'direct';[index: string]: any } }">
                <VListItemTitle>
                  <p>{{ item.title }}</p>
                  <svg
                    width="60"
                    height="30"
                    :style="{ backgroundColor: isDark ? 'white' : '' }"
                    v-html="lineStyleMap[item.value]"
                  />
                </VListItemTitle>
              </template>
            </FormSelect>
          </VCol>
          <VCol cols="6">
            <template v-if="mindMapThemeConfig.lineStyle === 'straight'">
              <FormSelect
                label="圆角大小"
                :items="lineRadiusItems"
                :model-value="mindMapThemeConfig.lineRadius"
                @update:model-value="value => {
          onUpdateTheme('lineRadius', value)
        }"
              />
            </template>
            <template v-if="mindMapThemeConfig.lineStyle === 'curve'">
              <FormSelect
                label="根节点"
                :items="rootLineStyleItems"
                :model-value="mindMapThemeConfig.rootLineKeepSameInCurve"
                @update:model-value="value => {
          onUpdateTheme('rootLineKeepSameInCurve', value)
        }"
              />
            </template>
          </VCol>
        </VRow>
        <VRow v-if="mindMapThemeConfig.lineStyle === 'curve'">
          <VCol cols="6">
            <FormSelect
              label="根节点连线起始位置"
              :items="rootLineStartPositionItems"
              :model-value="mindMapThemeConfig.rootLineStartPositionKeepSameInCurve"
              @update:model-value="value => {
          onUpdateTheme('rootLineStartPositionKeepSameInCurve', value)
        }"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <VCheckbox
              :model-value="mindMapThemeConfig.showLineMarker"
              label="是否显示箭头"
              density="compact"
              hide-details
              @update:model-value="(value) => {
          onUpdateTheme('showLineMarker', value)
        }"
            />
          </VCol>
        </VRow>
      </VSheet>
      <VDivider />
      <VSheet class="my-4">
        <div class="text-body-1 mb-3">
          概要的连线
        </div>
        <VRow>
          <VCol>
            <VLabel class="text-subtitle-2 mb-1">
              颜色
            </VLabel>
            <ColorPicker
              :color="mindMapThemeConfig.generalizationLineColor"
              :items="usedColorItems"
              @update:color="(value: string) => {
          onUpdateTheme('generalizationLineColor', value)
        }"
            >
              <template #activator="activator">
                <VBtn
                  v-bind="activator.props"
                  class="d-block"
                  :color="mindMapThemeConfig.generalizationLineColor"
                  elevation="4"
                  block
                />
              </template>
            </ColorPicker>
          </VCol>
          <VCol>
            <FormSelect
              :items="lineWidthSizeItems"
              :model-value="mindMapThemeConfig.generalizationLineWidth"
              label="粗细"
              @update:model-value="(value) => { onUpdateTheme('generalizationLineWidth', value) }"
            >
              <template #default="{ item }">
                <VListItemTitle>
                  <p>{{ item.title }}</p>
                  <template v-if="!item.value" />
                  <template v-else>
                    <svg
                      width="100"
                      height="20"
                    >
                      <line
                        x1="0"
                        y1="0"
                        x2="100"
                        y2="0"
                        stroke-dasharray="none"
                        :stroke="mindMapThemeConfig.generalizationLineWidth === item.value ? '#409eff' : isDark ? '#fff' : '#000'"
                        :stroke-width="item.value"
                      />
                    </svg>
                  </template>
                </VListItemTitle>
              </template>
            </FormSelect>
          </VCol>
        </VRow>
      </VSheet>
      <VDivider />
      <VSheet class="my-4">
        <div class="text-body-1 mb-3">
          关联线
        </div>
        <VRow>
          <VCol>
            <VLabel class="text-subtitle-2 mb-1">
              颜色
            </VLabel>
            <ColorPicker
              :color="mindMapThemeConfig.associativeLineColor"
              mode="rgb"
              :items="usedColorItems"
              @update:color="(value: string) => { onUpdateTheme('associativeLineColor', value) }"
            >
              <template #activator="args">
                <VBtn
                  v-bind="args.props"
                  class="d-block"
                  :color="mindMapThemeConfig.associativeLineColor"
                  elevation="4"
                  block
                />
              </template>
            </ColorPicker>
          </VCol>
          <VCol>
            <FormSelect
              label="粗细"
              :model-value="mindMapThemeConfig.associativeLineWidth"
              :items="lineWidthSizeItems"
              @update:model-value="(value) => {
          onUpdateTheme('associativeLineWidth', value)
        }"
            >
              <template #default="{ item }">
                <VListItemTitle>
                  <p>{{ item.title }}</p>
                  <template v-if="!item.value" />
                  <template v-else>
                    <svg
                      width="100"
                      height="20"
                    >
                      <line
                        x1="0"
                        y1="0"
                        x2="100"
                        y2="0"
                        stroke-dasharray="none"
                        :stroke="mindMapThemeConfig.associativeLineWidth === item.value ? '#409eff' : isDark ? '#fff' : '#000'"
                        :stroke-width="item.value"
                      />
                    </svg>
                  </template>
                </VListItemTitle>
              </template>
            </FormSelect>
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <VLabel class="text-subtitle-2 mb-1">
              激活颜色
            </VLabel>
            <ColorPicker
              :color="mindMapThemeConfig.associativeLineActiveColor"
              :items="usedColorItems"
              @update:color="(value: string) => {
          onUpdateTheme('associativeLineActiveColor', value)
        }"
            >
              <template #activator="args">
                <VBtn
                  v-bind="args.props"
                  class="d-block"
                  :color="mindMapThemeConfig.associativeLineActiveColor"
                  elevation="4"
                  block
                />
              </template>
            </ColorPicker>
          </VCol>
          <VCol>
            <FormSelect
              label="粗细"
              :model-value="mindMapThemeConfig.associativeLineActiveWidth"
              :items="lineWidthSizeItems"
              @update:model-value="(value) => {
          onUpdateTheme('associativeLineActiveWidth', value)
        }"
            >
              <template #default="{ item }">
                <VListItemTitle>
                  <p>{{ item.title }}</p>
                  <template v-if="!item.value" />
                  <template v-else>
                    <svg
                      width="100"
                      height="20"
                    >
                      <line
                        x1="0"
                        y1="0"
                        x2="100"
                        y2="0"
                        stroke-dasharray="none"
                        :stroke="mindMapThemeConfig.associativeLineActiveWidth === item.value ? '#409eff' : isDark ? '#fff' : '#000'"
                        :stroke-width="item.value"
                      />
                    </svg>
                  </template>
                </VListItemTitle>
              </template>
            </FormSelect>
          </VCol>
        </VRow>
      </VSheet>
      <VDivider />
      <VSheet class="my-4">
        <div class="text-body-1 mb-3">
          关联线文字
        </div>
        <VRow>
          <VCol>
            <FormSelect
              label="字体"
              :model-value="mindMapThemeConfig.associativeLineTextFontFamily"
              :items="fontFamilyItems"
              @update:model-value="value => {
          onUpdateTheme('associativeLineTextFontFamily', value)
        }"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <VLabel class="text-subtitle-2 mb-1">
              颜色
            </VLabel>
            <ColorPicker
              :color="mindMapThemeConfig.associativeLineTextColor"
              :items="usedColorItems"
              @update:color="(value: string) => {
          onUpdateTheme('associativeLineTextColor', value)
        }"
            >
              <template #activator="args">
                <VBtn
                  v-bind="args.props"
                  class="d-block"
                  :color="mindMapThemeConfig.associativeLineTextColor"
                  elevation="4"
                  block
                />
              </template>
            </ColorPicker>
          </VCol>
          <VCol>
            <FormSelect
              label="字号"
              :model-value="mindMapThemeConfig.associativeLineTextFontSize"
              :items="(fontSizeItems as any)"
              @update:model-value="value => {
          onUpdateTheme('associativeLineTextFontSize', value)
        }"
            />
          </VCol>
        </VRow>
      </VSheet>
      <VDivider />
      <VSheet class="my-4">
        <div class="text-body-1 mb-3">
          节点边框风格
        </div>
        <VRow>
          <VCol>
            <VCheckbox
              :model-value="mindMapThemeConfig.nodeUseLineStyle"
              label="是否使用只有底边框的风格"
              density="compact"
              hide-details
              @update:model-value="(value) => {
          onUpdateTheme('nodeUseLineStyle', value)
        }"
            />
          </VCol>
        </VRow>
      </VSheet>
      <VDivider />

      <VSheet class="my-4">
        <div class="text-body-1 mb-3">
          节点内边距
        </div>
        <VRow>
          <VCol cols="12">
            <VSlider
              :model-value="mindMapThemeConfig.paddingX"
              :max="100"
              :min="0"
              :step="1"
              thumb-label
              hide-details
              @update:model-value="(value) => {
          onUpdateTheme('paddingX', value)
        }"
            >
              <template #prepend>
                <span class="text-subtitle-2">水平</span>
              </template>
            </VSlider>
            <VSlider
              :model-value="mindMapThemeConfig.paddingY"
              :max="100"
              :min="0"
              :step="1"
              thumb-label
              hide-details
              @update:model-value="(value) => {
          onUpdateTheme('paddingY', value)
        }"
            >
              <template #prepend>
                <span class="text-subtitle-2">垂直</span>
              </template>
            </VSlider>
          </VCol>
        </VRow>
      </VSheet>
      <VDivider />
      <VSheet class="my-4">
        <div class="text-body-1 mb-3">
          图片
        </div>
        <VRow>
          <VCol cols="12">
            <VSlider
              :model-value="mindMapThemeConfig.imageMaxWidth"
              :max="100"
              :min="0"
              :step="1"
              thumb-label
              hide-details
              @update:model-value="(value) => {
          onUpdateTheme('imageMaxWidth', value)
        }"
            >
              <template #prepend>
                <span class="text-subtitle-2">显示的最大宽度</span>
              </template>
            </VSlider>
            <VSlider
              :model-value="mindMapThemeConfig.imageMaxHeight"
              :max="100"
              :min="0"
              :step="1"
              thumb-label
              hide-details
              @update:model-value="(value) => {
          onUpdateTheme('imageMaxHeight', value)
        }"
            >
              <template #prepend>
                <span class="text-subtitle-2">显示的最大高度</span>
              </template>
            </VSlider>
          </VCol>
        </VRow>
      </VSheet>
      <VDivider />
      <VSheet class="my-4">
        <div class="text-body-1 mb-3">
          图标
        </div>
        <VRow>
          <VCol cols="12">
            <VSlider
              :model-value="mindMapThemeConfig.iconSize"
              :max="50"
              :min="12"
              :step="1"
              thumb-label
              hide-details
              @update:model-value="(value: number) => {
          onUpdateTheme('iconSize', value)
        }"
            >
              <template #prepend>
                <span class="text-subtitle-2">大小</span>
              </template>
            </VSlider>
          </VCol>
        </VRow>
      </VSheet>
      <VDivider />

      <VSheet class="my-4">
        <div class="text-body-1 mb-3">
          节点外边距
        </div>
        <VRow>
          <VCol>
            <VTabs
              v-model="marginTab"
              density="compact"
              mandatory="force"
            >
              <VTab
                v-for="tab in marginTabItems"
                :key="tab.id"
                :text="tab.name"
                :value="tab.value"
                size="small"
              />
            </VTabs>
            <VWindow
              v-model="marginTab"
              mandatory="force"
              class="pt-8"
            >
              <VWindowItem value="second">
                <VSlider
                  :model-value="mindMapThemeConfig.second.marginX"
                  :max="100"
                  :min="0"
                  :step="1"
                  thumb-label
                  hide-details
                  @update:model-value="(value) => {
          onUpdateMargin('marginX', value)
        }"
                >
                  <template #prepend>
                    <span class="text-subtitle-2">水平</span>
                  </template>
                </VSlider>
                <VSlider
                  :model-value="mindMapThemeConfig.second.marginY"
                  :max="100"
                  :min="0"
                  :step="1"
                  thumb-label
                  hide-details
                  @update:model-value="(value) => {
          onUpdateMargin('marginY', value)
        }"
                >
                  <template #prepend>
                    <span class="text-subtitle-2">垂直</span>
                  </template>
                </VSlider>
              </VWindowItem>
              <VWindowItem value="node">
                <VSlider
                  v-model="mindMapThemeConfig.node.marginX"
                  :max="100"
                  :min="0"
                  :step="1"
                  thumb-label
                  hide-details
                  @update:model-value="(value) => {
          onUpdateMargin('marginX', value)
        }"
                >
                  <template #prepend>
                    <span class="text-subtitle-2">水平</span>
                  </template>
                </VSlider>
                <VSlider
                  v-model="mindMapThemeConfig.node.marginY"
                  :max="100"
                  :min="0"
                  :step="1"
                  thumb-label
                  hide-details
                  @update:model-value="(value) => {
          onUpdateMargin('marginY', value)
        }"
                >
                  <template #prepend>
                    <span class="text-subtitle-2">垂直</span>
                  </template>
                </VSlider>
              </VWindowItem>
            </VWindow>
          </VCol>
        </VRow>
      </VSheet>

      <VDivider />

      <VSheet class="my-4">
        <div class="text-body-1 mb-3">
          水印
        </div>
        <VRow>
          <VCol>
            <VCheckbox
              v-model="isShowWaterMarker"
              label="是否显示水印 (WIP)"
              density="compact"
              disabled
              hide-details
            />
          </VCol>
        </VRow>
        <VSlideYTransition>
          <div v-if="isShowWaterMarker">
            <VRow>
              <VCol>
                <VCheckbox
                  v-model="mindMapWaterConfig.onlyExport"
                  label="是否仅在导出时显示"
                  density="compact"
                  hide-details
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VLabel text="水印文字" />
                <VTextField
                  v-model="mindMapWaterConfig.text"
                  density="compact"
                  hide-details
                  :variant="isDark ? 'outlined' : 'solo'"
                />
              </VCol>
            </VRow>
            <VRow class="mb-4">
              <VCol>
                <VLabel
                  text="文字颜色"
                  class="text-subtitle-2 mb-1"
                />
                <ColorPicker
                  v-model:color="mindMapWaterConfig.textStyle.color"
                  :items="usedColorItems"
                >
                  <template #activator="{ props }">
                    <VBtn
                      v-bind="props"
                      :color="mindMapWaterConfig.textStyle.color"
                      class="d-block"
                      size="large"
                    />
                  </template>
                </ColorPicker>
              </VCol>
            </VRow>
            <VRow no-gutters>
              <VCol>
                <VSlider
                  :model-value="mindMapWaterConfig.textStyle.opacity"
                  :max="1"
                  :min="0"
                  :step="0.1"
                  thumb-label
                  hide-details
                >
                  <template #prepend>
                    <span class="text-subtitle-2">文字透明度</span>
                  </template>
                </VSlider>
              </VCol>
            </VRow>
            <VRow no-gutters>
              <VCol>
                <VSlider
                  v-model="mindMapWaterConfig.textStyle.fontSize"
                  :max="100"
                  :min="1"
                  :step="1"
                  thumb-label
                  hide-details
                >
                  <template #prepend>
                    <span class="text-subtitle-2">文字字号</span>
                  </template>
                </VSlider>
              </VCol>
            </VRow>
            <VRow no-gutters>
              <VCol>
                <VSlider
                  v-model="mindMapWaterConfig.angle"
                  :max="90"
                  :min="0"
                  :step="10"
                  thumb-label
                  hide-details
                >
                  <template #prepend>
                    <span class="text-subtitle-2">旋转角度</span>
                  </template>
                </VSlider>
              </VCol>
            </VRow>
            <VRow no-gutters>
              <VCol>
                <VSlider
                  v-model="mindMapWaterConfig.lineSpacing"
                  :max="200"
                  :min="0"
                  :step="1"
                  thumb-label
                  hide-details
                >
                  <template #prepend>
                    <span class="text-subtitle-2">水印行间距</span>
                  </template>
                </VSlider>
              </VCol>
            </VRow>
            <VRow no-gutters>
              <VCol>
                <VSlider
                  v-model="mindMapWaterConfig.textSpacing"
                  :max="200"
                  :min="0"
                  :step="1"
                  thumb-label
                  hide-details
                >
                  <template #prepend>
                    <span class="text-subtitle-2">水印文字间距</span>
                  </template>
                </VSlider>
              </VCol>
            </VRow>
          </div>
        </VSlideYTransition>
      </VSheet>
      <VDivider />
      <VSheet class="my-4">
        <div class="text-body-1 mb-3">
          其他配置
        </div>
        <VRow align="center">
          <VCol>
            <VCheckbox
              v-model="mindMapConfig.enableFreeDrag"
              label="是否开启节点自由拖拽"
              density="compact"
              disabled
              hide-details
            />
            <VCheckbox
              v-model="mindMapConfig.enableNodeRichText!"
              label="是否开启节点富文本编辑"
              density="compact"
              disabled
              hide-details
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <FormSelect
              :model-value="mindMapConfig.mousewheelAction!"
              :items="mouseBehaviorItems"
              label="鼠标滚动行为"
              @update:model-value="(value: 'zoom' | 'move') => onUpdateConfig('mousewheelAction', value)"
            />
          </VCol>
        </VRow>
        <VExpandTransition>
          <VRow v-if="mindMapConfig.mousewheelAction === 'zoom'">
            <VCol>
              <FormSelect
                :model-value="mindMapConfig.mousewheelZoomActionReverse!"
                :items="mouseScrollScaleItems"
                label="鼠标滚轮缩放"
                @update:model-value="(value: boolean) => onUpdateConfig('mousewheelZoomActionReverse', value)"
              />
            </VCol>
          </VRow>
        </VExpandTransition>
        <VRow>
          <VCol>
            <FormSelect
              :model-value="mindMapConfig.createNewNodeBehavior!"
              label="创建新节点的行为"
              :items="createNodeBehaviorItems"
              @update:model-value="(value: CreateNewNodeBehavior) => onUpdateConfig('createNewNodeBehavior', value)"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <VCheckbox
              label="是否显示滚动条"
              density="compact"
              disabled
              hide-details
            />
            <VCheckbox
              label="是否开启手绘风格 (WIP)"
              disabled
              density="compact"
              hide-details
            />
          </VCol>
        </VRow>
      </VSheet>
    </template>
  </PanelContainer>
</template>
