// TODO: 完善
import { mdiFileUploadOutline } from '@mdi/js'
import { defineComponent, ref } from 'vue'
import { VBtn, VIcon, VTooltip } from 'vuetify/components'
import { useSettingsStore } from '@/store/settings'
import { FileLogger } from '@/helpers'

export const OpenMindMapFile = defineComponent({
  name: 'OpenMindMapFile',
  setup() {
    const { toggleMessage } = useSettingsStore()
    const fileHandle = ref<FileSystemFileHandle>()

    const openLocalFile = async () => {
      try {
        [fileHandle.value] = await window.showOpenFilePicker({
          types: [
            {
              description: '',
              accept: {
                'application/json': ['.smm'],
              },
            },
          ],
          excludeAcceptAllOption: true,
          multiple: false,
        })
        if (!fileHandle.value) {
          toggleMessage('error', { title: '系统错误', text: '无法打开文件, 请检查您的浏览器' })
          return
        }
        const file = await fileHandle.value.getFile()
        const isSmFile = /\.(smm|xmind|md|json)$/.test(file.name)
        if (!isSmFile) {
          toggleMessage('error', { title: '通知', text: '非 .sm 文件, 文件类型错误' })
          return
        }
        FileLogger.debug('file', file)
        const fileReader = new FileReader()
        FileLogger.debug('reader', fileReader)
        fileReader.onload = async () => {
          // * commit to store
          FileLogger.info('file result', fileReader.result)
          toggleMessage('success', {
            title: '通知',
            text: `当前正在编辑你本机的【${file.name}】文件`,
            delay: 4000,
          })
        }
        fileReader.readAsText(file)
      }
      catch (error: any) {
        const errorString = error.toString() as string
        const isUserAbort = errorString.includes('aborted')
        if (isUserAbort) {
          toggleMessage('warning', { title: '消息', text: '您已取消新建文件' })
          return
        }
        toggleMessage('error', { title: '未知错误', text: `${error}` })
        FileLogger.error(error)
      }
    }

    return () => (
      <VTooltip
        transition="slide-y-transition"
        offset={10}
        openDelay={100}
        location="top"
        v-slots={{
          activator: ({ isActive, props }) => (
            <VBtn
              stacked
              active={isActive}
              {...props}
              {...{ onClick: openLocalFile }}
            >
              <VIcon>{mdiFileUploadOutline}</VIcon>
              <span>打开</span>
            </VBtn>
          ),
          default: () => <p>打开本地的 SM 文件</p>,
        }}
      />
    )
  },
})
