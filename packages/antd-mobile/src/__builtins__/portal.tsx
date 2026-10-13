import { Observer } from '@silver-formily/react'
import { observable } from '@silver-formily/reactive'
import React, { Fragment } from 'react'
import { createPortal } from 'react-dom'
import { createRoot } from 'react-dom/client'

export interface IPortalProps {
  id?: string | symbol
}

const PortalMap = observable(new Map<string | symbol, React.ReactNode>())

export function createPortalProvider(defaultId: string | symbol) {
  const Portal = ({
    id = defaultId,
    children,
  }: React.PropsWithChildren<IPortalProps>) => {
    if (id && !PortalMap.has(id)) {
      PortalMap.set(id, null)
    }

    return (
      <Fragment>
        {children}
        <Observer>
          {() => {
            if (!id)
              return <></>
            const portal = PortalMap.get(id)
            if (portal)
              return createPortal(portal, document.body)
            return <></>
          }}
        </Observer>
      </Fragment>
    )
  }
  return Portal
}

export function createPortalRoot<T extends React.ReactNode>(
  host: HTMLElement,
  id: string,
) {
  const root = host ? createRoot(host) : null

  function render(renderer?: () => T) {
    if (PortalMap.has(id)) {
      PortalMap.set(id, renderer?.())
    }
    else if (root) {
      root.render(<Fragment>{renderer?.()}</Fragment>)
    }
  }

  function unmount() {
    if (PortalMap.has(id)) {
      PortalMap.set(id, null)
    }
    else if (root) {
      root.unmount()
      host.parentNode?.removeChild(host)
    }
  }

  return {
    render,
    unmount,
  }
}
