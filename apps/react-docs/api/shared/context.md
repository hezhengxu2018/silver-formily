---
aside: true
outline: 2
---

# context

## 描述

`@silver-formily/react` 的所有 Context，可以通过 `useContext` 消费这些 Context 来实现更复杂的定制化开发。

## FormContext

### 描述

Form 上下文，可以获取当前 Form 实例，等价于 [useForm](/api/hooks/use-form)

### 签名

```ts
import type { Form } from '@silver-formily/core'
import type { Context } from 'react'

export const FormContext: Context<Form>
```

## FieldContext

### 描述

字段上下文，可以获取当前字段实例，等价于 [useField](/api/hooks/use-field)

### 签名

```ts
import type { GeneralField } from '@silver-formily/core'
import type { Context } from 'react'

export const FieldContext: Context<GeneralField>
```

## SchemaMarkupContext

### 描述

Schema 标签上下文，主要用于收集 JSX Markup 写法的 Schema 标签，然后转换成标准 JSON Schema

完整的 Schema 协议、属性定义和联动规则请查看 [JSON Schema 文档](https://json-schema.silver-formily.org/)。当前页只说明 `@silver-formily/react` 暴露出来的 Context。

### 签名

```ts
import type { Schema } from '@silver-formily/json-schema'
import type { Context } from 'react'

export const SchemaMarkupContext: Context<Schema>
```

## SchemaContext

### 描述

字段 Schema 上下文，主要用于获取当前字段的 Schema 信息，等价于 [useFieldSchema](/api/hooks/use-field-schema)

`Schema` 类型的完整 API 已迁移到 [JSON Schema 文档](https://json-schema.silver-formily.org/)，本页不重复维护协议细节。站内桥接页见 [Schema](/api/shared/schema)。

### 签名

```ts
import type { Schema } from '@silver-formily/json-schema'
import type { Context } from 'react'

export const SchemaContext: Context<Schema>
```

## SchemaExpressionScopeContext

### 描述

Schema 表达式作用域上下文，等价于 [useExpressionScope](/api/hooks/use-expression-scope)

### 签名

```ts
import type { Context } from 'react'

export const SchemaExpressionScopeContext: Context<Record<string, unknown>>
```

## SchemaComponentsContext

### 描述

Schema 组件映射表上下文，`x-component` 传入字符串时会从该映射表中解析组件

### 签名

```ts
import type { SchemaReactComponents } from '@silver-formily/react'
import type { Context } from 'react'

export const SchemaComponentsContext: Context<SchemaReactComponents>
```

## SchemaOptionsContext

### 描述

Schema 全局参数上下文，主要用于获取从 createSchemaField 传入的参数

### 签名

```ts
import type { ISchemaFieldReactFactoryOptions } from '@silver-formily/react'
import type { Context } from 'react'

export const SchemaOptionsContext: Context<ISchemaFieldReactFactoryOptions>
```

## ContextCleaner

### 描述

清理组件，渲染时会将 Field / Schema 相关的 Context 重置为空值，主要用于隔离上下文，比如 `FormProvider` 内部会用它避免外层字段上下文泄漏到当前表单。

### 签名

```ts
import type { ComponentType, ReactNode } from 'react'

interface ContextCleaner {
  (props: { children?: ReactNode }): ReactNode
}

export const ContextCleaner: ComponentType<{ children?: ReactNode }>
```
