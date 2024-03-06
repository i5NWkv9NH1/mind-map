declare module 'simple-mind-map/src/constants/constant' {
  interface Theme { name: string, value: string, dark: boolean }
  interface Layout { name: string, value: string }
  export const themeList: Theme[]
  export const layoutList: Layout[]
}
