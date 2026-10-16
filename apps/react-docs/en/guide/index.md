# Introduction

`@silver-formily/react` comes from the migration and refactoring of the official `@formily/react`, and is the form rendering layer of the Silver Formily ecosystem on the React side: field components, Schema rendering, and the `connect` integration utilities are all provided by this package, while the form model, validation, and reactive capabilities come from `@silver-formily/core`, `@silver-formily/validator`, and `@silver-formily/reactive` respectively.

This guide assumes the `@silver-formily/*` namespace. If you are still maintaining a legacy project based on `@formily/*`, treat those package names as historical background from before the migration, not as the currently recommended usage.

## Installation

::: code-group

```bash [pnpm]
pnpm add @silver-formily/react @silver-formily/core react@19 react-dom@19
```

```bash [npm]
npm install @silver-formily/react @silver-formily/core react@19 react-dom@19
```

:::

## Quick Start

```tsx
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { useState } from 'react'

export default function App() {
  const [form] = useState(() => createForm())
  return (
    <FormProvider form={form}>
      <Field name="input" component={[Input]} />
    </FormProvider>
  )
}

function Input(props: { value?: string, onChange?: (value: string) => void }) {
  return (
    <input
      value={props.value ?? ''}
      onChange={(event) => {
        props.onChange?.(event.target.value)
      }}
    />
  )
}
```

As long as a component consumes the controlled `value` / `onChange` pair, it can be passed to Field as the `component` directly, with no extra wrapping required.

## Breaking Changes

- `@silver-formily/react` only supports `react` / `react-dom` `^18 || ^19`, and only ships ESM artifacts.
- The underlying reactive dependency has switched to `@silver-formily/reactive` + `@silver-formily/reactive-react`; `observer` is re-exported from `@silver-formily/reactive-react`, with its API defined by this repository’s reactive-react documentation.
- `createSchemaField` now returns only a single `SchemaField` component, with the Markup sub-components attached as static properties: `SchemaField.Markup`, `SchemaField.String`, `SchemaField.Object`, etc.
- Field mounting and effect subscriptions (`useFormEffects`, etc.) are implemented with `useCompatEffect` / `useCompatFactory`, synchronous StrictMode effect replay retains mounted resources; actual unmount cleanup is deferred to a microtask and abandoned-render resources are handled by garbage collection.
- `@silver-formily/react` does not export `Schema`. Import `Schema` and `ISchema` from `@silver-formily/json-schema`; `x-reactions` and `x-component-props` are schema properties, not named exports; see the [JSON Schema documentation](https://json-schema.silver-formily.org/) for the full reference.

::: tip
For detailed fundamental concepts (form model, field lifecycle, linkage protocol, etc.) you can still refer to the official documentation; this documentation focuses on the usage, differences, and migration information specific to the Silver Formily fork.
:::

Keep the form stable while its FormProvider is mounted. Replacing the whole form requires remounting the provider and its subtree, for example with `key={form.id}`. The package supports React 18/19 and requires the matching React DOM version. TypeScript consumers need React type packages and TypeScript 5.4+ for the exported `NoInfer` types. Internal `@silver-formily/*` dependencies listed in package.json are peers; install them explicitly if your package manager does not install peers automatically.
