<script
  setup
  lang="ts"
>
import { mdiClose, mdiContentSaveOutline } from '@mdi/js'
import { ref, watch } from 'vue'
import { DragUpload } from '@/components'

const uploadImageDialog = ref(false)
const activeNode = ref<any>({})
const activeNodes = ref<any[]>([])
const formEl = ref()
const fileSrc = ref('')
const fileName = ref('')
const _webImageUrl = ref('')
const _webImageName = ref('')

watch(uploadImageDialog, () => {
  if (uploadImageDialog.value) {
    const image = activeNode.value?.getData('image')
    const title = activeNode.value?.getData('imageTitle')
    fileSrc.value = image
    fileName.value = title
  }
}, { deep: true, immediate: true })

function close() {
  fileSrc.value = ''
  uploadImageDialog.value = false
}
function confirm() {
  // const { isValid, validate } = formEl.value
  activeNodes.value?.forEach((node) => {
    node.setImage({
      url: fileSrc.value,
      title: fileName.value,
      width: 100,
      height: 100,
    })
  })
  uploadImageDialog.value = false
  fileSrc.value = ''
  fileName.value = ''
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
  fileSrc.value = blob
}
const rules = ref([
  (v: string) => !!v || '图片地址不能为空',
])
</script>

<template>
  <VDialog
    v-model="uploadImageDialog"
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
              <VForm ref="formEl">
                <!-- <div class="text-body-1 mb-3">方式一：本地图片上传</div> -->
                <VListSubheader>方式一：本地图片上传</VListSubheader>
                <DragUpload
                  v-model:src="fileSrc"
                  v-model:name="fileName"
                />
                <!-- <div class="text-body-1 mb-3">方式二：网络图片</div> -->
                <VListSubheader>方式二：网络图片</VListSubheader>
                <VLabel class="text-subtitle-2">
                  请输入图片地址
                </VLabel>
                <VTextField
                  variant="outlined"
                  density="compact"
                  :rules="rules"
                  disabled
                />
                <VLabel class="text-subtitle-2">
                  图片标题（可选）
                </VLabel>
                <VTextField
                  variant="outlined"
                  density="compact"
                  disabled
                />
              </VForm>
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
