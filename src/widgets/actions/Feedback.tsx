import { mdiFreebsd } from '@mdi/js'
import { useClipboard } from '@vueuse/core'
import { defineComponent, ref } from 'vue'
import { VBtn, VTooltip } from 'vuetify/lib/components/index.mjs'
import { withEventModifiers } from '@/directives'

export const FeedBack = defineComponent({
  name: 'FeedBack',
  setup() {
    const email = ref('sloananna326@gmail.com')
    const { copied, copy } = useClipboard({ source: email })

    return () => (
      <VTooltip
        transition="slide-y-transition"
        offset={10}
        openDelay={100}
        location="top"
        v-slots={{
          activator: ({ props }) => (
            <VBtn
              {...props}
              {...withEventModifiers({
                onclick: () => copy(),
              }, ['stop'])}
              text="交互、体验、Bug 反馈"
              prependIcon={mdiFreebsd}
              color="error"
              active={copied.value}
            />
          ),
          default: () => (
            <>
              <p>{email.value}</p>
              <p>点我复制邮箱地址</p>
            </>
          ),
        }}
      />
    )
  },
})
