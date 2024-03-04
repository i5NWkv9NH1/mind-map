import { useSettingsStore } from "@/store/settings";
import { mdiClose } from "@mdi/js";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { VBtn, VIcon, VSnackbar } from "vuetify/lib/components/index.mjs";

export const GlobalMessage = defineComponent({
  name: "Message",
  setup() {
    const { message } = storeToRefs(useSettingsStore())

    return () => (
      <VSnackbar
        v-model={message.value.status}
        closeDelay={message.value.delay}
        transition={'slide-y-transition'}
        location={'top end'}
        color={message.value.color}
        vertical
        v-slots={{
          actions: () => <VBtn
            //@ts-ignore
            onClick={() => message.value.status = false}
            variant={'text'}
          >
            <VIcon start>{mdiClose}</VIcon>
            <span>关闭</span>
          </VBtn>,
          default: () => <>
            <div class={'text-subtitle-1 pb-2'}>{message.value.title}</div>
            {message.value.text && (<p>{message.value.text}</p>)}
          </>
        }}
      />
    )
  }
})
