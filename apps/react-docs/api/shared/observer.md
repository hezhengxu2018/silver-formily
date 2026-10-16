# observer

## 描述

observer 是从 [@silver-formily/reactive-react](https://reactive-react.silver-formily.org/) 中导出的，API 完全一致，使用 observer 主要是将组件支持响应式更新能力。

在 `@silver-formily/react` 中，自定义组件如果需要根据直接读取的 Form / Field 响应式状态自动更新，应使用 observer 或 Observer 建立响应式订阅；useForm/useField 本身只读取上下文。

## 用例

:::demo
api/shared/observer.tsx
:::

## observer 与 Observer

两者均从 `@silver-formily/reactive-react` 再导出。`observer` 支持函数组件及已有的 `memo` / `forwardRef` 包装，保留 memo 比较器；不接受类组件或 `lazy` 包装对象。重载保留组件 props、声明的 ref 和自定义静态成员，默认函数组件重载还保留泛型调用签名。

选项为 `displayName?: string`、`scheduler?: (updater: () => void) => void`、`forwardRef?: boolean`。React 18 需要 forwardRef 输入或 `{ forwardRef: true }` 才能转发 ref；React 19 的输入组件若声明了 ref prop，不开启该选项也会保留。完整重载请参考 reactive-react 文档。

```tsx
import type { Form } from '@silver-formily/core'

import { Observer } from '@silver-formily/react'

export function FormValues({ form }: { form: import('@silver-formily/core').Form }) {
  return <Observer>{() => JSON.stringify(form.values)}</Observer>
}
```

`Observer` 接受可选的 `children?: (() => React.ReactNode) | React.ReactNode`。需要追踪的响应式读取放在回调内。`IObserverProps` 与 `IObserverOptions` 应从 `@silver-formily/reactive-react` 导入，不从 React 渲染层入口导入。
