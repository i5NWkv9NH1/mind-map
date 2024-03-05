export declare const block: readonly ['top', 'bottom']
export declare const inline: readonly ['start', 'end', 'left', 'right']
export type Tblock = typeof block[number]
export type Tinline = typeof inline[number]
export type Anchor = Tblock | Tinline | 'center' | 'center center' | `${Tblock} ${Tinline | 'center'}` | `${Tinline} ${Tblock | 'center'}`
