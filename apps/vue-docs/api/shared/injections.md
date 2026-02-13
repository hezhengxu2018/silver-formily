---
aside: true
outline: 2
---

# injections

## 描述

`@silver-formily/vue` 的所有 Symbol，可以通过注入这些 Symbol 来消费上下文实现更复杂的定制化开发。

## FormSymbol

#### 描述

Form 上下文，可以获取当前 Form 实例

#### 签名

```ts
import type { Form } from "@formily/core";
import type { InjectionKey, Ref } from "vue";

export const FormSymbol: InjectionKey<Ref<Form>> = Symbol("form");
```

## FieldSymbol

#### 描述

字段上下文，可以获取当前字段实例

#### 签名

```ts
import type { GeneralField } from "@formily/core";
import type { InjectionKey, Ref } from "vue";

export const FieldSymbol: InjectionKey<Ref<GeneralField>> = Symbol("field");
```

## SchemaMarkupSymbol

#### 描述

Schema 标签上下文，主要用于收集 JSX Markup 写法的 Schema 标签，然后转换成标准 JSON Schema

#### 签名

```ts
import type { Schema } from "@formily/json-schema";
import type { InjectionKey, Ref } from "vue";

export const SchemaMarkupSymbol: InjectionKey<Ref<Schema>> =
  Symbol("schemaMarkup");
```

## SchemaSymbol

#### 描述

字段 Schema 上下文，主要用于获取当前字段的 Schema 信息

#### 签名

```ts
import type { Schema } from "@formily/json-schema";
import type { InjectionKey, Ref } from "vue";

export const SchemaSymbol: InjectionKey<Ref<Schema>> = Symbol("schema");
```

## SchemaExpressionScopeSymbol

#### 描述

Schema 表达式作用域上下文

#### 签名

```ts
import type { InjectionKey, Ref } from "vue";

export type SchemaExpressionScope = Record<string, unknown>;

export const SchemaExpressionScopeSymbol: InjectionKey<
  Ref<SchemaExpressionScope>
> = Symbol("schemaExpression");
```

## SchemaOptionsSymbol

#### 描述

Schema 全局参数上下文，主要用于获取从 createSchemaField 传入的参数

#### 签名

```ts
import type { InjectionKey, Ref } from "vue";

export interface ISchemaFieldVueFactoryOptions<
  Components extends SchemaVueComponents = SchemaVueComponents,
> {
  components?: Components;
  scope?: SchemaExpressionScope;
}

export const SchemaOptionsSymbol: InjectionKey<
  Ref<ISchemaFieldVueFactoryOptions>
> = Symbol("schemaOptions");
```
