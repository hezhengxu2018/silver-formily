# Field

本页只说明 `@silver-formily/vue` 在字段组件这一层新增或收敛过的类型。

`Field`、`ArrayField`、`ObjectField`、`VoidField`、`GeneralField`、`Form` 等核心模型都属于 `@silver-formily/core`，请直接查看 [Field 模型文档](https://core.silver-formily.org/api/models/Field) 与 [Form 模型文档](https://core.silver-formily.org/api/models/Form)。

## `IProviderProps`

`FormProvider` 的 props 很薄，只负责向子树提供一个 `Form` 实例：

```ts
interface IProviderProps {
  form: Form
}
```

## `IFieldProps`

Vue 版本的字段 props 以 `CoreFieldProps` 为基础，只做了两件事：

- 把 `validator` 改成 Vue 文档里统一使用的 `SchemaFieldValidator`
- 增加 `decoratorContent`，便于在 Vue 组件树里补充装饰器内容

```ts
interface IFieldProps<
  D extends Component = Component,
  C extends Component = Component,
  TextType = any,
  ValueType = any,
> extends Omit<CoreFieldProps<D, C, TextType, ValueType>, 'validator'> {
  validator?: SchemaFieldValidator
  decoratorContent?: any
}
```

## `IFieldFactoryProps`

`Field`、`ArrayField`、`ObjectField` 这些工厂组件使用的是同一组工厂 props。它和 `IFieldProps` 的差别在于继承源是 `CoreFieldFactoryProps`：

```ts
interface IFieldFactoryProps<
  D extends Component = Component,
  C extends Component = Component,
  TextType = any,
  ValueType = any,
> extends Omit<CoreFieldFactoryProps<D, C, TextType, ValueType>, 'validator'> {
  validator?: SchemaFieldValidator
  decoratorContent?: any
}
```

## `IVoidFieldProps`

`VoidField` 没有值语义，因此它沿用 Core 的 `IVoidFieldFactoryProps`，这里只补一个 Vue 侧的 `decoratorContent`：

```ts
type IVoidFieldProps<
  D extends Component = Component,
  C extends Component = Component,
> = IVoidFieldFactoryProps<D, C> & {
  decoratorContent?: any
}
```

## `IArrayFieldProps` 与 `IObjectFieldProps`

这两个类型目前都是别名：

```ts
type IArrayFieldProps = IFieldProps
type IObjectFieldProps = IFieldProps
```

这样做的目的主要是让组件签名在文档和用户代码中保持可读性，而不是引入新的字段协议。

## `IReactiveFieldProps`

内部响应式字段渲染器会把字段种类和 props 打包成一个统一结构：

```ts
interface IReactiveFieldProps {
  fieldType: 'Field' | 'ArrayField' | 'ObjectField' | 'VoidField'
  fieldProps: IFieldProps | IVoidFieldProps
}
```

## `IStateMapper<Props>`

它描述的是“如何把字段状态投影为组件 props”。可以是一个 key 映射对象，也可以是一个函数：

```ts
type IStateMapper<Props>
  = | {
    [key in keyof Field]?: keyof Props | boolean
  }
  | ((props: Props, field: GeneralField) => Props)
```

如果你需要理解 `Field` 或 `GeneralField` 的完整属性，请回到 [Core Field 文档](https://core.silver-formily.org/api/models/Field)。本页只保留 Vue 侧如何消费这些模型的信息。
