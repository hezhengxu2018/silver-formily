# useField

## 描述

主要用在自定义组件内读取当前字段属性，操作字段状态等，在所有 Field 组件的子树内都能使用，注意，拿到的是[GeneralField](https://core.silver-formily.org/api/models/Field#generalfield)，如果需要对不同类型的字段做处理，请使用[Type Checker](https://core.silver-formily.org/api/entry/FormChecker)

::: warning
注意：如果要在自定义组件内使用 useField，并响应字段模型变化，需要使用 [observer](/api/shared/observer) 包裹自定义组件
:::

## 签名

```ts
import type { GeneralField } from '@silver-formily/core'

declare function useField<T = GeneralField>(): T
```

与 Vue 版不同，React 版直接返回字段实例本身，而不是 Ref。

## 用例

:::demo
api/hooks/use-field.tsx
:::

该 hook 只读取上下文，不创建模型，也不订阅模型属性。应在对应 Provider 下使用；即使部分签名未声明空值，缺少或被清理的上下文在运行时仍可能返回 null/undefined。
