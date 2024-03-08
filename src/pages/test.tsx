import { defineComponent, ref } from 'vue'
import { VCard, VCardText, VContainer, VIcon } from 'vuetify/lib/components/index.mjs'
import { mdiChevronDown, mdiChevronRight } from '@mdi/js'
import { mdiPencil } from '@mdi/js/commonjs/mdi'

export default defineComponent({
  name: 'Test',
  setup() {
    const generateRandomData = (depth = 6, maxChildren = 6) => {
      const generateNode = (id, level) => ({
        id,
        name: `Node ${id}`,
        children: level < depth
          ? Array.from({ length: Math.floor(Math.random() * maxChildren) + 1 }, (_, i) =>
            generateNode(id * 10 + i + 1, level + 1))
          : [],
      })

      return generateNode(1, 1)
    }

    const treeData = ref(generateRandomData(5, 3))

    const TreeItem = defineComponent({
      props: {
        node: {},
      },
      setup(props) {
        const isOpen = ref(false)
        const isEditing = ref(false)
        const editedText = ref(props.node.name)

        const toggleNode = () => {
          isOpen.value = !isOpen.value
        }

        const startEditing = () => {
          isEditing.value = true
        }

        const saveEdit = () => {
          props.node.name = editedText.value
          isEditing.value = false
        }

        const cancelEdit = () => {
          editedText.value = props.node.name
          isEditing.value = false
        }

        return () => (
          <div class="tree-item" style={{ paddingLeft: `${props.node.level * 20}px` }}>
            <div class="node">
              {isEditing.value
                ? (
                  <div>
                    <input v-model={editedText.value} />
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </div>
                  )
                : (
                  <div>
                    {props.node.name}
                    <span onClick={() => {
                      console.log('start edit')
                      startEditing()
                    }}
                    >
                      <VIcon>{mdiPencil}</VIcon>
                    </span>
                  </div>
                  )}
            </div>
            {props.node.children && props.node.children.length > 0 && (
              <div class="children">
                <span onClick={() => { toggleNode() }}>
                  <VIcon>
                    { isOpen.value ? mdiChevronDown : mdiChevronRight }
                  </VIcon>
                </span>
                {isOpen.value && (
                  <div>
                    {props.node.children.map(child => (
                      <TreeItem node={child} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )
      },
    })

    const flattenTree = (node, level = 0) => {
      if (!node.children)
        return [{ ...node, level }]

      return [
        { ...node, level },
        ...node.children.flatMap(child => flattenTree(child, level + 1)),
      ]
    }

    const flatTree = ref(flattenTree(treeData.value))
    console.log(flatTree.value)

    return () => (
      <VContainer>
        <VCard>
          <VCardText>
            <TreeItem node={treeData.value} />
          </VCardText>
        </VCard>
      </VContainer>
    )
  },
})
