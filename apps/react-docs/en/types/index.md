# Type Declarations

This section only covers the public types defined by `@silver-formily/react` itself, and how it consumes types from other packages on the React side.

If a type already belongs to `@silver-formily/core`, `@silver-formily/path`, `@silver-formily/validator` or `@silver-formily/json-schema`, the original declaration is not duplicated here; instead, a stable entry point and a link are provided.

## When to import from `@silver-formily/react`

- The type directly involves React components, component mappings, scope objects or recursive rendering configuration.
- What you are describing is the props of a React component, not the Core field model itself.
- You need to stay consistent with React components such as `SchemaField`, `RecursionField` and `ExpressionScope`.

## Type Map

| Category              | Recommended Reference                             | Description                                                                                     |
| --------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Field component props | [Field](/en/types/field)                          | Explains the React-side wrappers `IFieldProps`, `IVoidFieldProps` and `RenderPropsChildren`.    |
| Path bridge           | [Path](/en/types/path)                            | The React package only consumes `FormPathPattern`; it does not redefine the path protocol.      |
| Validator bridge      | [Validator](/en/types/validator)                  | The field `validator` directly reuses `FieldValidator` from `@silver-formily/core`.             |
| Schema protocol       | [Schema](https://json-schema.silver-formily.org/) | `Schema`, `ISchema`, `SchemaKey` and the `x-*` protocols all belong to the json-schema package. |

## React-specific Types

### Fields and Contexts

- `JSXComponent`: the React-side component type constraint, `keyof React.JSX.IntrinsicElements` or a component constructor.
- `IProviderProps`: the props of `FormProvider`, exposing only `form`.
- `IFormSpyProps`: the props of `FormConsumer`, where `children` is `(form: Form) => ReactChild`.
- `RenderPropsChildren<Payload>`: the `children` of field components, either a render function `(field, form) => ReactNode` or a plain `ReactNode`.
- `IFieldProps<D, C>`: field component props; extends Core's `IFieldFactoryProps` with the React-semantic `children`, `decorator` and `component`.
- `IVoidFieldProps<D, C>`: the `VoidField` component props, sourced similarly to `IFieldProps`.
- `IExpressionScopeProps` / `IRecordScopeProps` / `IRecordsScopeProps`: the props of `ExpressionScope`, `RecordScope` and `RecordsScope`.

### Component Mapping and State Mapping

- `IComponentMapper<T>`: converts one component into another, commonly used in adapters like `connect`.
- `IStateMapper<Props>`: maps field state to component props, either with an object mapping or a function mapping.

### Schema Rendering

- `SchemaReactComponents`: the component registry of `SchemaField`, whose keys are the component names referenced in the schema.
- `ISchemaFieldReactFactoryOptions`: the React configuration entry of `createSchemaField`, mainly `components` and `scope`.
- `ISchemaFieldProps`: the `SchemaField` component props.
- `ISchemaMapper` / `ISchemaFilter`: map or filter schema nodes during recursive rendering.
- `IRecursionFieldProps`: the `RecursionField` component props, where `basePath` comes from the path system.
- `ISchemaMarkupFieldProps` / `ISchemaTypeFieldProps`: the Markup Schema field protocol, preserving React component mapping capabilities.

### Helper Generics

- `KeyOfReactComponent<T>`: excludes static keys like `contextTypes` and `displayName` from a component object.
- `ReactComponentPath<T>`: extracts the usable string keys from a component mapping object.
- `ReactComponentPropsByPathValue<T, P>`: infers a component's props from its key.
- `Path<T>` / `PathValue<T, P>`: generics for deep object paths and value lookup.
- `ReactChild`: `React.ReactElement | string | number`.

## Types Not Covered Here

- Field model, form model, `Field`, `GeneralField`, `Form`: see the [Formily Core documentation](https://core.silver-formily.org/api/models/Field) and [Form](https://core.silver-formily.org/api/models/Form).
- Path system, `FormPathPattern`: see the [Path documentation](https://path.silver-formily.org/).
- Validation rules, `Validator`, `FieldValidator`: see the [Validator documentation](https://validator.silver-formily.org/api/validate).
- Schema protocol, `Schema`, `ISchema`, `SchemaKey`: see the [JSON Schema documentation](https://json-schema.silver-formily.org/api/types).

## Import Recommendations

```ts
import type {
  IFieldProps,
  IRecursionFieldProps,
  ISchemaFieldProps,
  SchemaReactComponents,
} from '@silver-formily/react'
```

If you just want to reuse the underlying models, import them directly from the source packages, which makes the type origins clearer:

```ts
import type { Form, GeneralField } from '@silver-formily/core'
import type { ISchema } from '@silver-formily/json-schema'
import type { Pattern } from '@silver-formily/path'
import type { Validator } from '@silver-formily/validator'
```
