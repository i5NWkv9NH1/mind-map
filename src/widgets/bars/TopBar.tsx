import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'
import { v4 as uuid } from 'uuid'
import { defineComponent, ref } from 'vue'
import { VSlideYTransition, VToolbar } from 'vuetify/components'
import {
  ChildNode,
  ContentSaveAs,
  ExportFile,
  FormatBrush,
  NodeHyperLink,
  NodeIcons,
  NodeImage,
  NodeMath,
  NodeNote,
  NodeRelativeLine,
  NodeSummary,
  NodeTags,
  OpenMindMapFile,
  PeerNode,
  Redo,
  RemoveNode,
  Undo
} from '../actions'
import './TopBar.scss'

export const TopBar = defineComponent({
  name: 'TopBar',
  setup() {
    const { mindMapConfig } = storeToRefs(useAppStore())

    const defaultActions = ref([
      { id: uuid(), component: <Undo /> },
      { id: uuid(), component: <Redo /> },
      { id: uuid(), component: <FormatBrush /> },
      { id: uuid(), component: <PeerNode /> },
      { id: uuid(), component: <ChildNode /> },
      { id: uuid(), component: <RemoveNode /> },
      { id: uuid(), component: <NodeImage /> },
      { id: uuid(), component: <NodeIcons /> },
      { id: uuid(), component: <NodeHyperLink /> },
      { id: uuid(), component: <NodeNote /> },
      { id: uuid(), component: <NodeTags /> },
      { id: uuid(), component: <NodeSummary /> },
    ])
    const _extendActions = ref([
      // { id: uuid(), component: <Folder /> },
      // { id: uuid(), component: <CreateNewMindMapFile /> },
      { id: uuid(), component: <NodeRelativeLine /> },
      { id: uuid(), component: <NodeMath /> },
      // { id: uuid(), component: <MindMapOutline /> },
      { id: uuid(), component: <OpenMindMapFile /> },
      { id: uuid(), component: <ContentSaveAs /> },
      // { id: uuid(), component: <ContentSaveAs /> },
      { id: uuid(), component: <ExportFile /> },
      // { id: uuid(), component: <ImportFile /> },
      // { id: uuid(), component: <ExportFile /> },
    ])

    return () => (
      <VSlideYTransition>
        {!mindMapConfig.value.isZenMode
          ? (
            <VToolbar
              class="top-bar"
              tag="header"
              elevation={8}
              border
              extended
              v-slots={{
                default: () => (
                  <>
                    {defaultActions.value.map(item => item.component)}
                  </>
                ),
                extension: () => (
                  <>
                    {_extendActions.value.map(item => item.component)}
                  </>
                )
              }}
            />
          )
          : <div />}
      </VSlideYTransition>
    )
  },
})
