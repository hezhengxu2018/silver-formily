---
aside: true
outline: 2
---

# injections

## Description

Symbols exposed by `@silver-formily/vue`. Inject them to consume lower-level contexts when building custom tooling.

### FormSymbol

Provides the current `Form` instance.

```ts
import type { Form } from '@formily/core'
import type { InjectionKey, Ref } from 'vue'

export const FormSymbol: InjectionKey<Ref<Form>> = Symbol(form)
```

### FieldSymbol

Access the current field instance.

```ts
import type { GeneralField } from '@formily/core'
import type { InjectionKey, Ref } from 'vue'

export const FieldSymbol: InjectionKey<Ref<GeneralField>> = Symbol(field)
```

### SchemaMarkupSymbol

Collects JSX/markup schema definitions before they are transformed into canonical JSON Schema.

```ts
import type { Schema } from '@formily/json-schema'
import type { InjectionKey, Ref } from 'vue'

export const SchemaMarkupSymbol: InjectionKey<Ref<Schema>>
  = Symbol(schemaMarkup)
```

### SchemaSymbol

Provides the schema of the current field.

```ts
import type { Schema } from '@formily/json-schema'
import type { InjectionKey, Ref } from 'vue'

export const SchemaSymbol: InjectionKey<Ref<Schema>> = Symbol(schema)
```

### SchemaExpressionScopeSymbol

Gives access to the schema expression scope.

```ts
import type { InjectionKey, Ref } from 'vue'

export type SchemaExpressionScope = Record<string, unknown>

export const SchemaExpressionScopeSymbol: InjectionKey<
  Ref<SchemaExpressionScope>
> = Symbol(schemaExpression)
```

### SchemaOptionsSymbol

Holds the global options passed to `createSchemaField` (components and expression scope).

```ts
import type { InjectionKey, Ref } from 'vue'

export interface ISchemaFieldVueFactoryOptions<
  Components extends SchemaVueComponents = SchemaVueComponents,
> {
  components?: Components
  scope?: SchemaExpressionScope
}

export const SchemaOptionsSymbol: InjectionKey<
  Ref<ISchemaFieldVueFactoryOptions>
> = Symbol(schemaOptions)
```
