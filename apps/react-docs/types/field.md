# Field

本页只说明 `@silver-formily/react` 在字段组件这一层新增或收敛过的类型。

`Field`、`ArrayField`、`ObjectField`、`VoidField`、`GeneralField`、`Form` 等核心模型都属于 `@silver-formily/core`，请直接查看 [Field 模型文档](https://core.silver-formily.org/api/models/Field) 与 [Form 模型文档](https://core.silver-formily.org/api/models/Form)。

## `JSXComponent`

React 侧所有组件映射的统一约束，可以是原生标签名，也可以是组件构造器：

```ts
import type React from 'react'

type JSXComponent
  = | keyof React.JSX.IntrinsicElements
    | React.JSXElementConstructor<any>
```

## `IProviderProps`

`FormProvider` 的 props 很薄，只负责向子树提供一个 `Form` 实例：

```ts
import type { Form } from '@silver-formily/core'
import type React from 'react'

type IProviderProps = {
  form: Form
  children?: React.ReactNode
}
```

## `RenderPropsChildren<Payload>`

React 版字段组件的 `children` 支持 render props 写法，渲染函数会拿到字段实例与表单实例：

```ts
import type { Form } from '@silver-formily/core'
import type React from 'react'

type RenderPropsChildren<Payload>
  = | ((field: Payload, form: Form) => React.ReactNode)
    | React.ReactNode
```

## `IFieldProps`

React 版本的字段 props 以 Core 的 `IFieldFactoryProps` 为基础，并扩展了 React 语义的 `children` 与 `decoratorContent`：

```ts
import type { Field as FieldType, IFieldFactoryProps } from '@silver-formily/core'
import type { DecoratorContent, JSXComponent, RenderPropsChildren } from '@silver-formily/react'
import type React from 'react'

interface IFieldProps<
  D extends JSXComponent,
  C extends JSXComponent,
  Field = FieldType,
> extends IFieldFactoryProps<D, C> {
  children?: RenderPropsChildren<Field>
  decoratorContent?: DecoratorContent
  decorator?: [] | [D] | [D, Partial<React.ComponentProps<NoInfer<D>>>]
  component?: [] | [C] | [C, Partial<React.ComponentProps<NoInfer<C>>>]
}
```

`Field`、`ArrayField`、`ObjectField` 都使用同一组 props，只是 `Field` 泛型参数分别收敛为对应的字段模型。

## `IVoidFieldProps`

`VoidField` 没有值语义，props 来源是 Core 的 `IVoidFieldFactoryProps`：

```ts
import type { IVoidFieldFactoryProps, VoidField } from '@silver-formily/core'
import type { DecoratorContent, JSXComponent, RenderPropsChildren } from '@silver-formily/react'
import type React from 'react'

interface IVoidFieldProps<
  D extends JSXComponent,
  C extends JSXComponent,
  Field = VoidField,
> extends IVoidFieldFactoryProps<D, C> {
  children?: RenderPropsChildren<Field>
  decoratorContent?: DecoratorContent
  decorator?: [] | [D] | [D, Partial<React.ComponentProps<NoInfer<D>>>]
  component?: [] | [C] | [C, Partial<React.ComponentProps<NoInfer<C>>>]
}
```

## `IFormSpyProps`

`FormConsumer` 的 props，`children` 必须是接收 `Form` 的渲染函数：

```ts
import type { Form } from '@silver-formily/core'
import type React from 'react'

interface IFormSpyProps {
  children?: (form: Form) => React.ReactNode
}
```

## `IComponentMapper<T>`

`connect` 的映射器签名，把一个组件转换为另一个组件：

```ts
import type { JSXComponent } from '@silver-formily/react'

interface IComponentMapper<T extends JSXComponent> {
  (target: T): JSXComponent
}
```

## `IStateMapper<Props>`

它描述的是“如何把字段状态投影为组件 props”。可以是一个 key 映射对象，也可以是一个函数：

```ts
import type { Field as FieldType, GeneralField } from '@silver-formily/core'

type IStateMapper<Props>
  = | {
    [key in keyof FieldType]?: keyof Props | boolean
  }
  | ((props: Props, field: GeneralField) => Props)
```

如果你需要理解 `Field` 或 `GeneralField` 的完整属性，请回到 [Core Field 文档](https://core.silver-formily.org/api/models/Field)。本页只保留 React 侧如何消费这些模型的信息。

组件与装饰器配置接受 `[]`、`[Component]` 或 `[Component, partialProps]`。传入的 props 按所选组件校验，省略的 props 可以由表单模型提供；声明不接受 `false`。`NoInfer` 要求 TypeScript 5.4 或以上。
