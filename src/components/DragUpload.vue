<script
  setup
  lang="ts"
>
import { mdiClose, mdiCloudUpload } from '@mdi/js'
import { isEmpty } from 'lodash'
import { ref, watch } from 'vue'

interface Props {
  height?: number
  rounded?: string
  closeIcon?: string
}
const props = withDefaults(defineProps<Props>(), {
  // # image height
  height: 200,
  rounded: 'lg',
  closeIcon: mdiClose,
})
// # models
const src = defineModel<string, string>('src', {
  required: true,
})
const name = defineModel<string, string>('name', {
  required: true,
})
// # els
const fileEl = ref<HTMLInputElement>()
const dragover = ref(false) // # emit status
const files = ref<File[]>() // # files
const isHover = ref<boolean>(false) // # hover status on image
// # event
function onDrop(e: DragEvent) {
  dragover.value = false
  if (!e.dataTransfer)
    return
  const file = e.dataTransfer.files[0]
  if (!file.type.includes('image'))
    return
  files.value = [file]
}
watch(files, () => {
  // ! file input onUpdate:modelValue will set value empty
  // ! if we not select image
  if (isEmpty(files.value))
    return
  const blob = URL.createObjectURL(files.value![0])
  src.value = blob
  name.value = files.value![0].name
}, { deep: true })
</script>

<template>
  <VFileInput
    ref="fileEl"
    v-model="files"
    class="d-none"
  />
  <!-- # Empty -->
  <!-- # Has Image -->
  <!-- ! 第一种方式 即使有图片也可以拖动替换掉  -->
  <!-- <VExpandTransition>
    <VCard
      v-if="!src"
      @drop.prevent="onDrop"
      @dragover.prevent="dragover = true"
      @dragenter.prevent="dragover = true"
      @dragleave.prevent="dragover = false"
      :color="dragover ? 'primary' : 'default'"
      @click="fileEl.click()"
      class="my-4"
    >
      <VCardText>
        <div class="d-flex flex-column align-center justify-center">
          <VIcon size="128">mdi-cloud-upload</VIcon>
          <p>拖动图片、粘贴或者点击上传图片</p>
        </div>
      </VCardText>
    </VCard>
    <VCard
      v-else
      class="my-4"
    >
      <VHover
        v-model="isHover"
        v-slot="hoverArgs"
      >
        <VImg
          v-bind="hoverArgs.props"
          class="position-relative"
          :src="src"
          :height="props.height"
        >
          <VOverlay
            :model-value="hoverArgs.isHovering"
            contained
            transition="scroll-y-transition"
            contentClass="v-container position-relative"
          >
            <VBtn
              class="overlay-close"
              @click.stop="src = ''"
              icon
            >
              <VIcon>mdi-close</VIcon>
            </VBtn>
          </VOverlay>
        </VImg>
      </VHover>
    </VCard>
  </VExpandTransition> -->
  <!-- ! 第二种方式 有图片之后无法再拖动修改 -->
  <VCard
    :color="dragover ? 'primary' : 'default'"
    :rounded="props.rounded"
    tabindex="0"
    class="my-4"
    @click="fileEl && fileEl.click()"
  >
    <VExpandTransition>
      <template v-if="!src || dragover">
        <VCardText
          @drop.prevent="onDrop"
          @dragover.prevent="dragover = true"
          @dragenter.prevent="dragover = true"
          @dragleave.prevent="dragover = false"
        >
          <div class="d-flex flex-column align-center justify-center">
            <VIcon size="128">
              {{ mdiCloudUpload }}
            </VIcon>
            <p>拖动图片、粘贴或者点击上传图片</p>
          </div>
        </VCardText>
      </template>

      <template v-else>
        <!-- # div as transition root -->
        <div>
          <VHover
            v-slot="hoverArgs"
            v-model="isHover"
          >
            <VImg
              v-bind="hoverArgs.props"
              class="position-relative"
              :src="src"
              :rounded="props.rounded"
              :height="props.height"
              :alt="name"
            >
              <VOverlay
                :model-value="hoverArgs.isHovering"
                contained
                transition="scroll-y-transition"
                content-class="v-container position-relative"
              >
                <VBtn
                  class="overlay-close"
                  icon
                  @click.stop="src = ''"
                >
                  <VIcon>{{ props.closeIcon || mdiClose }}</VIcon>
                </VBtn>
              </VOverlay>
            </VImg>
          </VHover>
        </div>
      </template>
    </VExpandTransition>
  </VCard>
</template>

<style
  scoped
  lang="scss"
>
.overlay-close {
  position: absolute;
  right: .5rem;
  top: .5rem;
}
</style>
