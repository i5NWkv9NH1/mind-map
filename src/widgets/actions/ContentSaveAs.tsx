// TODO: 完善
import { useAppStore } from "@/store/app";
import { mdiContentSaveOutline } from "@mdi/js";
import { storeToRefs } from "pinia";
import { defineComponent, ref } from "vue";
import { VBtn, VIcon, VTooltip } from 'vuetify/components';
import dayjs from 'dayjs'
import { useSettingsStore } from "@/store/settings";
import { FileLogger } from "@/helpers";

export const ContentSaveAs = defineComponent({
  name: 'ContentSaveAs',
  setup() {
    const { mindMapData } = storeToRefs(useAppStore())
    const { toggleLoading, toggleMessage } = useSettingsStore()
    const fileHandle = ref<FileSystemFileHandle>()
    // * 获取数据
    // * 保存文件
    const onContentSave = async () => {
      try {
        fileHandle.value = await window.showSaveFilePicker({
          types: [
            {
              description: '',
              accept: { 'application/json': ['.smm'] }
            }
          ],
          suggestedName: `${dayjs(new Date()).format('YYYY-MM-DD-HH:mm') + '-思维导图'}`
        })
        if (!fileHandle.value) {
          toggleMessage('error', { title: '系统错误', text: '无法保存文件, 请检查您的浏览器' })
          return
        }
        toggleLoading(true, {})
        const json = mindMapData.value
        const stream = await fileHandle.value.createWritable()
        await stream.write(JSON.stringify(json))
        await stream.close()
        toggleLoading(false, {})
        toggleMessage('success', { title: '通知', text: '保存文件成功' })
      } catch (error: any) {
        // * 异常
        // * - 用户取消
        // * - 其他异常
        const errorString = error.toString() as string
        const isUserAbort = errorString.includes('aborted')
        if (isUserAbort) {
          toggleMessage('warning', { title: '消息', text: '您已取消保存文件' })
          return
        }
        toggleMessage('error', { title: '未知错误', text: `${error}` })
        FileLogger.error(error)
        return
      }
    }


    return () => (
      <VTooltip
        transition={'slide-y-transition'}
        offset={10}
        openDelay={100}
        location={'top'}
        v-slots={{
          activator: ({ isActive, props }) => (<VBtn
            stacked
            active={isActive}
            {...{ onClick: onContentSave }}
            {...props}
          >
            <VIcon>{mdiContentSaveOutline}</VIcon>
            <span>另存为</span>
          </VBtn>),
          default: () => <p>对您编辑的数据保存为文件</p>
        }}
      />
    )
  }
})
