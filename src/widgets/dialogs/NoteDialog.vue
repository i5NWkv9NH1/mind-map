<script
  setup
  lang="ts"
>
import { mdiClose, mdiContentSaveOutline } from '@mdi/js';
import '@toast-ui/editor/dist/toastui-editor.css';
import { ref } from 'vue';

const el = ref<HTMLElement>()
const noteDialog = ref(false)

function close() {
  noteDialog.value = false
}
function confirm() {
  noteDialog.value = false
}
</script>

<template>
  <VDialog
    v-model="noteDialog"
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
