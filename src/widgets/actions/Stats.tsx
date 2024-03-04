import type { MindMapData, MindMapNode } from "@/@types";
import { useAppStore } from "@/store/app";
import { isEmpty } from "lodash";
import { storeToRefs } from "pinia";
import { defineComponent, onMounted, ref } from "vue";

export const Stats = defineComponent({
  name: 'Stats',
  setup() {
    const words = ref(100)
    const nodes = ref(40)
    const textStr = ref('')
    const { mindMap } = storeToRefs(useAppStore())

    const onDataChange = (data: MindMapData['root']) => {
      const walk = (_data: MindMapData['root']) => {
        nodes.value++
        textStr.value += String(_data.data.text) || ''
        if (isEmpty(_data.children)) {
          return
        }
        _data.children.forEach((item: MindMapData['root']) => {
          walk(item)
        })
      }

      textStr.value = ''
      words.value = 0
      nodes.value = 0
      const countEl = document.createElement('div')
      walk(data)
      countEl.innerHTML = textStr.value
      words.value = countEl.textContent!.length
    }

    onMounted(() => {
      mindMap.value?.on('data_change', onDataChange)
      // # 在数据改变前先执行一次, 获取数据
      // @ts-ignore
      onDataChange(mindMap.value?.getData())
    })

    return () => (
      <div class={'px-4 d-flex align-center gap-4 text-subtitle-2 text-teal'}>
        <div>
          <span>字数：</span>
          <span>{words.value}</span>
        </div>
        <div>
          <span>节点数：</span>
          <span>{nodes.value}</span>
        </div>
      </div>
    )
  }
})
