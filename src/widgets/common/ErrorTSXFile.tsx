import { defineComponent } from 'vue'

export const ErrorTSXFile = defineComponent({
  name: 'Error',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <div class="text-error text-h6">
        {props.name}
        .tsx Error
      </div>
    )
  },
})
