# 类型声明

本节只说明 `@silver-formily/vue` 自己定义的公开类型，以及它在 Vue 侧如何消费其他包的类型。

如果某个类型本来就属于 `@silver-formily/core`、`@silver-formily/path`、`@silver-formily/validator` 或 `@silver-formily/json-schema`，这里不会重复维护原始声明，而是给出稳定入口与跳转链接。

## 什么时候应该从 `@silver-formily/vue` 导入

- 类型里直接出现了 Vue `Component`、组件映射、作用域对象或递归渲染配置。
- 你要描述的是 Vue 组件 props，而不是 Core 的字段模型本身。
- 你需要和 `SchemaField`、`RecursionField`、`ExpressionScope` 这类 Vue 组件保持一致。

## 类型地图

| 分类           | 推荐查看                                          | 说明                                                                          |
| -------------- | ------------------------------------------------- | ----------------------------------------------------------------------------- |
| 字段组件 props | [Field](/types/field)                             | 解释 `IFieldProps`、`IFieldFactoryProps`、`IVoidFieldProps` 这些 Vue 侧封装。 |
| 路径桥接       | [Path](/types/path)                               | Vue 包只消费 `FormPathPattern`，不重新定义路径协议。                          |
| 校验桥接       | [Validator](/types/validator)                     | Vue 包保留了校验类型别名，完整协议在 validator 文档。                         |
| Schema 协议    | [Schema](https://json-schema.silver-formily.org/) | `Schema`、`ISchema`、`SchemaKey` 与 `x-*` 协议都属于 json-schema 包。         |

## Vue 特有类型

### 字段与上下文

- `IProviderProps`：`FormProvider` 的 props，仅暴露 `form`。
- `IFieldProps`：在 `CoreFieldProps` 基础上，保留 Vue 侧常用的 `decoratorContent`，并把 `validator` 收敛为 `SchemaFieldValidator`。
- `IFieldFactoryProps`：字段工厂组件使用的 props 版本，语义与 `IFieldProps` 一致。
- `IVoidFieldProps`：基于 `IVoidFieldFactoryProps` 增补 `decoratorContent`。
- `IArrayFieldProps` / `IObjectFieldProps`：当前都是 `IFieldProps` 的别名，用于保持组件签名稳定。
- `IReactiveFieldProps`：内部响应式字段组件的统一负载，区分 `Field`、`ArrayField`、`ObjectField`、`VoidField`。

### 组件映射与状态映射

- `VueComponentOptionsWithProps` / `VueComponentProps<T>`：从 Vue 组件类型中提取 props。
- `IComponentMapper<T>`：把一个组件转换成另一个组件，常用于 `connect` 一类适配器。
- `IStateMapper<Props>`：把字段状态映射为组件 props，可以用对象映射，也可以用函数映射。

### Schema 渲染

- `SchemaVueComponents`：`SchemaField` 组件映射表，键是 schema 中引用的组件名。
- `SchemaExpressionScope`：表达式作用域对象。
- `ISchemaFieldVueFactoryOptions`：`createSchemaField` 的 Vue 配置入口，主要包括 `components` 和 `scope`。
- `ISchemaFieldProps`：`SchemaField` 组件 props。
- `ISchemaMapper` / `ISchemaFilter`：递归渲染时对 schema 节点进行映射或过滤。
- `IRecursionFieldProps`：`RecursionField` 组件 props，其中 `basePath` 来自路径系统。
- `SchemaMarkupValidator`：Markup Schema 中 `x-validator` 的类型抽取结果。
- `ISchemaMarkupFieldProps`：Markup Schema 字段协议，保留了 Vue 组件映射能力。
- `ISchemaTypeFieldProps`：在 `ISchemaMarkupFieldProps` 基础上移除 `type`，用于更窄的类型推导场景。
- `IExpressionScopeProps`：`ExpressionScope` 组件 props。

### 辅助泛型

- `ComponentPath<T>`：从组件映射对象里提取可用的字符串 key。
- `ComponentPropsByPathValue<T, P>`：根据组件 key 反推出该组件 props。

## 不在这里展开的类型

- 字段模型、表单模型、`Field`、`GeneralField`、`Form`：请查看 [Formily Core 文档](https://core.silver-formily.org/api/models/Field) 与 [Form](https://core.silver-formily.org/api/models/Form)。
- 路径系统、`FormPathPattern`：请查看 [Path 文档](https://path.silver-formily.org/)。
- 校验规则、`Validator`、`MultiValidator`、`IValidatorRules`：请查看 [Validator 文档](https://validator.silver-formily.org/api/validate)。
- Schema 协议、`Schema`、`ISchema`、`SchemaKey`：请查看 [JSON Schema 文档](https://json-schema.silver-formily.org/api/types)。

## 导入建议

```ts
import type {
  IFieldProps,
  IRecursionFieldProps,
  ISchemaFieldProps,
  SchemaVueComponents,
} from '@silver-formily/vue'
```

如果只是想复用底层模型，请直接从源包导入，这样类型来源会更清晰：

```ts
import type { Form, GeneralField } from '@silver-formily/core'
import type { ISchema } from '@silver-formily/json-schema'
import type { Pattern } from '@silver-formily/path'
import type { Validator } from '@silver-formily/validator'
```
