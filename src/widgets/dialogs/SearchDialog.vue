<script
  setup
  lang="ts"
>
import { mdiChevronDown, mdiChevronRight, mdiClose } from '@mdi/js'
import { ref } from 'vue'

const searchDialog = ref(false)
const search = ref('')
const replace = ref('')
const isReplace = ref(false)
</script>

<template>
  <VSlideXTransition>
    <VCard
      v-if="searchDialog"
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
                <VIcon>{{ isReplace ? mdiChevronRight : mdiChevronDown }}</VIcon>
              </Transition>
            </VBtn>
          </template>
        </VTextField>
        <VSlideYTransition>
          <VTextField
            v-if="isReplace"
            v-model="replace"
            variant="outlined"
            rounded="lg"
            label="替换内容"
            persistent-placeholder
          />
        </VSlideYTransition>
      </VCardText>
      <VCardActions>
        <VBtn
          variant="plain"
          @click="searchDialog = false"
        >
          <VIcon start>
            {{ mdiClose }}
          </VIcon>
          <span>关闭</span>
        </VBtn>
        <VSpacer />
        <VBtn>替换</VBtn>
        <VBtn>全部替换</VBtn>
      </VCardActions>
    </VCard>
  </VSlideXTransition>
</template>

<style
  scoped
  lang="scss"
>
.search-box {
  position: fixed;
  top: 15%;
  right: 4%;
}
</style>
