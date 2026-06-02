# FormHooksAPI

> 用于创建自定义副作用 Hook 的低层 API

## 描述

`FormHooksAPI` 包含 `createEffectHook`、`createEffectContext` 和 `useEffectForm`，用于扩展自定义的生命周期事件和副作用 Hook。

## createEffectHook

### 签名

```ts
function createEffectHook<T, P>(
  type: string,
  handler: (payload: T, form: Form) => (params: P) => void
): (params: P) => void
```

### 描述

创建一个自定义的副作用 Hook。`@silver-formily/core` 内部所有的 `onFormXxx` 和 `onFieldXxx` Hook 都是通过它创建的。

### 内部原理

```ts
// core 内部的简化实现
function createFormEffect(type: LifeCycleTypes) {
  return createEffectHook(
    type,
    (form: Form) => (callback: (form: Form) => void) => {
      batch(() => {
        callback(form)
      })
    },
  )
}

// 使用它创建 onFormInit
const onFormInit = createFormEffect(LifeCycleTypes.ON_FORM_INIT)
```

### 用例

```ts
import { createEffectHook, createForm } from '@silver-formily/core'

// 定义一个自定义钩子
const onCustomEvent = createEffectHook(
  'onCustom',
  (payload, form) => (callback: (data: any) => void) => {
    callback(payload)
  },
)

// 在 effects 中使用
const form = createForm({
  effects() {
    onCustomEvent((data) => {
      console.log('custom event:', data)
    })
  },
})
```

## createEffectContext

### 描述

创建副作用上下文，用于隔离不同 Form 实例的副作用。

```ts
function createEffectContext(): EffectContext
```

## useEffectForm

### 签名

```ts
function useEffectForm(): Form
```

### 描述

在副作用回调中获取当前所属的 Form 实例。通常只在内部使用，自定义 Hook 可通过回调参数的 `form` 参数获取。

## 实际场景

### 扩展自定义生命周期

```ts
import { createEffectHook, LifeCycleTypes } from '@silver-formily/core'

// 利用已有的生命周期类型创建自定义 Hook
const onFormReady = createEffectHook(
  'onFormReady',
  form => (callback: (form: Form) => void) => {
    // 组合多个已有生命周期
    let mounted = false
    let validated = false

    const check = () => {
      if (mounted && validated) {
        callback(form)
      }
    }

    form.notify(LifeCycleTypes.ON_FORM_MOUNT, () => {
      mounted = true
      check()
    })

    form.notify(LifeCycleTypes.ON_FORM_VALIDATE_END, () => {
      validated = true
      check()
    })
  },
)
```
