import type { PropType } from 'vue'
import { ref, watch } from 'vue'
import { VList, VListItem, VListItemTitle, VTextField } from 'vuetify/components'
import { computed } from '@vue/reactivity'
import { mdiChevronDown, mdiChevronRight } from '@mdi/js'
import type { MindMapRoot } from '@/@types'
import { generateRandomData } from '@/helpers'

export const TreeView = defineComponent({
  name: 'TreeView',
  props: {
    tree: {
      type: Object as PropType<MindMapRoot>,
      required: true,
    },
  },
  setup(props) {
    function TreeItem({ node }) {
      const isOpen = ref(false)
      const isEditing = ref(false)
      const text = ref(node.data.text)

      const onToggleNode = () => isOpen.value = !isOpen.value
      const onStartEdit = () => isEditing.value = true
      const onSaveEdit = () => {
        node.data.text = text.value
        isEditing.value = false
      }
      const onCalcenEdit = () => {
        text.value = node.data.text
        isEditing.value = false
      }

      const isHasChild = computed(() => node.children && node.children.length > 0)

      return (
        <VList
          // value={node.name}
          id="tree-item"
          style={{ paddingLeft: `${node.level * 20}px` }}
          v-slots={{
            default: () => (
              <>
                <VListItem id="node" onClick={() => { onToggleNode() }} prependIcon={isHasChild.value ? (isOpen.value ? mdiChevronDown : mdiChevronRight) : ''}>
                  <VListItemTitle>
                    {isEditing.value
                      ? (
                        <VTextField v-model={text.value} />
                        )
                      : (
                        <p>{node.data.text}</p>
                        )}
                  </VListItemTitle>

                </VListItem>
                {isHasChild.value && (
                  <>
                    {isOpen.value && (
                      <VListItem id="children">
                        {node.children.map((child) => {
                          return <TreeItem node={child} />
                        })}
                      </VListItem>
                    )}
                  </>
                )}
              </>
            ),
          }}
        />
      )
    }

    const treeData = ref(generateRandomData(5, 3))

    console.log(treeData.value)

    const modelValue = ref([])

    watch(modelValue, () => {
      console.log('updated modelValue', modelValue.value)
    })

    return () => (
      <TreeItem node={props.tree} />
    )
  },
})
