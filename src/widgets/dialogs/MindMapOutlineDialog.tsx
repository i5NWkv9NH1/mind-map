import { useAppStore } from "@/store";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { VBtn, VCard, VCardActions, VCardText, VDialog } from "vuetify/components";

export default defineComponent({
  name: 'MindMapOutlineDialog',
  setup() {
    const { mindMapData, mindMapOutlineDialog } = storeToRefs(useAppStore())

    const tree = (_: any) => {
      let marginLeft = 0
      if (_.children.length > 0) {
        marginLeft += 16
        return (
          <ul class={'items'} style={{ marginLeft: marginLeft + 'px' }}>
            {_.children.map((item: any) => (
              <li>
                {item.data.text}
                {tree(item)}
              </li>
            ))}
          </ul>
        )
      }
    }

    return () => (
      <VDialog
        v-model={mindMapOutlineDialog.value.status}
        transition={'scroll-y-transition'}
        fullscreen
      >
        <VCard>
          <VCardText>
            <ul>
              {[mindMapData.value].map((item, index) => (
                <li key={index} data-text={item.data.text}>
                  {item.data.text}
                  {tree(item)}
                </li>
              ))}
            </ul>
          </VCardText>
          <VCardActions>
            <VBtn
              //@ts-ignore
              onClick={() => mindMapOutlineDialog.value.status = false}
            >
              关闭
            </VBtn>
          </VCardActions>
        </VCard>
      </VDialog>
    )
  }
})
