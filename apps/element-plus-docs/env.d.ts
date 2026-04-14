/// <reference types="vite/client" />
/// <reference types="vitepress/client" />

declare module '*.css'
declare module '*.scss'

interface ImportMetaEnv {
  readonly SSR: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
