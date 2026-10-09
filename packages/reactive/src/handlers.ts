import { ProxyRaw, RawProxy } from './environment'
import { isObservable, isSupportObservable } from './externals'
import { createObservable } from './internals'
import {
  bindTargetKeyWithCurrentReaction,
  runReactionsFromTargetKey,
} from './reaction'

const wellKnownSymbols = new Set(
  Object.getOwnPropertyNames(Symbol).reduce((buf: symbol[], key) => {
    if (key === 'arguments' || key === 'caller')
      return buf
    const value = Symbol[key]
    if (typeof value === 'symbol')
      return buf.concat(value)
    return buf
  }, []),
)

const hasOwnProperty = Object.prototype.hasOwnProperty

// Map/Set 原型方法在 instrumentation 里的统一消费面（Reflect.getPrototypeOf 返回 any，
// 断言到该接口收口；运行时 target 只会是 Map/Set）
interface CollectionProto {
  has: (key: PropertyKey) => boolean
  get: (key: PropertyKey) => unknown
  set: (key: PropertyKey, value: unknown) => unknown
  add: (key: PropertyKey) => unknown
  delete: (key: PropertyKey) => boolean
  clear: () => void
  forEach: (cb: (value: unknown, key: PropertyKey, source: unknown) => void, thisArg?: unknown) => void
  keys: () => IterableIterator<PropertyKey>
  values: () => IterableIterator<unknown>
  entries: () => IterableIterator<[PropertyKey, unknown]>
  [Symbol.iterator]: () => IterableIterator<unknown>
}

function findObservable(target: object, key: PropertyKey, value: unknown) {
  const observableObj = RawProxy.get(value as object)
  if (observableObj) {
    return observableObj
  }
  if (!isObservable(value) && isSupportObservable(value)) {
    return createObservable(target, key, value)
  }
  return value
}

function patchIterator(
  target: object,
  key: PropertyKey,
  iterator: IterableIterator<unknown>,
  isEntries: boolean,
) {
  const originalNext = iterator.next
  iterator.next = (...args: [] | [undefined]) => {
    let { done, value } = originalNext.apply(iterator, args)
    if (!done) {
      if (isEntries) {
        const entry = value as [PropertyKey, unknown]
        entry[1] = findObservable(target, key, entry[1])
      }
      else {
        value = findObservable(target, key, value)
      }
    }
    return { done, value }
  }
  return iterator
}

const instrumentations = {
  has(key: PropertyKey) {
    const target = ProxyRaw.get(this)
    const proto = Reflect.getPrototypeOf(this) as CollectionProto
    bindTargetKeyWithCurrentReaction({ target, key, type: 'has' })
    return proto.has.call(target, key)
  },
  get(key: PropertyKey) {
    const target = ProxyRaw.get(this)
    const proto = Reflect.getPrototypeOf(this) as CollectionProto
    bindTargetKeyWithCurrentReaction({ target, key, type: 'get' })
    return findObservable(target, key, proto.get.call(target, key))
  },
  add(key: PropertyKey) {
    const target = ProxyRaw.get(this)
    const proto = Reflect.getPrototypeOf(this) as CollectionProto
    const hadKey = proto.has.call(target, key)
    // forward the operation before queueing reactions
    const result = proto.add.call(target, key)
    if (!hadKey) {
      runReactionsFromTargetKey({ target, key, value: key, type: 'add' })
    }
    return result
  },
  set(key: PropertyKey, value: unknown) {
    const target = ProxyRaw.get(this)
    const proto = Reflect.getPrototypeOf(this) as CollectionProto
    const hadKey = proto.has.call(target, key)
    const oldValue = proto.get.call(target, key)
    // forward the operation before queueing reactions
    const result = proto.set.call(target, key, value)
    if (!hadKey) {
      runReactionsFromTargetKey({ target, key, value, type: 'add' })
    }
    else if (value !== oldValue) {
      runReactionsFromTargetKey({ target, key, value, oldValue, type: 'set' })
    }
    return result
  },
  delete(key: PropertyKey) {
    const target = ProxyRaw.get(this)
    const proto = Reflect.getPrototypeOf(this) as CollectionProto
    const hadKey = proto.has.call(target, key)
    const oldValue = proto.get ? proto.get.call(target, key) : undefined
    // forward the operation before queueing reactions
    const result = proto.delete.call(target, key)
    if (hadKey) {
      runReactionsFromTargetKey({ target, key, oldValue, type: 'delete' })
    }
    return result
  },
  clear() {
    const target = ProxyRaw.get(this) as Map<PropertyKey, unknown> | Set<unknown> | undefined
    const proto = Reflect.getPrototypeOf(this) as CollectionProto
    const hadItems = target !== undefined && target.size !== 0
    const oldTarget = target instanceof Map ? new Map(target) : new Set(target)
    // forward the operation before queueing reactions
    const result = proto.clear.call(target)
    if (hadItems) {
      runReactionsFromTargetKey({ target, oldTarget, type: 'clear' })
    }
    return result
  },
  forEach(cb: (...args: unknown[]) => void, ...args: unknown[]) {
    const target = ProxyRaw.get(this)
    const proto = Reflect.getPrototypeOf(this) as CollectionProto
    bindTargetKeyWithCurrentReaction({ target, type: 'iterate' })
    // swap out the raw values with their observable pairs
    // before passing them to the callback
    const wrappedCb = (value: unknown, key: PropertyKey, ...rest: unknown[]) =>
      cb(findObservable(target, key, value), key, ...rest)
    return proto.forEach.call(target, wrappedCb, ...args)
  },
  keys() {
    const target = ProxyRaw.get(this)
    const proto = Reflect.getPrototypeOf(this) as CollectionProto
    bindTargetKeyWithCurrentReaction({ target, type: 'iterate' })
    return proto.keys.call(target)
  },
  values() {
    const target = ProxyRaw.get(this)
    const proto = Reflect.getPrototypeOf(this) as CollectionProto
    bindTargetKeyWithCurrentReaction({ target, type: 'iterate' })
    const iterator = proto.values.call(target)
    return patchIterator(target, '', iterator, false)
  },
  entries() {
    const target = ProxyRaw.get(this)
    const proto = Reflect.getPrototypeOf(this) as CollectionProto
    bindTargetKeyWithCurrentReaction({ target, type: 'iterate' })
    const iterator = proto.entries.call(target)
    return patchIterator(target, '', iterator, true)
  },
  [Symbol.iterator]() {
    const target = ProxyRaw.get(this)
    const proto = Reflect.getPrototypeOf(this) as CollectionProto
    bindTargetKeyWithCurrentReaction({ target, type: 'iterate' })
    const iterator = proto[Symbol.iterator].call(target)
    return patchIterator(target, '', iterator, target instanceof Map)
  },
  get size() {
    const target = ProxyRaw.get(this)
    const proto = Reflect.getPrototypeOf(this) as CollectionProto
    bindTargetKeyWithCurrentReaction({ target, type: 'iterate' })
    return Reflect.get(proto, 'size', target)
  },
}

export const collectionHandlers: ProxyHandler<object> = {
  get(target, key, receiver) {
    // instrument methods and property accessors to be reactive
    target = hasOwnProperty.call(instrumentations, key)
      ? instrumentations
      : target
    return Reflect.get(target, key, receiver)
  },
}

export const baseHandlers: ProxyHandler<object> = {
  get(target, key, receiver) {
    if (!key)
      return
    const record = target as Record<PropertyKey, unknown>
    const result = record[key] // use Reflect.get is too slow
    if (typeof key === 'symbol' && wellKnownSymbols.has(key)) {
      return result
    }
    bindTargetKeyWithCurrentReaction({ target, key, receiver, type: 'get' })
    const observableResult = RawProxy.get(result as object)
    if (observableResult) {
      return observableResult
    }
    if (!isObservable(result) && isSupportObservable(result)) {
      const descriptor = Reflect.getOwnPropertyDescriptor(target, key)
      if (
        !descriptor
        || !(descriptor.writable === false && descriptor.configurable === false)
      ) {
        return createObservable(target, key, result)
      }
    }
    return result
  },
  has(target, key) {
    const result = Reflect.has(target, key)
    bindTargetKeyWithCurrentReaction({ target, key, type: 'has' })
    return result
  },
  ownKeys(target) {
    const keys = Reflect.ownKeys(target)
    bindTargetKeyWithCurrentReaction({ target, type: 'iterate' })
    return keys
  },
  set(target, key, value, receiver) {
    const record = target as Record<PropertyKey, unknown>
    // vue2中有对数组原型重写，因此需去除此处proxy
    if (key === '__proto__') {
      record[key] = value
      return true
    }
    const hadKey = hasOwnProperty.call(target, key)
    const newValue = createObservable(target, key, value)
    const oldValue = record[key]
    record[key] = newValue // use Reflect.set is too slow
    if (!hadKey) {
      runReactionsFromTargetKey({
        target,
        key,
        value: newValue,
        oldValue,
        receiver,
        type: 'add',
      })
    }
    else if (value !== oldValue) {
      runReactionsFromTargetKey({
        target,
        key,
        value: newValue,
        oldValue,
        receiver,
        type: 'set',
      })
    }
    return true
  },
  deleteProperty(target, key) {
    const record = target as Record<PropertyKey, unknown>
    const oldValue = record[key]
    delete record[key]
    runReactionsFromTargetKey({
      target,
      key,
      oldValue,
      type: 'delete',
    })
    return true
  },
}
