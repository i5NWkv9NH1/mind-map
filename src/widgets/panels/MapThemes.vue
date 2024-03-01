<script setup lang="ts">
import PanelContainer from '@/components/PanelContainer.vue';
import { useAppStore } from '@/store';
import { over } from 'lodash';
import { v4 as uuid } from 'uuid'
import { ref, computed, watch } from 'vue'

const current = ref('经典')
const themeStyles = ref(['经典', '深色', '朴素'])
const confirmDialog = ref({
  status: false
})
const selected = ref(1)
const isHasModify = ref(false)
const themes = computed(() => {
  switch (current.value) {
    default: return []
    case '经典': return [1, 2, 3, 4, 5, 6]
    case '深色': return [7, 8, 9, 10, 11]
    case '朴素': return [11, 12, 13, 14, 15, 16]
  }
})
const { togglePanel } = useAppStore()
function handleChange(item: number) {
  if (isHasModify.value) {
    confirmDialog.value.status = true
    return
  }
  selected.value = item
}

function reserve() {
  confirmDialog.value.status = false
}
function overwrite() {
  confirmDialog.value.status = false
}
</script>

<template>
  <VDialog
    v-model="confirmDialog.status"
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
              你当前自定义过基础样式，是否覆盖？
            </VCardText>
            <VCardActions>
              <VSpacer />
              <VBtn @click="reserve">保留</VBtn>
              <VBtn
                variant="elevated"
                color="primary"
                @click="overwrite"
              >覆盖</VBtn>
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
        @click="togglePanel(null)"
        icon
      >
        <VIcon>mdi-close</VIcon>
      </VBtn>
    </template>
    <template #content>
      <VTabs
        v-model="current"
        density="compact"
      >
        <VTab
          v-for="item in themeStyles"
          :value="item"
          :text="item"
        />
      </VTabs>
      <VWindow
        v-model="current"
        class="px-2"
      >
        <VWindowItem
          v-for="item in themeStyles"
          :value="item"
        >
          <VCard
            :color="item === selected ? 'primary' : 'default'"
            elevation="4"
            class="my-4"
            v-for="item in themes"
            @click="handleChange(item)"
          >
            <VCardText class="text-center">
              <VImg
                src="https://wanglin2.github.io/mind-map/dist/img/classic7.jpg"
                width="100%"
                height="120"
              />
              <p>脑图经典{{ item }}</p>
            </VCardText>
          </VCard>
        </VWindowItem>
      </VWindow>
    </template>
  </PanelContainer>
</template>
