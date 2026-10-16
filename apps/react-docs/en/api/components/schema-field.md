---
aside: true
outline: [2, 3]
---

# SchemaField

## Description

The SchemaField component is dedicated to parsing [JSON Schema](https://json-schema.silver-formily.org/) and dynamically rendering forms.

There are two ways to use SchemaField: MarkupSchema and JSONSchema. MarkupSchema rendering categorizes the different types of Field, which makes it more readable; JSONSchema renders JSON Schema directly, staying closer to the underlying implementation.

::: tip
There is no directly importable SchemaField component; both MarkupSchema and JSONSchema require calling `createSchemaField` to obtain the component. `createSchemaField` returns only a single `SchemaField` component, with the Markup sub-components attached to it as static properties (e.g. `SchemaField.String`).
:::

::: tip Schema Protocol Notes
This page only explains how `@silver-formily/react` consumes Schemas. For the complete `Schema`, `ISchema`, `x-reactions`, `x-component-props` and other protocols, please refer to the [JSON Schema documentation](https://json-schema.silver-formily.org/).
:::

### Factory and return types

The options object is optional. Import the actual API types to preserve registry inference instead of declaring a non-generic `ComponentType` approximation:

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

Factory options are `components?: Components` and `scope?: any`. The returned component has `Markup`, `String`, `Object`, `Array`, `Boolean`, `Number`, `Date`, `DateTime`, and `Void` statics. Markup preserves registry inference and supports explicit `<Decorator, Component>` type arguments. Typed statics set their own schema type, overriding a supplied `type`.

## MarkupSchema

### Usage

:::demo
api/components/schema-field.tsx
:::

## JSON Schema

SchemaField supports passing a [JSON Schema](https://json-schema.silver-formily.org/) object directly to render a form.

:::demo
api/components/schema-field-with-schema.tsx
:::

## API

```ts
import type { ISchemaFieldProps, JSXComponent } from '@silver-formily/react'

type SchemaProps<D extends JSXComponent, C extends JSXComponent> = ISchemaFieldProps<D, C>
```

All props are optional. `schema?: ISchema`, `name?: SchemaKey`, `components?: SchemaReactComponents`, `scope?: any`, and `children?: React.ReactNode` form the main rendering API. Without `schema`, children describe Markup schemas; when `schema` is supplied, Markup children are ignored. Markup nodes without a truthy name receive a generated name.

Local component and scope entries override matching factory entries through lazy merging. Field configuration is produced from the schema by `toFieldProps`; although the declaration inherits Core factory props (except required `name`), this is not the same as forwarding every Field prop to rendered fields. Put field configuration in the schema. Omitting `name` renders root properties; it does not create an implicit root field.
