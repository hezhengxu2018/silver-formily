# Form Model

Form is the top-level aggregate model in `@silver-formily/core`. It does not implement every mechanism by itself. Instead, it coordinates the field tree, form values, lifecycle events, validation entry points, and linkage entry points in one runtime context.

In short: **Form coordinates the system; field state, paths, validation, and linkage are explained in their own guide pages.**

## Responsibilities

| Responsibility         | Description                                                                                                               | Learn More                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| State container        | Holds form-level state such as `values`, `initialValues`, `pattern`, `display`, `validating`, `submitting`, and `loading` | [Values & State](/en/guide/values)        |
| Field factory          | Creates `Field`, `ArrayField`, `ObjectField`, and `VoidField` instances in the same field tree                            | [Field Model](/en/guide/field)            |
| Field graph management | Imports, exports, and clears the field graph                                                                              | This page                                 |
| Path query entry       | Finds fields through `query()` and path expressions                                                                       | [Path System](/en/guide/path)             |
| Lifecycle center       | Publishes lifecycle events through `heart`, then lets effects subscribe to them                                           | [Linkage System](/en/guide/linkage)       |
| Aggregate operations   | Provides form-level operations such as `validate()`, `submit()`, and `reset()`                                            | [Validation System](/en/guide/validation) |

## Creating a Form

`createForm()` creates a Form instance. Common options include initial values, display state, interaction pattern, validation strategy, and effects:

```ts
import { createForm, onFieldValueChange } from '@silver-formily/core'

const form = createForm({
  initialValues: {
    username: 'silver',
  },
  effects() {
    onFieldValueChange('username', (field) => {
      console.log('username changed:', field.value)
    })
  },
})
```

The created Form becomes the runtime context for the whole form. Fields, linkage rules, validation, and UI consumers all read from or write to this instance.

## Field Management

Form creates fields and keeps them in one field tree:

```ts
const username = form.createField({
  name: 'username',
  value: '',
})

const users = form.createArrayField({
  name: 'users',
})

const layout = form.createVoidField({
  name: 'layout',
})
```

Once created, fields can be queried with path expressions:

```ts
form.query('username').take()
form.query('users.*.name').map()
form.query('**.email').forEach((field) => {
  field.disabled = true
})
```

For field-level state rules, data read/write, display behavior, and component proxying, see [Field Model](/en/guide/field).

:::tip
In normal Formily usage you rarely create fields manually with `createXXXField`. The examples here are for illustration only.
:::

## Field Graph

Form can export and import the field graph. The graph stores field structure and field state, which is useful for restoring runtime state, debugging snapshots, or reusing dynamic form structures.

```ts
const graph = form.getFormGraph()

form.setFormGraph(graph)

form.clearFormGraph()
```

The field graph describes the **field model tree**, not just `values`. If you only need form data, use `values`, `initialValues`, or deep path read/write helpers.

## Values Entry

Form holds form-level data and provides deep path helpers:

```ts
form.setValues({
  profile: {
    name: 'Silver',
  },
})

form.setValuesIn('profile.age', 18)

console.log(form.values)
console.log(form.getValuesIn('profile.name'))
```

A data field does not keep an independent copy of data. `field.value` reads and writes `form.values` through the field `path`. See [Values & State](/en/guide/values) and [Path System](/en/guide/path) for the full mechanism.

## Lifecycle & Effects

Form owns a `heart` that publishes lifecycle events. Hooks registered in `effects()` subscribe to those events:

```ts
import {
  createForm,
  onFieldValueChange,
  onFormSubmit,
} from '@silver-formily/core'

const form = createForm({
  effects() {
    onFormSubmit((form) => {
      console.log('submit:', form.values)
    })

    onFieldValueChange('username', (field) => {
      console.log(field.value)
    })
  },
})
```

Lifecycle hooks are the active side-effect entry. Field `reactions` are the dependency-tracking linkage entry. See [Linkage System](/en/guide/linkage) for how they work together.

## Aggregate Operations

Form provides form-level operation entries:

```ts
await form.validate()

await form.submit(async (values) => {
  await request(values)
})

await form.reset()
```

These methods aggregate data fields from the field tree. For example, `form.validate()` dispatches validation to fields, while rule declaration and feedback generation still belong to fields and the validation system.

## Reading Order

To understand the form model, read the guide in this order:

1. [Form Model](/en/guide/form): top-level aggregate responsibilities
2. [Field Model](/en/guide/field): field state and field types
3. [Values & State](/en/guide/values): data read/write and aggregation
4. [Path System](/en/guide/path): field tree paths and data paths
5. [Validation System](/en/guide/validation): rules, triggers, and feedback
6. [Linkage System](/en/guide/linkage): effects and reactions
