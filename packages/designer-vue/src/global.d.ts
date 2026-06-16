/// <reference types="vitest/browser" />

declare module '*.css'

declare module 'vitest/browser' {
  interface BrowserCommands {
    dragByHtml5: (
      sourceSelector: string,
      targetSelector: string,
    ) => Promise<{
      activeElement: {
        className: string
        dataset: Record<string, string>
        tagName: string
      } | null
      sourceExists: boolean
      targetExists: boolean
    }>
    dragByPointer: (
      sourceSelector: string,
      targetSelector: string,
    ) => Promise<{
      activeElement: {
        className: string
        dataset: Record<string, string>
        tagName: string
      } | null
      draggableCount: number
      droppableCount: number
      elementAtTargetPoint: string | null
      previewCount: number
      sourceCenter: {
        x: number
        y: number
      }
      targetCenter: {
        x: number
        y: number
      }
    }>
    inspectPointerDrag: (
      sourceSelector: string,
      targetSelector: string,
    ) => Promise<{
      activeElement: {
        className: string
        dataset: Record<string, string>
        tagName: string
      } | null
      draggableCount: number
      droppableCount: number
      previewCount: number
      source: {
        className?: string
        count: number
        dataset?: Record<string, string>
        exists: boolean
        rect?: {
          height: number
          width: number
          x: number
          y: number
        }
        selector: string
      }
      sourceCenter: {
        x: number
        y: number
      }
      target: {
        className?: string
        count: number
        dataset?: Record<string, string>
        exists: boolean
        rect?: {
          height: number
          width: number
          x: number
          y: number
        }
        selector: string
      }
      targetCenter: {
        x: number
        y: number
      }
    }>
  }
}
