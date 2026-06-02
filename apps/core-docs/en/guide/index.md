# Introduction

## UI-Agnostic

`@silver-formily/core` is a **standalone framework-agnostic package**. Its value lies in decoupling the domain model from any UI framework.

This offers two key benefits:

- Developers no longer need to tightly couple business logic with UI components, dramatically improving maintainability
- The framework gains native **cross-platform, cross-framework** capabilities. Whether using React, Vue, or other frameworks, you can share the Formily domain model

```ts
// core is pure logic, independent of any UI framework
import { createForm } from '@silver-formily/core'

// The same form instance can drive View layers from different frameworks
// Vue:  @silver-formily/vue
// or any custom renderer
```

## High Performance

Powered by `@silver-formily/reactive`'s reactive kernel, `@silver-formily/core` delivers:

- **Dependency tracking**: Automatically collects dependencies between field state and side effects
- **Efficient updates**: Precise notifications only when dependencies change — no wholesale updates
- **Render on demand**: Only re-renders fields that actually changed

Whether handling frequent field input or complex cross-field linkage, it guarantees **O(1)** update performance. You don't need to worry about optimization — focus on business logic.

## Domain Model

`@silver-formily/core` breaks down form-related problems into four domain-level concerns, each with a complete solution:

### Data Management

Dual value management with `values` and `initialValues`, supporting overwrite, shallow merge, and deep merge strategies. Conflict resolution follows a "user-first" principle.

```ts
form.setValues({ username: 'silver' })
form.setValues({ profile: { name: 'new' } }, 'deepMerge')
```

### Field Management

Create fields via `createField` / `createArrayField` / `createObjectField` / `createVoidField`, query flexibly via `query`, import/export field sets via `getFormGraph` / `setFormGraph`.

```ts
const field = form.createField({ name: 'username' })
const fields = form.query('user.*.name').map()
```

### Validation Management

Declarative validation rules, dynamic rule modification, multiple trigger timings (onInput/onBlur/onFocus), validation strategies (validateFirst), and rich feedback results (error/warning/success).

```ts
field.setValidator([
  { required: true },
  { format: 'email', triggerType: 'onBlur' },
])
```

### Linkage Management

Two linkage models — **active** (lifecycle-hook-based) and **passive** (reactions-based dependency tracking) — covering one-to-one, one-to-many, and many-to-one scenarios.

```ts
onFieldValueChange('source', (field) => {
  field.form.setValuesIn('target', field.value)
})
```

## TypeScript Intelligence

`@silver-formily/core` is a fully TypeScript project. When using VSCode, WebStorm, or similar editors, you get maximized intelligent code completion. All APIs provide precise type definitions and generic support.

## Observable State

Install [FormilyDevtools](https://chrome.google.com/webstore/detail/formily-devtools/kkocalmbfnplecdmbadaapgapdioecfm?hl=zh-CN) to observe form model state changes in real time, quickly troubleshooting linkage issues or validation anomalies.

## When to Use Core Directly

In most cases, you consume core indirectly through UI binding packages like `@silver-formily/vue`. Use core directly when:

- **Custom component authoring**: need low-level field APIs (setState, setValidator)
- **Reusable side-effect logic**: writing cross-page linkage logic in effects functions
- **UI-independent form operations**: server-side validation, testing scenarios
- **Framework-agnostic utilities**: building pure-logic form processors

If you're new to Formily, start with [Quick Start](/en/) to get a feel for the overall flow, then return here for the design principles.
