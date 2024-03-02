<script
  setup
  lang="ts"
>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useAppStore } from '@/store'
import { DragUpload } from '@/components'

const { uploadImageDialog } = storeToRefs(useAppStore())
const src = ref('')

function close() {
  src.value = ''
  uploadImageDialog.value.status = false
}
function confirm() {
  uploadImageDialog.value.status = false
}
function paste(e: ClipboardEvent) {
  if (!e.clipboardData)
    return
  const files = e.clipboardData.files
  if (!files.length)
    return
  const file = files[0]
  if (!file.type.includes('image'))
    return
  const blob = URL.createObjectURL(file)
  src.value = blob
}
const rules = ref([
  (v: string) => v, // # is url?
  (v: string) => v,
])
</script>

<template>
  <VDialog
    v-model="uploadImageDialog.status"
    transition="scroll-y-transition"
    persistent
    @paste="paste"
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
            <VCardTitle>图片</VCardTitle>
            <VCardText>
              <!-- <div class="text-body-1 mb-3">方式一：本地图片上传</div> -->
              <VListSubheader>方式一：本地图片上传</VListSubheader>
              <DragUpload v-model:src="src" />
              <!-- <div class="text-body-1 mb-3">方式二：网络图片</div> -->
              <VListSubheader>方式二：网络图片</VListSubheader>
              <VLabel class="text-subtitle-2">
                请输入图片地址
              </VLabel>
              <VTextField
                variant="outlined"
                density="compact"
                :rules="rules"
              />
              <VLabel class="text-subtitle-2">
                图片标题（可选）
              </VLabel>
              <VTextField
                variant="outlined"
                density="compact"
              />
            </VCardText>
            <VCardActions>
              <VBtn @click="close">
                <VIcon start>
                  mdi-close
                </VIcon>
                <span>取消</span>
              </VBtn>
              <VBtn
                color="primary"
                @click="confirm"
              >
                <VIcon start>
                  mdi-content-save-outline
                </VIcon>
                <span>确定</span>
              </VBtn>
              <VSpacer />
            </VCardActions>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>
  </VDialog>
</template>
