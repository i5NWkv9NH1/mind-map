// TODO: support multiple nodes seleceted
// TODO: update web url support
import { mdiCloseCircleOutline, mdiContentSaveOutline, mdiImagePlusOutline } from '@mdi/js'
import { defineComponent, onBeforeMount, onMounted, ref } from 'vue'
import { VBtn, VCard, VCardActions, VCardText, VCardTitle, VCol, VContainer, VDialog, VIcon, VRow } from 'vuetify/components'
import { storeToRefs } from 'pinia'
import { isEmpty } from 'lodash'

// @ts-ignore
import { getImageSize } from 'simple-mind-map/src/utils/index'
import { DragUpload } from '@/components'

// import { useSettingsStore } from '@/store/settings'
// import { useMindMap } from '@/composables'
import { useAppStore } from '@/store/app'
import { useMindMap } from '@/composables'
import type { MindMapNode } from '@/@types'

export const NodeImage = defineComponent({
  name: 'NodeImage',
  setup() {
    const { activeNodes, mindMap } = useMindMap()
    // const { toggleMessage } = useSettingsStore()
    const { isActiveNode } = storeToRefs(useAppStore())

    const _tab = ref(0)
    const dialog = ref(false)
    const fileSrc = ref<string | ArrayBuffer>('')

    const fileName = ref('')
    const _webUrl = ref('')
    // ? 还原
    const temp = ref(fileSrc.value)

    const onAbort = () => {
      if (isActiveNode.value) {
        fileSrc.value = temp.value
        dialog.value = false
        return
      }
      dialog.value = false
    }
    const onConfirm = async () => {
      if (isEmpty(activeNodes.value))
        return
      if (!fileSrc.value) {
        activeNodes.value!.forEach((node) => {
          node.setImage(null)
        })
        dialog.value = false
        return
      }
      // TODO: 判断使用文件还是网络图片
      const { width, height } = await getImageSize(fileSrc.value)
      activeNodes.value!.forEach((node) => {
        node.setImage({
          url: fileSrc.value,
          title: fileName.value,
          width,
          height,
        })
      })

      dialog.value = false
    }

    // watch(activeNodes, () => {
    //   if (activeNodes.value) {
    //     const image = activeNodes.value![0].getData('image') as string || ''
    //     const imageTitle = activeNodes.value![0].getData('imageTitle') || ''
    //     // ! 判断是哪种类型的图片
    //     fileSrc.value = image
    //     fileName.value = imageTitle
    //   }
    // }, { immediate: true })

    function getNodeImage(_node: MindMapNode, _nodes: MindMapNode[]) {
      if (!_nodes)
        return
      if (_nodes.length <= 0)
        return
      if (!_nodes[0])
        return
      const image = _nodes[0].getData('image')
      fileSrc.value = image
    }

    onMounted(() => {
      mindMap.value?.on('node_active', getNodeImage)
    })

    onBeforeMount(() => {
      mindMap.value?.off('node_active', getNodeImage)
    })

    return () => (
      <>
        <VDialog
          v-model={dialog.value}
          // transition="dialog-bottom-transition"
          transition="slide-y-transition"
          persistent
        >
          <VContainer class="fill-height">
            <VRow class="fill-height" justify="center" align="center">
              <VCol cols={12} lg={6} md={8} sm={8}>
                <VCard>
                  <VCardTitle>添加图片</VCardTitle>
                  <VCardText>
                    <DragUpload
                      src={fileSrc.value}
                      name={fileName.value}
                      // @ts-ignore
                      onUpdate:name={name => fileName.value = name}
                      // @ts-ignore
                      onUpdate:src={(src) => {
                        fileSrc.value = src
                      }}
                    />
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
          active={dialog.value}
          color={dialog.value ? 'primary' : 'default'}
          disabled={!isActiveNode.value}
          // @ts-ignore
          onClick={() => {
            dialog.value = true
          }}
        >
          <VIcon>{mdiImagePlusOutline}</VIcon>
          <span>图片</span>
        </VBtn>
      </>
    )
  },
})
