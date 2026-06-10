# Type Definitions

This section documents the public types that actually belong to `@silver-formily/vue`, plus the way the Vue package consumes types from sibling packages.

When a type really comes from `@silver-formily/core`, `@silver-formily/path`, `@silver-formily/validator`, or `@silver-formily/json-schema`, this site keeps only a stable bridge page and links you to the source documentation instead of duplicating the original declaration.

## When to import from `@silver-formily/vue`

- The type directly references Vue `Component`, component maps, expression scope values, or recursive render options.
- You are describing Vue component props rather than the Core field model itself.
- You need to stay aligned with `SchemaField`, `RecursionField`, `ExpressionScope`, or other Vue-facing APIs.

## Type Map

| Category              | Start here                                           | Why                                                                                                   |
| --------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Field component props | [Field](/en/types/field)                             | Covers `IFieldProps`, `IFieldFactoryProps`, and the Vue-only wrapper types.                           |
| Path bridge           | [Path](/en/types/path)                               | The Vue package consumes `FormPathPattern` but does not redefine path semantics.                      |
| Validator bridge      | [Validator](/en/types/validator)                     | Validator aliases remain exported for compatibility, while the full contract lives in validator docs. |
| Schema protocol       | [Schema](https://json-schema.silver-formily.org/en/) | `Schema`, `ISchema`, `SchemaKey`, and all `x-*` contracts live in the json-schema package.            |

## Vue-specific types

### Field and context types

- `IProviderProps`: props for `FormProvider`; only exposes `form`.
- `IFieldProps`: extends `CoreFieldProps`, adds `decoratorContent`, and narrows `validator` to `SchemaFieldValidator`.
- `IFieldFactoryProps`: factory-component variant of the same idea.
- `IVoidFieldProps`: extends `IVoidFieldFactoryProps` with `decoratorContent`.
- `IArrayFieldProps` / `IObjectFieldProps`: aliases of `IFieldProps` kept for stable component signatures.
- `IReactiveFieldProps`: normalized payload for internal reactive field renderers.

### Component mapping and state mapping

- `VueComponentOptionsWithProps` / `VueComponentProps<T>`: extract props from Vue component types.
- `IComponentMapper<T>`: maps one component to another.
- `IStateMapper<Props>`: projects field state into component props via an object map or a function.

### Schema rendering

- `SchemaVueComponents`: component registry consumed by `SchemaField`.
- `SchemaExpressionScope`: expression scope object.
- `ISchemaFieldVueFactoryOptions`: Vue-specific factory options for `createSchemaField`.
- `ISchemaFieldProps`: props for the `SchemaField` component.
- `ISchemaMapper` / `ISchemaFilter`: callbacks used while traversing schema nodes.
- `IRecursionFieldProps`: props for `RecursionField`; its `basePath` comes from the path package.
- `SchemaMarkupValidator`: extracted `x-validator` type for markup schema.
- `ISchemaMarkupFieldProps`: markup schema field contract with Vue component mapping support.
- `ISchemaTypeFieldProps`: `ISchemaMarkupFieldProps` without `type`, useful for narrower generic inference.
- `IExpressionScopeProps`: props for `ExpressionScope`.

### Helper generics

- `ComponentPath<T>`: extracts the string keys of a component map.
- `ComponentPropsByPathValue<T, P>`: resolves component props from a mapped component key.

## Types that are intentionally not duplicated here

- Field and form models such as `Field`, `GeneralField`, and `Form`: see [Core Field docs](https://core.silver-formily.org/en/api/models/Field) and [Core Form docs](https://core.silver-formily.org/en/api/models/Form).
- Path contracts such as `FormPathPattern`: see the [Path docs](https://path.silver-formily.org/en/).
- Validator contracts such as `Validator`, `MultiValidator`, and `IValidatorRules`: see the [Validator docs](https://validator.silver-formily.org/en/api/validate).
- Schema contracts such as `Schema`, `ISchema`, and `SchemaKey`: see the [JSON Schema docs](https://json-schema.silver-formily.org/en/api/types).

## Import guidance

```ts
import type {
  IFieldProps,
  IRecursionFieldProps,
  ISchemaFieldProps,
  SchemaVueComponents,
} from '@silver-formily/vue'
```

If you only need the underlying model types, import from the source package directly:

```ts
import type { Form, GeneralField } from '@silver-formily/core'
import type { ISchema } from '@silver-formily/json-schema'
import type { Pattern } from '@silver-formily/path'
import type { Validator } from '@silver-formily/validator'
```
