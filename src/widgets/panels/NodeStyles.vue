<script setup lang="ts">
import PanelContainer from '@/components/PanelContainer.vue';
import { useAppStore } from '@/store';
import { storeToRefs } from 'pinia';
import { EmptyNode } from '../EmptyNode';
import { ref } from 'vue';
import { useTheme } from 'vuetify/lib/framework.mjs';

const { togglePanel } = useAppStore()
const { isActiveNode, isDark } = storeToRefs(useAppStore())

const fonts = ref([
  {
    "name": "宋体",
    "value": "宋体, SimSun, Songti SC"
  },
  {
    "name": "微软雅黑",
    "value": "微软雅黑, Microsoft YaHei"
  },
  {
    "name": "楷体",
    "value": "楷体, 楷体_GB2312, SimKai, STKaiti"
  },
  {
    "name": "黑体",
    "value": "黑体, SimHei, Heiti SC"
  },
  {
    "name": "隶书",
    "value": "隶书, SimLi"
  },
  {
    "name": "Andale Mono",
    "value": "andale mono"
  },
  {
    "name": "Arial",
    "value": "arial, helvetica, sans-serif"
  },
  {
    "name": "arialBlack",
    "value": "arial black, avant garde"
  },
  {
    "name": "Comic Sans Ms",
    "value": "comic sans ms"
  },
  {
    "name": "Impact",
    "value": "impact, chicago"
  },
  {
    "name": "Times New Roman",
    "value": "times new roman"
  },
  {
    "name": "Sans-Serif",
    "value": "sans-serif"
  },
  {
    "name": "serif",
    "value": "serif"
  }
])
</script>

<template>
  <PanelContainer>
    <template #title>
      <p>节点样式</p>
      <VBtn
        color="surface"
        variant="flat"
        @click="togglePanel(null)"
        icon
      >
        <VIcon>mdi-close</VIcon>
      </VBtn>
    </template>
    <template #content>
      <VFabTransition group>
        <template v-if="isActiveNode">
          <VSheet class="my-4">
            <div class="text-body-1 mb-3">文字</div>
            <VRow>
              <VCol>
                <VLabel>字体</VLabel>
                <VSelect
                  :items="fonts"
                  item-title="name"
                  item-value="value"
                  density="compact"
                  :variant="isDark ? 'outlined' : 'solo'"
                  hide-details
                >
                  <template #item="{ index, item, props }">
                    <VList
                      density="compact"
                      nav
                    >
                      <VListItem
                        v-bind="props"
                        :value="item.value"
                        :title="item.title"
                      />
                    </VList>
                  </template>
                </VSelect>
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VLabel>字号</VLabel>
                <VSelect
                  :items="fonts"
                  item-title="name"
                  item-value="value"
                  density="compact"
                  :variant="isDark ? 'outlined' : 'solo'"
                  hide-details
                >
                  <template #item="{ index, item, props }">
                    <VList
                      density="compact"
                      nav
                    >
                      <VListItem
                        v-bind="props"
                        :value="item.value"
                        :title="item.title"
                      />
                    </VList>
                  </template>
                </VSelect>
              </VCol>
              <VCol>
                <VLabel>行高</VLabel>
                <VSelect
                  :items="fonts"
                  item-title="name"
                  item-value="value"
                  density="compact"
                  :variant="isDark ? 'outlined' : 'solo'"
                  hide-details
                >
                  <template #item="{ index, item, props }">
                    <VList
                      density="compact"
                      nav
                    >
                      <VListItem
                        v-bind="props"
                        :value="item.value"
                        :title="item.title"
                      />
                    </VList>
                  </template>
                </VSelect>
              </VCol>
            </VRow>
          </VSheet>
          <VSheet class="my-4">
            <div class="text-body-1 mb-3">边框</div>
            <VRow>
              <VCol>
                <VLabel>颜色</VLabel>
                <VSelect
                  :items="fonts"
                  item-title="name"
                  item-value="value"
                  density="compact"
                  :variant="isDark ? 'outlined' : 'solo'"
                  hide-details
                >
                  <template #item="{ index, item, props }">
                    <VList
                      density="compact"
                      nav
                    >
                      <VListItem
                        v-bind="props"
                        :value="item.value"
                        :title="item.title"
                      />
                    </VList>
                  </template>
                </VSelect>
              </VCol>
              <VCol>
                <VLabel>样式</VLabel>
                <VSelect
                  :items="fonts"
                  item-title="name"
                  item-value="value"
                  density="compact"
                  :variant="isDark ? 'outlined' : 'solo'"
                  hide-details
                >
                  <template #item="{ index, item, props }">
                    <VList
                      density="compact"
                      nav
                    >
                      <VListItem
                        v-bind="props"
                        :value="item.value"
                        :title="item.title"
                      />
                    </VList>
                  </template>
                </VSelect>
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VLabel>宽度</VLabel>
                <VSelect
                  :items="fonts"
                  item-title="name"
                  item-value="value"
                  density="compact"
                  :variant="isDark ? 'outlined' : 'solo'"
                  hide-details
                >
                  <template #item="{ index, item, props }">
                    <VList
                      density="compact"
                      nav
                    >
                      <VListItem
                        v-bind="props"
                        :value="item.value"
                        :title="item.title"
                      />
                    </VList>
                  </template>
                </VSelect>
              </VCol>
              <VCol>
                <VLabel>高度</VLabel>
                <VSelect
                  :items="fonts"
                  item-title="name"
                  item-value="value"
                  density="compact"
                  :variant="isDark ? 'outlined' : 'solo'"
                  hide-details
                >
                  <template #item="{ index, item, props }">
                    <VList
                      density="compact"
                      nav
                    >
                      <VListItem
                        v-bind="props"
                        :value="item.value"
                        :title="item.title"
                      />
                    </VList>
                  </template>
                </VSelect>
              </VCol>
            </VRow>
          </VSheet>
          <VSheet class="my-4">
            <div class="text-body-1 mb-3">背景</div>
            <VRow>
              <VCol>
                <VLabel>颜色</VLabel>
                <VSelect
                  :items="fonts"
                  item-title="name"
                  item-value="value"
                  density="compact"
                  :variant="isDark ? 'outlined' : 'solo'"
                  hide-details
                >
                  <template #item="{ index, item, props }">
                    <VList
                      density="compact"
                      nav
                    >
                      <VListItem
                        v-bind="props"
                        :value="item.value"
                        :title="item.title"
                      />
                    </VList>
                  </template>
                </VSelect>
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VLabel>渐变</VLabel>
                <VSelect
                  :items="fonts"
                  item-title="name"
                  item-value="value"
                  density="compact"
                  :variant="isDark ? 'outlined' : 'solo'"
                  hide-details
                >
                  <template #item="{ index, item, props }">
                    <VList
                      density="compact"
                      nav
                    >
                      <VListItem
                        v-bind="props"
                        :value="item.value"
                        :title="item.title"
                      />
                    </VList>
                  </template>
                </VSelect>
              </VCol>
              <VCol>
                <VLabel>起始</VLabel>
                <VSelect
                  :items="fonts"
                  item-title="name"
                  item-value="value"
                  density="compact"
                  :variant="isDark ? 'outlined' : 'solo'"
                  hide-details
                >
                  <template #item="{ index, item, props }">
                    <VList
                      density="compact"
                      nav
                    >
                      <VListItem
                        v-bind="props"
                        :value="item.value"
                        :title="item.title"
                      />
                    </VList>
                  </template>
                </VSelect>
              </VCol>
              <VCol>
                <VLabel>结束</VLabel>
                <VSelect
                  :items="fonts"
                  item-title="name"
                  item-value="value"
                  density="compact"
                  :variant="isDark ? 'outlined' : 'solo'"
                  hide-details
                >
                  <template #item="{ index, item, props }">
                    <VList
                      density="compact"
                      nav
                    >
                      <VListItem
                        v-bind="props"
                        :value="item.value"
                        :title="item.title"
                      />
                    </VList>
                  </template>
                </VSelect>
              </VCol>
            </VRow>
          </VSheet>
          <VSheet class="my-4">
            <div class="text-body-1 mb-3">形状</div>
            <VRow>
              <VCol>
                <VLabel>形状</VLabel>
                <VSelect
                  :items="fonts"
                  item-title="name"
                  item-value="value"
                  density="compact"
                  :variant="isDark ? 'outlined' : 'solo'"
                  hide-details
                >
                  <template #item="{ index, item, props }">
                    <VList
                      density="compact"
                      nav
                    >
                      <VListItem
                        v-bind="props"
                        :value="item.value"
                        :title="item.title"
                      />
                    </VList>
                  </template>
                </VSelect>
              </VCol>
            </VRow>
          </VSheet>
          <VSheet class="my-4">
            <div class="text-body-1 mb-3">线条</div>
            <VRow>
              <VCol>
                <VLabel>颜色</VLabel>
                <VSelect
                  :items="fonts"
                  item-title="name"
                  item-value="value"
                  density="compact"
                  :variant="isDark ? 'outlined' : 'solo'"
                  hide-details
                >
                  <template #item="{ index, item, props }">
                    <VList
                      density="compact"
                      nav
                    >
                      <VListItem
                        v-bind="props"
                        :value="item.value"
                        :title="item.title"
                      />
                    </VList>
                  </template>
                </VSelect>
              </VCol>
              <VCol>
                <VLabel>样式</VLabel>
                <VSelect
                  :items="fonts"
                  item-title="name"
                  item-value="value"
                  density="compact"
                  :variant="isDark ? 'outlined' : 'solo'"
                  hide-details
                >
                  <template #item="{ index, item, props }">
                    <VList
                      density="compact"
                      nav
                    >
                      <VListItem
                        v-bind="props"
                        :value="item.value"
                        :title="item.title"
                      />
                    </VList>
                  </template>
                </VSelect>
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VLabel>宽度</VLabel>
                <VSelect
                  :items="fonts"
                  item-title="name"
                  item-value="value"
                  density="compact"
                  :variant="isDark ? 'outlined' : 'solo'"
                  hide-details
                >
                  <template #item="{ index, item, props }">
                    <VList
                      density="compact"
                      nav
                    >
                      <VListItem
                        v-bind="props"
                        :value="item.value"
                        :title="item.title"
                      />
                    </VList>
                  </template>
                </VSelect>
              </VCol>
              <VCol>
                <VLabel>箭头位置</VLabel>
                <VSelect
                  :items="fonts"
                  item-title="name"
                  item-value="value"
                  density="compact"
                  :variant="isDark ? 'outlined' : 'solo'"
                  hide-details
                >
                  <template #item="{ index, item, props }">
                    <VList
                      density="compact"
                      nav
                    >
                      <VListItem
                        v-bind="props"
                        :value="item.value"
                        :title="item.title"
                      />
                    </VList>
                  </template>
                </VSelect>
              </VCol>
            </VRow>
          </VSheet>
          <VSheet class="my-4">
            <div class="text-body-1 mb-3">节点内边距</div>
            <VRow>
              <VCol cols="12">
                <VSlider thumb-label="always">
                  <template #prepend>
                    <span>水平</span>
                  </template>
                </VSlider>
              </VCol>
              <VCol cols="12">
                <VSlider thumb-label="always">
                  <template #prepend>
                    <span>垂直</span>
                  </template>
                </VSlider>
              </VCol>
            </VRow>
          </VSheet>
        </template>

        <template v-else>
          <EmptyNode
            :size="128"
            icon="mdi-vector-link"
          />
        </template>
      </VFabTransition>
    </template>
  </PanelContainer>
</template>
