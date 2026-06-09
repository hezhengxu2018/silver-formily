# Linkage System

:::tip
The entire reactive system of Formily is based on `@silver-formily/reactive`. If you are not familiar with concepts such as `autorun`, `reaction`, or `observer`, you can read its [documentation](https://reactive.silver-formily.org/) first.
:::

The linkage system describes "what should happen after state changes." Formily provides two common entry points: `effects` and `reactions`.

One looks like active subscription and the other like passive dependency tracking, but underneath both are built around reactive state changes: after state is written, the system schedules related consumers, and the consumers then execute side effects or update field state.

The main difference lies in the **semantic wrapper**:

- `reactions` preserves dependency semantics: `reaction(field)` runs inside `autorun`, and whichever field state is read inside the function becomes tracked automatically
- `effects` preserves event semantics: built-in model reactions listen to key state changes and then publish `LifeCycleTypes` through Heart
- `Observer` preserves rendering semantics: when state that was read during rendering changes, only the related views are notified to update

<ThemeImage
  light="/architecture/reaction.en.png"
  dark="/architecture/reaction.en.dark.png"
  alt="Formily linkage system"
/>

Therefore, active side effects and passive linkage are not two unrelated systems underneath. Both rely on observable read/write tracking. They just differ in how the trigger is expressed afterward: `reactions` directly re-run the linkage function, while `effects` first convert the change into a lifecycle event and then hand it to business hooks.

Each event type has a corresponding Hook API:

```ts
import { onFieldValueChange, onFormSubmit } from '@silver-formily/core'

const form = createForm({
  effects() {
    onFormSubmit((form) => {
      // Side effects when the form is submitted
    })
    onFieldValueChange('*', (field) => {
      // Side effects when any field value changes
    })
  },
})
```

## effects: Active Side Effects

`effects` is suitable for expressing "when a lifecycle event happens, execute a piece of business logic."

```ts
import {
  createForm,
  onFieldValueChange,
  onFormSubmit,
} from '@silver-formily/core'

const form = createForm({
  effects() {
    onFieldValueChange('source', (field) => {
      field.form.setFieldState('target', (state) => {
        state.value = field.value
      })
    })

    onFormSubmit((form) => {
      console.log(form.values)
    })
  },
})
```

Characteristics of active side effects:

- Triggered by lifecycle events
- Can select target fields by path
- Suitable for scenarios where one change affects many targets in batch
- Reads more like an imperative flow, similar to event subscription

## reactions: Passive Linkage

`reactions` is suitable for expressing "which states the current field depends on, and automatically recomputing field state when those states change."

```ts
form.createField({
  name: 'email',
  reactions: [
    (field) => {
      const role = field.form.values.role

      field.required = role === 'admin'
      field.visible = role !== 'guest'

      field.setComponentProps({
        placeholder: role === 'admin' ? 'Please enter admin email' : 'Please enter email',
      })
    },
  ],
})
```

When `reaction(field)` runs for the first time, whichever reactive state is read gets collected automatically as dependencies. Later, when those dependencies change, the reaction runs again.

Characteristics of passive linkage:

- Triggered by dependency tracking
- Suitable for scenarios where multiple dependencies jointly determine one field state
- Reads more like declarative computation, where field state is derived from dependency state
- Can reduce the cost of manually wiring multiple lifecycle hooks

## How To Choose

| Scenario                                                             | Recommended |
| -------------------------------------------------------------------- | ----------- |
| One field change synchronizes multiple fields                        | `effects`   |
| Multiple fields jointly determine one field state                    | `reactions` |
| Lifecycle side effects such as submit, reset, and validation         | `effects`   |
| Derived state such as visibility, required, and component properties | `reactions` |

In real projects the two often coexist: `effects` handles event-style business flows, while `reactions` handles field state derivation.
