# connect

## 描述

主要用于对第三方组件库的无侵入接入 Formily

## 签名

```ts
import type { IComponentMapper, JSXComponent } from '@silver-formily/react'

interface IComponentMapper<T extends JSXComponent> {
  (target: T): JSXComponent
}

declare function connect<T extends JSXComponent>(
  target: T,
  ...args: IComponentMapper<T>[]
): React.ComponentType<Partial<React.ComponentProps<T>>>
```

入参传入第一个参数是要接入的组件，后面的参数都是组件映射器，每个映射器都是一个函数，通常我们会使用内置的[mapProps](/api/shared/map-props)和[mapReadPretty](/api/shared/map-read-pretty)映射器

`connect` 内部会用 `forwardRef` 包裹目标组件并透传 ref，同时通过 `hoist-non-react-statics` 提升目标组件的静态属性。

## 用例

:::demo
api/shared/connect.tsx
:::
