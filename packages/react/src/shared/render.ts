import type { ReactElement, ReactNode, ReactPortal } from 'react'
import { createElement } from 'react'
import { createPortal } from 'react-dom'

interface Env {
  portalDOM?: HTMLDivElement
}

const env: Env = {
  portalDOM: globalThis.document?.createElement?.('div'),
}

export function render(element: ReactElement): ReactPortal | ReactNode | null {
  if (globalThis.navigator?.product === 'ReactNative')
    return null
  if (env.portalDOM) {
    return createPortal(element, env.portalDOM)
  }
  return createElement('template', {}, element)
}
