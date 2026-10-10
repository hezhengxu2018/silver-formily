---
aside: true
outline: 2
---

# context

## Description

All the Contexts of `@silver-formily/react`. You can consume these Contexts with `useContext` to implement more advanced customization.

## FormContext

### Description

The Form context, from which you can get the current Form instance; equivalent to [useForm](/en/api/hooks/use-form).

### Signature

```ts
import type { Form } from '@silver-formily/core'
import type { Context } from 'react'

export const FormContext: Context<Form>
```

## FieldContext

### Description

The field context, from which you can get the current field instance; equivalent to [useField](/en/api/hooks/use-field).

### Signature

```ts
import type { GeneralField } from '@silver-formily/core'
import type { Context } from 'react'

export const FieldContext: Context<GeneralField>
```

## SchemaMarkupContext

### Description

The Schema tag context, mainly used to collect Schema tags written in JSX Markup and then convert them into standard JSON Schema.

For the complete Schema protocol, property definitions and linkage rules, please refer to the [JSON Schema documentation](https://json-schema.silver-formily.org/). This page only covers the Contexts exposed by `@silver-formily/react`.

### Signature

```ts
import type { Schema } from '@silver-formily/json-schema'
import type { Context } from 'react'

export const SchemaMarkupContext: Context<Schema>
```

## SchemaContext

### Description

The field Schema context, mainly used to get the Schema information of the current field; equivalent to [useFieldSchema](/en/api/hooks/use-field-schema).

The complete API of the `Schema` type has moved to the [JSON Schema documentation](https://json-schema.silver-formily.org/); this page does not duplicate the protocol details. The on-site bridge page is at [Schema](/en/api/shared/schema).

### Signature

```ts
import type { Schema } from '@silver-formily/json-schema'
import type { Context } from 'react'

export const SchemaContext: Context<Schema>
```

## SchemaExpressionScopeContext

### Description

The Schema expression scope context; equivalent to [useExpressionScope](/en/api/hooks/use-expression-scope).

### Signature

```ts
import type { Context } from 'react'

export const SchemaExpressionScopeContext: Context<Record<string, unknown>>
```

## SchemaComponentsContext

### Description

The Schema component registry context. When `x-component` is passed as a string, the component is resolved from this registry.

### Signature

```ts
import type { SchemaReactComponents } from '@silver-formily/react'
import type { Context } from 'react'

export const SchemaComponentsContext: Context<SchemaReactComponents>
```

## SchemaOptionsContext

### Description

The Schema global options context, mainly used to get the arguments passed to createSchemaField.

### Signature

```ts
import type { ISchemaFieldReactFactoryOptions } from '@silver-formily/react'
import type { Context } from 'react'

export const SchemaOptionsContext: Context<ISchemaFieldReactFactoryOptions>
```

## ContextCleaner

### Description

A cleanup component; when rendering, it resets the Field / Schema related Contexts to empty values, mainly used to isolate contexts. For example, `FormProvider` uses it internally to prevent outer field contexts from leaking into the current form.

### Signature

```ts
import type { ComponentType, ReactNode } from 'react'

interface ContextCleaner {
  (props: { children?: ReactNode }): ReactNode
}

export const ContextCleaner: ComponentType<{ children?: ReactNode }>
```
