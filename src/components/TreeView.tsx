import { computed } from '@vue/reactivity'
import { mdiChevronDown, mdiChevronRight, mdiTreeOutline } from '@mdi/js'
import { defineComponent, ref } from 'vue'
import { VList, VListItem, VListItemTitle, VTextField } from 'vuetify/components'
import type { PropType } from 'vue'
import type { MindMapRoot } from '@/@types'

// import { generateRandomData } from '@/helpers'

export const TreeView = defineComponent({
  name: 'TreeView',
  props: {
    tree: {
      type: Object as PropType<MindMapRoot>,
      required: true,
    },
  },
  setup(props: any) {
    function TreeItem({ node, level }: { node: any, level: number }) {
      const isOpen = ref(true)
      const isEditing = ref(false)
      const text = ref(node.data.text)
      const onToggleNode = () => isOpen.value = !isOpen.value
      const isHasChild = computed(() => node.children && node.children.length > 0)
      isHasChild.value && (level += 1)

      return (
        <>
          {/* @ts-ignre */}
          <VListItem
            // {...withEventModifiers({
            //   onclick: () => onToggleNode(),
            // }, ['stop'])}
            onClick={() => onToggleNode()}
            prependIcon={isHasChild.value ? (isOpen.value ? mdiChevronDown : mdiChevronRight) : mdiTreeOutline}
            data-level={level}
            style={{
              // paddingLeft: isHasChild.value ? `` : `${(level) * 32}px`,
            }}
          >
            <VListItemTitle>
              {isEditing.value
                ? (
                  <VTextField v-model={text.value} />
                )
                : (
                  <p>{node.label}</p>
                )}
            </VListItemTitle>
          </VListItem>
          {isHasChild.value && (
            <>
              {isOpen.value && (
                <VList
                  density="compact"
                  nav
                >
                  {node.children.map((child: any) => {
                    return <TreeItem node={child} level={level} />
                  })}
                </VList>
              )}
            </>
          )}
        </>
      )
    }

    // const treeData = ref(generateRandomData(5, 3))

    // console.log(treeData.value)

    // const modelValue = ref([])

    // watch(modelValue, () => {
    //   console.log('updated modelValue', modelValue.value)
    // })

    return () => (
      <VList density="compact" nav>
        <TreeItem node={props.tree} level={0} />
      </VList>
    )
  },
})
