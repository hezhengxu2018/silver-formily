# useForm

## 描述

主要在自定义组件中读取当前[Form](https://core.silver-formily.org/api/models/Form)实例，用于实现一些副作用依赖，比如依赖 Form 的 errors 信息之类的，用于实现一些较为复杂的场景化组件

## 签名

```ts
import type { Form } from '@silver-formily/core'

declare function useForm<T extends object = any>(): Form<T>
```

## 用例

:::demo
api/hooks/use-form.tsx
:::

该 hook 只读取上下文，不创建模型，也不订阅模型属性。应在对应 Provider 下使用；即使部分签名未声明空值，缺少或被清理的上下文在运行时仍可能返回 null/undefined。
