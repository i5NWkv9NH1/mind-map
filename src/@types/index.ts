export * from './mind-map'

export interface Action {
  uid: string
  name: string
  icon?: string
  action: () => void
}
export type ContentAction = Action & {
  disabled: () => boolean
  // disabled: boolean
}
export type NodeAction = Action & {
  disabled: () => boolean
}
export type MapAction = Action
