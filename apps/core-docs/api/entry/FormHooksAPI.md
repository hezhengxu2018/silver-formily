---
outline: 2
---

# Form Hooks API

## createEffectHook

### 描述

创建自定义钩子监听器

### 签名

```ts
interface createEffectHook {
  (
    type: string,
    callback?: (
      payload: any,
      form: Form,
      ...ctx: any[] // 用户注入的上下文
    ) => (...args: any[]) => void // 高阶回调用于处理监听器的封装，帮助用户实现参数定制能力
  )
}
```

### 用例

::: demo

api/entry/form-hooks-api/create-effect-hook

:::

## createEffectContext

### 描述

在 effects 函数中如果我们抽象了很多细粒度的 hooks，想要在 hooks 里读到顶层上下文数据就需要层层传递，这样明显是很低效的事情，所以 formily 提供了 createEffectContext 帮助用户快速获取上下文数据

### 签名

```ts
interface createEffectContext<T> {
  (defaultValue: T): {
    provide: (value: T) => void
    consume: () => T
  }
}
```

### 用例

::: demo

api/entry/form-hooks-api/create-effect-context

:::

## useEffectForm

### 描述

useEffectForm 其实是 EffectContext 的便利用法，因为大多数场景用户都会读取 Form 实例，所以就不需要手动定义一个 EffectFormContext

### 签名

```ts
interface useEffectForm {
  (): Form
}
```

### 用例

::: demo

api/entry/form-hooks-api/use-effect-form

:::
