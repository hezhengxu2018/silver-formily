# 类型声明

本节只说明 `@silver-formily/react` 自己定义的公开类型，以及它在 React 侧如何消费其他包的类型。

如果某个类型本来就属于 `@silver-formily/core`、`@silver-formily/path`、`@silver-formily/validator` 或 `@silver-formily/json-schema`，这里不会重复维护原始声明，而是给出稳定入口与跳转链接。

## 什么时候应该从 `@silver-formily/react` 导入

- 类型里直接出现了 React 组件、组件映射、作用域对象或递归渲染配置。
- 你要描述的是 React 组件 props，而不是 Core 的字段模型本身。
- 你需要和 `SchemaField`、`RecursionField`、`ExpressionScope` 这类 React 组件保持一致。

## 类型地图

| 分类           | 推荐查看                                          | 说明                                                                             |
| -------------- | ------------------------------------------------- | -------------------------------------------------------------------------------- |
| 字段组件 props | [Field](/types/field)                             | 解释 `IFieldProps`、`IVoidFieldProps`、`RenderPropsChildren` 这些 React 侧封装。 |
| 路径桥接       | [Path](/types/path)                               | React 包只消费 `FormPathPattern`，不重新定义路径协议。                           |
| 校验桥接       | [Validator](/types/validator)                     | 字段 `validator` 直接复用 `@silver-formily/core` 的 `FieldValidator`。           |
| Schema 协议    | [Schema](https://json-schema.silver-formily.org/) | `Schema`、`ISchema`、`SchemaKey` 与 `x-*` 协议都属于 json-schema 包。            |

## React 特有类型

### 字段与上下文

- `JSXComponent`：React 侧的组件类型约束，`keyof React.JSX.IntrinsicElements` 或组件构造器。
- `IProviderProps`：`FormProvider` 的 props，仅暴露 `form`。
- `IFormSpyProps`：`FormConsumer` 的 props，`children` 是 `(form: Form) => ReactChild`。
- `RenderPropsChildren<Payload>`：字段组件的 `children`，是渲染函数 `(field, form) => ReactNode` 或普通 `ReactNode`。
- `IFieldProps<D, C>`：字段组件 props，在 Core 的 `IFieldFactoryProps` 基础上扩展了 React 语义的 `children`、`decorator`、`component`。
- `IVoidFieldProps<D, C>`：`VoidField` 组件 props，来源与 `IFieldProps` 类似。
- `IExpressionScopeProps` / `IRecordScopeProps` / `IRecordsScopeProps`：`ExpressionScope`、`RecordScope`、`RecordsScope` 的 props。

### 组件映射与状态映射

- `IComponentMapper<T>`：把一个组件转换成另一个组件，常用于 `connect` 一类适配器。
- `IStateMapper<Props>`：把字段状态映射为组件 props，可以用对象映射，也可以用函数映射。

### Schema 渲染

- `SchemaReactComponents`：`SchemaField` 组件映射表，键是 schema 中引用的组件名。
- `ISchemaFieldReactFactoryOptions`：`createSchemaField` 的 React 配置入口，主要包括 `components` 和 `scope`。
- `ISchemaFieldProps`：`SchemaField` 组件 props。
- `ISchemaMapper` / `ISchemaFilter`：递归渲染时对 schema 节点进行映射或过滤。
- `IRecursionFieldProps`：`RecursionField` 组件 props，其中 `basePath` 来自路径系统。
- `ISchemaMarkupFieldProps` / `ISchemaTypeFieldProps`：Markup Schema 字段协议，保留了 React 组件映射能力。

### 辅助泛型

- `KeyOfReactComponent<T>`：从组件对象中排除 `contextTypes`、`displayName` 等静态键。
- `ReactComponentPath<T>`：从组件映射对象里提取可用的字符串 key。
- `ReactComponentPropsByPathValue<T, P>`：根据组件 key 反推出该组件 props。
- `Path<T>` / `PathValue<T, P>`：对象深层路径与取值泛型。
- `ReactChild`：`React.ReactElement | string | number`。

## 不在这里展开的类型

- 字段模型、表单模型、`Field`、`GeneralField`、`Form`：请查看 [Formily Core 文档](https://core.silver-formily.org/api/models/Field) 与 [Form](https://core.silver-formily.org/api/models/Form)。
- 路径系统、`FormPathPattern`：请查看 [Path 文档](https://path.silver-formily.org/)。
- 校验规则、`Validator`、`FieldValidator`：请查看 [Validator 文档](https://validator.silver-formily.org/api/validate)。
- Schema 协议、`Schema`、`ISchema`、`SchemaKey`：请查看 [JSON Schema 文档](https://json-schema.silver-formily.org/api/types)。

## 导入建议

```ts
import type {
  IFieldProps,
  IRecursionFieldProps,
  ISchemaFieldProps,
  SchemaReactComponents,
} from '@silver-formily/react'
```

如果只是想复用底层模型，请直接从源包导入，这样类型来源会更清晰：

```ts
import type { Form, GeneralField } from '@silver-formily/core'
import type { ISchema } from '@silver-formily/json-schema'
import type { Pattern } from '@silver-formily/path'
import type { Validator } from '@silver-formily/validator'
```
