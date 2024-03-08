<script
  setup
  lang="ts"
>
import { mdiCloseCircle } from '@mdi/js'
import { storeToRefs } from 'pinia'
import { v4 as uuid } from 'uuid'
import { ref, watch } from 'vue'
import { useSettingsStore } from '@/store/settings'
import { useMindMap, usePresets } from '@/composables'
import { ColorPicker, DragUpload, FormSelect, PanelContainer } from '@/components'
import { useAppStore } from '@/store/app'

// # background
const { isDark } = storeToRefs(useSettingsStore())
const { mindMapThemeConfig, mindMapTheme } = storeToRefs(useAppStore())
const { togglePanel } = useSettingsStore()
const { mindMap, activeNodes } = useMindMap()

// # 数据
const {
  usedColorItems,
  fontFamilyItems,
  fontSizeItems,
  lineStyleItems,
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
watch(marginTab, () => {
  marginTabItems.value.forEach((item) => {
    const key = item.value
    mindMapThemeConfig.value[key].marginX = mindMap.value?.getThemeConfig()[marginTab.value].marginX
    mindMapThemeConfig.value[key].marginY = mindMap.value?.getThemeConfig()[marginTab.value].marginY
  })
  // Object.keys(marginTabItems.value).forEach((key: string) => {
  //   mindMapThemeConfig.value[key] = mindMap.value?.getThemeConfig()[marginTab.value][key]
  // })
})

function onUpdate(key: string, value: string) {
  console.log('BaseStyles', 'key: ', key, 'value', value)
  mindMapThemeConfig.value[key] = value
  mindMap.value?.setThemeConfig(mindMapThemeConfig.value)
}
function onUpdateMargin(key: string, value: string) {
  mindMapThemeConfig.value[marginTab.value][key] = value
  mindMap.value?.setThemeConfig(mindMapThemeConfig.value)
}

// ! 不要监听整个主题样式，只修改某个值
// ! 避免切换主题的时候把整个原来的主题配置（无UI）一直给替换掉
// watch(mindMapThemeConfig, () => {
//   mindMap.value?.setThemeConfig(mindMapThemeConfig.value)
// }, { deep: true })

// # 水印
const isShowWaterMarker = ref(false)
// # 其他配置
const isUseFreeDragOnNode = ref(false)
const isUseRichTextonNode = ref(false)
const mouseBehavior = ref<'zoom' | 'move'>('zoom')
const mouseScrollScale = ref(false)
const createNodeBehavior = ref<'default' | 'notActive' | 'activeOnly'>('default')
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
                  @update:color="(value) => {
                    onUpdate('backgroundColor', value)
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
                      onUpdate('backgroundImage', value)
                    }"
                  />
                  <VRow>
                    <VCol>
                      <FormSelect
                        :model-value="mindMapThemeConfig.backgroundPosition"
                        :items="backgroundPositionItems"
                        label="图片位置"
                        @update:model-value="(value) => {
                          onUpdate('backgroundPosition', value)
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
                          onUpdate('backgroundRepeat', value)
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
                          onUpdate('backgroundSize', value)
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
              @update:color="(value) => {
                onUpdate('lineColor', value)
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
                onUpdate('lineWidth', value)
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
                onUpdate('lineStyle', value)
              }"
            >
              <template #default="{ item }">
                <VListItemTitle>
                  <p>{{ item.title }}</p>
                  <svg
                    width="100"
                    height="20"
                  >
                    <line
                      x1="10"
                      y1="17"
                      x2="110"
                      y2="17"
                      stroke-width="2"
                      :stroke="mindMapThemeConfig.lineStyle === item.value ? '#409eff' : isDark ? '#fff' : '#000'"
                      :stroke-dasharray="item.value"
                    />
                  </svg>
                </VListItemTitle>
              </template>
            </FormSelect>
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
                onUpdate('showLineMarker', value)
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
              :color="mindMapThemeConfig.generalizationLineColor" :items="usedColorItems"
              @update:color="(value) => {
                onUpdate('generalizationLineColor', value)
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
              :model-value="mindMapThemeConfig.generalizationLineWidth"
              label="粗细"
              @update:model-value="(value) => { onUpdate('generalizationLineWidth', value) }"
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
                        :stroke="mindMapThemeConfig.summaryLineWidth === item.value ? '#409eff' : isDark ? '#fff' : '#000'"
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
              @update:color="(value) => { onUpdate('associativeLineColor', value) }"
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
                onUpdate('associativeLineWidth', value)
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
              @update:color="(value) => {
                onUpdate('associativeLineActiveColor', value)
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
              label="粗细" :model-value="mindMapThemeConfig.associativeLineActiveWidth"
              :items="lineWidthSizeItems"
              @update:model-value="(value) => {
                onUpdate('associativeLineActiveWidth', value)
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
                onUpdate('associativeLineTextFontFamily', value)
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
              @update:color="(value) => {
                onUpdate('associativeLineTextColor', value)
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
              :items="fontSizeItems"
              @update:model-value="value => {
                onUpdate('associativeLineTextFontSize', value)
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
                onUpdate('nodeUseLineStyle', value)
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
                onUpdate('paddingX', value)
              }"
            >
              <template #prepend>
                <span>水平</span>
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
                onUpdate('paddingY', value)
              }"
            >
              <template #prepend>
                <span>垂直</span>
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
                onUpdate('imageMaxWidth', value)
              }"
            >
              <template #prepend>
                <span>显示的最大宽度</span>
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
                onUpdate('imageMaxHeight', value)
              }"
            >
              <template #prepend>
                <span>显示的最大高度</span>
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
              @update:model-value="(value) => {
                onUpdate('iconSize', value)
              }"
            >
              <template #prepend>
                <span>大小</span>
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
                    <span>水平</span>
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
                    <span>垂直</span>
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
                    <span>水平</span>
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
                    <span>垂直</span>
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
              label="是否显示水印"
              density="compact"
              hide-details
            />
          </VCol>
        </VRow>
      </VSheet>
      <VDivider />
      <VSheet class="my-4">
        <div class="text-body-1 mb-3">
          其他配置
        </div>
        <VRow align="center">
          <VCol>
            <VCheckbox
              v-model="isUseFreeDragOnNode"
              label="是否开启节点自由拖拽"
              density="compact"
              hide-details
            />
            <VCheckbox
              v-model="isUseRichTextonNode"
              label="是否开启节点富文本编辑"
              density="compact"
              hide-details
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <VLabel class="text-subtitle-2 mb-1">
              鼠标滚动行为
            </VLabel>
            <VSelect
              v-model="mouseBehavior"
              :items="mouseBehaviorItems"
              :variant="isDark ? 'outlined' : 'solo'"
              item-title="name"
              density="compact"
              hide-details
            >
              <template #item="{ item, props }">
                <VList
                  density="compact"
                  nav
                >
                  <VListItem
                    v-bind="props"
                    :value="item.value"
                    :title="item.title"
                    :active="mouseBehavior === item.value"
                  />
                </VList>
              </template>
            </VSelect>
          </VCol>
        </VRow>
        <VExpandTransition>
          <VRow v-if="mouseBehavior === 'zoom'">
            <VCol>
              <VLabel class="text-subtitle-2 mb-1">
                鼠标滚轮缩放
              </VLabel>
              <VSelect
                v-model="mouseScrollScale"
                :items="mouseScrollScaleItems"
                :variant="isDark ? 'outlined' : 'solo'"
                item-title="name"
                density="compact"
                hide-details
              >
                <template #item="{ item, props }">
                  <VList
                    density="compact"
                    nav
                  >
                    <VListItem
                      v-bind="props"
                      :value="item.value"
                      :title="item.title"
                      :active="mouseScrollScale === item.value"
                    />
                  </VList>
                </template>
              </VSelect>
            </VCol>
          </VRow>
        </VExpandTransition>
        <VRow>
          <VCol>
            <VLabel class="text-subtitle-2 mb-1">
              创建新节点的行为
            </VLabel>
            <VSelect
              v-model="createNodeBehavior"
              :items="createNodeBehaviorItems"
              :variant="isDark ? 'outlined' : 'solo'"
              item-title="name"
              density="compact"
              hide-details
            >
              <template #item="{ item, props }">
                <VList
                  density="compact"
                  nav
                >
                  <VListItem
                    v-bind="props"
                    :value="item.value"
                    :title="item.title"
                    :active="createNodeBehavior === item.value"
                  />
                </VList>
              </template>
            </VSelect>
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <VCheckbox
              label="是否显示滚动条"
              density="compact"
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
