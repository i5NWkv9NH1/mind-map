<script
  setup
  lang="ts"
>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { ColorPicker, MenuSelect, PanelContainer } from '@/components'
import { Empty } from '@/widgets'
import { usePresets } from '@/composables'
import { useSettingsStore } from '@/store/settings'
import { mdiCloseCircle, mdiFormatBold, mdiFormatColorText, mdiFormatItalic, mdiFormatUnderline, mdiVectorLine } from '@mdi/js'

const isActiveNode = ref(false)
const togglePanel = () => { }
const { isDark } = storeToRefs(useSettingsStore())
const {
  usedColorItems,
  textUnderlineStyleItems,
  fontFamilyItems,
  fontSizeItems,
  fontLineHeightItems,
  borderStyleItems,
  shapeItems,
  shapeMapItems,
  lineStyleItems,
  lineArrowPositionItems,
  lineWidthSizeItems,
  radiusSizeItems,
} = usePresets()
// # font
const fontFamily = ref('微软雅黑, Microsoft YaHei')
const fontSize = ref(14)
const fontLineHeight = ref(1.5)
const fontColor = ref('#549688')
const isFontBold = ref(false)
const isFontItalic = ref(false)
const textUnderlineStyle = ref(0)
// # border
const borderColor = ref('#1e3556')
const borderStyle = ref('none')
const borderWidth = ref(2)
const borderRadius = ref(10)
// # background
const backgroundColor = ref('#a9dada')
const isGradient = ref(false)
const gradientStart = ref('#fcc400')
const gradientEnd = ref('#68ccca')
// # shape
const shape = ref('rectangle')
// # line
const lineColor = ref('#384c69')
const lineStyle = ref('none')
const lineWidth = ref(2)
const lineArrowPosition = ref('start')
// # padding
const paddingHor = ref(15)
const paddingVer = ref(0)

// # actions
function onFontColorConfirm() {
}
</script>

<template>
  <PanelContainer>
    <template #title>
      <p>节点样式</p>
      <VBtn
        color="surface"
        variant="flat"
        icon
        @click="togglePanel"
      >
        <VIcon>{{ mdiCloseCircle }}</VIcon>
      </VBtn>
    </template>

    <template #content>
      <VFabTransition group>
        <template v-if="isActiveNode">
          <VSheet class="my-4">
            <div class="text-body-1 mb-3">
              文字
            </div>
            <VRow>
              <VCol>
                <VLabel class="text-subtitle-2 mb-1">
                  字体
                </VLabel>
                <VSelect
                  v-model="fontFamily"
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
                        :active="fontFamily === item.value"
                      />
                    </VList>
                  </template>
                </VSelect>
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VLabel class="text-subtitle-2 mb-1">
                  字号
                </VLabel>
                <VSelect
                  v-model="fontSize"
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
                        :active="fontSize === item.value"
                      />
                    </VList>
                  </template>
                </VSelect>
              </VCol>
              <VCol>
                <VLabel class="text-subtitle-2 mb-1">
                  行高
                </VLabel>
                <VSelect
                  v-model="fontLineHeight"
                  :items="fontLineHeightItems"
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
                        :active="fontLineHeight === item.value"
                      />
                    </VList>
                  </template>
                </VSelect>
              </VCol>
            </VRow>
            <VRow align="center">
              <VCol>
                <ColorPicker
                  v-model:color="fontColor"
                  :items="usedColorItems"
                  @confirm="onFontColorConfirm"
                >

                  <template #activator="activator">
                    <VBtn
                      v-bind="activator.props"
                      :color="fontColor"
                      rounded="lg"
                      size="small"
                      icon
                    >
                      <VIcon>{{ mdiFormatColorText }}</VIcon>
                    </VBtn>
                  </template>
                </ColorPicker>
              </VCol>
              <VCol>
                <VTooltip
                  transition="slide-y-transition"
                  offset="10"
                  open-delay="100"
                  location="top"
                >

                  <template #activator="{ props }">
                    <VBtn
                      v-bind="props"
                      :active="isFontBold"
                      :color="isFontBold ? 'primary' : 'default'"
                      :variant="isDark ? 'outlined' : 'elevated'"
                      rounded="lg"
                      size="small"
                      icon
                      @click="isFontBold = !isFontBold"
                    >
                      <VIcon>{{ mdiFormatBold }}</VIcon>
                    </VBtn>
                  </template>
                  <p>加粗</p>
                </VTooltip>
              </VCol>
              <VCol>
                <VTooltip
                  transition="slide-y-transition"
                  offset="10"
                  open-delay="100"
                  location="top"
                >

                  <template #activator="{ props }">
                    <VBtn
                      v-bind="props"
                      :active="isFontItalic"
                      :color="isFontItalic ? 'primary' : 'default'"
                      :variant="isDark ? 'outlined' : 'elevated'"
                      rounded="lg"
                      size="small"
                      icon
                      @click="isFontItalic = !isFontItalic"
                    >
                      <VIcon>{{ mdiFormatItalic }}</VIcon>
                    </VBtn>
                  </template>
                  <p>斜体</p>
                </VTooltip>
              </VCol>
              <VCol>
                <MenuSelect
                  v-model="textUnderlineStyle"
                  :items="textUnderlineStyleItems"
                  :close-on-content-click="true"
                >

                  <template #activator="activator">
                    <VBtn
                      v-bind="activator.props"
                      :active="activator.isActive || textUnderlineStyle !== 0"
                      :color="textUnderlineStyle !== 0 ? 'primary' : 'default'"
                      :variant="isDark ? 'outlined' : 'elevated'"
                      rounded="lg"
                      size="small"
                      icon
                    >
                      <VIcon>{{mdiFormatUnderline}}</VIcon>
                    </VBtn>
                  </template>
                </MenuSelect>
              </VCol>
            </VRow>
          </VSheet>
          <VDivider />
          <VSheet class="my-4">
            <div class="text-body-1 mb-3">
              边框
            </div>
            <VRow align="center">
              <VCol>
                <VLabel class="text-subtitle-2 mb-1">
                  颜色
                </VLabel>
                <ColorPicker v-model:color="borderColor">

                  <template #activator="args">
                    <VBtn
                      v-bind="args.props"
                      class="d-block"
                      :color="borderColor"
                      elevation="4"
                      block
                    />
                  </template>
                </ColorPicker>
              </VCol>
              <VCol>
                <VLabel class="text-subtitle-2 mb-1">
                  样式
                </VLabel>
                <VSelect
                  v-model="borderStyle"
                  :items="borderStyleItems"
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
                        :active="borderStyle === item.value"
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
                            :stroke="borderStyle === item.value ? '#409eff' : isDark ? '#fff' : '#000'"
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
                <VLabel class="text-subtitle-2 mb-1">
                  宽度
                </VLabel>
                <VSelect
                  v-model="borderWidth"
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
                        :active="borderWidth === item.value"
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
                              :stroke="borderWidth === item.value ? '#409eff' : isDark ? '#fff' : '#000'"
                              :stroke-width="item.value"
                            />
                          </svg>
                        </template>
                      </VListItem>
                    </VList>
                  </template>
                </VSelect>
              </VCol>
              <VCol>
                <VLabel class="text-subtitle-2 mb-1">
                  圆角
                </VLabel>
                <VSelect
                  v-model="borderRadius"
                  :items="radiusSizeItems"
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
                        :active="borderRadius === item.value"
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
              背景
            </div>
            <VRow>
              <VCol cols="6">
                <ColorPicker v-model:color="backgroundColor">

                  <template #activator="activator">
                    <VBtn
                      v-bind="activator.props"
                      :color="backgroundColor"
                      block
                    />
                  </template>
                </ColorPicker>
              </VCol>
            </VRow>
            <VRow
              align="center"
              no-gutters
            >
              <VCol>
                <VCheckbox
                  v-model="isGradient"
                  label="渐变"
                  hide-details
                />
              </VCol>
              <VExpandTransition>
                <VCol v-if="isGradient">
                  <ColorPicker v-model:color="gradientStart">

                    <template #activator="activator">
                      <VBtn
                        v-bind="activator.props"
                        :color="gradientStart"
                        size="small"
                        class="mr-1"
                      />
                      <span>起始</span>
                    </template>
                  </ColorPicker>
                </VCol>
              </VExpandTransition>
              <VExpandTransition>
                <VCol v-if="isGradient">
                  <ColorPicker v-model:color="gradientEnd">

                    <template #activator="activator">
                      <VBtn
                        v-bind="activator.props"
                        :color="gradientEnd"
                        size="small"
                        class="mr-1"
                      />
                      <span>结束</span>
                    </template>
                  </ColorPicker>
                </VCol>
              </VExpandTransition>
            </VRow>
          </VSheet>
          <VDivider />
          <VSheet class="my-4">
            <div class="text-body-1 mb-3">
              形状
            </div>
            <VRow>
              <VCol cols="8">
                <VSelect
                  v-model="shape"
                  :items="shapeItems"
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
                        :active="shape === item.value"
                      >
                        <svg
                          width="100"
                          height="32"
                        >
                          <path
                            fill="none"
                            :d="shapeMapItems[item.value]"
                            :stroke="item.value === shape ? '#409eff' : isDark ? '#fff' : '#000'"
                            stroke-width="2"
                          />
                        </svg>
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
              线条
            </div>
            <VRow>
              <VCol>
                <VLabel class="text-subtitle-2 mb-1">
                  颜色
                </VLabel>
                <ColorPicker v-model:color="lineColor">

                  <template #activator="args">
                    <VBtn
                      v-bind="args.props"
                      :color="lineColor"
                      elevation="4"
                      block
                    />
                  </template>
                </ColorPicker>
              </VCol>
              <VCol>
                <VLabel class="text-subtitle-2 mb-1">
                  样式
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
                <VLabel class="text-subtitle-2 mb-1">
                  宽度
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
                      </VListItem>
                    </VList>
                  </template>
                </VSelect>
              </VCol>
              <VCol>
                <VLabel class="text-subtitle-2 mb-1">
                  箭头位置
                </VLabel>
                <VSelect
                  v-model="lineArrowPosition"
                  :items="lineArrowPositionItems"
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
                        :active="lineArrowPosition === item.value"
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
              </VCol>
              <VCol cols="12">
                <VSlider
                  v-model="paddingVer"
                  density="compact"
                  :max="100"
                  :min="0"
                  :step="1"
                  thumb-label
                  hide-details
                >

                  <template #prepend>
                    <span>垂直</span>
                  </template>
                </VSlider>
              </VCol>
            </VRow>
          </VSheet>
        </template>

        <template v-else>
          <Empty
            :size="128"
            :icon="mdiVectorLine"
            text="请选择一个节点"
          />
        </template>
      </VFabTransition>
    </template>
  </PanelContainer>
</template>
