---
order: 8
---

# LifeCycle

::: warning 内部模型
`LifeCycle` 主要供框架内部使用，业务场景几乎不会直接实例化或调用。除非正在开发底层扩展，否则请优先使用 Form Effect Hooks 和 Field Effect Hooks。
:::

`LifeCycle` 把一个或多个事件类型映射到处理函数，由 [Heart](/api/models/Heart) 在事件发布时调用。业务代码通常使用 [Form Effect Hooks](/api/entry/FormEffectHooks) 和 [Field Effect Hooks](/api/entry/FieldEffectHooks) 创建监听器。

## 构造函数

```ts
type LifeCycleHandler<Payload> = (payload: Payload, context: any) => void

interface LifeCycleConstructor {
  new<Payload>(type: string, handler: LifeCycleHandler<Payload>): LifeCycle<Payload>
  new<Payload>(listeners: Record<string, LifeCycleHandler<Payload>>): LifeCycle<Payload>
}
```

同一实例可以传入多组事件类型和处理函数。

## notify

仅当传入的 `type` 与构造函数中注册的事件类型匹配时，才会执行相应处理函数。

```ts
interface notify {
  <Payload>(type: string, payload?: Payload, context?: any): void
}
```

## LifeCycleTypes

`LifeCycleTypes` 是 Core 公开导出的生命周期事件枚举。常用事件分为：

- Form：初始化、挂载、值变化、输入、校验、提交、重置、字段图和加载状态。
- Field：初始化、挂载、值变化、输入、校验、提交、重置和加载状态。

```ts
import { LifeCycleTypes } from '@silver-formily/core'

LifeCycleTypes.ON_FORM_VALUES_CHANGE // 'onFormValuesChange'
LifeCycleTypes.ON_FORM_SUBMIT // 'onFormSubmit'
LifeCycleTypes.ON_FIELD_VALUE_CHANGE // 'onFieldValueChange'
LifeCycleTypes.ON_FIELD_VALIDATE_END // 'onFieldValidateEnd'
```

每个面向业务使用的事件及对应 Hook，请参考 [Form Effect Hooks](/api/entry/FormEffectHooks) 和 [Field Effect Hooks](/api/entry/FieldEffectHooks)。
