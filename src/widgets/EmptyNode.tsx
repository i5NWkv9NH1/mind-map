import { VAvatar, VIcon, VSheet } from 'vuetify/lib/components/index.mjs'

export function EmptyNode(props: {
  size: number
  icon: string
  text: string
}) {
  return (
    <VSheet class="fill-height d-flex justify-center align-center flex-column" style={{ opacity: '.5' }}>
      <VAvatar size={props.size}>
        <VIcon size={props.size}>{props.icon}</VIcon>
      </VAvatar>
      {/** @ts-ignore */}
      <div class="text-body-1">{props.text}</div>
    </VSheet>
  )
}
