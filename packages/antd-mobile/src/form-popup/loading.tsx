import { Mask, SpinLoading } from 'antd-mobile'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'

export function startOpenLoading(loadingText = 'Loading...') {
  let dispose: (() => void) | undefined
  const timer = setTimeout(() => {
    const host = document.createElement('div')
    document.body.append(host)
    const root = createRoot(host)
    dispose = () => {
      root.unmount()
      host.remove()
    }
    flushSync(() => root.render(
      <Mask visible opacity={0} disableBodyScroll getContainer={null}>
        <div className="adm-formily-form-popup-loading" role="status">
          <SpinLoading color="white" />
          <div>{loadingText}</div>
        </div>
      </Mask>,
    ))
  }, 100)

  return () => {
    clearTimeout(timer)
    dispose?.()
    dispose = undefined
  }
}
