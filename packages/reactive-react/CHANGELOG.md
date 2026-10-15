# Changelog

## Unreleased

### Fixed

- Preserve function-valued `useComputed` results instead of executing them as React state updaters. Dependency changes rebuild tracking with the latest getter and options and synchronize the current result.
- Retain one setup/cleanup pair in `useCompatEffect` across synchronous StrictMode replay, preventing duplicate resources and leaked cleanup functions. Final cleanup remains deferred by one microtask.
- Read the latest committed tracker/subscriber callbacks in effect hooks and the latest committed scheduler in `useObserver`; abandoned renders do not publish callbacks.
- Support `memo` and `forwardRef` inputs to `observer`, including nested wrappers, without calling exotic component objects as functions. Preserve memo comparator behavior.
- Preserve plain function component generic signatures, custom statics, and declared refs. Fix explicit props typing with `forwardRef: true`, and allow any `ReactNode` from `Observer` render functions.

### Added

- `useAutorunEffect(tracker, options?)` and `useReactionWatch(tracker, subscriber?, options?)`, with `options.deps` for rebuilding reaction tracking.
- `IAutorunEffectOptions` and `IReactionWatchOptions<T>`, plus regression/type coverage for React 18 and React 19.

### Internal helpers

- Keep `useForceUpdate`, `useDidUpdate`, and `useLayoutEffect` internal; they are not exported from the package entry or included in the public API documentation.

### API contracts

- `useComputed` does not accept `fireImmediately`: computed state always synchronizes when tracking is established. `useReactionWatch` still supports `fireImmediately`.
- Declare non-observable tracker inputs in deps when props/state changes should rebuild tracking immediately. Updating a callback alone does not run the tracker or reset the reaction baseline.
- Effect hooks now unsubscribe synchronously during ordinary React effect cleanup. Unlike `useCompatEffect`, they clean up and rebuild during StrictMode replay; initial callbacks can run more than once in development.
- React 19 function components can receive declared ref props directly. Use a `forwardRef` input or `{ forwardRef: true }` when also supporting React 18.

### 中文 API 约定

- `useComputed` 不再允许配置 `fireImmediately`，建立追踪时始终同步当前值；`useReactionWatch` 仍支持此选项。
- 使用 `useAutorunEffect` / `useReactionWatch`。props/state 改变追踪表达式或 store 时，通过 deps 立即重建；只更新回调不会主动执行 tracker。
- 普通副作用 hooks 在 effect 清理时同步解除订阅，StrictMode 重放会清理并重建，开发环境的初始回调可能执行多次。`useCompatEffect` 则保留同一份 setup/cleanup，最终清理延迟一个微任务。
- `observer` 支持嵌套 memo/forwardRef 并保留比较行为；类型修复覆盖泛型、静态属性、ref 与 `ReactNode` render prop。React 18 仍需显式启用 ref 转发。
