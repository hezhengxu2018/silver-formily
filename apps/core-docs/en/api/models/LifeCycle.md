---
order: 8
---

# LifeCycle

::: warning Internal Model
`LifeCycle` is intended primarily for internal framework use and is almost never instantiated or called directly in application code. Unless you are developing a low-level extension, prefer Form Effect Hooks and Field Effect Hooks.
:::

`LifeCycle` maps one or more event types to handlers that [Heart](/en/api/models/Heart) calls when events are published. Application code normally creates listeners through [Form Effect Hooks](/en/api/entry/FormEffectHooks) and [Field Effect Hooks](/en/api/entry/FieldEffectHooks).

## Constructor

```ts
type LifeCycleHandler<Payload> = (payload: Payload, context: any) => void

interface LifeCycleConstructor {
  new<Payload>(type: string, handler: LifeCycleHandler<Payload>): LifeCycle<Payload>
  new<Payload>(listeners: Record<string, LifeCycleHandler<Payload>>): LifeCycle<Payload>
}
```

One instance may receive multiple event-type and handler pairs.

## notify

Runs a handler only when the supplied `type` matches an event type registered in the constructor.

```ts
interface notify {
  <Payload>(type: string, payload?: Payload, context?: any): void
}
```

## LifeCycleTypes

`LifeCycleTypes` is the public lifecycle event enum exported by Core. Events are grouped into:

- Form events: initialization, mounting, value changes, input, validation, submission, reset, graph changes, and loading.
- Field events: initialization, mounting, value changes, input, validation, submission, reset, and loading.

```ts
import { LifeCycleTypes } from '@silver-formily/core'

LifeCycleTypes.ON_FORM_VALUES_CHANGE // 'onFormValuesChange'
LifeCycleTypes.ON_FORM_SUBMIT // 'onFormSubmit'
LifeCycleTypes.ON_FIELD_VALUE_CHANGE // 'onFieldValueChange'
LifeCycleTypes.ON_FIELD_VALIDATE_END // 'onFieldValidateEnd'
```

For application-facing events and their hooks, see [Form Effect Hooks](/en/api/entry/FormEffectHooks) and [Field Effect Hooks](/en/api/entry/FieldEffectHooks).
