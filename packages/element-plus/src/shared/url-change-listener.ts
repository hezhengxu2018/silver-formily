const URL_CHANGE_EVENT = 'silver-formily:url-change'

type UrlChangeListener = () => void
type HistoryMethodName = 'pushState' | 'replaceState'

let subscriberCount = 0
let teardownGlobalListener: (() => void) | undefined

function dispatchUrlChange() {
  window.dispatchEvent(new Event(URL_CHANGE_EVENT))
}

function patchHistoryMethod(methodName: HistoryMethodName) {
  const originalMethod = window.history[methodName]

  window.history[methodName] = function (...args) {
    const result = originalMethod.apply(this, args)
    dispatchUrlChange()
    return result
  }

  return () => {
    window.history[methodName] = originalMethod
  }
}

function ensureUrlChangeEmitter() {
  if (teardownGlobalListener || typeof window === 'undefined')
    return

  const onNativeUrlChange = () => {
    dispatchUrlChange()
  }
  const restorePushState = patchHistoryMethod('pushState')
  const restoreReplaceState = patchHistoryMethod('replaceState')

  window.addEventListener('popstate', onNativeUrlChange)
  window.addEventListener('hashchange', onNativeUrlChange)

  teardownGlobalListener = () => {
    restorePushState()
    restoreReplaceState()
    window.removeEventListener('popstate', onNativeUrlChange)
    window.removeEventListener('hashchange', onNativeUrlChange)
    teardownGlobalListener = undefined
  }
}

export function onUrlChange(listener: UrlChangeListener) {
  if (typeof window === 'undefined') {
    return () => {}
  }

  ensureUrlChangeEmitter()
  subscriberCount += 1
  window.addEventListener(URL_CHANGE_EVENT, listener)

  return () => {
    if (subscriberCount > 0)
      subscriberCount -= 1

    window.removeEventListener(URL_CHANGE_EVENT, listener)
    if (subscriberCount === 0)
      teardownGlobalListener?.()
  }
}
