/// <reference types="vite/client" />
/// <reference types="vitepress/client" />

declare module '*.vue' {
  const component: any
  export default component
}

declare module '*.css'
declare module '*.less'
