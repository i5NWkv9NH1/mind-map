<script
  setup
  lang="ts"
>
import { mdiClose, mdiCloseCircleOutline, mdiContentSaveOutline } from '@mdi/js'
import { isEmpty } from 'lodash'
import { v4 as uuid } from 'uuid'
import { ref, watch } from 'vue'

const tagDialog = ref(false)
const items = ref<any>([])
const text = ref('')
const color = ref('')

watch(text, () => {
  color.value = `#${Math.floor(Math.random() * 16777215).toString(16)}`
})

function close() {
  tagDialog.value = false
}
function confirm() {
  tagDialog.value = false
}
function addTag() {
  if (!text.value)
    return
  items.value.push({
    id: uuid(),
    text: text.value.trim(),
    color: color.value,
  })
  text.value = ''
}
</script>

<template>
  <VDialog
    v-model="tagDialog"
    transition="scroll-y-transition"
    persistent
  >
    <VContainer>
      <VRow justify="center">
        <VCol
          cols="12"
          lg="6"
          md="6"
          sm="8"
        >
          <VCard elevation="6">
            <VCardTitle>标签</VCardTitle>
            <VCardText>
              <VLabel>添加标签</VLabel>
              <VTextField
                v-model="text"
                variant="outlined"
                placeholder="请按回车键添加标签"
                @keyup.enter="addTag"
              >
                <template #append-inner>
                  <VBtn
                    variant="flat"
                    @click="addTag"
                  >
                    添加
                  </VBtn>
                </template>
              </VTextField>
              <div
                v-if="!isEmpty(items)"
                class="d-flex flex-wrap align-center"
              >
                <VChip
                  v-for="tag in items"
                  :key="tag.id"
                  :color="tag.color"
                  :text="tag.text"
                  class="mr-1 mb-1"
                  rounded="lg"
                  :closable="false"
                >
                  <template #close>
                    <VIcon @click.stop="() => console.log('remove tag')">
                      {{ mdiCloseCircleOutline }}
                    </VIcon>
                  </template>
                </VChip>
              </div>
            </VCardText>
            <VCardActions>
              <VBtn @click="close">
                <VIcon start>
                  {{ mdiClose }}
                </VIcon>
                <span>取消</span>
              </VBtn>
              <VBtn
                color="primary"
                @click="confirm"
              >
                <VIcon start>
                  {{ mdiContentSaveOutline }}
                </VIcon>
                <span>保存</span>
              </VBtn>
              <VSpacer />
            </VCardActions>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>
  </VDialog>
</template>
