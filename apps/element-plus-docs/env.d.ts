/// <reference types="vite/client" />
/// <reference types="vitepress/client" />

interface ImportMetaEnv {
  readonly SSR: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
