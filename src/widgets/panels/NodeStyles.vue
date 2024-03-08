// TODO: 待更新节点数据获取
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
import { ref, watch } from 'vue'
import { ColorPicker, FormSelect, MenuSelect, PanelContainer } from '@/components'
import { useMindMap, usePresets } from '@/composables'
import { useSettingsStore } from '@/store/settings'
import { Empty } from '@/widgets'
import type { MindMapNode } from '@/@types'

const { togglePanel } = useSettingsStore()
const { isDark } = storeToRefs(useSettingsStore())
const { mindMap, activeNodes } = useMindMap()
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

watch(styles, () => {
  if (activeNodes.value && activeNodes.value.length !== 0) {
    activeNodes.value.forEach((node: MindMapNode) => {
      Object.keys(styles.value).forEach((key: string) => {
        node.setStyle(key, styles.value[key])
      })
    })
  }
}, { deep: true })

watchEffect(() => {
  if (activeNodes.value && activeNodes.value.length !== 0) {
    // 获取样式的逻辑
    // eslint-disable-next-line
    console.log('获取节点样式')
    Object.keys(styles.value).forEach((key: string) => {
      if (key.includes('olor')) {
        const value = activeNodes.value![0].getStyle(key, false)
        if (value === 'transparent')
          styles.value[key] = 'rgba(0, 0, 0, 0)'
        else
          styles.value[key] = value
        return
      }
      styles.value[key] = activeNodes.value![0].getStyle(key, false)
    })
  }
})

// TODO: updated
// onMounted(() => {
//   mindMap.value?.on('node_active', (_node: MindMapNode, nodes: MindMapNode[]) => {
//     activeNodes.value = nodes
//     if (!activeNodes.value)
//       return
//     if (activeNodes.value.length <= 0)
//       return
//     nextTick(() => {
//       if (activeNodes.value && activeNodes.value.length !== 0) {
//         [
//           'borderColor',
//           'borderDasharray',
//           'borderRadius',
//           'borderWidth',
//           'color',
//           'endColor',
//           'fillColor',
//           'fontFamily',
//           'fontSize',
//           'fontStyle',
//           'fontWeight',
//           'gradientStyle',
//           'lineColor',
//           'lineDasharray',
//           'lineHeight',
//           'lineMarkerDir',
//           'lineWidth',
//           'paddingX',
//           'paddingY',
//           'shape',
//           'startColor',
//           'textDecoration',
//         ].forEach((key: string) => {
//           if (key.includes('olor')) {
//             const value = activeNodes.value![0].getStyle(key, false)
//             if (value === 'transparent')
//               styles.value[key] = 'rgba(0, 0, 0, 0)'
//             else
//               styles.value[key] = value
//             return
//           }
//           styles.value[key] = activeNodes.value![0].getStyle(key, false)
//         })
//         // console.log(styles.value)
//       }
//     }).then((_) => {
//       // eslint-disable-next-line no-console
//       console.log('from next ticker', styles.value)
//     })
//     console.log('next ticker outside', styles.value)
//   })
// })
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
        <template v-if="activeNodes && activeNodes.length !== 0">
          <VSheet class="my-4">
            <div class="text-body-1 mb-3">
              文字
            </div>
            <VRow>
              <VCol>
                <FormSelect
                  v-model="styles.fontFamily"
                  :items="fontFamilyItems"
                  label="字体"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <FormSelect
                  v-model="styles.fontSize"
                  :items="fontSizeItems"
                  label="字号"
                />
              </VCol>
              <VCol>
                <FormSelect
                  v-model="styles.lineHeight"
                  :items="fontLineHeightItems"
                  label="行高"
                />
              </VCol>
            </VRow>
            <VRow align="center">
              <VCol>
                <ColorPicker
                  v-model:color="styles.color"
                  :items="usedColorItems"
                  :icon="mdiFormatColorText"
                  tip="字体颜色"
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
                        if (styles.fontWeight === 'bold') styles.fontWeight = 'normal'
                        else styles.fontWeight = 'bold'
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
                        if (styles.fontStyle === 'italic') styles.fontStyle = 'normal'
                        else styles.fontStyle = 'italic'
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
                  v-model="styles.textDecoration"
                  :items="textUnderlineStyleItems"
                  :close-on-content-click="true"
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
                  v-model:color="styles.borderColor"
                  :items="usedColorItems"
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
                  v-model="styles.borderDasharray"
                  :items="borderStyleItems"
                  label="样式"
                >
                  <template #default="{ item, index }">
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
                  v-model="styles.borderWidth"
                  :items="lineWidthSizeItems"
                  label="宽度"
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
                  v-model="styles.borderRadius"
                  :items="radiusSizeItems"
                  label="圆角"
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
                  v-model:color="styles.fillColor"
                  :items="usedColorItems"
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
                  v-model="styles.gradientStyle"
                  label="渐变"
                  hide-details
                />
              </VCol>
              <VSlideYTransition group>
                <VCol v-if="styles.gradientStyle">
                  <ColorPicker
                    v-model:color="styles.startColor"
                    :items="usedColorItems"
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
                    v-model:color="styles.endColor"
                    :items="usedColorItems"
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
                  v-model="styles.shape"
                  :items="shapeItems"
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
                  v-model:color="styles.lineColor"
                  :items="usedColorItems"
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
                  v-model="styles.lineDasharray"
                  :items="lineStyleItems"
                  label="样式"
                >
                  <template #default="{ item, index }">
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
                  v-model="styles.lineWidth"
                  :items="lineWidthSizeItems"
                  label="宽度"
                >
                  <template #default="{ item, index }">
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
                  v-model="styles.lineMarkerDir"
                  :items="lineArrowPositionItems"
                  label="箭头位置"
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
                  v-model="styles.paddingX"
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
                  v-model="styles.paddingY"
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
      </VScrollXTransition>
    </template>
  </PanelContainer>
</template>
