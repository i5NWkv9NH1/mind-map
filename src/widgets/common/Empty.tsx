import { mdiBedEmpty } from '@mdi/js';
import { VAvatar, VIcon, VSheet } from 'vuetify/lib/components/index.mjs'

export interface EmptyProps {
  size: number;
  icon: string;
  text: string;
}

export function Empty(props: EmptyProps) {
  return (
    <VSheet class="fill-height d-flex justify-center align-center flex-column" style={{ opacity: '.5' }}>
      <VAvatar size={props.size}>
        <VIcon size={props.size}>
          {mdiBedEmpty}
        </VIcon>
      </VAvatar>
      <div class="text-body-1">{props.text}</div>
    </VSheet>
  )
}
