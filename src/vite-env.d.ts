/// <reference types="vite/client" />
import type katex from 'katex'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<Record<string, any>, Record<string, any>, any>
  export default component
}

// # Declare Katex global
// # because it not inject css and js when `set base in vite.config.ts`
declare global {
  interface Window {
    katex: katex
  }
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly BASE_URL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
