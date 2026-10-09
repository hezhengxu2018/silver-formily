import type { ArraySet } from './array'

export * from './tree'

export type PropertyKey = string | number | symbol

export type OperationType
  = | 'add'
    | 'delete'
    | 'clear'
    | 'set'
    | 'get'
    | 'iterate'
    | 'has'

export interface IOperation {
  target?: object
  oldTarget?: object
  key?: PropertyKey
  value?: unknown
  oldValue?: unknown
  type?: OperationType
  receiver?: object
}

export interface IChange {
  key?: PropertyKey
  path?: ObservablePath
  value?: unknown
  oldValue?: unknown
  type?: OperationType
}

export interface IEffectQueueItem {
  dispose?: void | Dispose
  deps?: unknown[]
}

export interface IMemoQueueItem {
  value?: unknown
  deps?: unknown[]
}

export interface IVisitor<Value = unknown, Target = Record<PropertyKey, unknown>> {
  target?: Target
  key?: PropertyKey
  value?: Value
}

/**
 * 参数 never[] 使任意函数签名（含带参数的）都能赋值（逆变下界），
 * 返回 unknown 覆盖任意返回值。作为 (...args: any[]) => any 的无 any 替代。
 */
export type AnyFunction = (...args: never[]) => unknown

export type Annotation = AnyFunction

export type Annotations<T = Record<PropertyKey, unknown>> = {
  [key in keyof T]?: Annotation
}

export interface IObservable {
  <T>(target: T): T
}

export interface IBox {
  <T>(target: T): { get: () => T, set: (value: T) => void }
}

export interface IRef {
  <T>(target: T): { value: T }
}

export interface IComputed {
  <T>(compute: () => T): { value?: T }
  <T>(compute: { get?: () => T, set?: (value: T) => void }): { value?: T }
}

export type ObservableListener = (operation: IOperation) => void

export type ObservablePath = Array<string | number>

export type Dispose = () => void

export type Effect = () => void | Dispose

export type Reaction = AnyFunction & {
  _boundary?: number
  _name?: string
  _isComputed?: boolean
  _dirty?: boolean
  _context?: object
  _disposed?: boolean
  _property?: PropertyKey
  _computesSet?: ArraySet<Reaction>
  _reactionsSet?: ArraySet<ReactionsMap>
  _scheduler?: (reaction: Reaction) => void
  _memos?: {
    queue: IMemoQueueItem[]
    cursor: number
  }
  _effects?: {
    queue: IEffectQueueItem[]
    cursor: number
  }
  _pending?: boolean
}

export type ReactionsMap = Map<PropertyKey, ArraySet<Reaction>>

export type PendingReactions = ArraySet<Reaction>

/**
 * track 的两个身份：作为 Reaction 入栈执行（携带内部属性），
 * 同时对外保留泛型返回，让调用方按 view 的返回类型拿到结果。
 */
export type TrackerTrack = (<T>(tracker: () => T) => T | undefined) & Reaction

export interface IReactionOptions<T> {
  name?: string
  equals?: (oldValue: T, newValue: T) => boolean
  fireImmediately?: boolean
}

export type BindFunction<F = AnyFunction> = (
  callback?: F,
  context?: unknown,
) => F

export type BoundaryFunction = <F extends AnyFunction>(
  fn?: F,
) => ReturnType<F>

export interface IBoundable {
  bound: <T extends AnyFunction>(callback: T, context?: unknown) => T // 高阶绑定
}
export interface IAction extends IBoundable {
  <T>(callback?: () => T): T // 原地action
  scope: (<T>(callback?: () => T) => T) & IBoundable // 原地局部action
}

export interface IBatch extends IAction {
  endpoint: (callback?: () => void) => void
}
