<!-- TODO: 优化 -->
<script
  setup
  lang="ts"
>
import {
  mdiCloseCircle,
  mdiFormatBold,
  mdiFormatColorText,
  mdiFormatItalic,
  mdiFormatUnderline,
  mdiVectorLine,
} from '@mdi/js'
import { storeToRefs } from 'pinia'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { ColorPicker, FormSelect, MenuSelect, PanelContainer } from '@/components'
import { useMindMap, usePresets } from '@/composables'
import { useSettingsStore } from '@/store/settings'
import { Empty } from '@/widgets'
import type { MindMapNode } from '@/@types'

const { togglePanel } = useSettingsStore()
const { isDark } = storeToRefs(useSettingsStore())
const { mindMap } = useMindMap()
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
const styles = ref<Record<string, any>>({
  shape: '',
  borderColor: '',
  borderDasharray: '',
  borderRadius: '',
  borderWidth: '',
  color: '',
  endColor: '',
  fillColor: '',
  fontFamily: '',
  fontSize: '',
  fontStyle: '',
  fontWeight: '',
  gradientStyle: false,
  lineColor: '',
  lineDasharray: '',
  lineHeight: '',
  lineMarkerDir: '',
  lineWidth: '',
  paddingX: 0,
  paddingY: 0,
  startColor: '',
  textDecoration: '',
})

const _activeNodes = ref<MindMapNode[]>()
const _activeNode = ref<MindMapNode>()

// watchEffect(() => {
//   console.info('watch effect')
//   if (activeNodes.value && activeNodes.value.length !== 0) {
//     // eslint-disable-next-line
//     console.log('获取节点样式')
//     Object.keys(styles.value).forEach((key: string) => {
//       if (key.includes('olor')) {
//         const value = activeNodes.value![0].getStyle(key, false)
//         if (value === 'transparent')
//           styles.value[key] = 'rgba(0, 0, 0, 0)'
//         else
//           styles.value[key] = value
//         return
//       }
//       styles.value[key] = activeNodes.value![0].getStyle(key, false)
//     })
//   }
// })
function updateNodeStyles(key: string, value: any) {
  styles.value[key] = value
  console.log(`更新节点样式`, key, value)
  _activeNodes.value?.forEach((node) => {
    node.setStyle(key, styles.value[key])
  })
  console.log(`获取节点样式`, _activeNodes.value![0].getStyle(key))
}
// TODO: updated
function getNodeStyles(_node: MindMapNode, _nodes: MindMapNode[]) {
  if (_nodes.length <= 0)
    return
  _activeNode.value = _node
  _activeNodes.value = _nodes
  nextTick(() => {
    [
      'borderColor',
      'borderDasharray',
      'borderRadius',
      'borderWidth',
      'color',
      'endColor',
      'fillColor',
      'fontFamily',
      'fontSize',
      'fontStyle',
      'fontWeight',
      'gradientStyle',
      'lineColor',
      'lineDasharray',
      'lineHeight',
      'lineMarkerDir',
      'lineWidth',
      'paddingX',
      'paddingY',
      'shape',
      'startColor',
      'textDecoration',
    ].forEach((key: string) => {
      if (key.includes('olor')) {
        const value = _activeNodes.value![0].getStyle(key, false)
        if (value === 'transparent')
          styles.value[key] = 'rgba(0, 0, 0, 0)'
        else
          styles.value[key] = value
        return
      }
      styles.value[key] = _activeNodes.value![0].getStyle(key, false)
    })
  })
}
onMounted(() => {
  mindMap.value?.on('node_active', getNodeStyles)
})
onBeforeUnmount(() => {
  mindMap.value?.off('node_active', getNodeStyles)
})
</script>

<template>
  <PanelContainer>
    <template #title>
      <p>节点样式</p>
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
      <VScrollXTransition group>
        <!-- <template v-if="_activeNodes"> -->
        <template v-if="_activeNodes && _activeNodes.length > 0">
          <VSheet class="my-4">
            <div class="text-body-1 mb-3">
              文字
            </div>
            <VRow>
              <VCol>
                <FormSelect
                  :model-value="styles.fontFamily"
                  :items="fontFamilyItems"
                  label="字体"
                  @update:model-value="(value) => updateNodeStyles('fontFamily', value)"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <FormSelect
                  :model-value="styles.fontSize"
                  :items="(fontSizeItems as any)"
                  label="字号"
                  @update:model-value="(value) => updateNodeStyles('fontSize', value)"
                />
              </VCol>
              <VCol>
                <FormSelect
                  :model-value="styles.lineHeight"
                  :items="(fontLineHeightItems as any)"
                  label="行高"
                  @update:model-value="(value) => updateNodeStyles('lineHeight', value)"
                />
              </VCol>
            </VRow>
            <VRow align="center">
              <VCol>
                <ColorPicker
                  :color="styles.color"
                  :items="usedColorItems"
                  :icon="mdiFormatColorText"
                  tip="字体颜色"
                  @update:color="(value) => updateNodeStyles('color', value)"
                />
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
                      :active="styles.fontWeight === 'bold'"
                      :color="styles.fontWeight === 'bold' ? 'primary' : 'default'"
                      :variant="isDark ? 'outlined' : 'elevated'"
                      rounded="lg"
                      size="small"
                      icon
                      @click="() => {
          if (styles.fontWeight === 'bold') updateNodeStyles('fontWeight', 'normal')
          else updateNodeStyles('fontWeight', 'bold')
        }"
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
                      :active="styles.fontStyle === 'italic'"
                      :color="styles.fontStyle === 'italic' ? 'primary' : 'default'"
                      :variant="isDark ? 'outlined' : 'elevated'"
                      rounded="lg"
                      size="small"
                      icon
                      @click="() => {
          if (styles.fontStyle === 'italic') updateNodeStyles('fontStyle', 'normal')
          else updateNodeStyles('fontStyle', 'italic')
        }"
                    >
                      <VIcon>{{ mdiFormatItalic }}</VIcon>
                    </VBtn>
                  </template>
                  <p>斜体</p>
                </VTooltip>
              </VCol>
              <VCol>
                <MenuSelect
                  :model-value="styles.textDecoration"
                  :items="textUnderlineStyleItems"
                  :close-on-content-click="true"
                  @update:model-value="(value) => updateNodeStyles('textDecoration', value)"
                >
                  <template #activator="menu">
                    <VTooltip
                      transition="slide-y-transition"
                      offset="10"
                      open-delay="100"
                      location="top"
                    >
                      <template #activator="tip">
                        <VBtn
                          v-bind="{ ...menu.props, ...tip.props }"
                          :active="menu.isActive || tip.isActive || styles.textDecoration !== 'none'"
                          :color="styles.textDecoration !== 'none' ? 'primary' : 'default'"
                          :variant="isDark ? 'outlined' : 'elevated'"
                          rounded="lg"
                          size="small"
                          icon
                        >
                          <VIcon>{{ mdiFormatUnderline }}</VIcon>
                        </VBtn>
                      </template>
                      <p>下划线</p>
                    </VTooltip>
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
                <ColorPicker
                  :color="styles.borderColor"
                  :items="usedColorItems"
                  @update:color="(value: string) => updateNodeStyles('borderColor', value)"
                >
                  <template #activator="args">
                    <VBtn
                      v-bind="args.props"
                      class="d-block"
                      :color="styles.borderColor"
                      elevation="4"
                      block
                    />
                  </template>
                </ColorPicker>
              </VCol>
              <VCol>
                <FormSelect
                  :model-value="styles.borderDasharray"
                  :items="borderStyleItems"
                  label="样式"
                  @update:model-value="(value: string) => updateNodeStyles('borderDasharray', value)"
                >
                  <template #default="{ item }">
                    <VListItemTitle>
                      <p>{{ item.title }}</p>
                      <svg
                        width="100"
                        height="20"
                      >
                        <line
                          x1="0"
                          y1="10"
                          x2="100"
                          y2="10"
                          stroke-width="4"
                          :stroke="styles.borderDasharray === item.value ? '#409eff' : isDark ? '#fff' : '#000'"
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
                <FormSelect
                  :model-value="styles.borderWidth"
                  :items="lineWidthSizeItems"
                  label="宽度"
                  @update:model-value="(value: string) => updateNodeStyles('borderWidth', value)"
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
                            :stroke="styles.borderWidth === item.value ? '#409eff' : isDark ? '#fff' : '#000'"
                            :stroke-width="item.value"
                          />
                        </svg>
                      </template>
                    </VListItemTitle>
                  </template>
                </FormSelect>
              </VCol>
              <VCol>
                <FormSelect
                  :model-value="styles.borderRadius"
                  :items="radiusSizeItems"
                  label="圆角"
                  @update:model-value="(value: string) => updateNodeStyles('borderRadius', value)"
                />
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
                <ColorPicker
                  :color="styles.fillColor"
                  :items="usedColorItems"
                  @update:color="(value: string) => updateNodeStyles('fillColor', value)"
                >
                  <template #activator="activator">
                    <VBtn
                      v-bind="activator.props"
                      :color="activator.color"
                      :disabled="styles.gradientStyle"
                      :class="[
          styles.gradientStyle ? 'pointer-cursor' : 'pointer-not-allowed',
        ]"
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
                  :model-value="styles.gradientStyle"
                  label="渐变"
                  hide-details
                  @update:model-value="(value: boolean) => updateNodeStyles('gradientStyle', value)"
                />
              </VCol>
              <VSlideYTransition group>
                <VCol v-if="styles.gradientStyle">
                  <ColorPicker
                    :color="styles.startColor"
                    :items="usedColorItems"
                    @update:color="(value: string) => updateNodeStyles('startColor', value)"
                  >
                    <template #activator="activator">
                      <VBtn
                        v-bind="activator.props"
                        :color="activator.color"
                        size="small"
                        class="mr-1"
                      />
                      <span>起始</span>
                    </template>
                  </ColorPicker>
                </VCol>
                <VCol v-if="styles.gradientStyle">
                  <ColorPicker
                    :color="styles.endColor"
                    :items="usedColorItems"
                    @update:color="(value: string) => updateNodeStyles('endColor', value)"
                  >
                    <template #activator="activator">
                      <VBtn
                        v-bind="activator.props"
                        :color="activator.color"
                        size="small"
                        class="mr-1"
                      />
                      <span>结束</span>
                    </template>
                  </ColorPicker>
                </VCol>
              </VSlideYTransition>
            </VRow>
          </VSheet>
          <VDivider />
          <VSheet class="my-4">
            <div class="text-body-1 mb-3">
              形状
            </div>
            <VRow>
              <VCol cols="8">
                <!-- * 自定义 svg 内容 -->
                <FormSelect
                  :model-value="styles.shape"
                  :items="shapeItems"
                  @update:model-value="(value) => updateNodeStyles('shape', value)"
                >
                  <template #default="{ item, index }">
                    <VListItemTitle>
                      <p>{{ item.title }}</p>
                      <svg
                        :key="index"
                        width="100"
                        height="32"
                      >
                        <path
                          fill="none"
                          :d="shapeMapItems[item.value]"
                          :stroke="styles.shape === item.value ? '#409eff' : isDark ? '#fff' : '#000'"
                          stroke-width="4"
                        />
                      </svg>
                    </VListItemTitle>
                  </template>
                </FormSelect>
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
                <ColorPicker
                  :color="styles.lineColor"
                  :items="usedColorItems"
                  @update:color="(value) => updateNodeStyles('lineColor', value)"
                >
                  <template #activator="args">
                    <VBtn
                      v-bind="args.props"
                      :color="args.color"
                      elevation="4"
                      block
                    />
                  </template>
                </ColorPicker>
              </VCol>
              <VCol>
                <!-- * 自定义 svg 内容 -->
                <FormSelect
                  :items="lineStyleItems"
                  :model-value="styles.lineDasharray"
                  label="样式"
                  @update:model-value="(value) => updateNodeStyles('lineDasharray', value)"
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
                          :stroke="styles.lineDasharray === item.value ? '#409eff' : isDark ? '#fff' : '#000'"
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
                <!-- * 自定义 svg 内容 -->
                <FormSelect
                  :items="lineWidthSizeItems"
                  :model-value="styles.lineWidth"
                  label="宽度"
                  @update:model-value="(value) => updateNodeStyles('lineWidth', value)"
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
                            :stroke="styles.lineWidth === item.value ? '#409eff' : isDark ? '#fff' : '#000'"
                            :stroke-width="item.value"
                          />
                        </svg>
                      </template>
                    </VListItemTitle>
                  </template>
                </FormSelect>
              </VCol>
              <VCol>
                <FormSelect
                  :items="lineArrowPositionItems"
                  :model-value="styles.lineMarkerDir"
                  label="箭头位置"
                  @update:model-value="(value) => updateNodeStyles('lineMarkerDir', value)"
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
                  :model-value="styles.paddingX"
                  :max="100"
                  :min="0"
                  :step="1"
                  thumb-label
                  hide-details
                  @update:model-value="(value) => updateNodeStyles('paddingX', value)"
                >
                  <template #prepend>
                    <span>水平</span>
                  </template>
                </VSlider>
              </VCol>
              <VCol cols="12">
                <VSlider
                  :model-value="styles.paddingY"
                  density="compact"
                  :max="100"
                  :min="0"
                  :step="1"
                  thumb-label
                  hide-details
                  @update:model-value="(value) => updateNodeStyles('paddingY', value)"
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
      </VScrollXTransition>
    </template>
  </PanelContainer>
</template>
