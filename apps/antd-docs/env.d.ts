declare module '*.css'

declare const Prompts: {
  alert: (message: string) => Promise<void>
  confirm: (message: string) => Promise<boolean>
  prompt: (message: string) => Promise<string | null>
}
