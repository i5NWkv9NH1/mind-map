<script
  setup
  lang="ts"
>
import { mdiCloseCircle } from '@mdi/js'
import { storeToRefs } from 'pinia'
import { v4 as uuid } from 'uuid'
import { ref } from 'vue'
import { useSettingsStore } from '@/store/settings'
import { usePresets } from '@/composables'
import { ColorPicker, DragUpload, PanelContainer } from '@/components'

// # background
const { isDark } = storeToRefs(useSettingsStore())
const { togglePanel } = useSettingsStore()
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
const backgroundTabItems = ref([
  { id: uuid(), name: '颜色', value: 0 },
  { id: uuid(), name: '图片', value: 1 },
])
const backgroundTab = ref(0)
const paddingTabItems = ref([
  { id: uuid(), name: '二级节点', value: 0 },
  { id: uuid(), name: '三级以下节点', value: 1 },
])
// # background
const backgroundColor = ref('#fafafa')
const backgroundImage = ref('')
const backgroundPosition = ref('0% 0%')
const backgroundRepeat = ref('no-repeat')
const backgroundSize = ref('auto')
function onBackgroundColorConfirm() { }
// # lines
const lineColor = ref('#fafafa')
const lineWidth = ref(2)
const lineStyle = ref('none')
const isShowArrow = ref(false)
// # summary
const summaryLineColor = ref('#fafafa')
const summaryLineWidth = ref(2)
// # 关联线
const relateLineColor = ref('#fafafa')
const relateLineWidth = ref(2)
const relateLineActiveColor = ref('#fafafa')
const relateLineActiveWidth = ref(8)
// # 关联线文字
const relateLineFontFamily = ref('微软雅黑, Microsoft YaHei')
const relateLineFontColor = ref('#fafafa')
const relateLineFontSize = ref(14)
// # 节点边框
const useBottomBorderNodeStyle = ref(false)
// # 节点内边距
const paddingHor = ref(15)
const paddingVer = ref(0)
// # 图片
const imageMaxWidth = ref(100)
const imageMaxHeight = ref(100)
// # 图标
const iconSize = ref(12)
// # 节点外边距
const currentPadding = ref(0)
const twoLevelNodePaddingHor = ref(100)
const twoLevelNodePaddingVer = ref(40)
const childNodePaddingHor = ref(50)
const childNodePaddingVer = ref(0)
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
        @click="togglePanel(null)"
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
                  v-model:color="backgroundColor"
                  :items="usedColorItems"
                  @confirm="onBackgroundColorConfirm"
                >
                  <template #activator="activator">
                    <div class="pa-2">
                      <VBtn
                        v-bind="activator.props"
                        :color="backgroundColor"
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
                    v-model:src="backgroundImage"
                    name=""
                  />
                  <VRow>
                    <VCol>
                      <VSelect
                        v-model="backgroundPosition"
                        label="图片位置"
                        :items="backgroundPositionItems"
                        item-title="name"
                        item-value="value"
                        :variant="isDark ? 'outlined' : 'solo'"
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
                              :active="backgroundPosition === item.value"
                            />
                          </VList>
                        </template>
                      </VSelect>
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol>
                      <VSelect
                        v-model="backgroundRepeat"
                        label="图片重复"
                        :items="backgroundRepeatItems"
                        item-title="name"
                        item-value="value"
                        :variant="isDark ? 'outlined' : 'solo'"
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
                              :active="backgroundRepeat === item.value"
                            />
                          </VList>
                        </template>
                      </VSelect>
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol>
                      <VSelect
                        v-model="backgroundSize"
                        label="图片大小"
                        :items="backgroundSizeItems"
                        item-title="name"
                        item-value="value"
                        :variant="isDark ? 'outlined' : 'solo'"
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
                              :active="backgroundSize === item.value"
                            />
                          </VList>
                        </template>
                      </VSelect>
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
              v-model:color="lineColor"
              location="left center"
            >
              <template #activator="activator">
                <VBtn
                  v-bind="activator.props"
                  class="d-block"
                  :color="lineColor"
                  elevation="4"
                  block
                />
              </template>
            </ColorPicker>
          </VCol>
          <VCol>
            <VLabel class="text-subtitle-2 mb-1">
              粗细
            </VLabel>
            <VSelect
              v-model="lineWidth"
              :items="lineWidthSizeItems"
              item-title="name"
              item-value="value"
              density="compact"
              :variant="isDark ? 'outlined' : 'solo'"
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
                    :active="lineWidth === item.value"
                  >
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
                          :stroke="lineWidth === item.value ? '#409eff' : isDark ? '#fff' : '#000'"
                          :stroke-width="item.value"
                        />
                      </svg>
                    </template>
                  </vlistitem>
                </VList>
              </template>
            </VSelect>
          </VCol>
        </VRow>
        <VRow align="center">
          <VCol cols="6">
            <VLabel class="text-subtitle-2 mb-1">
              风格
            </VLabel>
            <VSelect
              v-model="lineStyle"
              :items="lineStyleItems"
              item-title="name"
              item-value="value"
              density="compact"
              :variant="isDark ? 'outlined' : 'solo'"
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
                    :active="lineStyle === item.value"
                  >
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
                        :stroke="lineStyle === item.value ? '#409eff' : isDark ? '#fff' : '#000'"
                        :stroke-dasharray="item.value"
                      />
                    </svg>
                  </VListItem>
                </VList>
              </template>
            </VSelect>
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <VCheckbox
              v-model="isShowArrow"
              label="是否显示箭头"
              density="compact"
              hide-details
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
            <ColorPicker v-model:color="summaryLineColor">
              <template #activator="activator">
                <VBtn
                  v-bind="activator.props"
                  class="d-block"
                  :color="summaryLineColor"
                  elevation="4"
                  block
                />
              </template>
            </ColorPicker>
          </VCol>
          <VCol>
            <VLabel class="text-subtitle-2 mb-1">
              粗细
            </VLabel>
            <VSelect
              v-model="summaryLineWidth"
              :items="lineWidthSizeItems"
              item-title="name"
              item-value="value"
              density="compact"
              :variant="isDark ? 'outlined' : 'solo'"
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
                    :active="summaryLineWidth === item.value"
                  >
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
                          :stroke="summaryLineWidth === item.value ? '#409eff' : isDark ? '#fff' : '#000'"
                          :stroke-width="item.value"
                        />
                      </svg>
                    </template>
                  </VListItem>
                </VList>
              </template>
            </VSelect>
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
            <ColorPicker v-model:color="relateLineColor">
              <template #activator="args">
                <VBtn
                  v-bind="args.props"
                  class="d-block"
                  :color="relateLineColor"
                  elevation="4"
                  block
                />
              </template>
            </ColorPicker>
          </VCol>
          <VCol>
            <VLabel class="text-subtitle-2 mb-1">
              粗细
            </VLabel>
            <VSelect
              v-model="relateLineWidth"
              :items="lineWidthSizeItems"
              item-title="name"
              item-value="value"
              density="compact"
              :variant="isDark ? 'outlined' : 'solo'"
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
                    :active="relateLineWidth === item.value"
                  >
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
                          :stroke="relateLineWidth === item.value ? '#409eff' : isDark ? '#fff' : '#000'"
                          :stroke-width="item.value"
                        />
                      </svg>
                    </template>
                  </VListItem>
                </VList>
              </template>
            </VSelect>
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <VLabel class="text-subtitle-2 mb-1">
              激活颜色
            </VLabel>
            <ColorPicker v-model:color="relateLineActiveColor">
              <template #activator="args">
                <VBtn
                  v-bind="args.props"
                  class="d-block"
                  :color="relateLineActiveColor"
                  elevation="4"
                  block
                />
              </template>
            </ColorPicker>
          </VCol>
          <VCol>
            <VLabel class="text-subtitle-2 mb-1">
              粗细
            </VLabel>
            <VSelect
              v-model="relateLineActiveWidth"
              :items="lineWidthSizeItems"
              item-title="name"
              item-value="value"
              density="compact"
              :variant="isDark ? 'outlined' : 'solo'"
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
                    :active="relateLineActiveWidth === item.value"
                  >
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
                          :stroke="relateLineActiveWidth === item.value ? '#409eff' : isDark ? '#fff' : '#000'"
                          :stroke-width="item.value"
                        />
                      </svg>
                    </template>
                  </VListItem>
                </VList>
              </template>
            </VSelect>
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
            <VLabel class="text-subtitle-2 mb-1">
              字体
            </VLabel>
            <VSelect
              v-model="relateLineFontFamily"
              :items="fontFamilyItems"
              item-title="name"
              item-value="value"
              density="compact"
              :variant="isDark ? 'outlined' : 'solo'"
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
                    :active="relateLineFontFamily === item.value"
                  />
                </VList>
              </template>
            </VSelect>
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <VLabel class="text-subtitle-2 mb-1">
              颜色
            </VLabel>
            <ColorPicker v-model:color="relateLineFontColor">
              <template #activator="args">
                <VBtn
                  v-bind="args.props"
                  class="d-block"
                  :color="relateLineFontColor"
                  elevation="4"
                  block
                />
              </template>
            </ColorPicker>
          </VCol>
          <VCol>
            <VLabel class="text-subtitle-2 mb-1">
              字号
            </VLabel>
            <VSelect
              v-model="relateLineFontSize"
              :items="fontSizeItems"
              item-title="name"
              item-value="value"
              density="compact"
              :variant="isDark ? 'outlined' : 'solo'"
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
                    :active="fontSizeItems === item.value"
                  />
                </VList>
              </template>
            </VSelect>
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
              v-model="useBottomBorderNodeStyle"
              label="是否使用只有底边框的风格"
              density="compact"
              hide-details
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
              v-model="paddingHor"
              :max="100"
              :min="0"
              :step="1"
              thumb-label
              hide-details
            >
              <template #prepend>
                <span>水平</span>
              </template>
            </VSlider>
            <VSlider
              v-model="paddingVer"
              :max="100"
              :min="0"
              :step="1"
              thumb-label
              hide-details
            >
              <template #prepend>
                <span>水平</span>
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
              v-model="imageMaxWidth"
              :max="100"
              :min="0"
              :step="1"
              thumb-label
              hide-details
            >
              <template #prepend>
                <span>水平</span>
              </template>
            </VSlider>
            <VSlider
              v-model="imageMaxHeight"
              :max="100"
              :min="0"
              :step="1"
              thumb-label
              hide-details
            >
              <template #prepend>
                <span>水平</span>
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
              v-model="iconSize"
              :max="50"
              :min="12"
              :step="1"
              thumb-label
              hide-details
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
              v-model="currentPadding"
              density="compact"
            >
              <VTab
                v-for="tab in paddingTabItems"
                :key="tab.id"
                :text="tab.name"
                :value="tab.value"
                size="small"
              />
            </VTabs>
            <VWindow
              v-model="currentPadding"
              class="mt-4"
            >
              <VWindowItem :value="0">
                <VSlider
                  v-model="twoLevelNodePaddingHor"
                  :max="100"
                  :min="0"
                  :step="1"
                  thumb-label
                  hide-details
                >
                  <template #prepend>
                    <span>水平</span>
                  </template>
                </VSlider>
                <VSlider
                  v-model="twoLevelNodePaddingVer"
                  :max="100"
                  :min="0"
                  :step="1"
                  thumb-label
                  hide-details
                >
                  <template #prepend>
                    <span>水平</span>
                  </template>
                </VSlider>
              </VWindowItem>
              <VWindowItem :value="1">
                <VSlider
                  v-model="childNodePaddingHor"
                  :max="100"
                  :min="0"
                  :step="1"
                  thumb-label
                  hide-details
                >
                  <template #prepend>
                    <span>水平</span>
                  </template>
                </VSlider>
                <VSlider
                  v-model="childNodePaddingVer"
                  :max="100"
                  :min="0"
                  :step="1"
                  thumb-label
                  hide-details
                >
                  <template #prepend>
                    <span>水平</span>
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
