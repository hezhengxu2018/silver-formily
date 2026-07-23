---
order: 7
---

# Heart

::: warning 内部模型
`Heart` 主要供框架内部使用，业务场景几乎不会直接实例化或调用。除非正在开发底层扩展，否则请优先使用 Form 提供的公开 API 和 Effect Hooks。
:::

`Heart` 是 Form 内部的生命周期事件中心，负责把 `LifeCycle` 监听器、动态 effects 和普通订阅者连接起来。业务代码通常使用 effect hooks 或 Form 的 `notify()`、`subscribe()`，无需直接操作 `form.heart`。

## 构造函数

```ts
interface IHeartProps<Context> {
  lifecycles?: LifeCycle[]
  context?: Context
}

interface HeartConstructor {
  new<Payload = any, Context = any>(props?: IHeartProps<Context>): Heart<Payload, Context>
}
```

## 主要属性

| 属性            | 描述                          | 类型                             |
| --------------- | ----------------------------- | -------------------------------- |
| lifecycles      | Form 自身注册的生命周期监听器 | `LifeCycle<Payload>[]`           |
| outerLifecycles | 按 ID 注册的动态监听器        | `Map<any, LifeCycle<Payload>[]>` |
| context         | 发布事件时使用的默认上下文    | `Context`                        |

## 生命周期管理

```ts
heart.addLifeCycles(id, lifecycles)
heart.hasLifeCycles(id)
heart.removeLifeCycles(id)
heart.setLifeCycles(lifecycles)
heart.buildLifeCycles(lifecycles)
```

- `addLifeCycles()` 按 ID 添加一组动态监听器；相同 ID 已存在时不会由 Form 重复添加。
- `setLifeCycles()` 覆盖 Form 自身的生命周期监听器。
- `buildLifeCycles()` 会把嵌套数组归一成一维 `LifeCycle[]`。

## 发布与订阅

```ts
heart.publish(type, payload, context)

const id = heart.subscribe(({ type, payload }) => {
  // 监听所有发布事件
})

heart.unsubscribe(id)
heart.clear()
```

`publish()` 先通知生命周期监听器，再通知普通订阅者。`clear()` 会清空生命周期、动态 effects 和全部普通订阅。
