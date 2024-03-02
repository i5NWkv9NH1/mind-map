<script setup lang="ts">
// @ts-ignore
import { useAppStore } from '@/store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const { searchDialog, mindMap } = storeToRefs(useAppStore())
const search = ref('')
const replace = ref('')
const isReplace = ref(false)
function handleSearch() {
  //@ts-ignore
  mindMap.value!.search(search.value, () => {
  })
}
</script>

<template>
  <VSlideXTransition>
    <VCard
      v-if="searchDialog.status"
      width="400"
      rounded="lg"
      position="fixed"
      class="search-box"
    >
      <VCardTitle>查找替换</VCardTitle>
      <VCardText>
        <VTextField
          v-model="search"
          density="compact"
          variant="outlined"
          label="查找文字"
          rounded="lg"
          persistent-placeholder
        >
          <template #append-inner>
            <VBtn
              icon
              variant="text"
              @click="isReplace = !isReplace"
            >
              <Transition>
                <VIcon>{{ isReplace ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</VIcon>
              </Transition>
            </VBtn>
          </template>
        </VTextField>
        <VSlideYTransition>
          <VTextField
            v-model="replace"
            v-if="isReplace"
            variant="outlined"
            rounded="lg"
            label="替换内容"
            persistent-placeholder
          />
        </VSlideYTransition>
      </VCardText>
      <VCardActions>
        <VBtn
          @click="searchDialog.status = false"
          variant="plain"
        >
          <VIcon start>mdi-close</VIcon>
          <span>关闭</span>
        </VBtn>
        <VSpacer />
        <VBtn>替换</VBtn>
        <VBtn>全部替换</VBtn>
      </VCardActions>
    </VCard>
  </VSlideXTransition>
</template>

<style scoped lang="scss">
.search-box {
  position: fixed;
  top: 15%;
  right: 4%;
}
</style>
