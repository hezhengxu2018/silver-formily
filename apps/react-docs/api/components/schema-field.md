---
aside: true
outline: [2, 3]
---

# SchemaField

## 描述

SchemaField 组件是专门用于解析 [JSON Schema](https://json-schema.silver-formily.org/) 动态渲染表单的组件。

SchemaField 有两种使用方式，一种是MarkupSchema，一种是JSONSchema。MarkupSchema的渲染将不同类型的 Field 做了分类，在可读性上更好；JSONSchema直接渲染JSON-Schema，更贴近底层实现。

::: tip 提示
没有直接可以引用的SchemaField组件，无论是MarkupSchema还是JSONSchema都需要调用`createSchemaField`来获取组件。`createSchemaField` 只返回一个 `SchemaField` 组件，Markup 子组件以静态属性的形式挂载在它上面（如 `SchemaField.String`）。
:::

::: tip Schema 协议说明
本页只说明 `@silver-formily/react` 如何消费 Schema。`Schema`、`ISchema`、`x-reactions`、`x-component-props` 等完整协议请查看 [JSON Schema 文档](https://json-schema.silver-formily.org/)。
:::

### 工厂与返回类型

options 参数可省略。使用真实 API 派生返回类型，避免用非泛型 `ComponentType` 简写丢失注册表推断：

```ts
import type {
  ISchemaFieldReactFactoryOptions,
  SchemaReactComponents,
} from '@silver-formily/react'
import { createSchemaField } from '@silver-formily/react'

type FactoryOptions<C extends SchemaReactComponents> = ISchemaFieldReactFactoryOptions<C>
type SchemaFieldComponent<C extends SchemaReactComponents> = ReturnType<typeof createSchemaField<C>>
type MarkupComponent<C extends SchemaReactComponents> = SchemaFieldComponent<C>['Markup']
```

工厂参数包含 `components?: Components` 与 `scope?: any`。返回组件带有 `Markup`、`String`、`Object`、`Array`、`Boolean`、`Number`、`Date`、`DateTime`、`Void` 静态成员。Markup 保留注册表推断，显式泛型顺序为 `<Decorator, Component>`。各类型静态组件设置自身 schema type，覆盖传入的 `type`。

## MarkupSchema

### 用例

:::demo
api/components/schema-field.tsx
:::

## JSON Schema

SchemaField 支持直接传入 [JSON Schema](https://json-schema.silver-formily.org/) 对象渲染表单。

:::demo
api/components/schema-field-with-schema.tsx
:::

## API

```ts
import type { ISchemaFieldProps, JSXComponent } from '@silver-formily/react'

type SchemaProps<D extends JSXComponent, C extends JSXComponent> = ISchemaFieldProps<D, C>
```

所有属性均可省略。主要渲染参数为 `schema?: ISchema`、`name?: SchemaKey`、`components?: SchemaReactComponents`、`scope?: any`、`children?: React.ReactNode`。未传 schema 时通过 children 收集 Markup schema；传入 schema 后忽略 Markup children。Markup 节点未提供真值 name 时会生成名称。

局部 components 和 scope 与工厂参数惰性合并，同名时局部值优先。字段配置从 schema 的 `toFieldProps` 生成；虽然声明继承 Core 工厂 props（去掉必填 name），但不代表所有 Field props 都会透传给渲染字段，请将字段配置写入 schema。省略 name 时渲染根 properties，不会隐式创建根字段。
