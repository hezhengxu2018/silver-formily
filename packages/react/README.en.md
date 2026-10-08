# @silver-formily/react

[中文 README](./README.md)

## Overview

`@silver-formily/react` is the React 18/19 form rendering layer for Silver Formily, migrated from `@formily/react@2.3.7`. It provides field components, JSON Schema rendering, and component bridging (`connect`) on top of the `@silver-formily/core` form domain model.

## Runtime Position

The package sits between the form kernel and business components:

- Built on `@silver-formily/core` / `@silver-formily/json-schema` for the form model and schema description
- Wires fine-grained reactive updates through the `observer` from `@silver-formily/reactive-react`
- Exposes React components and hooks that work with any component library

## Public API

- Components: `FormProvider`, `FormConsumer`, `Field`, `ArrayField`, `ObjectField`, `VoidField`, `RecursionField`, `createSchemaField` (with `SchemaField.String/Object/Array/...` markup syntax), `ExpressionScope`, `RecordScope`, `RecordsScope`
- Hooks: `useForm`, `useField`, `useFieldSchema`, `useFormEffects`, `useParentForm`, `useExpressionScope`
- Shared utilities: `connect`, `mapProps`, `mapReadPretty`, re-exported `observer` / `Observer`, plus 7 React contexts such as `FormContext`
- Re-exports everything from `@silver-formily/json-schema` (`Schema`, `ISchema`, ...)
- Types: `IFieldProps`, `ISchemaFieldProps`, `IComponentMapper`, `IStateMapper`, `JSXComponent`, etc.

## Differences from upstream @formily/react

- Internal dependencies replaced with `@silver-formily/*`; `FormPath` is imported from `@silver-formily/path`
- `useAttach` / `useFormEffects` use the `unstable_`-free `useCompatEffect` / `useCompatFactory` from `@silver-formily/reactive-react`
- Peer dependencies are `react` / `react-dom` `^18 || ^19`; `react-is` was dropped
- `shared/render.ts` imports `createPortal` directly from `react-dom`; the `globalThisPolyfill` and `require`-based fallbacks were removed
- The `global.d.ts` `Formily.React` global namespace is no longer published (no UMD artifact)
- ESM-only output (`dist/index.mjs` + `dist/index.d.ts`)

## Install

```bash
pnpm add @silver-formily/react @silver-formily/core react react-dom
```

## Quick Start

```tsx
import { createForm } from '@silver-formily/core'
import { connect, Field, FormProvider, mapProps } from '@silver-formily/react'

const form = createForm()

const Input = connect(
  props => <input {...props} />,
  mapProps({ value: true, onChange: true }),
)

export default () => (
  <FormProvider form={form}>
    <Field name="name" component={[Input]} />
  </FormProvider>
)
```

## Documentation

- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
