// TODO: 完善
import { FileLogger } from "@/helpers";
import { useSettingsStore } from "@/store/settings";
import { mdiFileOutline, mdiFolderMinusOutline, mdiFolderOutline, mdiRefresh } from "@mdi/js";
import { isEmpty } from "lodash";
import { defineComponent, onMounted, ref, withModifiers } from "vue";
import { VBtn, VCard, VCardText, VIcon, VList, VListItem, VListItemSubtitle, VMenu, VVirtualScroll } from 'vuetify/components';
import { Empty } from "../common";
import { promiseTimeout } from "@vueuse/core";

export type IFIle = {
  id: string;
  name: string;
  type: 'file' | 'directory'
  handle: FileSystemDirectoryHandle | FileSystemFileHandle
  leaf: boolean
}

export const Folder = defineComponent({
  name: 'Folder',
  setup() {
    const { toggleLoading } = (useSettingsStore())

    const name = ref('')
    const dirs = ref<IFIle[]>([])
    const items = ref<IFIle[]>([])
    // const fileHandler = ref<FileSystemHandle>()

    function EmptyFolder() {
      return <Empty text={'目录为空，点击选择'} icon={mdiFolderMinusOutline} onClick={withModifiers(openFolder, ['stop'])} class={'cursor-pointer'} />
    }

    const openLocalFile = async () => {
      // @ts-ignore
      const [fileHandle] = await window.showOpenFilePicker()
      toggleLoading(true, {})
      const fileData = await fileHandle.getFile()
      await promiseTimeout(2000)
      FileLogger.debug('data', fileData)
      toggleLoading(false, {})
    }


    const openFolder = async () => {
      if (!isEmpty(items.value)) items.value = []
      try {
        const dir = await window.showDirectoryPicker()
        FileLogger.debug(dir)
        name.value = dir.name
        for await (const [key, value] of dir.entries()) {
          const isFile = value.kind === 'file'
          // TODO: 增加对文件类型的判断
          const data: IFIle = {
            id: key,
            name: value.name,
            type: value.kind,
            handle: value,
            leaf: isFile,
          }
          if (isFile) items.value!.push(data)
          else dirs.value!.push(data)
        }
        FileLogger.debug('dirs', dirs.value)
        FileLogger.debug('files', items.value)
      } catch (error) {
        if (error instanceof DOMException) {
          FileLogger.debug('user abort')
          return
        }
        name.value = ''
        FileLogger.error(error)
      }
    }

    onMounted(async () => {
    })

    return () => <VMenu
      offset={10}
      transition={'slide-y-transition'}
      closeOnContentClick={false}
      v-slots={{
        activator: ({ isActive, props }) => <VBtn
          stacked
          {...props}
        >
          <VIcon>{mdiFolderOutline}</VIcon>
          <span>目录 (TODO)</span>
        </VBtn>,
        default: () => <VCard width={300}>
          <VCardText>
            {isEmpty(name.value) ? (
              <EmptyFolder />
            ) : <VList class={'pa-0'} density={'compact'} nav slim>
              <VListItemSubtitle class={'d-flex align-center gap-2'}>
                <span>{name.value}</span>
                <VBtn
                  icon
                  size={'small'}
                  variant={'text'}
                  {...{ onClick: openFolder }}
                >
                  <VIcon >{mdiRefresh}</VIcon>
                </VBtn>
              </VListItemSubtitle>
              {isEmpty(items.value) ? (
                // # 打开的目录为空
                <VListItem><EmptyFolder /></VListItem>
              ) : (
                <>
                  {/* // TODO: Tree */}
                  <VVirtualScroll
                    class={'pt-2'}
                    items={items.value}
                    itemHeight={40}
                    maxHeight={400}
                    v-slots={{
                      default({ index, item }) {
                        return (
                          <VListItem
                            key={item.id}
                            title={item.name}
                            prependIcon={mdiFileOutline}
                            onClick={openLocalFile}
                          />
                        )
                      },
                    }}
                  />
                </>
              )
              }
            </VList>}
          </VCardText>
        </VCard>
      }}
    />
  }
})
