import type { ComponentPublicInstance } from 'vue'

export type DialogLikeInstance = ComponentPublicInstance<{ dialogContentRef?: ComponentPublicInstance | null }> | null

type OverlayLikeInstance = ComponentPublicInstance & {
  exposed?: Record<string, any>
  $refs?: Record<string, any>
  dialogContentRef?: ComponentPublicInstance | null
}

function toHTMLElement(target: unknown): HTMLElement | null {
  if (target instanceof HTMLElement)
    return target

  const element = (target as { $el?: unknown } | null | undefined)?.$el
  return element instanceof HTMLElement ? element : null
}

export function resolveDialogElement(instance: DialogLikeInstance): HTMLElement | null {
  const vm = instance as OverlayLikeInstance | null
  return toHTMLElement(vm?.dialogContentRef)
    ?? toHTMLElement(vm?.exposed?.dialogContentRef)
    ?? toHTMLElement(vm)
}

export function resolveDrawerElement(instance: ComponentPublicInstance | null): HTMLElement | null {
  const vm = instance as OverlayLikeInstance | null
  return toHTMLElement(vm?.exposed?.drawerRef)
    ?? toHTMLElement(vm?.$refs?.drawerRef)
    ?? toHTMLElement(vm)
}
