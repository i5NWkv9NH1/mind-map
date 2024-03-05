import { ref } from 'vue'

// import { transformToMarkdown } from 'simple-mind-map/src/parse/markdown.js'
/**
 * # 对文件进行处理
 */
export function useFileHandle() {
  const saveFileHandle = ref<FileSystemFileHandle>()
  const openFileHandle = ref<FileSystemFileHandle>()
  const fileReader = ref<FileReader>(new FileReader())

  function toMarkdown(file: File) {
    fileReader.value.readAsText(file)
    fileReader.value.onload = (_) => {
      try {
        const result = fileReader.value.result as (string | null)
        if (!result)
          throw new Error('File result not exist')

        const data = JSON.parse(result)
        // TODO:
        // return transformToMarkdown(data)
        return data
      }
      catch (error) {
        console.error(error)
      }
    }
  }

  return {
    saveFileHandle,
    openFileHandle,
    toMarkdown,
  }
}
