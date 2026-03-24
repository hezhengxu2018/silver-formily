declare module '*.vue' {
  const component: any
  export default component
}

declare const Prompts: {
  alert: (message: string) => Promise<void>
  confirm: (message: string) => Promise<boolean>
  prompt: (message: string) => Promise<string | null>
}
