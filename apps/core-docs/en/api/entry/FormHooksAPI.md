# FormHooksAPI

> Low-level APIs for creating custom side-effect hooks

## Description

`FormHooksAPI` includes `createEffectHook`, `createEffectContext`, and `useEffectForm` for extending custom lifecycle events and side-effect hooks.

## createEffectHook

### Signature

```ts
function createEffectHook<T, P>(
  type: string,
  handler: (payload: T, form: Form) => (params: P) => void
): (params: P) => void
```

### Description

Creates a custom side-effect hook. All internal `onFormXxx` and `onFieldXxx` hooks are built using this function.

```ts
// Simplified internal implementation
function createFormEffect(type: LifeCycleTypes) {
  return createEffectHook(
    type,
    (form: Form) => (callback: (form: Form) => void) => {
      batch(() => {
        callback(form)
      })
    },
  )
}

const onFormInit = createFormEffect(LifeCycleTypes.ON_FORM_INIT)
```

### Example

```ts
import { createEffectHook, createForm } from '@silver-formily/core'

const onCustomEvent = createEffectHook(
  'onCustom',
  (payload, form) => (callback: (data: any) => void) => {
    callback(payload)
  },
)

const form = createForm({
  effects() {
    onCustomEvent((data) => {
      console.log('custom event:', data)
    })
  },
})
```

## createEffectContext

Creates an effect context to isolate side effects across Form instances.

```ts
function createEffectContext(): EffectContext
```

## useEffectForm

Retrieves the current Form instance within a side-effect callback.

```ts
function useEffectForm(): Form
```

## Composing Custom Lifecycles

```ts
import { createEffectHook, LifeCycleTypes } from '@silver-formily/core'

const onFormReady = createEffectHook(
  'onFormReady',
  form => (callback: (form: Form) => void) => {
    let mounted = false
    let validated = false
    const check = () => {
      if (mounted && validated)
        callback(form)
    }

    form.notify(LifeCycleTypes.ON_FORM_MOUNT, () => {
      mounted = true
      check()
    })
    form.notify(LifeCycleTypes.ON_FORM_VALIDATE_END, () => {
      validated = true
      check()
    })
  },
)
```
