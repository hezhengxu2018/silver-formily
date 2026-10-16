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
- Does not re-export `@silver-formily/json-schema`; import `Schema`, `ISchema`, and related APIs directly from `@silver-formily/json-schema`
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

## Replacing the form instance

Keep the same form instance for the lifetime of a mounted `FormProvider`. To replace the entire form, remount `FormProvider` and its subtree, for example with `<FormProvider key={form.id} form={form}>`. Do not only replace the existing provider's `form` prop while reusing its subtree: `useFormEffects` registers on mount and does not rebind when that prop changes. Unmounting the old subtree cleans up its subscriptions; mounting the new subtree registers new ones.

## Documentation

- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
