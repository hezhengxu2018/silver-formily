declare module '*.vue' {
  const component: any
  export default component
}

declare const Prompts: {
  alert: (message: string) => Promise<void>
  confirm: (message: string) => Promise<boolean>
  prompt: (message: string) => Promise<string | null>
}

interface ImportMetaEnv {
  readonly VITE_UPLOAD_API_BASE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
