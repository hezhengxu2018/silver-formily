# Introduction

`@silver-formily/react` comes from the migration and refactoring of the official `@formily/react`, and is the form rendering layer of the Silver Formily ecosystem on the React side: field components, Schema rendering, and the `connect` integration utilities are all provided by this package, while the form model, validation, and reactive capabilities come from `@silver-formily/core`, `@silver-formily/validator`, and `@silver-formily/reactive` respectively.

This guide assumes the `@silver-formily/*` namespace. If you are still maintaining a legacy project based on `@formily/*`, treat those package names as historical background from before the migration, not as the currently recommended usage.

## Installation

::: code-group

```bash [pnpm]
pnpm add @silver-formily/react @silver-formily/core react react-dom
```

```bash [npm]
npm install @silver-formily/react @silver-formily/core react react-dom
```

:::

## Quick Start

```tsx
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

const form = createForm()

export default function App() {
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
- The underlying reactive dependency has switched to `@silver-formily/reactive` + `@silver-formily/reactive-react`; `observer` is re-exported from `@silver-formily/reactive-react`, with an API identical to the official one.
- `createSchemaField` now returns only a single `SchemaField` component, with the Markup sub-components attached as static properties: `SchemaField.Markup`, `SchemaField.String`, `SchemaField.Object`, etc. It no longer returns standalone `SchemaMarkupField` / `SchemaStringField` components.
- Field mounting and effect subscriptions (`useFormEffects`, etc.) are implemented with `useCompatEffect` / `useCompatFactory`, so under StrictMode / ConcurrentMode, effect replaying does not falsely trigger `onMount` / `onUnmount`, nor does it leave duplicate instances behind.
- `@silver-formily/react` does not export `Schema`. Import `Schema`, `ISchema`, `x-reactions`, `x-component-props` and the rest of the protocol from `@silver-formily/json-schema`; see the [JSON Schema documentation](https://json-schema.silver-formily.org/) for the full reference.

::: tip
For detailed fundamental concepts (form model, field lifecycle, linkage protocol, etc.) you can still refer to the official documentation; this documentation focuses on the usage, differences, and migration information specific to the Silver Formily fork.
:::
