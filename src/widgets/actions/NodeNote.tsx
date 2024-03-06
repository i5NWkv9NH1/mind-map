// ! 因为 dialog 需要点击按钮才会渲染, 所以无法使用 el 实例化 Editor
// ! 需要在 nextTick DOM 渲染完毕后进行实例化
import { mdiCloseCircleOutline, mdiContentSaveOutline, mdiNotePlusOutline } from '@mdi/js'
import { defineComponent, nextTick, ref, shallowRef } from 'vue'
import { VBtn, VCard, VCardActions, VCardText, VCardTitle, VCol, VContainer, VDialog, VIcon, VRow } from 'vuetify/components'
import { EditorCore } from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app'

export const NodeNote = defineComponent({
  name: 'NodeNote',
  setup() {
    const { isActiveNode } = storeToRefs(useAppStore())

    const dialog = ref(false)
    const editorEl = ref(null)
    const editor = shallowRef<EditorCore | null>(null)
    const note = ref('')

    // const onInitEditor = () => {
    //   // ! 需要销毁
    //   if (editor.value)
    //     editor.value = null
    //   nextTick(() => {
    //     if (!editor.value && editorEl.value) {
    //       editor.value = new EditorCore({
    //         el: editorEl.value,
    //         height: '500px',
    //         initialEditType: 'markdown',
    //         previewStyle: 'vertical',
    //       })
    //       editor.value.setMarkdown(note.value)
    //     }
    //   })
    // }

    const onInitEditor = () => {
      nextTick(() => {
        if (editorEl.value) {
          editor.value = new EditorCore({
            el: editorEl.value,
            height: '500px',
            initialEditType: 'markdown',
            previewStyle: 'vertical',
          })
          editor.value.setMarkdown(note.value)
        }
      })
    }

    const onConfirm = () => {
      const markdown = editor.value?.getMarkdown()
      console.log(markdown)
    }
    const onAbort = () => {
      dialog.value = false
    }
    const openDialog = () => {
      dialog.value = true
      onInitEditor()
    }

    return () => (
      <>
        <VDialog
          v-model={dialog.value}
          transition="slide-y-transition"
        >
          <VContainer>
            <VRow justify="center">
              <VCol cols={12} lg={10} md={10}>
                <VCard>
                  <VCardTitle>
                    备注
                  </VCardTitle>
                  <VCardText>
                    <div ref={editorEl}>Editor</div>
                  </VCardText>
                  <VCardActions>
                    <VBtn
                      // @ts-ignore
                      onClick={onAbort}
                    >
                      <VIcon start>{mdiCloseCircleOutline}</VIcon>
                      <span>取消</span>
                    </VBtn>
                    <VBtn
                      // @ts-ignore
                      onClick={onConfirm}
                      color="primary"
                    >
                      <VIcon start>{mdiContentSaveOutline}</VIcon>
                      <span>确定</span>
                    </VBtn>
                  </VCardActions>
                </VCard>
              </VCol>
            </VRow>
          </VContainer>
        </VDialog>

        <VBtn
          stacked
          disabled={!isActiveNode.value}
          // @ts-ignore
          onClick={openDialog}
        >
          <VIcon>{mdiNotePlusOutline}</VIcon>
          <span>备注</span>
        </VBtn>
      </>
    )
  },
})
