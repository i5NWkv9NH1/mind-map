<script setup lang="ts">
import { useAppStore } from '@/store/app';
import { storeToRefs } from 'pinia';
import "@toast-ui/editor/dist/toastui-editor.css";
import Editor from "@toast-ui/editor";
import { ref } from 'vue';
import { onMounted } from 'vue';


const { noteDialog } = storeToRefs(useAppStore())
const el = ref<HTMLElement>()
const editor = ref<Editor>()
const note = ref<string>('')

const editorOptions = ref({
  usageStatistics: false,
  hideModeSwitch: true
})

function close() {
  noteDialog.value.status = false
}
function confirm() {
  noteDialog.value.status = false
}

</script>

<template>
  <VDialog
    v-model="noteDialog.status"
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
            <VCardTitle>备注</VCardTitle>
            <VCardText>
              <!-- TODO: create custom editor UI -->
              <div ref="el" />
            </VCardText>
            <VCardActions>
              <VBtn @click="close">
                <VIcon start>mdi-close</VIcon>
                <span>取消</span>
              </VBtn>
              <VBtn
                color="primary"
                @click="confirm"
              >
                <VIcon start>mdi-content-save-outline</VIcon>
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
