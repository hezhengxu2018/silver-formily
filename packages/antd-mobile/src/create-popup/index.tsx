import type { ComponentType } from 'react'
import type { PopupController, PopupOptions, PopupPromptProps, PopupResult } from './types'
import { Popup, SafeArea } from 'antd-mobile'
import { createElement } from 'react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import './style.less'

export type { PopupContentCallbacks, PopupController, PopupOptions, PopupPromptProps, PopupResult } from './types'

interface PopupSession<TResult> {
  promise: Promise<TResult | null>
  close: () => void
}

export function createPopup<TComponent extends ComponentType<any>, TResult = PopupResult<TComponent>>(
  component: TComponent,
  options: PopupOptions = {},
): PopupController<TComponent, TResult> {
  const { safeArea = true, ...popupOptions } = options
  type Result = Exclude<TResult, null>
  let active: PopupSession<Result> | undefined

  return {
    prompt(props: PopupPromptProps<TComponent, TResult>) {
      if (active)
        return active.promise

      const { onConfirm, onCancel, onClose, ...contentProps } = props
      const host = document.createElement('div')
      host.className = 'adm-formily-popup-root'
      document.body.append(host)
      const root = createRoot(host)
      let settled = false
      let disposed = false
      let resolve!: (value: Result | null) => void
      const promise = new Promise<Result | null>((done) => {
        resolve = done
      })
      const session: PopupSession<Result> = { promise, close: () => settle(null) }
      active = session

      function dispose() {
        if (disposed)
          return
        disposed = true
        // afterClose can run inside React's commit phase.
        queueMicrotask(() => {
          root.unmount()
          host.remove()
        })
      }

      function settle(value: Result | null, notify?: () => void) {
        if (settled)
          return
        settled = true
        if (active === session)
          active = undefined
        try {
          try {
            notify?.()
          }
          finally {
            onClose?.()
          }
        }
        finally {
          resolve(value)
          // Let the opening spring advance before reversing it. Otherwise a
          // same-tick close may never emit afterClose because it never moved.
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (!disposed)
                render(false)
            })
          })
        }
      }

      const content = createElement(component, {
        ...contentProps,
        onConfirm: (value: Result) => settle(value, () => onConfirm?.(value)),
        onCancel: () => settle(null, onCancel),
      })

      function render(visible: boolean) {
        flushSync(() => root.render(
          <Popup
            position="bottom"
            closeOnMaskClick
            getContainer={null}
            {...popupOptions}
            visible={visible}
            forceRender={false}
            destroyOnClose
            onMaskClick={() => {
              if (options.closeOnMaskClick !== false)
                settle(null, onCancel)
            }}
            onClose={() => settle(null, onCancel)}
            afterClose={() => {
              if (!settled || disposed)
                return
              try {
                options.afterClose?.()
              }
              finally {
                dispose()
              }
            }}
          >
            <div className="adm-formily-popup-content">{content}</div>
            {safeArea && <SafeArea position="bottom" />}
          </Popup>,
        ))
      }

      // Mount hidden first so the initial opening is animated.
      try {
        render(false)
        render(true)
      }
      catch (error) {
        settled = true
        if (active === session)
          active = undefined
        dispose()
        throw error
      }
      return promise
    },
    close() {
      active?.close()
    },
  }
}

export default createPopup
