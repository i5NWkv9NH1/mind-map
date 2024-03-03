declare module 'simple-mind-map/src/constants/constant' {
  type Theme = { name: string; value: string; dark: boolean }
  type Layout = { name: string; value: string; }
  export const themeList: Theme[]
  export const layoutList: Layout[]
}
