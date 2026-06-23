import { isFn } from './types'

export interface ISubscriber<Payload = any> {
  (payload: Payload): void | boolean
}

export class Subscribable<ExtendsType = any> {
  private unsubscribeIds = new WeakMap<() => void, number>()

  private subscribers: {
    index?: number
    [key: number]: ISubscriber
  } = {
    index: 0,
  }

  dispatch<T extends ExtendsType = any>(event: T, context?: any) {
    let interrupted = false
    for (const key in this.subscribers) {
      if (isFn(this.subscribers[key])) {
        ;(event as T & { context?: any }).context = context
        if (this.subscribers[key](event) === false) {
          interrupted = true
        }
      }
    }
    return !interrupted
  }

  subscribe(subscriber: ISubscriber): () => void {
    let id: number
    if (isFn(subscriber)) {
      id = this.subscribers.index + 1
      this.subscribers[id] = subscriber
      this.subscribers.index++
    }

    const unsubscribe = () => {
      this.unsubscribe(id)
    }
    this.unsubscribeIds.set(unsubscribe, id)

    return unsubscribe
  }

  unsubscribe = (id?: number | string | (() => void)) => {
    if (id === undefined || id === null) {
      for (const key in this.subscribers) {
        this.unsubscribe(key)
      }
      return
    }
    if (!isFn(id)) {
      delete this.subscribers[id]
    }
    else {
      const unsubscribeId = this.unsubscribeIds.get(id)
      if (unsubscribeId !== undefined) {
        delete this.subscribers[unsubscribeId]
        this.unsubscribeIds.delete(id)
      }
    }
  }
}
