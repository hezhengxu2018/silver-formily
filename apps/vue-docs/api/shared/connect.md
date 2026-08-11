# connect

## 描述

主要用于对第三方组件库的无侵入接入 Formily

## 签名

```ts
import type { VueComponentProps } from '@silver-formily/vue'

interface IComponentMapper<T extends Vue.Component> {
  (target: T): Vue.Component
}

declare function connect<T extends Vue.Component, Props = VueComponentProps<T>>(
  target: T,
  ...args: IComponentMapper<T>[]
): ConnectedComponent<T, Props>
```

入参传入第一个参数是要接入的组件，后面的参数都是组件映射器，每个映射器都是一个函数，通常我们会使用内置的[mapProps](/api/shared/map-props)和[mapReadPretty](/api/shared/map-read-pretty)映射器

`connect` 默认从目标组件提取公开 Props，并保留目标组件的 Props、插槽和实例类型。
如果包装组件需要增加 Formily 或业务侧 Props，可以通过第二个类型参数覆盖公开接口：

```ts
import type { VueComponentProps } from '@silver-formily/vue'
import { connect, mapProps } from '@silver-formily/vue'
import { ElInput } from 'element-plus'

type InputProps = VueComponentProps<typeof ElInput> & {
  formilyReadonly?: boolean
}

const ConnectedInput = connect<typeof ElInput, InputProps>(
  ElInput,
  mapProps({
    formilyReadonly: 'readonly',
  }),
)
```

这项能力只改变 TypeScript 类型推导，不改变 `connect`、`mapProps` 的运行时行为，
也不会改变 attrs 和事件的转发方式。

## 用例

::: demo
api/shared/connect
:::
