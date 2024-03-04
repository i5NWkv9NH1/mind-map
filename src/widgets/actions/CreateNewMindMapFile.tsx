// TODO: 完善
import { defineComponent, ref } from "vue";
import { isEmpty } from "lodash";
import { mdiAlert, mdiFilePlusOutline } from "@mdi/js";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/app";
import { usePresets } from "@/composables";
import { useSettingsStore } from "@/store/settings";
import { VBtn, VIcon, VTooltip } from 'vuetify/components';
import dayjs from 'dayjs'
import { FileLogger } from "@/helpers";
import { promiseTimeout } from "@vueuse/core";

export const CreateNewMindMapFile = defineComponent({
  name: 'CreateNewMindMapFile',
  setup() {
    const { mindMap } = storeToRefs(useAppStore())
    const { toggleMessage, toggleLoading } = useSettingsStore()
    const { exampleData } = usePresets()
    const fileHandle = ref<FileSystemFileHandle>()

    const crateNewFile = async () => {
      try {
        fileHandle.value = await window.showSaveFilePicker({
          types: [
            { description: '', accept: { 'application/json': ['.smm'] } }
          ],
          suggestedName: `${dayjs(new Date()).format('YYYY-MM-DD-HH:mm') + '-默认思维导图'}`
        })
        // * 创建失败, 或许是没有权限?
        // TODO: updated
        if (!fileHandle.value) {
          toggleMessage('error', { title: '系统错误', text: '无法创建文件, 请检查您的浏览器' })
          return
        }
        // * 文件创建成功
        // * 开始写入数据
        toggleLoading(true, {})
        const json = exampleData.value.root
        const stream = await fileHandle.value.createWritable()
        await stream.write(JSON.stringify(json))
        await stream.close()
        toggleLoading(false, {})
        toggleMessage('success', { title: '通知', text: '新建文件成功' })
        // * 写入成功后替换本地数据
        FileLogger.debug('handle', fileHandle.value)
        const file = await fileHandle.value.getFile()
        FileLogger.debug('file', file)
        const fileReader = new FileReader()
        FileLogger.debug('reader', fileReader)
        fileReader.onload = async () => {
          // * commit to store
          FileLogger.info('file result', fileReader.result)
          toggleMessage('success', {
            title: '通知',
            text: `当前正在编辑你本机的【${file.name}】文件`,
            delay: 4000
          })
        }
        fileReader.readAsText(file)
      } catch (error: any) {
        // * 异常
        // * - 用户取消
        // * - 其他异常
        const errorString = error.toString() as string
        const isUserAbort = errorString.includes('aborted')
        if (isUserAbort) {
          toggleMessage('warning', { title: '消息', text: '您已取消新建文件' })
          return
        }
        toggleMessage('error', { title: '未知错误', text: `${error}` })
        FileLogger.error(error)
        return
      }
    }

    return () =>
      <VTooltip
        transition={'slide-y-transition'}
        offset={10}
        openDelay={100}
        location={'top'}
        v-slots={{
          activator: ({ isActive, props }) => (<VBtn
            stacked
            active={isActive}
            {...props}
            {...{ onClick: crateNewFile }}
          >
            <VIcon>{mdiFilePlusOutline}</VIcon>
            <span>新建 (TODO)</span>
          </VBtn>),
          default: () => (<>
            <p>使用默认数据新建文件, 之后您的修改会被实时保存</p>
            <p class={'text-red'}>
              <VIcon start>{mdiAlert}</VIcon>
              注意，将会覆盖您正在编辑的数据！
            </p>
          </>)
        }}
      />
  }
})
