<script setup lang="ts">
import { isEmpty } from 'lodash';
import { watch } from 'vue';
import { ref } from 'vue';
import { useClipboard } from '@vueuse/core'

interface Props {
  height?: number
  rounded?: string
}
const props = withDefaults(defineProps<Props>(), {
  // # image height
  height: 200,
  rounded: 'lg'
})
// # models
const src = defineModel<string, string>('src', {
  required: true
})
// # els
const fileEl = ref<HTMLInputElement>()
const dragover = ref(false) // # emit status
const files = ref<File[]>() // # files
const isHover = ref<boolean>(false) // # hover status on image
const source = ref('')
const { } = useClipboard({ source })
// # event
function onDrop(e: DragEvent) {
  dragover.value = false
  if (!e.dataTransfer) return
  const file = e.dataTransfer.files[0]
  if (!file.type.includes('image')) return
  files.value = [file]
}
watch(files, () => {
  // ! file input onUpdate:modelValue will set value empty
  // ! if we not select image
  if (isEmpty(files.value)) return
  const blob = URL.createObjectURL(files.value![0])
  src.value = blob
}, { deep: true })

</script>

<template>
  <VFileInput
    class="d-none"
    ref="fileEl"
    v-model="files"
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
    @drop.prevent="onDrop"
    @dragover.prevent="dragover = true"
    @dragenter.prevent="dragover = true"
    @dragleave.prevent="dragover = false"
    :color="dragover ? 'primary' : 'default'"
    :rounded="props.rounded"
    @click="fileEl && fileEl.click()"
    tabindex="0"
    class="my-4"
    ref="cardEl"
  >
    <VExpandTransition>
      <template v-if="!src || dragover">
        <VCardText>
          <div class="d-flex flex-column align-center justify-center">
            <VIcon size="128">mdi-cloud-upload</VIcon>
            <p>拖动图片、粘贴或者点击上传图片</p>
          </div>
        </VCardText>
      </template>
      <template v-else>
        <!-- # div as transition root -->
        <div>
          <VHover
            v-model="isHover"
            v-slot="hoverArgs"
          >
            <VImg
              v-bind="hoverArgs.props"
              class="position-relative"
              :src="src"
              :rounded="props.rounded"
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
        </div>
      </template>
    </VExpandTransition>
  </VCard>
</template>

<style scoped lang="scss">
.overlay-close {
  position: absolute;
  right: .5rem;
  top: .5rem;
}
</style>
