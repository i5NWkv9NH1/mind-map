<script setup lang="ts">
import PanelContainer from '@/components/PanelContainer.vue';
import { useAppStore } from '@/store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const { togglePanel } = useAppStore()
const { isDark } = storeToRefs(useAppStore())
const backgroundTab = ref('颜色')
const paddingTab = ref('二级节点')

</script>

<template>
  <PanelContainer>
    <template #title>
      <p>基础样式</p>
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
      <VSheet class="my-4">
        <div class="text-body-1 mb-3">画布背景</div>
        <VRow>
          <VCol>
            <VTabs
              v-model="backgroundTab"
              density="compact"
            >
              <VTab
                v-for="tab in ['颜色', '图片']"
                :key="tab"
                size="small"
                :text="tab"
                :value="tab"
              />
            </VTabs>
            <VWindow
              v-model="backgroundTab"
              class="mt-4"
            >
              <VWindowItem value="颜色">
                <VAvatar
                  v-for="item in 20"
                  :key="item"
                  rounded="lg"
                  color="primary"
                  class="ma-1"
                  size="24"
                />
              </VWindowItem>
              <VWindowItem value="图片">
                上传图片
              </VWindowItem>
            </VWindow>
          </VCol>
        </VRow>
      </VSheet>
      <VSheet class="my-4">
        <div class="text-body-1 mb-3">连线</div>
        <VRow>
          <VCol>
            <VLabel class="mr-4">颜色</VLabel>
            <VAvatar
              class="d-block mt-2"
              rounded="lg"
              size="24"
              color="primary"
            />
          </VCol>
          <VCol>
            <VLabel>粗细</VLabel>
            <VSelect
              :items="[1, 2, 3, 4, 5]"
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
        <VRow align="center">
          <VCol cols="6">
            <VLabel>风格</VLabel>
            <VSelect
              :items="[1, 2, 3, 4, 5]"
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
            <VCheckbox
              label="是否显示箭头"
              density="compact"
              hide-details
            />
          </VCol>
        </VRow>
      </VSheet>
      <VSheet class="my-4">
        <div class="text-body-1 mb-3">概要的连线</div>
        <VRow>
          <VCol>
            <VLabel>颜色</VLabel>
            <VAvatar
              size="24"
              class="d-block"
              color="primary"
              rounded="lg"
            />
          </VCol>
          <VCol>
            <VLabel>粗细</VLabel>
            <VSelect
              :items="[1, 2, 3, 4, 5]"
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
        <div class="text-body-1 mb-3">关联线</div>
        <VRow>
          <VCol>
            <VLabel>颜色</VLabel>
            <VAvatar
              size="24"
              class="d-block"
              color="primary"
              rounded="lg"
            />
          </VCol>
          <VCol>
            <VLabel>粗细</VLabel>
            <VSelect
              :items="[1, 2, 3, 4, 5]"
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
            <VLabel>激活颜色</VLabel>
            <VAvatar
              size="24"
              class="d-block"
              color="primary"
              rounded="lg"
            />
          </VCol>
          <VCol>
            <VLabel>粗细</VLabel>
            <VSelect
              :items="[1, 2, 3, 4, 5]"
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
        <div class="text-body-1 mb-3">关联线文字</div>
        <VRow>
          <VCol>
            <VLabel>字体</VLabel>
            <VSelect
              :items="[1, 2, 3, 4, 5]"
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
            <VLabel>颜色</VLabel>
            <VAvatar
              size="24"
              class="d-block"
              color="primary"
              rounded="lg"
            />
          </VCol>
          <VCol>
            <VLabel>字号</VLabel>
            <VSelect
              :items="[1, 2, 3, 4, 5]"
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
        <div class="text-body-1 mb-3">节点边框风格</div>
        <VRow>
          <VCol>
            <VCheckbox
              label="是否使用只有底边框的风格"
              density="compact"
              hide-details
            />
          </VCol>
        </VRow>
      </VSheet>
      <VSheet class="my-4">
        <div class="text-body-1 mb-3">节点内边距</div>
        <VRow>
          <VCol cols="12">
            <VSlider thumb-label>
              <template #prepend>
                <span>水平</span>
              </template>
            </VSlider>
            <VSlider thumb-label>
              <template #prepend>
                <span>垂直</span>
              </template>
            </VSlider>
          </VCol>
        </VRow>
      </VSheet>
      <VSheet class="my-4">
        <div class="text-body-1 mb-3">图片</div>
        <VRow>
          <VCol cols="12">
            <VSlider thumb-label>
              <template #prepend>
                <span>显示的最大宽度</span>
              </template>
            </VSlider>
            <VSlider thumb-label>
              <template #prepend>
                <span>显示的最大高度</span>
              </template>
            </VSlider>
          </VCol>
        </VRow>
      </VSheet>
      <VSheet class="my-4">
        <div class="text-body-1 mb-3">图标</div>
        <VRow>
          <VCol cols="12">
            <VSlider thumb-label>
              <template #prepend>
                <span>大小</span>
              </template>
            </VSlider>
          </VCol>
        </VRow>
      </VSheet>
      <VSheet class="my-4">
        <div class="text-body-1 mb-3">节点外边距</div>
        <VRow>
          <VCol>
            <VTabs
              v-model="paddingTab"
              density="compact"
            >
              <VTab
                v-for="tab in ['二级节点', '三级以下节点']"
                :key="tab"
                size="small"
                :text="tab"
                :value="tab"
              />
            </VTabs>
            <VWindow
              v-model="paddingTab"
              class="mt-4"
            >
              <VWindowItem value="二级节点">
                <VSlider thumb-label>
                  <template #prepend>
                    <span>水平</span>
                  </template>
                </VSlider>
                <VSlider thumb-label>
                  <template #prepend>
                    <span>垂直</span>
                  </template>
                </VSlider>
              </VWindowItem>
              <VWindowItem value="三级以下节点">
                <VSlider thumb-label>
                  <template #prepend>
                    <span>水平</span>
                  </template>
                </VSlider>
                <VSlider thumb-label>
                  <template #prepend>
                    <span>垂直</span>
                  </template>
                </VSlider>
              </VWindowItem>
            </VWindow>
          </VCol>
        </VRow>
      </VSheet>
      <VSheet class="my-4">
        <div class="text-body-1 mb-3">水印</div>
        <VRow>
          <VCol>
            <VCheckbox
              label="是否显示水印"
              density="compact"
              hide-details
            />
          </VCol>
        </VRow>
      </VSheet>
      <VSheet class="my-4">
        <div class="text-body-1 mb-3">其他配置</div>
        <VRow align="center">
          <VCol>
            <VCheckbox
              label="是否开启节点自由拖拽"
              density="compact"
              hide-details
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <VCheckbox
              label="是否开启节点富文本编辑"
              density="compact"
              hide-details
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <VLabel>鼠标滚动行为</VLabel>
            <VSelect
              :items="['上下移动视图', '缩放视图']"
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
            <VLabel>创建新节点的行为</VLabel>
            <VSelect
              :items="['激活新节点及进入编辑', '不激活新节点', '只激活新节点，不进入编辑']"
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
            <VCheckbox
              label="是否显示滚动条"
              density="compact"
              hide-details
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <VCheckbox
              label="是否开启手绘风格"
              density="compact"
              hide-details
            />
          </VCol>
        </VRow>
      </VSheet>
    </template>

  </PanelContainer>
</template>
