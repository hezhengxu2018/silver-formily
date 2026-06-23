import 'requestidlecallback'

export interface IIdleDeadline {
  didTimeout: boolean
  timeRemaining: () => DOMHighResTimeStamp
}

export interface IdleCallbackOptions {
  timeout?: number
}

export function requestIdle(callback: (params: IIdleDeadline) => void, options?: IdleCallbackOptions): number {
  return globalThis.requestIdleCallback(callback, options)
}

export function cancelIdle(id: number) {
  globalThis.cancelIdleCallback(id)
}
